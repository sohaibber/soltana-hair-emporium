
import React from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../shop/ProductCard";
import { Button } from "@/components/ui/button";

interface ProductRecommendationsProps {
  currentProductId: number;
  title?: string;
}

// Mock products - in a real app, this would come from an API
const mockProducts: ProductType[] = [
  {
    id: 1,
    name: "Premium Clip-in Hair Extensions",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop",
    category: "Clip-ins",
    colors: ["Blonde", "Brown", "Black"],
    rating: 4.8,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Seamless Tape-in Extensions",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=500&auto=format&fit=crop",
    category: "Tape-ins",
    colors: ["Light Brown", "Dark Brown", "Black"],
    rating: 4.9,
  },
  {
    id: 3,
    name: "Luxury Ponytail Extension",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1595515538772-5d9f4ea38e8d?q=80&w=500&auto=format&fit=crop",
    category: "Ponytails",
    colors: ["Blonde", "Brown", "Black", "Auburn"],
    rating: 4.7,
    badge: "New",
  },
  {
    id: 4,
    name: "Full Volume Halo Extensions",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1626954079673-dc3d04c7f938?q=80&w=500&auto=format&fit=crop",
    category: "Halo",
    colors: ["Blonde", "Brown", "Black"],
    rating: 4.9,
  },
  {
    id: 5,
    name: "Brazilian Wavy Clip-ins",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=500&auto=format&fit=crop",
    category: "Clip-ins",
    colors: ["Dark Brown", "Black"],
    rating: 4.6,
  },
];

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ 
  currentProductId, 
  title = "You may also like"
}) => {
  // Filter out the current product and select up to 4 products to show
  const recommendations = mockProducts
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  return (
    <div className="py-8 mb-8 border-t">
      <h2 className="font-serif text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="group">
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
              <div className="p-3">
                <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                <h3 className="font-medium text-sm mb-1 truncate group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="font-semibold">${product.price.toFixed(2)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button variant="outline" asChild>
          <Link to="/shop">View More Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductRecommendations;
