
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { supabase } from "@/integrations/supabase/client";

export interface ProductType {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors?: string[];
  rating?: number;
  badge?: string;
}

interface ProductCardProps {
  product: ProductType;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = false }) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add the product to cart with default color
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors?.[0] || "Default",
      quantity: 1
    });
  };
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  const inWishlist = isInWishlist(product.id);

  // Helper function to render image - handles both URL and storage path
  const getImageSrc = () => {
    if (product.image.startsWith('http')) {
      return product.image;
    } 
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${product.image}`;
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all hover-lift">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={getImageSrc()} 
            alt={product.name} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              {product.badge}
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className={`absolute top-2 left-2 rounded-full bg-white/70 hover:bg-white dark:bg-gray-900/60 dark:hover:bg-gray-900 ${
              inWishlist ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
          </Button>
        </div>
        <div className="p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
          <h3 className="font-medium mb-1 group-hover:text-primary transition-colors text-gray-900 dark:text-white">
            {product.name}
          </h3>
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>
            {product.rating && (
              <div className="text-xs text-amber-500">★ {product.rating}</div>
            )}
          </div>
          {showAddToCart && (
            <Button 
              size="sm"
              variant="outline" 
              className="w-full mt-2 text-sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={14} className="mr-1" /> Add to Cart
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
