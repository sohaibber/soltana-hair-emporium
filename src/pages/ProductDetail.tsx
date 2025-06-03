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
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [userReview, setUserReview] = useState<any>(null);
  
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
  
  // Fetch reviews for the product - Now with proper database relationship
  const fetchReviews = async () => {
    if (!id) return;
    
    console.log("Fetching reviews for product:", id);
    
    try {
      // Fetch reviews with profile information using the proper join
      const { data: reviewsData, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `)
        .eq('product_id', id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching reviews:", error);
        // Just show mock reviews if there's an error
        setReviews(mockReviews);
        return;
      }
      
      console.log("Reviews data from database:", reviewsData);
      
      // Combine real reviews with mock reviews for demonstration
      const allReviews = [...(reviewsData || []), ...mockReviews];
      console.log("All reviews combined:", allReviews);
      setReviews(allReviews);
      
      // Check if current user has reviewed this product
      if (user && reviewsData) {
        const currentUserReview = reviewsData.find(review => review.user_id === user.id);
        setUserReview(currentUserReview || null);
      }
    } catch (error) {
      console.error("Exception fetching reviews:", error);
      // Fallback to mock reviews
      setReviews(mockReviews);
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
        
        // Fetch reviews after product is loaded
        await fetchReviews();
      } catch (error) {
        console.error("Exception loading product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate, user]);
  
  // Refresh reviews when user logs in/out
  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [user?.id, id]);
  
  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    setEditingReview(null);
    fetchReviews();
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
      fetchReviews();
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
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/shop')}>Browse All Products</Button>
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
                ({reviews.length} reviews)
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
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
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
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">Customer Reviews</h3>
                
                {isAuthenticated && !userReview && !showReviewForm && (
                  <Button 
                    onClick={() => setShowReviewForm(true)}
                    className="bg-soltana-dark hover:bg-black"
                  >
                    Write a Review
                  </Button>
                )}
              </div>
              
              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Please <button 
                      onClick={() => navigate('/login')} 
                      className="text-soltana-dark hover:underline"
                    >
                      log in
                    </button> to write a review.
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
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewItem
                      key={review.id}
                      review={review}
                      onEdit={handleEditReview}
                      onDelete={handleDeleteReview}
                      isMockReview={review.isMock}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No reviews yet. Be the first to review this product!
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
