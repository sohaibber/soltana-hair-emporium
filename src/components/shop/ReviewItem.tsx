
import React from "react";
import { Button } from "@/components/ui/button";
import { Star, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Review {
  id: string;
  rating: number;
  comment: string;
  image_url?: string;
  created_at: string;
  user_id: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
  };
}

interface ReviewItemProps {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
  isMockReview?: boolean;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ 
  review, 
  onEdit, 
  onDelete,
  isMockReview = false 
}) => {
  const { user } = useAuth();
  const isOwner = user?.id === review.user_id;

  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${path}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUserDisplayName = () => {
    if (isMockReview) {
      // For mock reviews, extract from the comment or use a default pattern
      if (review.comment.includes('Sophie')) return 'Sophie M.';
      if (review.comment.includes('Jennifer')) return 'Jennifer L.';
      if (review.comment.includes('Rachel')) return 'Rachel T.';
      return 'Verified Customer';
    }
    
    if (review.profiles?.first_name) {
      const lastName = review.profiles.last_name 
        ? ` ${review.profiles.last_name.charAt(0)}.` 
        : '';
      return `${review.profiles.first_name}${lastName}`;
    }
    
    return 'Anonymous User';
  };

  return (
    <div className="border-b pb-6 last:border-b-0 last:pb-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-medium">{getUserDisplayName()}</div>
          <div className="text-gray-500 text-sm">{formatDate(review.created_at)}</div>
        </div>
        
        {isOwner && !isMockReview && (
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(review)}
            >
              <Edit size={14} className="mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(review.id)}
            >
              <Trash2 size={14} className="mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex items-center mb-2">
        <div className="flex text-amber-500 mr-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              fill={star <= review.rating ? "currentColor" : "none"}
              stroke={star <= review.rating ? "currentColor" : "currentColor"}
            />
          ))}
        </div>
        {!isMockReview && (
          <div className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded border border-green-200">
            Verified Purchase
          </div>
        )}
      </div>
      
      <p className="text-gray-700 mb-3">{review.comment}</p>
      
      {review.image_url && (
        <img 
          src={getImageUrl(review.image_url)} 
          alt="Review image" 
          className="w-32 h-32 object-cover rounded-lg border"
        />
      )}
    </div>
  );
};

export default ReviewItem;
