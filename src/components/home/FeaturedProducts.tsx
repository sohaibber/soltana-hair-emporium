
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  rating?: number;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Helper function to get image URL
  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${path}`;
  };
  
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all hover-lift">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={getImageUrl(product.image)} 
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
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
          <h3 className="font-medium mb-1 text-gray-900 dark:text-white group-hover:text-primary transition-colors">{product.name}</h3>
          <div className="flex justify-between items-center">
            <div className="font-semibold text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>
            {product.rating && (
              <div className="text-xs text-amber-500">★ {product.rating}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (error) {
          console.error("Error fetching featured products:", error);
          return;
        }
        
        // Fetch real ratings for all products
        const productIds = data.map(p => p.id);
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
        const transformedProducts = data.map(product => {
          const productRatings = ratingsMap.get(product.id) || [];
          const averageRating = productRatings.length > 0 
            ? Math.round((productRatings.reduce((sum: number, rating: number) => sum + rating, 0) / productRatings.length) * 10) / 10
            : undefined;
          
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image_urls?.[0] || "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop",
            category: product.category || "Uncategorized",
            colors: product.tags as string[] || [],
            rating: averageRating,
            badge: product.sale_price ? "Sale" : undefined
          };
        });
        
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Exception loading featured products:", error);
        toast.error("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);

  // Fallback loading state
  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">{t('home.featuredProducts')}</h2>
            <Link 
              to="/shop" 
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              {t('product.viewAllProducts')} <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm animate-pulse">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">{t('home.featuredProducts')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t('product.noProducts')}</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
          >
            {t('product.viewAllProducts')} <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">{t('home.featuredProducts')}</h2>
          <Link 
            to="/shop" 
            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
          >
            {t('product.viewAllProducts')} <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
