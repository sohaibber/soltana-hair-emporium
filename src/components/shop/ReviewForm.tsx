
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReviewFormProps {
  productId: string;
  existingReview?: {
    id: string;
    rating: number;
    comment: string;
    image_url?: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  existingReview,
  onSuccess,
  onCancel,
}) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [imageUrl, setImageUrl] = useState(existingReview?.image_url || "");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `review-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    try {
      setUploading(true);
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (error) {
        toast.error(`Error uploading image: ${error.message}`);
        return;
      }

      setImageUrl(fileName);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(`Error uploading image: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageUrl("");
  };

  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${path}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setSubmitting(true);
      
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) {
        toast.error("You must be logged in to write a review");
        return;
      }

      const reviewData = {
        user_id: user.id,
        product_id: productId,
        rating,
        comment: comment.trim(),
        image_url: imageUrl || null,
      };

      let error;
      
      if (existingReview) {
        // Update existing review
        const { error: updateError } = await supabase
          .from('reviews')
          .update({
            rating,
            comment: comment.trim(),
            image_url: imageUrl || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingReview.id);
        
        error = updateError;
      } else {
        // Check if user already has a review for this product
        const { data: existingReviews, error: checkError } = await supabase
          .from('reviews')
          .select('id')
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (checkError) {
          console.error("Error checking existing reviews:", checkError);
          toast.error("Failed to check existing reviews");
          return;
        }

        if (existingReviews && existingReviews.length > 0) {
          toast.error("You have already reviewed this product. You can edit your existing review instead.");
          return;
        }

        // Create new review
        const { error: insertError } = await supabase
          .from('reviews')
          .insert(reviewData);
        
        error = insertError;
      }

      if (error) {
        console.error("Error saving review:", error);
        if (error.code === '23505') {
          toast.error("You have already reviewed this product. Please edit your existing review instead.");
        } else {
          toast.error("Failed to save review");
        }
        return;
      }

      toast.success(existingReview ? "Review updated successfully" : "Review added successfully");
      onSuccess();
    } catch (error) {
      console.error("Exception saving review:", error);
      toast.error("Failed to save review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-medium mb-4">
        {existingReview ? "Edit Your Review" : "Write a Review"}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-2xl transition-colors ${
                  star <= rating ? 'text-amber-400' : 'text-gray-300'
                } hover:text-amber-400`}
                onClick={() => setRating(star)}
              >
                <Star fill="currentColor" />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium mb-2">Comment</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Add Photo (Optional)</label>
          
          {imageUrl ? (
            <div className="relative inline-block">
              <img 
                src={getImageUrl(imageUrl)} 
                alt="Review image" 
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 rounded-full w-6 h-6"
                onClick={removeImage}
              >
                <X size={12} />
              </Button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                id="review-image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              <label htmlFor="review-image-upload">
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading}
                  asChild
                >
                  <span className="cursor-pointer">
                    <Upload size={16} className="mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Photo'}
                  </span>
                </Button>
              </label>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4">
          <Button 
            type="submit" 
            disabled={submitting || uploading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {submitting ? 'Saving...' : existingReview ? 'Update Review' : 'Submit Review'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
