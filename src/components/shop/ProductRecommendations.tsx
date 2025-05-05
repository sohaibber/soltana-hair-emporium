
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface ProductRecommendationsProps {
  currentProductId: string | number;
  title?: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ 
  currentProductId, 
  title = "You may also like"
}) => {
  const [recommendations, setRecommendations] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        
        // Get the category of the current product
        const { data: currentProduct, error: currentProductError } = await supabase
          .from('products')
          .select('category')
          .eq('id', String(currentProductId))
          .single();
        
        if (currentProductError) {
          console.error("Error fetching current product:", currentProductError);
          return;
        }
        
        // Fetch products from the same category
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .eq('category', currentProduct.category)
          .neq('id', String(currentProductId))
          .limit(4);
        
        if (error) {
          console.error("Error fetching recommendations:", error);
          return;
        }
        
        // If we don't have enough products from the same category, get some random ones
        let recommendationData = data;
        if (data.length < 4) {
          const { data: randomProducts, error: randomError } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .neq('id', String(currentProductId))
            .limit(4 - data.length);
          
          if (!randomError && randomProducts) {
            recommendationData = [...data, ...randomProducts];
          }
        }
        
        // Transform the data to match our frontend model
        const transformedRecommendations = recommendationData.map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image_urls?.[0] || "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop",
          category: product.category || "Uncategorized",
          colors: product.tags as string[] || [],
          rating: 4.5, // Default rating since we don't have this in DB yet
          badge: product.sale_price ? "Sale" : undefined
        }));
        
        setRecommendations(transformedRecommendations.slice(0, 4)); // Ensure max 4 items
      } catch (error) {
        console.error("Exception loading recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (currentProductId) {
      fetchRecommendations();
    }
  }, [currentProductId]);

  if (loading) {
    return (
      <div className="py-8 mb-8 border-t">
        <h2 className="font-serif text-2xl font-semibold mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-3">
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show the section if no recommendations
  }

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
                <div className="font-semibold">${Number(product.price).toFixed(2)}</div>
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
