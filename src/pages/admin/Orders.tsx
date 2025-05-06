
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Search, ArrowUpDown, CheckCircle, Clock, XCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
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

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: ShippingAddress;
  shipping_tracking: string | null;
  user_id: string;
  customer_name?: string;
  customer_email?: string;
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch orders from database
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (ordersError) throw ordersError;
        
        // Fetch customer information for each order
        const ordersWithCustomers = await Promise.all(
          ordersData.map(async (order) => {
            // Get customer info
            const { data: profileData } = await supabase
              .from('profiles')
              .select('email, first_name, last_name')
              .eq('id', order.user_id)
              .single();
            
            // Get order items
            const { data: itemsData } = await supabase
              .from('order_items')
              .select('*')
              .eq('order_id', order.id);
            
            // Get product names and images for order items
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
              status: order.status as Order['status'],
              shipping_address: order.shipping_address as ShippingAddress,
              customer_name: profileData ? `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() : 'Unknown',
              customer_email: profileData?.email || 'No email',
              items: itemsWithProducts
            } as Order;
          })
        );
        
        setOrders(ordersWithCustomers);
        setFilteredOrders(ordersWithCustomers);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({
          title: "Error fetching orders",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [toast]);
  
  // Filter orders based on search term and status
  useEffect(() => {
    let filtered = orders;
    
    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((order) => 
        order.id.toLowerCase().includes(term) ||
        order.customer_name?.toLowerCase().includes(term) ||
        order.customer_email?.toLowerCase().includes(term)
      );
    }
    
    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
        
      if (error) throw error;
      
      // Update order status in state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      setFilteredOrders(filteredOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      
      toast({
        title: "Order status updated",
        description: `Order #${orderId.substring(0, 8)} status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error updating order status",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };
  
  const handleUpdateTracking = async (orderId: string, trackingNumber: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ shipping_tracking: trackingNumber })
        .eq('id', orderId);
        
      if (error) throw error;
      
      // Update tracking number in state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, shipping_tracking: trackingNumber } : order
      ));
      
      setFilteredOrders(filteredOrders.map(order => 
        order.id === orderId ? { ...order, shipping_tracking: trackingNumber } : order
      ));
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, shipping_tracking: trackingNumber });
      }
      
      toast({
        title: "Tracking number updated",
        description: `Tracking updated for order #${orderId.substring(0, 8)}`,
      });
      
      setIsOrderDetailsOpen(false);
    } catch (error) {
      console.error("Error updating tracking number:", error);
      toast({
        title: "Error updating tracking number",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // Helper function to get image URL
  const getImageUrl = (path: string) => {
    if (!path) return "";
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

  return (
    <AdminLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold">Orders</h1>
        </div>
        
        {/* Filters */}
        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              startAdornment={<Search className="w-4 h-4" />}
            />
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="mt-6 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono">
                      #{order.id.substring(0, 8)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{order.customer_name}</div>
                      <div className="text-sm text-gray-500">{order.customer_email}</div>
                    </TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye size={16} className="mr-1" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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
                    <Select 
                      defaultValue={selectedOrder.status}
                      onValueChange={(value) => handleUpdateStatus(selectedOrder.id, value as Order['status'])}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                {/* Order Details */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Customer Information */}
                  <div>
                    <h3 className="font-medium">Customer Information</h3>
                    <p className="mt-1 text-sm">{selectedOrder.customer_name}</p>
                    <p className="text-sm">{selectedOrder.customer_email}</p>
                  </div>
                  
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
                </div>
                
                <Separator />
                
                {/* Tracking Information */}
                <div>
                  <h3 className="font-medium">Tracking Information</h3>
                  <div className="flex items-end gap-2 mt-1">
                    <div className="flex-grow">
                      <Input
                        placeholder="Add tracking number"
                        defaultValue={selectedOrder.shipping_tracking || ''}
                        id="trackingInput"
                      />
                    </div>
                    <Button
                      onClick={() => {
                        const trackingInput = document.getElementById('trackingInput') as HTMLInputElement;
                        handleUpdateTracking(selectedOrder.id, trackingInput.value);
                      }}
                    >
                      Update Tracking
                    </Button>
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
    </AdminLayout>
  );
};

export default Orders;
