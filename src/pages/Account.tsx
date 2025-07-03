
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import UserSidebar from "@/components/user/UserSidebar";
import AddressList from "@/components/address/AddressList";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  avatar_url: string | null;
}

const Account: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  
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
        toast.error(t("account.updateFailed"));
        throw error;
      }
      
      // Update the profile state
      setProfile(prev => prev ? {
        ...prev,
        first_name: formData.firstName,
        last_name: formData.lastName,
      } : null);
      
      toast.success(t("account.updateSuccess"));
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: "/account" } }} />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <UserSidebar activePath="account" />
          </div>
          
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <Tabs defaultValue="details">
                <TabsList className="mb-6">
                  <TabsTrigger value="details">{t("account.details")}</TabsTrigger>
                  <TabsTrigger value="address">{t("account.address")}</TabsTrigger>
                  <TabsTrigger value="password">{t("account.password")}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <h2 className="text-xl font-medium">{t("account.personalInfo")}</h2>
                  
                  {loading ? (
                    <div className="py-4 text-center">{t("account.loading")}</div>
                  ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">{t("account.firstName")}</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">{t("account.lastName")}</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("account.emailAddress")}</Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          disabled
                        />
                        <p className="text-xs text-gray-500">{t("account.emailCannotUpdate")}</p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isUpdating}
                      >
                        {isUpdating ? t("account.updating") : t("account.updateProfile")}
                      </Button>
                    </form>
                  )}
                </TabsContent>
                
                <TabsContent value="address" className="space-y-6">
                  <AddressList />
                </TabsContent>
                
                <TabsContent value="password" className="space-y-6">
                  <h2 className="text-xl font-medium">{t("account.password")}</h2>
                  
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">{t("account.currentPassword")}</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        placeholder={t("account.currentPasswordPlaceholder")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">{t("account.newPassword")}</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder={t("account.newPasswordPlaceholder")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">{t("account.confirmPassword")}</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder={t("account.confirmPasswordPlaceholder")}
                      />
                    </div>
                    
                    <Button>{t("account.updatePassword")}</Button>
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
