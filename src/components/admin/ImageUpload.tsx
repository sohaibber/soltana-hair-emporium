import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageUploaded: (path: string) => void;
  defaultImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, defaultImage }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  
  // Helper function to get image preview URL
  const getImagePreview = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    } 
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${path}`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    
    // Show preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    try {
      setUploading(true);
      
      // Generate a unique file name to avoid collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);
      
      if (error) {
        throw error;
      }
      
      // Pass the file path back to parent component
      onImageUploaded(fileName);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(`Error uploading image: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageUploaded('');
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative w-full h-48 rounded-md overflow-hidden border">
          <img 
            src={getImagePreview(preview)} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          <Button 
            size="icon"
            variant="destructive" 
            className="absolute top-2 right-2 rounded-full" 
            onClick={clearImage}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-gray-500 bg-gray-50 h-48">
          <Image className="mb-2" size={40} />
          <p className="text-sm mb-2">Drag a file here or click to upload</p>
          <p className="text-xs text-gray-400">PNG, JPG or WEBP (max 5MB)</p>
        </div>
      )}
      
      <div>
        <input
          type="file"
          id="product-image"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <label htmlFor="product-image">
          <Button 
            variant="outline" 
            className="w-full"
            type="button"
            disabled={uploading}
            asChild
          >
            <span>
              <Upload size={16} className="mr-2" /> 
              {uploading ? 'Uploading...' : 'Upload Image'}
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
