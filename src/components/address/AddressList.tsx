
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import AddressForm from "./AddressForm";

interface Address {
  id: string;
  label: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
}

const AddressList: React.FC = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const loadAddresses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error('Error loading addresses:', error);
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [user]);

  const handleDelete = async (addressId: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const { error } = await supabase
        .from('user_addresses')
        .delete()
        .eq('id', addressId);

      if (error) throw error;
      toast.success("Address deleted successfully");
      loadAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error("Failed to delete address");
    }
  };

  const handleFormSuccess = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    loadAddresses();
  };

  const handleFormCancel = () => {
    setShowAddForm(false);
    setEditingAddress(null);
  };

  if (loading) {
    return <div className="py-4">Loading addresses...</div>;
  }

  if (showAddForm || editingAddress) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h3>
        </div>
        <AddressForm
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
          initialData={editingAddress ? {
            id: editingAddress.id,
            label: editingAddress.label,
            firstName: editingAddress.first_name,
            lastName: editingAddress.last_name,
            phone: editingAddress.phone,
            address: editingAddress.address,
            city: editingAddress.city,
            state: editingAddress.state,
            zipCode: editingAddress.zip_code,
            country: editingAddress.country,
            isDefault: editingAddress.is_default,
          } : undefined}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Saved Addresses</h3>
        <Button onClick={() => setShowAddForm(true)}>
          <MapPin className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-gray-50 p-6 text-center rounded">
          <p className="text-gray-600">You don't have any saved addresses yet.</p>
          <Button 
            className="mt-4" 
            variant="outline" 
            onClick={() => setShowAddForm(true)}
          >
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    {address.label}
                    {address.is_default && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingAddress(address)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(address.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium">
                    {address.first_name} {address.last_name}
                  </p>
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state} {address.zip_code}
                  </p>
                  <p>{address.country}</p>
                  <p>Phone: {address.phone}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressList;
