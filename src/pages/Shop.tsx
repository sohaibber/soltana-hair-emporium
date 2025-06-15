import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard, { ProductType } from "@/components/shop/ProductCard";
import ProductFilters from "@/components/shop/ProductFilters";
import { Button } from "@/components/ui/button";
import { Filter, Grid2X2, List, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const { addItem } = useCart();
  const { t } = useLanguage();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [gridView, setGridView] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // --- New: Add state for ratings map ---
  const [productRatings, setProductRatings] = useState<{[productId: string]: number}>({});

  // Load products and their real ratings
  useEffect(() => {
    const fetchProductsAndRatings = async () => {
      try {
        setLoading(true);
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true);

        if (productsError) {
          console.error("Error fetching products:", productsError);
          toast.error("Failed to load products");
          return;
        }

        // Transform the product data
        const transformedProducts = productsData.map(product => ({
          id: String(product.id),
          name: product.name,
          price: Number(product.price),
          image: product.image_urls?.[0] || "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop",
          category: product.category || "Uncategorized",
          colors: product.tags as string[] || [],
          // Remove fake/mock rating
          // rating: 4.5,
          badge: product.sale_price ? "Sale" : undefined
        }));

        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);

        // --- New: Fetch ratings from reviews table ---
        const productIds = productsData.map(p => p.id);
        if (productIds.length > 0) {
          const { data: reviews, error: reviewsError } = await supabase
            .from('reviews')
            .select('product_id, rating')
            .in('product_id', productIds);

          if (reviewsError) {
            console.error("Error fetching reviews:", reviewsError);
          } else if (reviews && reviews.length > 0) {
            // Calculate average ratings
            const ratingsAccumulator: Record<string, {total: number, count: number}> = {};
            for (const r of reviews) {
              if (!ratingsAccumulator[r.product_id]) {
                ratingsAccumulator[r.product_id] = { total: 0, count: 0 };
              }
              ratingsAccumulator[r.product_id].total += r.rating;
              ratingsAccumulator[r.product_id].count += 1;
            }
            const map: {[productId: string]: number} = {};
            Object.entries(ratingsAccumulator).forEach(([productId, stats]) => {
              map[productId] = Math.round((stats.total / stats.count) * 10)/10;
            });
            setProductRatings(map);
          }
        }
      } catch (error) {
        console.error("Exception loading products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndRatings();
  }, []);

  // Extract filter options from real data
  const allCategories = Array.from(new Set(products.map(product => product.category)));
  const allColors = Array.from(new Set(products.flatMap(product => product.colors || [])));
  const lengths = ["14 inches", "16 inches", "18 inches", "20 inches", "22 inches"];
  const maxPrice = Math.max(...products.map(product => product.price), 0);
  
  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory.replace(/-/g, " ")] : [],
    colors: [],
    lengths: [],
    priceRange: [0, maxPrice || 500] as [number, number],
  });

  // Update price range when maxPrice changes
  useEffect(() => {
    if (maxPrice > 0) {
      setFilters(prev => ({
        ...prev,
        priceRange: [prev.priceRange[0], maxPrice]
      }));
    }
  }, [maxPrice]);

  const handleAddToCart = (product: ProductType) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors?.[0] || "Default",
      quantity: 1
    });
  };

  // Apply filters
  useEffect(() => {
    setLoading(true);
    
    // Apply filters to products
    let result = [...products];
      
    // Filter by category
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    // Filter by color
    if (filters.colors.length > 0) {
      result = result.filter(product => 
        product.colors?.some(color => filters.colors.includes(color))
      );
    }
    
    // Filter by price
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    setFilteredProducts(result);
    setLoading(false);
  }, [filters, products]);

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const currentFilters = prev[filterType] as string[];
      return {
        ...prev,
        [filterType]: currentFilters.includes(value)
          ? currentFilters.filter(item => item !== value)
          : [...currentFilters, value]
      };
    });
  };

  const handlePriceChange = (values: [number, number]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: values
    }));
  };

  // --- Extract rating to attach to each product card ---
  const withRating = (product: ProductType) => {
    // get by numeric id (from DB) or string id
    const productId = typeof product.id === "number" ? product.id : String(product.id);
    const rating = productRatings[productId];
    return { ...product, rating };
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif font-semibold text-2xl md:text-3xl">
            {t("shop.title")}
          </h1>
          
          <div className="flex space-x-2">
            {/* Mobile Filter Button */}
            <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter size={16} className="mr-1" /> {t("shop.filter")}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{t("shop.filterProducts")}</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <ProductFilters
                    filters={{ categories: allCategories, colors: allColors, lengths }}
                    activeFilters={filters}
                    priceRange={filters.priceRange}
                    maxPrice={maxPrice}
                    onFilterChange={handleFilterChange}
                    onPriceChange={handlePriceChange}
                  />
                </div>
                <DrawerFooter>
                  <Button onClick={() => setIsFilterDrawerOpen(false)}>
                    {t("shop.applyFilters")}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            
            {/* Grid/List View Toggle */}
            <div className="flex rounded-md overflow-hidden border dark:border-gray-700">
              <button
                className={`p-2 ${
                  gridView 
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary' 
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200'
                } transition-colors`}
                onClick={() => setGridView(true)}
                aria-label={t("shop.gridView")}
              >
                <Grid2X2 size={16} />
              </button>
              <button
                className={`p-2 ${
                  !gridView 
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200'
                } transition-colors`}
                onClick={() => setGridView(false)}
                aria-label={t("shop.listView")}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <h3 className="font-medium mb-4">{t("shop.filters")}</h3>
              <ProductFilters
                filters={{ categories: allCategories, colors: allColors, lengths }}
                activeFilters={filters}
                priceRange={filters.priceRange}
                maxPrice={maxPrice}
                onFilterChange={handleFilterChange}
                onPriceChange={handlePriceChange}
              />
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="col-span-3">
            {loading ? (
              // Loading state
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm h-80 animate-pulse">
                    <div className="bg-gray-200 h-48 w-full"></div>
                    <div className="p-4">
                      <div className="bg-gray-200 h-4 w-1/3 rounded mb-2"></div>
                      <div className="bg-gray-200 h-6 w-3/4 rounded mb-4"></div>
                      <div className="bg-gray-200 h-4 w-1/5 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              // No results
              <div className="text-center py-12">
                <h3 className="font-medium text-lg mb-2">{t("shop.noProductsFound")}</h3>
                <p className="text-gray-600">{t("shop.tryAdjustingFilters")}</p>
              </div>
            ) : gridView ? (
              // Grid view: pass real rating
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={withRating(product)}
                    showAddToCart
                  />
                ))}
              </div>
            ) : (
              // List view with dark mode and image fix, pass real rating
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="w-1/3 h-full min-h-[110px] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                      <img
                        src={product.image.startsWith('http')
                          ? product.image
                          : `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${product.image}`
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
                        <h3 className="font-medium mb-2 text-gray-900 dark:text-white">{product.name}</h3>
                        <div className="mb-2 font-semibold text-gray-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </div>
                        {/* NEW: show rating if exists */}
                        {withRating(product).rating && (
                          <div className="text-xs text-amber-500">
                            ★ {withRating(product).rating}
                          </div>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="mt-2 text-sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart size={14} className="mr-1" /> {t("shop.addToCart")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
