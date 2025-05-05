
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProductFormProps {
  productId?: string;
  onCancel: () => void;
  onSave: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productId, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    imagePaths: [] as string[],
    colors: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // If productId is provided, fetch product data for editing
    if (productId) {
      setIsUpdating(true);
      fetchProductData();
    }
  }, [productId]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      
      if (error) {
        throw error;
      }
      
      // Transform data to match form structure
      setFormData({
        name: data.name,
        price: data.price.toString(),
        category: data.category || "",
        description: data.description || "",
        stock: data.stock.toString(),
        imagePaths: data.image_urls || [],
        colors: data.tags || [],
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product data");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Handle checkbox changes for colors
  const handleColorChange = (color: string) => {
    setFormData(prev => {
      const newColors = prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color];
      
      return {
        ...prev,
        colors: newColors
      };
    });
  };

  // Handle image upload
  const handleImagesUploaded = (paths: string[]) => {
    setFormData({
      ...formData,
      imagePaths: paths
    });
  };

  const handleSubmit = async () => {
    try {
      // Basic validation
      if (!formData.name || !formData.price || !formData.category) {
        toast.error("Please fill all required fields");
        return;
      }
      
      setLoading(true);
      
      // Prepare the data for Supabase
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        stock: parseInt(formData.stock) || 0,
        image_urls: formData.imagePaths,
        tags: formData.colors,
        is_active: true
      };
      
      let result;
      
      if (isUpdating) {
        // Update existing product
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', productId);
      } else {
        // Insert new product
        result = await supabase
          .from('products')
          .insert(productData);
      }
      
      if (result.error) {
        throw result.error;
      }
      
      toast.success(`Product ${isUpdating ? 'updated' : 'added'} successfully!`);
      onSave();
    } catch (error: any) {
      console.error(`Error ${isUpdating ? 'updating' : 'adding'} product:`, error);
      toast.error(`Failed to ${isUpdating ? 'update' : 'add'} product: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isUpdating) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 py-4 max-h-full">
      <div className="grid gap-2">
        <Label htmlFor="name">Product Name*</Label>
        <Input 
          id="name" 
          placeholder="Enter product name" 
          value={formData.name} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Price*</Label>
          <Input 
            id="price" 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
            value={formData.price} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category*</Label>
          <Input 
            id="category" 
            placeholder="Category" 
            value={formData.category} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <textarea 
          id="description"
          className="min-h-24 rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter product description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="grid gap-2">
        <Label>Product Images</Label>
        <ImageUpload 
          onImagesUploaded={handleImagesUploaded} 
          defaultImages={formData.imagePaths}
          multiple={true}
        />
      </div>
      <div className="grid gap-2">
        <Label>Colors</Label>
        <div className="flex flex-wrap gap-2">
          {["Black", "Brown", "Blonde", "Auburn", "Red"].map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox 
                id={`color-${color}`} 
                checked={formData.colors.includes(color)}
                onCheckedChange={() => handleColorChange(color)}
              />
              <Label htmlFor={`color-${color}`}>{color}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="stock">Stock</Label>
        <Input 
          id="stock" 
          type="number" 
          placeholder="0" 
          value={formData.stock} 
          onChange={handleInputChange} 
        />
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : (isUpdating ? 'Update Product' : 'Add Product')}
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
