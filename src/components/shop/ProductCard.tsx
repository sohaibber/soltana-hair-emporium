
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export interface ProductType {
  id: number;
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
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, this would dispatch to your cart state
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all hover-lift">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              {product.badge}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">${product.price.toFixed(2)}</div>
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
