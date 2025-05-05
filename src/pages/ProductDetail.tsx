import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Share2, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import ProductRecommendations from "@/components/shop/ProductRecommendations";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Default values for product reviews
const defaultReviews = [
  {
    id: 1,
    user: "Sophie M.",
    rating: 5,
    date: "March 15, 2023",
    comment: "These extensions blend perfectly with my hair! I'm so impressed with the quality and how natural they look. Will definitely purchase again.",
    verified: true,
  },
  {
    id: 2,
    user: "Jennifer L.",
    rating: 4,
    date: "February 2, 2023",
    comment: "Great quality hair, very soft and easy to style. The clips are secure and comfortable. I removed one star because the color was slightly different than expected, but still looks good.",
    verified: true,
  },
  {
    id: 3,
    user: "Rachel T.",
    rating: 5,
    date: "January 10, 2023",
    comment: "Absolutely love these extensions! They match my hair perfectly and add so much volume. I've received so many compliments!",
    verified: true,
  },
];

// Standard lengths for hair extensions
const standardLengths = ["14\"", "16\"", "18\"", "20\"", "22\""];

interface ProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  details?: string[];
  specifications?: { name: string; value: string }[];
  colors: string[];
  lengths: string[];
  images: string[];
  reviews: typeof defaultReviews;
  category: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  
  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error("Error fetching product:", error);
          toast.error("Product not found");
          navigate('/shop');
          return;
        }
        
        // Transform the data
        const productData: ProductData = {
          id: data.id,
          name: data.name,
          price: Number(data.price),
          description: data.description || "No description available",
          category: data.category || "Uncategorized",
          colors: data.tags as string[] || [],
          lengths: standardLengths,
          images: data.image_urls || ["https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop"],
          reviews: defaultReviews,
          details: [
            "100% Remy human hair",
            "Double weft for extra volume",
            "Silicone-lined clips for secure attachment",
            "Can be washed, styled, and heat-treated",
            "Reusable with proper care",
          ],
          specifications: [
            { name: "Material", value: "100% Remy human hair" },
            { name: "Weight", value: "120g - 160g (varies by length)" },
            { name: "Application Method", value: data.category || "Clip-in" },
            { name: "Reusable", value: "Yes" },
            { name: "Heat Styling", value: "Up to 180°C (365°F)" },
          ]
        };
        
        setProduct(productData);
        
        // Set default selected values
        if (productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
        
        if (productData.lengths.length > 0) {
          setSelectedLength(productData.lengths[0]);
        }
      } catch (error) {
        console.error("Exception loading product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="animate-pulse bg-gray-200 aspect-square rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 bg-gray-200 rounded w-16"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="flex space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-8 bg-gray-200 rounded w-16"></div>
                  ))}
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // If product not found
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/shop')}>Browse All Products</Button>
        </div>
      </Layout>
    );
  }
  
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.images[0],
      color: selectedColor,
      length: selectedLength,
      quantity: quantity
    });
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            {product.images.length > 1 && (
              <div className="flex mt-4 space-x-2">
                {product.images.map((image, index) => (
                  <div key={index} className="w-20 h-20 border rounded-md overflow-hidden cursor-pointer">
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-2">{product.name}</h1>
            <div className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</div>
            <div className="flex items-center mb-4">
              <div className="flex text-amber-500 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews.length} reviews)
              </span>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        selectedColor === color
                          ? "border-soltana-dark bg-soltana-dark text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Length Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Length</h3>
              <div className="flex flex-wrap gap-2">
                {product.lengths.map((length) => (
                  <button
                    key={length}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedLength === length
                        ? "border-soltana-dark bg-soltana-dark text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedLength(length)}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center border rounded-md w-fit">
                <button
                  className="px-3 py-2"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border-l border-r">{quantity}</span>
                <button
                  className="px-3 py-2"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex space-x-2 mb-6">
              <Button 
                onClick={handleAddToCart}
                className="flex-grow bg-soltana-dark text-white hover:bg-black"
              >
                <ShoppingCart className="mr-2" size={16} /> Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full ${inWishlist ? 'text-red-500' : ''}`}
                onClick={handleWishlistToggle}
              >
                <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 size={16} />
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="border-t pt-4">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Check size={16} className="mr-2 text-green-500" />
                In Stock & Ready to Ship
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Check size={16} className="mr-2 text-green-500" />
                Free Shipping on Orders Over $100
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check size={16} className="mr-2 text-green-500" />
                30-Day Returns
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mb-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-6 justify-start">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="bg-white p-6 rounded-lg border">
              <div className="prose max-w-none">
                <h3 className="text-xl font-medium mb-4">About this Product</h3>
                <p className="mb-4">{product.description}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {product.details?.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="flex border-b pb-2">
                    <div className="font-medium w-1/3">{spec.name}</div>
                    <div className="w-2/3">{spec.value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-medium mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.user}</div>
                      <div className="text-gray-500 text-sm">{review.date}</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={star <= review.rating ? "currentColor" : "none"}
                            stroke={star <= review.rating ? "none" : "currentColor"}
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      {review.verified && (
                        <div className="ml-2 px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded border border-green-200">
                          Verified Purchase
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Product Recommendations */}
        <ProductRecommendations currentProductId={product.id} />
      </div>
    </Layout>
  );
};

export default ProductDetail;
