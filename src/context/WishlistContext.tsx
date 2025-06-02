
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

// Types
export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
}

type WishlistAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ITEMS"; payload: WishlistItem[] }
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "CLEAR_WISHLIST" };

interface WishlistContextType extends WishlistState {
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  totalItems: number;
}

// Initial state
const initialState: WishlistState = {
  items: [],
  loading: false,
};

// Wishlist reducer
const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ITEMS":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      // Check if the item already exists
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return state; // Don't add duplicates
      }
      
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    }

    case "CLEAR_WISHLIST": {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
};

// Create context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Provider component
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load wishlist items from database when user logs in
  const loadWishlistFromDatabase = async () => {
    if (!user?.id) return;

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error("Error loading wishlist:", error);
        return;
      }

      const wishlistItems: WishlistItem[] = data.map(item => ({
        id: item.product_id,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        category: item.category,
      }));

      dispatch({ type: "SET_ITEMS", payload: wishlistItems });
    } catch (error) {
      console.error("Exception loading wishlist:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Save wishlist item to database
  const saveWishlistItemToDatabase = async (item: WishlistItem) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .upsert({
          user_id: user.id,
          product_id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
        }, {
          onConflict: 'user_id,product_id'
        });

      if (error) {
        console.error("Error saving wishlist item:", error);
      }
    } catch (error) {
      console.error("Exception saving wishlist item:", error);
    }
  };

  // Remove wishlist item from database
  const removeWishlistItemFromDatabase = async (productId: string) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) {
        console.error("Error removing wishlist item:", error);
      }
    } catch (error) {
      console.error("Exception removing wishlist item:", error);
    }
  };

  // Clear all wishlist items from database
  const clearWishlistFromDatabase = async () => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error("Error clearing wishlist:", error);
      }
    } catch (error) {
      console.error("Exception clearing wishlist:", error);
    }
  };

  // Load wishlist when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      loadWishlistFromDatabase();
    } else {
      // Clear wishlist when user logs out
      dispatch({ type: "CLEAR_WISHLIST" });
    }
  }, [isAuthenticated, user?.id]);

  // Context value
  const value: WishlistContextType = {
    ...state,
    totalItems: state.items.length,
    addItem: (item) => {
      dispatch({ type: "ADD_ITEM", payload: item });

      // Save to database if user is authenticated
      if (isAuthenticated && user) {
        saveWishlistItemToDatabase(item);
      }

      toast.success(`Added ${item.name} to your wishlist`);
    },
    removeItem: (id) => {
      dispatch({ type: "REMOVE_ITEM", payload: { id } });

      // Remove from database if user is authenticated
      if (isAuthenticated && user) {
        removeWishlistItemFromDatabase(id);
      }

      toast.success("Item removed from wishlist");
    },
    clearWishlist: () => {
      dispatch({ type: "CLEAR_WISHLIST" });

      // Clear from database if user is authenticated
      if (isAuthenticated && user) {
        clearWishlistFromDatabase();
      }

      toast.success("Wishlist has been cleared");
    },
    isInWishlist: (id) => {
      return state.items.some(item => item.id === id);
    },
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

// Custom hook
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
