
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBag, User, Heart, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  avatar_url: string | null;
}

const Account: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: "/account" } }} />;
  }

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error loading profile:', error);
          return;
        }
        
        setProfile(data);
        setFormData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
        });
      } catch (error) {
        console.error('Profile fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
        })
        .eq('id', user?.id);
        
      if (error) {
        toast.error("Failed to update profile");
        throw error;
      }
      
      // Update the profile state
      setProfile(prev => prev ? {
        ...prev,
        first_name: formData.firstName,
        last_name: formData.lastName,
      } : null);
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

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
                  <h2 className="font-medium">
                    {profile?.first_name} {profile?.last_name}
                  </h2>
                  <p className="text-sm text-gray-600">{profile?.email}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <nav className="space-y-2">
                <Link 
                  to="/account" 
                  className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 transition-colors"
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
                  onClick={() => logout()}
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
                  
                  {loading ? (
                    <div className="py-4 text-center">Loading profile information...</div>
                  ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          disabled
                        />
                        <p className="text-xs text-gray-500">Email cannot be updated</p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isUpdating}
                      >
                        {isUpdating ? "Updating..." : "Update Profile"}
                      </Button>
                    </form>
                  )}
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
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
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
