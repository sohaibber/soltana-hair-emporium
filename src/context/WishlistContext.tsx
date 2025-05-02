
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "sonner";
import { ProductType } from "@/components/shop/ProductCard";

// Types
interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "CLEAR_WISHLIST" };

interface WishlistContextType extends WishlistState {
  addItem: (item: WishlistItem) => void;
  removeItem: (id: number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean;
}

// Initial state
const initialState: WishlistState = {
  items: [],
  totalItems: 0,
};

// Load wishlist from localStorage
const loadWishlist = (): WishlistState => {
  if (typeof window === "undefined") return initialState;
  
  try {
    const savedWishlist = localStorage.getItem("soltanaWishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : initialState;
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error);
    return initialState;
  }
};

// Save wishlist to localStorage
const saveWishlist = (wishlist: WishlistState) => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem("soltanaWishlist", JSON.stringify(wishlist));
  } catch (error) {
    console.error("Error saving wishlist to localStorage:", error);
  }
};

// Wishlist reducer
const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return state; // Item already exists in wishlist
      }

      const newItems = [...state.items, action.payload];
      
      const newState = {
        items: newItems,
        totalItems: newItems.length,
      };

      saveWishlist(newState);
      return newState;
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload.id);
      
      const newState = {
        items: newItems,
        totalItems: newItems.length,
      };

      saveWishlist(newState);
      return newState;
    }

    case "CLEAR_WISHLIST": {
      saveWishlist(initialState);
      return initialState;
    }

    default:
      return state;
  }
};

// Create context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Provider component
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState, loadWishlist);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = loadWishlist();
    if (savedWishlist.items.length > 0) {
      dispatch({ type: "CLEAR_WISHLIST" });
      savedWishlist.items.forEach(item => {
        dispatch({ type: "ADD_ITEM", payload: item });
      });
    }
  }, []);

  // Context value
  const value: WishlistContextType = {
    ...state,
    addItem: (item) => {
      dispatch({
        type: "ADD_ITEM",
        payload: item,
      });
      toast.success(`Added ${item.name} to your wishlist`);
    },
    removeItem: (id) => {
      dispatch({ type: "REMOVE_ITEM", payload: { id } });
      toast.success("Item removed from wishlist");
    },
    clearWishlist: () => {
      dispatch({ type: "CLEAR_WISHLIST" });
      toast.success("Wishlist has been cleared");
    },
    isInWishlist: (id) => {
      return state.items.some(item => item.id === id);
    }
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
