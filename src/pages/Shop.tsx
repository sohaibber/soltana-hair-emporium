
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

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const { addItem } = useCart();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [gridView, setGridView] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Load products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true);
        
        if (error) {
          console.error("Error fetching products:", error);
          toast.error("Failed to load products");
          return;
        }
        
        // Transform the data to match our frontend model
        const transformedProducts = data.map(product => ({
          id: String(product.id),
          name: product.name,
          price: Number(product.price),
          image: product.image_urls?.[0] || "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop",
          category: product.category || "Uncategorized",
          colors: product.tags as string[] || [],
          rating: 4.5, // Default rating since we don't have this in DB yet
          badge: product.sale_price ? "Sale" : undefined
        }));
        
        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);
      } catch (error) {
        console.error("Exception loading products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif font-semibold text-2xl md:text-3xl">
            Shop Hair Extensions
          </h1>
          
          <div className="flex space-x-2">
            {/* Mobile Filter Button */}
            <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter size={16} className="mr-1" /> Filter
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filter Products</DrawerTitle>
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
                    Apply Filters
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            
            {/* Grid/List View Toggle */}
            <div className="flex rounded-md overflow-hidden border">
              <button
                className={`p-2 ${gridView ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setGridView(true)}
                aria-label="Grid view"
              >
                <Grid2X2 size={16} />
              </button>
              <button
                className={`p-2 ${!gridView ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setGridView(false)}
                aria-label="List view"
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
              <h3 className="font-medium mb-4">Filters</h3>
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
                <h3 className="font-medium text-lg mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : gridView ? (
              // Grid view
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} showAddToCart />
                ))}
              </div>
            ) : (
              // List view
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="flex bg-white border border-gray-100 rounded-lg overflow-hidden">
                    <div className="w-1/3">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-2/3 p-4">
                      <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <div className="mb-2 font-semibold">${product.price.toFixed(2)}</div>
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="mt-2 text-sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart size={14} className="mr-1" /> Add to Cart
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
