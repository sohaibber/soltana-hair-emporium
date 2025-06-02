
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Trash2, ArrowRight, User } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Wishlist: React.FC = () => {
  const { items, totalItems, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      color: "Default",
      quantity: 1
    });
  };
  
  // Helper function to get image URL
  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `https://gxwlahrzmkaydynbipie.supabase.co/storage/v1/object/public/product-images/${path}`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-6">
          Your Wishlist
        </h1>

        {!isAuthenticated ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="font-serif text-xl font-medium mb-2">Login to save your favorites</h2>
            <p className="text-gray-600 mb-6">
              Create an account or login to save items to your wishlist and access them from any device.
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="font-serif text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Save your favorite items to come back to them later.
            </p>
            <Button asChild>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your wishlist</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearWishlist} 
                className="text-gray-600"
              >
                <Trash2 size={14} className="mr-1" /> Clear Wishlist
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-all">
                  <div className="flex h-full flex-col">
                    <Link to={`/product/${item.id}`} className="group">
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.name} 
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                      <Link to={`/product/${item.id}`} className="group-hover:text-primary">
                        <h3 className="font-medium mb-2">{item.name}</h3>
                      </Link>
                      <div className="font-semibold mb-4">${item.price.toFixed(2)}</div>
                      <div className="mt-auto flex space-x-2">
                        <Button 
                          onClick={() => handleAddToCart(item)}
                          className="flex-1"
                          variant="outline"
                        >
                          <ShoppingCart size={14} className="mr-1" /> Add to Cart
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/shop"
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <ArrowRight size={14} className="mr-1 rotate-180" /> Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
