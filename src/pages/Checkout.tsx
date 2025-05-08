import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, Info, Truck, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Checkout: React.FC = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "credit",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Load user data if authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setFormData(prev => ({
            ...prev,
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: data.email || user.email || '',
          }));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    
    loadUserData();
  }, [user, isAuthenticated]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };
  
  const processStripePayment = async () => {
    try {
      setIsProcessingPayment(true);
      setShowLoadingDialog(true);
      setPaymentError(null);
      
      console.log("Starting Stripe payment process");
      
      // Call our secure Supabase Edge Function to create a Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
          })),
          successUrl: `${window.location.origin}/order-confirmation`,
          cancelUrl: `${window.location.origin}/checkout`,
          paymentMethod: formData.paymentMethod
        }
      });
      
      console.log("Payment function response:", data, error);
      
      if (error) {
        console.error("Payment function error:", error);
        throw new Error(error.message || 'Failed to process payment');
      }
      
      // Handle Cash on Delivery - no redirect needed
      if (data?.type === 'cod') {
        // Create the shipping address JSON
        const shippingAddress = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
        };
        
        if (!isAuthenticated || !user) {
          setIsProcessingPayment(false);
          setShowLoadingDialog(false);
          toast({
            title: "Authentication Required",
            description: "Please log in to complete your order with Cash on Delivery.",
            variant: "destructive",
          });
          navigate("/login", { state: { from: { pathname: "/checkout" } } });
          return false;
        }
        
        // Create order in database for COD
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            total_amount: totalPrice,
            shipping_address: shippingAddress,
            status: 'pending',
            payment_method: 'cod',
            payment_intent_id: 'cod_order',
          })
          .select();
        
        if (orderError) {
          console.error("Order creation error details:", orderError);
          throw orderError;
        }
        
        if (!orderData || orderData.length === 0) {
          throw new Error("Order creation failed - no data returned");
        }
        
        // Create order items
        const orderItems = items.map(item => ({
          order_id: orderData[0].id,
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        }));
        
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);
        
        if (itemsError) throw itemsError;
        
        // Clear the cart
        clearCart();
        
        toast({
          title: "Order Placed Successfully!",
          description: "Thank you for your order. You will pay on delivery.",
        });
        
        setIsProcessingPayment(false);
        setShowLoadingDialog(false);
        
        // Redirect to confirmation page
        navigate("/order-confirmation", { state: { orderId: orderData[0].id } });
        return true;
      }
      
      // Handle Stripe redirect for card payments
      if (data?.type === 'stripe' && data?.url) {
        console.log("Redirecting to Stripe URL:", data.url);
        window.location.href = data.url;
        return true;
      } else {
        console.error("No checkout URL returned:", data);
        throw new Error('No checkout URL returned');
      }
      
    } catch (error) {
      console.error('Payment processing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setPaymentError(errorMessage);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      setShowLoadingDialog(false);
      setIsProcessingPayment(false);
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.address || !formData.city || 
        !formData.state || !formData.zipCode) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process payment based on selected method
      await processStripePayment();
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const shippingPrice = totalPrice > 100 ? 0 : 10;
  const finalTotal = totalPrice + shippingPrice;

  // Helper function to get image URL
  const getImageUrl = (path: string) => {
    if (!path) return "/placeholder.svg";
    if (path.startsWith('http')) {
      return path;
    }
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${path}`;
  };

  return (
    
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="font-medium">Shipping Information</h2>
                </div>
                <div className="p-6 space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="font-medium">Payment Information</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-3 border p-3 rounded-md">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="flex items-center">
                          <CreditCard size={16} className="mr-2" /> Credit/Debit Card (Stripe)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border p-3 rounded-md">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center">
                          <Banknote size={16} className="mr-2" /> Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {formData.paymentMethod === "credit" && (
                    <div className="mt-4 p-4 bg-gray-50 rounded text-center">
                      <div className="flex items-center justify-center mb-2">
                        <CreditCard size={20} className="mr-2 text-gray-600" />
                        <span className="font-medium">Stripe Secure Checkout</span>
                      </div>
                      <p className="text-gray-600">
                        You will be redirected to Stripe's secure payment page to complete your purchase.
                      </p>
                    </div>
                  )}
                  
                  {formData.paymentMethod === "cod" && (
                    <div className="mt-4 p-4 bg-gray-50 rounded text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Truck size={20} className="mr-2 text-gray-600" />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                      <p className="text-gray-600">
                        Pay with cash when your order is delivered to your doorstep.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-soltana-dark text-white hover:bg-black"
                disabled={isSubmitting || isProcessingPayment || items.length === 0}
              >
                {isSubmitting || isProcessingPayment ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden sticky top-24">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="font-medium">Order Summary</h2>
              </div>
              <div className="p-4 space-y-4">
                {/* Items Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Items ({totalItems})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  {items.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="flex text-sm">
                      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <span className="line-clamp-1">{item.name}</span>
                            <div className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </div>
                          </div>
                          <div>${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingPrice === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shippingPrice.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
                
                <div className="bg-green-50 p-3 rounded text-sm text-green-700 flex items-start gap-2">
                  <Check size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    {totalPrice > 100 
                      ? "Your order qualifies for free shipping!" 
                      : `Add ${(100 - totalPrice).toFixed(2)} more to get free shipping!`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Payment Dialog */}
      <Dialog open={showLoadingDialog} onOpenChange={setShowLoadingDialog}>
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
          <DialogTitle className="text-center">Processing Payment</DialogTitle>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-12 h-12 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-center">
              {formData.paymentMethod === 'credit' 
                ? "Please wait while we redirect you to Stripe's secure checkout page..."
                : "Processing your Cash on Delivery order..."}
            </p>
            {paymentError && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                <p>Error: {paymentError}</p>
                <p className="mt-2">Please try again or choose a different payment method.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Checkout;
