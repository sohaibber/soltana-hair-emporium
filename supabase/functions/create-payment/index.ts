
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Payment function called, processing request");
    
    // Get the request body
    const { items, successUrl, cancelUrl } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Invalid items provided:", items);
      return new Response(
        JSON.stringify({ error: "Invalid items provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    // Create Supabase client for user authentication
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Get the authorization header
    const authHeader = req.headers.get("authorization");
    let userEmail = "guest@example.com"; // Default for guest checkout
    let userId = null;
    
    if (authHeader) {
      console.log("Auth header found, retrieving user info");
      // Verify the JWT token
      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (user && !error) {
        console.log("User authenticated:", user.email);
        userEmail = user.email || userEmail;
        userId = user.id;
      } else {
        console.log("User authentication failed:", error?.message);
      }
    } else {
      console.log("No auth header, proceeding with guest checkout");
    }
    
    // Format line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    console.log("Creating checkout session with items:", JSON.stringify(lineItems));
    console.log("Success URL:", successUrl || `${req.headers.get("origin")}/order-confirmation`);
    console.log("Cancel URL:", cancelUrl || `${req.headers.get("origin")}/checkout`);

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: userEmail,
      success_url: successUrl || `${req.headers.get("origin")}/order-confirmation`,
      cancel_url: cancelUrl || `${req.headers.get("origin")}/checkout`,
      metadata: {
        userId: userId || 'guest'
      }
    });

    console.log("Checkout session created:", session.id);
    console.log("Checkout URL:", session.url);

    // Return the session ID and URL
    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Log the detailed error
    console.error("Error creating checkout session:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    // Return error response
    return new Response(
      JSON.stringify({ error: error.message || "Failed to create checkout session" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
