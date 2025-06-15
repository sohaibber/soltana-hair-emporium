import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/context/LanguageContext";

interface ProductRecommendationsProps {
  currentProductId: string;
  title?: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ 
  currentProductId, 
  title
}) => {
  const [recommendations, setRecommendations] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const displayTitle = title || t('product.youMayLike');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        
        // Get the category of the current product
        const { data: currentProduct, error: currentProductError } = await supabase
          .from('products')
          .select('category')
          .eq('id', currentProductId)
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
          .neq('id', currentProductId)
          .limit(4);
        
        if (error) {
          console.error("Error fetching recommendations:", error);
          return;
        }
        
        let recommendationData = data || [];
        
        // If we don't have enough products from the same category, get some random ones
        if (recommendationData.length < 4) {
          const existingIds = recommendationData.map(p => p.id);
          
          const { data: randomProducts, error: randomError } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .not('id', 'in', `(${[currentProductId, ...existingIds].join(',')})`)
            .limit(4 - recommendationData.length);
          
          if (!randomError && randomProducts) {
            recommendationData = [...recommendationData, ...randomProducts];
          }
        }
        
        // Fetch real ratings for all products
        const productIds = recommendationData.map(p => p.id);
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('product_id, rating')
          .in('product_id', productIds);
        
        if (reviewsError) {
          console.error("Error fetching reviews:", reviewsError);
        }
        
        // Calculate average ratings for each product
        const ratingsMap = new Map();
        if (reviewsData) {
          reviewsData.forEach(review => {
            const productId = review.product_id;
            if (!ratingsMap.has(productId)) {
              ratingsMap.set(productId, []);
            }
            ratingsMap.get(productId).push(review.rating);
          });
        }
        
        // Transform the data to match our frontend model
        const transformedRecommendations = recommendationData.map(product => {
          const productRatings = ratingsMap.get(product.id) || [];
          const averageRating = productRatings.length > 0 
            ? Math.round((productRatings.reduce((sum: number, rating: number) => sum + rating, 0) / productRatings.length) * 10) / 10
            : undefined;
          
          return {
            id: String(product.id),
            name: product.name,
            price: Number(product.price),
            image: product.image_urls?.[0] || "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop",
            category: product.category || "Uncategorized",
            colors: product.tags as string[] || [],
            rating: averageRating,
            badge: product.sale_price ? "Sale" : undefined
          };
        });
        
        // Remove any potential duplicates and ensure max 4 items
        const uniqueRecommendations = transformedRecommendations.filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id)
        );
        
        setRecommendations(uniqueRecommendations.slice(0, 4));
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

  // Helper function to get image URL
  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${path}`;
  };

  if (loading) {
    return (
      <div className="py-8 mb-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="font-serif text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{displayTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm animate-pulse">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null; 
  }

  return (
    <div className="py-8 mb-8 border-t border-gray-200 dark:border-gray-800 bg-transparent">
      <h2 className="font-serif text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{displayTitle}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all hover-lift">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={getImageUrl(product.image)} 
                  alt={product.name} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                    {t('product.sale')}
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
                <h3 className="font-medium text-sm mb-1 truncate group-hover:text-primary transition-colors text-gray-900 dark:text-white">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>
                  {product.rating && (
                    <div className="text-xs text-amber-500">★ {product.rating}</div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button variant="outline" asChild>
          <Link to="/shop">{t('product.viewMore')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductRecommendations;
