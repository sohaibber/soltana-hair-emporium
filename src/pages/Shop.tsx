import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard, { ProductType } from "@/components/shop/ProductCard";
import ProductFilters from "@/components/shop/ProductFilters";
import { Button } from "@/components/ui/button";
import { Filter, Grid2X2, List, ShoppingCart } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";

// Mock product data - in a real app, this would come from an API
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
  {
    id: 6,
    name: "Keratin Bond Extensions",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=500&auto=format&fit=crop",
    category: "Keratin",
    colors: ["Blonde", "Brown", "Black"],
    rating: 4.8,
  },
  {
    id: 7,
    name: "Balayage Ombre Clip-ins",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?q=80&w=500&auto=format&fit=crop",
    category: "Clip-ins",
    colors: ["Balayage"],
    rating: 4.7,
    badge: "Popular",
  },
  {
    id: 8,
    name: "Human Hair Full Lace Wig",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1629747490241-8bce1298d221?q=80&w=500&auto=format&fit=crop",
    category: "Wigs",
    colors: ["Black", "Dark Brown"],
    rating: 4.9,
  },
];

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState<ProductType[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(mockProducts);
  const [gridView, setGridView] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Filters
  const allCategories = Array.from(new Set(mockProducts.map(product => product.category)));
  const allColors = Array.from(new Set(mockProducts.flatMap(product => product.colors || [])));
  const lengths = ["14 inches", "16 inches", "18 inches", "20 inches", "22 inches"];
  const maxPrice = Math.max(...mockProducts.map(product => product.price));
  
  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory.replace(/-/g, " ")] : [],
    colors: [],
    lengths: [],
    priceRange: [0, maxPrice] as [number, number],
  });

  // Apply filters
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let result = [...mockProducts];
      
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
    }, 300);
  }, [filters]);

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
