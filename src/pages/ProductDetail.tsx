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
import ReviewForm from "@/components/shop/ReviewForm";
import ReviewItem from "@/components/shop/ReviewItem";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext"; // <-- Add this import for translations
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Mock reviews data to ensure products aren't empty
const mockReviews = [
  {
    id: 'mock-1',
    user_id: 'mock-user-1',
    product_id: 'mock-product',
    rating: 5,
    comment: "These extensions blend perfectly with my hair! I'm so impressed with the quality and how natural they look. Will definitely purchase again.",
    created_at: '2023-03-15T10:00:00Z',
    updated_at: '2023-03-15T10:00:00Z',
    image_url: null,
    isMock: true,
    profiles: {
      first_name: 'Sophie',
      last_name: 'M.'
    }
  },
  {
    id: 'mock-2',
    user_id: 'mock-user-2',
    product_id: 'mock-product',
    rating: 4,
    comment: "Great quality hair, very soft and easy to style. The clips are secure and comfortable. I removed one star because the color was slightly different than expected, but still looks good.",
    created_at: '2023-02-02T15:30:00Z',
    updated_at: '2023-02-02T15:30:00Z',
    image_url: null,
    isMock: true,
    profiles: {
      first_name: 'Jennifer',
      last_name: 'L.'
    }
  },
  {
    id: 'mock-3',
    user_id: 'mock-user-3',
    product_id: 'mock-product',
    rating: 5,
    comment: "Absolutely love these extensions! They match my hair perfectly and add so much volume. I've received so many compliments!",
    created_at: '2023-01-10T09:15:00Z',
    updated_at: '2023-01-10T09:15:00Z',
    image_url: null,
    isMock: true,
    profiles: {
      first_name: 'Rachel',
      last_name: 'T.'
    }
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
  category: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  // Helper wrapper to avoid displaying "product.price" key on UI
  const safeT = (key: string, fallback: string) => {
    const result = t(key);
    return result && result !== key ? result : fallback;
  };

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [userReview, setUserReview] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  
  // Helper function to get image URL
  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${path}`;
  };
  
  // Enhanced review fetching with better debugging
  const fetchReviews = async () => {
    if (!id) {
      console.log("❌ No product ID available for fetching reviews");
      return;
    }
    
    console.log("🔄 Starting to fetch reviews for product:", id);
    console.log("👤 Current user:", user?.id || 'Not authenticated');
    setReviewsLoading(true);
    
    try {
      // Step 1: Test database connection
      console.log("🔌 Testing database connection...");
      const { data: testData, error: testError } = await supabase
        .from('reviews')
        .select('count', { count: 'exact', head: true });
      
      console.log("📊 Total reviews in database:", testData);
      if (testError) {
        console.error("❌ Database connection test failed:", testError);
      }

      // Step 2: Fetch reviews for this specific product
      console.log("🔍 Fetching reviews for product ID:", id);
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', id)
        .order('created_at', { ascending: false });

      console.log("📊 Raw reviews from database:", reviewsData);
      console.log("❌ Reviews error:", reviewsError);

      if (reviewsError) {
        console.error("Database error fetching reviews:", reviewsError);
        setReviews(mockReviews);
        setUserReview(null);
        return;
      }

      let processedReviews = [];
      
      // Step 3: If we have reviews, get the profile information
      if (reviewsData && reviewsData.length > 0) {
        console.log("👥 Found", reviewsData.length, "reviews, fetching user profiles...");
        
        const userIds = [...new Set(reviewsData.map(review => review.user_id))];
        console.log("👥 Unique user IDs to fetch:", userIds);
        
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', userIds);

        console.log("👤 Profiles data:", profilesData);
        if (profilesError) {
          console.error("❌ Profiles error:", profilesError);
        }

        // Step 4: Combine reviews with profile data
        processedReviews = reviewsData.map(review => {
          const profile = profilesData?.find(p => p.id === review.user_id);
          console.log(`👤 Processing review ${review.id} for user ${review.user_id}:`, profile);
          
          return {
            ...review,
            isMock: false,
            profiles: profile ? {
              first_name: profile.first_name || 'Anonymous',
              last_name: profile.last_name || 'User'
            } : {
              first_name: 'Anonymous',
              last_name: 'User'
            }
          };
        });
      } else {
        console.log("📭 No reviews found in database for this product");
      }

      console.log("✅ Processed real reviews:", processedReviews);

      // Step 5: Combine with mock reviews and update state
      const allReviews = [...processedReviews, ...mockReviews];
      console.log("🎯 Final reviews array (", allReviews.length, "total):", allReviews);
      
      setReviews(allReviews);

      // Step 6: Check for current user's review
      if (user && processedReviews.length > 0) {
        const currentUserReview = processedReviews.find(review => review.user_id === user.id);
        console.log("🔍 Current user review:", currentUserReview);
        setUserReview(currentUserReview || null);
      } else {
        setUserReview(null);
        console.log("🔍 No current user review found");
      }

    } catch (error) {
      console.error("💥 Exception in fetchReviews:", error);
      setReviews(mockReviews);
      setUserReview(null);
    } finally {
      setReviewsLoading(false);
      console.log("✅ Review fetching completed");
    }
  };
  
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
        
        // Process images
        const productImages = data.image_urls || [];
        const formattedImages = productImages.length > 0 
          ? productImages 
          : ["https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=500&auto=format&fit=crop"];
        
        // Transform the data
        const productData: ProductData = {
          id: String(data.id),
          name: data.name,
          price: Number(data.price),
          description: data.description || "No description available",
          category: data.category || "Uncategorized",
          colors: data.tags as string[] || [],
          lengths: standardLengths,
          images: formattedImages,
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

  // Fetch reviews when product loads, user changes, or refresh key changes
  useEffect(() => {
    if (product) {
      console.log("🚀 Product loaded, fetching reviews... (refresh key:", refreshKey, ")");
      fetchReviews();
    }
  }, [product, user?.id, refreshKey]);
  
  const handleReviewSuccess = () => {
    console.log("🎉 Review submitted successfully, triggering refresh...");
    setShowReviewForm(false);
    setEditingReview(null);
    
    // Force immediate refresh with a new key
    setRefreshKey(prev => prev + 1);
    
    // Additional refresh after delay to ensure database consistency
    setTimeout(() => {
      console.log("🔄 Delayed refresh after review submission");
      setRefreshKey(prev => prev + 1);
    }, 2000);
  };
  
  const handleEditReview = (review: any) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };
  
  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);
      
      if (error) {
        console.error("Error deleting review:", error);
        toast.error("Failed to delete review");
        return;
      }
      
      toast.success("Review deleted successfully");
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error("Exception deleting review:", error);
      toast.error("Failed to delete review");
    }
  };
  
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
          <h1 className="text-2xl font-bold mb-4">{t('product.notFound') || "Product Not Found"}</h1>
          <p className="mb-6">{t('product.notFoundDesc') || "The product you're looking for doesn't exist or has been removed."}</p>
          <Button onClick={() => navigate('/shop')}>{t('product.viewAllProducts')}</Button>
        </div>
      </Layout>
    );
  }
  
  const inWishlist = product ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
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
    if (!product) return;
    
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
        {/* Product Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <Carousel className="w-full mb-4">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={getImageUrl(image)}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-6" />
              <CarouselNext className="-right-4 md:-right-6" />
            </Carousel>
            
            {product.images.length > 1 && (
              <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`w-20 h-20 border rounded-md overflow-hidden cursor-pointer ${
                      activeImageIndex === index ? 'border-primary border-2' : ''
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img
                      src={getImageUrl(image)}
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
            <div className="text-2xl font-semibold mb-4">
              {safeT("product.price", "Price")} ${product.price.toFixed(2)}
            </div>
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
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({reviews.length} {safeT('product.reviews', safeT('product.rating', 'Reviews'))})
              </span>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">{safeT("product.color", "Color")}</h3>
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
              <h3 className="font-medium mb-2">{safeT("product.length", "Length")}</h3>
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
              <h3 className="font-medium mb-2">{safeT("product.quantity", "Quantity")}</h3>
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
                <ShoppingCart className="mr-2" size={16} />{t("shop.addToCart")}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full ${inWishlist ? "text-red-500" : ''}`}
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
                {safeT("product.inStock", "In Stock & Ready to Ship")}
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Check size={16} className="mr-2 text-green-500" />
                {safeT("product.freeShipping", "Free Shipping on Orders Over $100")}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check size={16} className="mr-2 text-green-500" />
                {safeT("product.returns", "30-Day Returns")}
              </div>
            </div>
          </div>
        </div>
        {/* ... carousel, thumbnails, and grid layout ... */}

        {/* Product details tabs */}
        <div className="mb-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-6 justify-start">
              <TabsTrigger value="details">{safeT("product.detailsTab", "Product Details")}</TabsTrigger>
              <TabsTrigger value="specifications">{safeT("product.specificationsTab", "Specifications")}</TabsTrigger>
              <TabsTrigger value="reviews">
                {safeT("product.reviewsTab", "Reviews")} ({reviews.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="details"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="prose max-w-none">
                <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">
                  {safeT("product.aboutThisProduct", "About this Product")}
                </h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  {product.description}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  {product.details?.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent
              value="specifications"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">
                {safeT("product.specificationsTab", "Specifications")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications?.map((spec, index) => (
                  <div
                    key={index}
                    className="flex border-b border-gray-200 dark:border-gray-600 pb-2"
                  >
                    <div className="font-medium w-1/3 text-gray-900 dark:text-white">
                      {spec.name}
                    </div>
                    <div className="w-2/3 text-gray-700 dark:text-gray-300">{spec.value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent
              value="reviews"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {safeT("product.customerReviews", "Customer Reviews")}
                </h3>
                {isAuthenticated && !userReview && !showReviewForm && (
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    {safeT("product.writeReview", "Write a Review")}
                  </Button>
                )}
              </div>

              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {safeT("product.loginToReview", "Please")}&nbsp;
                    <button
                      onClick={() => navigate('/login')}
                      className="text-soltana-dark dark:text-primary hover:underline"
                    >
                      {safeT("nav.login", "Login")}
                    </button>&nbsp;
                    {safeT("product.toWriteReview", "to write a review.")}
                  </p>
                </div>
              )}

              {showReviewForm && (
                <div className="mb-6">
                  <ReviewForm
                    productId={product.id}
                    existingReview={editingReview}
                    onSuccess={handleReviewSuccess}
                    onCancel={() => {
                      setShowReviewForm(false);
                      setEditingReview(null);
                    }}
                  />
                </div>
              )}

              <div className="space-y-6">
                {reviewsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {safeT("product.loadingReviews", "Loading reviews...")}
                    </p>
                  </div>
                ) : reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <ReviewItem
                      key={`${review.id}-${refreshKey}-${index}`}
                      review={review}
                      onEdit={handleEditReview}
                      onDelete={handleDeleteReview}
                      isMockReview={review.isMock}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    {safeT("product.noReviews", "No reviews yet. Be the first to review this product!")}
                  </p>
                )}
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
