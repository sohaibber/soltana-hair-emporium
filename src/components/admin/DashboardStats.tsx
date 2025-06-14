
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueGrowth: number;
  ordersGrowth: number;
  productsGrowth: number;
  customersGrowth: number;
}

const DashboardStats: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    productsGrowth: 0,
    customersGrowth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Get current date and last month date
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      // Fetch total revenue from completed orders
      const { data: revenueData, error: revenueError } = await supabase
        .from('orders')
        .select('total_amount, created_at')
        .eq('status', 'completed');

      if (revenueError) throw revenueError;

      const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const lastMonthRevenue = revenueData?.filter(order => 
        new Date(order.created_at) >= lastMonth && new Date(order.created_at) < currentMonth
      ).reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      const currentMonthRevenue = revenueData?.filter(order => 
        new Date(order.created_at) >= currentMonth
      ).reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      // Fetch total orders
      const { count: totalOrders, error: ordersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      if (ordersError) throw ordersError;

      // Fetch orders from last month and current month for growth calculation
      const { count: lastMonthOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', lastMonth.toISOString())
        .lt('created_at', currentMonth.toISOString());

      const { count: currentMonthOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', currentMonth.toISOString());

      // Fetch total active products
      const { count: totalProducts, error: productsError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (productsError) throw productsError;

      // Fetch products added last month and current month
      const { count: lastMonthProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
        .gte('created_at', lastMonth.toISOString())
        .lt('created_at', currentMonth.toISOString());

      const { count: currentMonthProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
        .gte('created_at', currentMonth.toISOString());

      // Fetch total customers (profiles)
      const { count: totalCustomers, error: customersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (customersError) throw customersError;

      // Fetch customers from last month and current month
      const { count: lastMonthCustomers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', lastMonth.toISOString())
        .lt('created_at', currentMonth.toISOString());

      const { count: currentMonthCustomers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', currentMonth.toISOString());

      // Calculate growth percentages
      const revenueGrowth = lastMonthRevenue > 0 
        ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
        : currentMonthRevenue > 0 ? 100 : 0;

      const ordersGrowth = (lastMonthOrders || 0) > 0 
        ? (((currentMonthOrders || 0) - (lastMonthOrders || 0)) / (lastMonthOrders || 0)) * 100 
        : (currentMonthOrders || 0) > 0 ? 100 : 0;

      const productsGrowth = (lastMonthProducts || 0) > 0 
        ? (((currentMonthProducts || 0) - (lastMonthProducts || 0)) / (lastMonthProducts || 0)) * 100 
        : (currentMonthProducts || 0) > 0 ? 100 : 0;

      const customersGrowth = (lastMonthCustomers || 0) > 0 
        ? (((currentMonthCustomers || 0) - (lastMonthCustomers || 0)) / (lastMonthCustomers || 0)) * 100 
        : (currentMonthCustomers || 0) > 0 ? 100 : 0;

      setData({
        totalRevenue,
        totalOrders: totalOrders || 0,
        totalProducts: totalProducts || 0,
        totalCustomers: totalCustomers || 0,
        revenueGrowth,
        ordersGrowth,
        productsGrowth,
        customersGrowth,
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatGrowth = (growth: number) => {
    const sign = growth >= 0 ? '+' : '';
    return `${sign}${growth.toFixed(1)}% from last month`;
  };

  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.totalRevenue)}</div>
          <p className={`text-xs mt-1 ${data.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatGrowth(data.revenueGrowth)}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalOrders}</div>
          <p className={`text-xs mt-1 ${data.ordersGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatGrowth(data.ordersGrowth)}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalProducts}</div>
          <p className={`text-xs mt-1 ${data.productsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.productsGrowth > 0 ? `+${data.totalProducts - Math.floor(data.totalProducts / (1 + data.productsGrowth / 100))} new this month` : 'No new products this month'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalCustomers}</div>
          <p className={`text-xs mt-1 ${data.customersGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatGrowth(data.customersGrowth)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
