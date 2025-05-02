
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBag, User, Heart, LogOut } from "lucide-react";

const Account: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: "/account" } }} />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-soltana-neutral/30 rounded-full flex items-center justify-center">
                  <User size={32} className="text-soltana-dark/80" />
                </div>
                <div>
                  <h2 className="font-medium">{user?.name}</h2>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <nav className="space-y-2">
                <Link 
                  to="/account" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <User size={18} />
                  <span>Account Details</span>
                </Link>
                <Link 
                  to="/orders" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <ShoppingBag size={18} />
                  <span>Orders</span>
                </Link>
                <Link 
                  to="/wishlist" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Heart size={18} />
                  <span>Wishlist</span>
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors w-full text-left text-red-600"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <Tabs defaultValue="details">
                <TabsList className="mb-6">
                  <TabsTrigger value="details">Account Details</TabsTrigger>
                  <TabsTrigger value="address">Addresses</TabsTrigger>
                  <TabsTrigger value="password">Change Password</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <h2 className="text-xl font-medium">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      <div className="font-medium">{user?.name}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email Address</label>
                      <div className="font-medium">{user?.email}</div>
                    </div>
                  </div>
                  
                  <div>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="address" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium">Saved Addresses</h2>
                    <Button variant="outline">Add New Address</Button>
                  </div>
                  
                  <div className="bg-gray-50 p-6 text-center rounded">
                    <p className="text-gray-600">You don't have any saved addresses yet.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="password" className="space-y-6">
                  <h2 className="text-xl font-medium">Change Password</h2>
                  
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">New Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Confirm new password"
                      />
                    </div>
                    
                    <Button>Update Password</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
