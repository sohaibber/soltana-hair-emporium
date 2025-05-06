
import React, { useEffect, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface OrderDetails {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  shipping_address: any;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  const orderId = location.state?.orderId;
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('user_id', user.id)
          .single();
          
        if (error) throw error;
        
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated && user) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [orderId, user, isAuthenticated]);

  // If user navigated directly to this page without a valid order
  if (!loading && !orderId) {
    return <Navigate to="/shop" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle size={32} />
            </div>
            
            <h1 className="text-2xl font-semibold mb-2">Thank You for Your Order!</h1>
            
            {order && (
              <p className="text-gray-600 mb-6">
                Your order #{order.id.substring(0, 8)} has been successfully placed. 
                We have sent a confirmation email with all details.
              </p>
            )}
            
            {!order && !loading && (
              <p className="text-gray-600 mb-6">
                Your order has been successfully placed. 
                We have sent a confirmation email with all details.
              </p>
            )}
            
            {loading && (
              <p className="text-gray-600 mb-6">Loading order details...</p>
            )}
          </div>
          
          {order && (
            <>
              <Separator />
              
              <div className="p-6">
                <h2 className="font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-mono">{order.id.substring(0, 8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span>
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Status:</span>
                    <span className="text-blue-600">Processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold">
                      ${(order.total_amount + (order.total_amount > 100 ? 0 : 10)).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="pt-3">
                    <p className="text-gray-600">Shipping to:</p>
                    <p className="mt-1">
                      {order.shipping_address.firstName} {order.shipping_address.lastName}
                    </p>
                    <p>{order.shipping_address.address}</p>
                    <p>
                      {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zipCode}
                    </p>
                    <p>{order.shipping_address.country}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
            </>
          )}
          
          <div className="p-6 flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <Link to="/orders">
                <Package size={16} className="mr-2" /> View Your Orders
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/shop">
                Continue Shopping <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-gray-600">
            Need assistance? Contact our customer service at <a href="mailto:support@soltana.com" className="text-blue-600">support@soltana.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
