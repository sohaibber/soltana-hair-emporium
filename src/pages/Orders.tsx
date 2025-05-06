
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Package, ChevronRight, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  total: number;
  product_name?: string;
  product_image?: string;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  shipping_tracking: string | null;
  user_id: string;
  items?: OrderItem[];
}

const OrderStatusBadge = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
        <Clock size={14} className="mr-1" /> Pending
      </Badge>;
    case 'processing':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        <Clock size={14} className="mr-1" /> Processing
      </Badge>;
    case 'shipped':
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
        <Truck size={14} className="mr-1" /> Shipped
      </Badge>;
    case 'delivered':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        <CheckCircle size={14} className="mr-1" /> Delivered
      </Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
        <XCircle size={14} className="mr-1" /> Cancelled
      </Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Orders: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch orders for the current user
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (ordersError) throw ordersError;
        
        if (!ordersData || ordersData.length === 0) {
          setOrders([]);
          setLoading(false);
          return;
        }
        
        // Fetch order items and product details for each order
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order) => {
            // Get order items
            const { data: itemsData } = await supabase
              .from('order_items')
              .select('*')
              .eq('order_id', order.id);
            
            // Get product details for order items
            const itemsWithProducts = await Promise.all(
              (itemsData || []).map(async (item) => {
                const { data: productData } = await supabase
                  .from('products')
                  .select('name, image_urls')
                  .eq('id', item.product_id)
                  .single();
                
                return {
                  ...item,
                  product_name: productData?.name || 'Unknown Product',
                  product_image: productData?.image_urls ? productData.image_urls[0] : null
                };
              })
            );
              
            return {
              ...order,
              // Cast status to ensure it matches the union type
              status: order.status as Order['status'],
              items: itemsWithProducts
            };
          })
        );
        
        setOrders(ordersWithItems);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated && user) {
      fetchOrders();
    }
  }, [user, isAuthenticated]);
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  // Helper function to get image URL
  const getImageUrl = (path: string) => {
    if (!path) return "/placeholder.svg";
    if (path.startsWith('http')) {
      return path;
    }
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${path}`;
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: "/orders" } }} />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="space-y-2">
                <Link 
                  to="/account" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Package size={18} />
                  <span>Account Details</span>
                </Link>
                <Link 
                  to="/orders" 
                  className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 transition-colors"
                >
                  <Package size={18} />
                  <span>Orders</span>
                </Link>
                <Link 
                  to="/wishlist" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Package size={18} />
                  <span>Wishlist</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>
              
              {loading ? (
                <div className="py-8 text-center">
                  <p>Loading your orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="py-8 text-center border rounded-lg">
                  <Package size={48} className="mx-auto text-gray-400 mb-4" />
                  <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                  <p className="text-gray-600 mb-6">
                    You haven't placed any orders yet.
                  </p>
                  <Button asChild>
                    <Link to="/shop">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono">
                            #{order.id.substring(0, 8)}
                          </TableCell>
                          <TableCell>{formatDate(order.created_at)}</TableCell>
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>
                          <TableCell>
                            ${(order.total_amount + (order.total_amount > 100 ? 0 : 10)).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewOrder(order)}
                            >
                              View Details <ChevronRight size={16} className="ml-1" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Order Details Dialog */}
        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>
                Order #{selectedOrder?.id.substring(0, 8)}
              </DialogTitle>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-4">
                {/* Order Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm text-gray-500">Status</h3>
                    <OrderStatusBadge status={selectedOrder.status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Order Date: {formatDate(selectedOrder.created_at)}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                {/* Tracking Information */}
                {selectedOrder.shipping_tracking && (
                  <div>
                    <h3 className="font-medium">Tracking Information</h3>
                    <p className="mt-1 text-sm">
                      Tracking Number: <span className="font-mono">{selectedOrder.shipping_tracking}</span>
                    </p>
                  </div>
                )}
                
                {/* Shipping Address */}
                <div>
                  <h3 className="font-medium">Shipping Address</h3>
                  <div className="mt-1 text-sm">
                    <p>{selectedOrder.shipping_address.firstName} {selectedOrder.shipping_address.lastName}</p>
                    <p>{selectedOrder.shipping_address.address}</p>
                    <p>
                      {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} {selectedOrder.shipping_address.zipCode}
                    </p>
                    <p>{selectedOrder.shipping_address.country}</p>
                    <p className="mt-1">Phone: {selectedOrder.shipping_address.phone}</p>
                  </div>
                </div>
                
                <Separator />
                
                {/* Order Items */}
                <div>
                  <h3 className="mb-2 font-medium">Order Items</h3>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Image</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(selectedOrder.items || []).map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="w-12 h-12 overflow-hidden rounded-md">
                                <img
                                  src={getImageUrl(item.product_image)}
                                  alt={item.product_name}
                                  className="object-cover w-full h-full"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                                  }}
                                />
                              </div>
                            </TableCell>
                            <TableCell>{item.product_name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="p-4 mt-4 bg-gray-50 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${selectedOrder.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span>Shipping</span>
                    <span>
                      {selectedOrder.total_amount > 100 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        '$10.00'
                      )}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        selectedOrder.total_amount +
                        (selectedOrder.total_amount > 100 ? 0 : 10)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Orders;
