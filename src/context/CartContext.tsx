
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "sonner";

// Types
export interface CartItem {
  id: number;
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
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Load cart from localStorage
const loadCart = (): CartState => {
  if (typeof window === "undefined") return initialState;
  
  try {
    const savedCart = localStorage.getItem("soltanaCart");
    return savedCart ? JSON.parse(savedCart) : initialState;
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return initialState;
  }
};

// Save cart to localStorage
const saveCart = (cart: CartState) => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem("soltanaCart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.color === action.payload.color && item.length === action.payload.length
      );

      let newItems;

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // New item
        newItems = [...state.items, action.payload];
      }

      const newState = {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };

      saveCart(newState);
      return newState;
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload.id);
      
      const newState = {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };

      saveCart(newState);
      return newState;
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const newState = {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };

      saveCart(newState);
      return newState;
    }

    case "CLEAR_CART": {
      saveCart(initialState);
      return initialState;
    }

    default:
      return state;
  }
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadCart);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = loadCart();
    if (savedCart.items.length > 0) {
      dispatch({ type: "CLEAR_CART" });
      savedCart.items.forEach(item => {
        dispatch({ type: "ADD_ITEM", payload: item });
      });
    }
  }, []);

  // Context value
  const value: CartContextType = {
    ...state,
    addItem: (item) => {
      const quantity = item.quantity || 1;
      dispatch({
        type: "ADD_ITEM",
        payload: { ...item, quantity },
      });
      toast.success(`Added ${item.name} to your cart`);
    },
    removeItem: (id) => {
      dispatch({ type: "REMOVE_ITEM", payload: { id } });
      toast.success("Item removed from cart");
    },
    updateQuantity: (id, quantity) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    },
    clearCart: () => {
      dispatch({ type: "CLEAR_CART" });
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
