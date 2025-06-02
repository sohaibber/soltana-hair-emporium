
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

// Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  length?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

type CartAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
};

// Calculate totals helper
const calculateTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ITEMS": {
      const totals = calculateTotals(action.payload);
      return {
        ...state,
        items: action.payload,
        ...totals,
      };
    }

    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.color === action.payload.color && item.length === action.payload.length
      );

      let newItems;
      if (existingItemIndex !== -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        newItems = [...state.items, action.payload];
      }

      const totals = calculateTotals(newItems);
      return { ...state, items: newItems, ...totals };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload.id);
      const totals = calculateTotals(newItems);
      return { ...state, items: newItems, ...totals };
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const totals = calculateTotals(newItems);
      return { ...state, items: newItems, ...totals };
    }

    case "CLEAR_CART": {
      return { ...state, items: [], totalItems: 0, totalPrice: 0 };
    }

    default:
      return state;
  }
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load cart items from database when user logs in
  const loadCartFromDatabase = async () => {
    if (!user?.id) return;

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error("Error loading cart:", error);
        return;
      }

      const cartItems: CartItem[] = data.map(item => ({
        id: `${item.product_id}-${item.color}-${item.length || ''}`,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        color: item.color,
        length: item.length,
        quantity: item.quantity,
      }));

      dispatch({ type: "SET_ITEMS", payload: cartItems });
    } catch (error) {
      console.error("Exception loading cart:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Save cart item to database
  const saveCartItemToDatabase = async (item: CartItem, productId: string) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.id,
          product_id: productId,
          name: item.name,
          price: item.price,
          image: item.image,
          color: item.color,
          length: item.length,
          quantity: item.quantity,
        }, {
          onConflict: 'user_id,product_id,color,length'
        });

      if (error) {
        console.error("Error saving cart item:", error);
      }
    } catch (error) {
      console.error("Exception saving cart item:", error);
    }
  };

  // Remove cart item from database
  const removeCartItemFromDatabase = async (productId: string, color: string, length?: string) => {
    if (!user?.id) return;

    try {
      let query = supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('color', color);

      if (length) {
        query = query.eq('length', length);
      } else {
        query = query.is('length', null);
      }

      const { error } = await query;

      if (error) {
        console.error("Error removing cart item:", error);
      }
    } catch (error) {
      console.error("Exception removing cart item:", error);
    }
  };

  // Clear all cart items from database
  const clearCartFromDatabase = async () => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error("Error clearing cart:", error);
      }
    } catch (error) {
      console.error("Exception clearing cart:", error);
    }
  };

  // Load cart when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCartFromDatabase();
    } else {
      // Clear cart when user logs out
      dispatch({ type: "CLEAR_CART" });
    }
  }, [isAuthenticated, user?.id]);

  // Context value
  const value: CartContextType = {
    ...state,
    addItem: (item) => {
      const quantity = item.quantity || 1;
      const cartItem = { ...item, quantity };
      
      dispatch({
        type: "ADD_ITEM",
        payload: cartItem,
      });

      // Save to database if user is authenticated
      if (isAuthenticated && user) {
        const productId = item.id.split('-')[0]; // Extract product ID from composite ID
        saveCartItemToDatabase(cartItem, productId);
      }

      toast.success(`Added ${item.name} to your cart`);
    },
    removeItem: (id) => {
      const item = state.items.find(i => i.id === id);
      
      dispatch({ type: "REMOVE_ITEM", payload: { id } });

      // Remove from database if user is authenticated
      if (isAuthenticated && user && item) {
        const productId = id.split('-')[0]; // Extract product ID from composite ID
        removeCartItemFromDatabase(productId, item.color, item.length);
      }

      toast.success("Item removed from cart");
    },
    updateQuantity: (id, quantity) => {
      const item = state.items.find(i => i.id === id);
      
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

      // Update in database if user is authenticated
      if (isAuthenticated && user && item) {
        const productId = id.split('-')[0]; // Extract product ID from composite ID
        const updatedItem = { ...item, quantity };
        saveCartItemToDatabase(updatedItem, productId);
      }
    },
    clearCart: () => {
      dispatch({ type: "CLEAR_CART" });

      // Clear from database if user is authenticated
      if (isAuthenticated && user) {
        clearCartFromDatabase();
      }

      toast.success("Cart has been cleared");
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
