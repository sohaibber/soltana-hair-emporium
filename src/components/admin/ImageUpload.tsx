
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageUploadProps {
  onImagesUploaded: (paths: string[]) => void;
  defaultImages?: string[];
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImagesUploaded, 
  defaultImages = [], 
  multiple = false 
}) => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(defaultImages || []);
  
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
    
    const files = Array.from(e.target.files);
    if (!multiple && (images.length + files.length > 1)) {
      toast.error("Only one image can be uploaded");
      return;
    }
    
    try {
      setUploading(true);
      const uploadedPaths: string[] = [];
      
      for (const file of files) {
        // Generate a unique file name to avoid collisions
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        
        // Show preview immediately
        const objectUrl = URL.createObjectURL(file);
        
        // Upload the file to Supabase Storage
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);
        
        if (error) {
          toast.error(`Error uploading ${file.name}: ${error.message}`);
          continue;
        }
        
        uploadedPaths.push(fileName);
      }
      
      if (uploadedPaths.length > 0) {
        const newImages = multiple ? [...images, ...uploadedPaths] : uploadedPaths;
        setImages(newImages);
        onImagesUploaded(newImages);
        toast.success(`${uploadedPaths.length} image(s) uploaded successfully`);
      }
    } catch (error: any) {
      console.error('Error uploading images:', error);
      toast.error(`Error uploading images: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    onImagesUploaded(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative rounded-md overflow-hidden border aspect-square group">
            <img 
              src={getImagePreview(image)} 
              alt={`Preview ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <Button 
              size="icon"
              variant="destructive" 
              className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(index)}
            >
              <X size={16} />
            </Button>
          </div>
        ))}
        
        {multiple || images.length === 0 ? (
          <div 
            className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-gray-500 bg-gray-50 aspect-square cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => document.getElementById('product-image-upload')?.click()}
          >
            <Plus className="mb-2" size={24} />
            <p className="text-sm text-center">Add Image</p>
          </div>
        ) : null}
      </div>
      
      <div>
        <input
          type="file"
          id="product-image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          multiple={multiple}
        />
        <label htmlFor="product-image-upload">
          <Button 
            variant="outline" 
            className="w-full"
            type="button"
            disabled={uploading}
            asChild
          >
            <span>
              <Upload size={16} className="mr-2" /> 
              {uploading ? 'Uploading...' : multiple ? 'Upload Images' : 'Upload Image'}
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
