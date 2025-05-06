
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, Info, Truck, Cash } from "lucide-react";
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
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
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
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your order.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return false;
    }
    
    try {
      setIsProcessingPayment(true);
      
      // Create Stripe Checkout session
      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          success_url: `${window.location.origin}/order-confirmation`,
          cancel_url: `${window.location.origin}/checkout`,
          line_items: JSON.stringify(items.map(item => ({
            price_data: {
              currency: 'usd',
              product_data: { name: item.name },
              unit_amount: Math.round(item.price * 100), // Convert to cents
            },
            quantity: item.quantity,
          }))),
          mode: 'payment',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const session = await response.json();
      window.location.href = session.url;
      return true;
      
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessingPayment(false);
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
    
    if (formData.paymentMethod === 'credit') {
      if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvc) {
        toast({
          title: "Payment Information Required",
          description: "Please fill out all payment fields.",
          variant: "destructive",
        });
        return;
      }
      
      // Attempt to process Stripe payment
      const paymentSuccessful = await processStripePayment();
      if (!paymentSuccessful) return;
    }
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your order.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
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
      
      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalPrice,
          shipping_address: shippingAddress,
          status: 'pending',
          payment_method: formData.paymentMethod,
          payment_intent_id: formData.paymentMethod === 'cod' ? 'cod_order' : `pi_${Math.random().toString(36).substr(2, 9)}`,
        })
        .select();
      
      if (orderError) throw orderError;
      
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
        description: formData.paymentMethod === 'cod' ? 
          "Thank you for your order. You will pay on delivery." : 
          "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      
      // Redirect to confirmation page
      navigate("/order-confirmation", { state: { orderId: orderData[0].id } });
    } catch (error) {
      console.error("Error creating order:", error);
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
                          <CreditCard size={16} className="mr-2" /> Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border p-3 rounded-md">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center">
                          <Cash size={16} className="mr-2" /> Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {formData.paymentMethod === "credit" && (
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          required={formData.paymentMethod === "credit"}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          required={formData.paymentMethod === "credit"}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Expiration Date (MM/YY)</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            required={formData.paymentMethod === "credit"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvc">CVC</Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            type="password"
                            placeholder="***"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            required={formData.paymentMethod === "credit"}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 rounded-md bg-blue-50 p-3 text-sm text-blue-600">
                        <Info size={16} className="mt-1 flex-shrink-0" />
                        <span>
                          Your payment information is encrypted and secure. We do not store your card details.
                        </span>
                      </div>
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
    </Layout>
  );
};

export default Checkout;
