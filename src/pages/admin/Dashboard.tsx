import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStats from "@/components/admin/DashboardStats";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const salesData = [
  { date: "Jan", revenue: 3400 },
  { date: "Feb", revenue: 5800 },
  { date: "Mar", revenue: 6700 },
  { date: "Apr", revenue: 7800 },
  { date: "May", revenue: 8500 },
  { date: "Jun", revenue: 7600 },
  { date: "Jul", revenue: 9800 },
  { date: "Aug", revenue: 10900 },
  { date: "Sep", revenue: 9800 },
  { date: "Oct", revenue: 12400 },
  { date: "Nov", revenue: 16500 },
  { date: "Dec", revenue: 14200 },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Emily Johnson", date: "2023-05-01", status: "Completed", total: "$159.99" },
  { id: "#ORD-002", customer: "Sophia Martinez", date: "2023-05-01", status: "Processing", total: "$89.99" },
  { id: "#ORD-003", customer: "Olivia Taylor", date: "2023-04-30", status: "Completed", total: "$249.98" },
  { id: "#ORD-004", customer: "Jessica Williams", date: "2023-04-30", status: "Shipped", total: "$129.99" },
  { id: "#ORD-005", customer: "Amanda Davis", date: "2023-04-29", status: "Processing", total: "$179.99" },
];

const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Today is {new Date().toLocaleDateString()}
          </div>
        </div>
        
        <DashboardStats />
        
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="yearly">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="yearly" className="mt-2 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#ff9999" 
                      fill="#ffe6e6" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              
              {/* Other tabs would have similar content but different data */}
              <TabsContent value="daily" className="mt-2 h-80">
                <div className="flex h-full items-center justify-center text-gray-500">
                  Daily data not available
                </div>
              </TabsContent>
              <TabsContent value="weekly" className="mt-2 h-80">
                <div className="flex h-full items-center justify-center text-gray-500">
                  Weekly data not available
                </div>
              </TabsContent>
              <TabsContent value="monthly" className="mt-2 h-80">
                <div className="flex h-full items-center justify-center text-gray-500">
                  Monthly data not available
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-sm text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="text-sm">
                      <td className="py-3">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.date}</td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          order.status === "Completed" 
                            ? "bg-green-100 text-green-700" 
                            : order.status === "Shipped" 
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
