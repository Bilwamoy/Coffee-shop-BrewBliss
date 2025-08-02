"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  customizations: Record<string, any>;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

interface CartContextType extends CartState {
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.product.id
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
          totalPrice: updatedItems[existingItemIndex].totalPrice + action.payload.totalPrice
        };
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalAmount: state.totalAmount + action.payload.totalPrice
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, action.payload],
          totalItems: state.totalItems + action.payload.quantity,
          totalAmount: state.totalAmount + action.payload.totalPrice
        };
      }
      
    case "REMOVE_FROM_CART":
      const itemToRemove = state.items.find(item => item.product.id === action.payload);
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalAmount: state.totalAmount - itemToRemove.totalPrice
      };
      
    case "UPDATE_QUANTITY":
      const itemToUpdate = state.items.find(item => item.product.id === action.payload.productId);
      if (!itemToUpdate) return state;
      
      const quantityDifference = action.payload.quantity - itemToUpdate.quantity;
      const priceDifference = 
        (itemToUpdate.product.price * quantityDifference) + 
        Object.values(itemToUpdate.customizations).reduce(
          (sum, option) => sum + (option.price * quantityDifference), 0
        );
      
      return {
        ...state,
        items: state.items.map(item => 
          item.product.id === action.payload.productId
            ? {
                ...item,
                quantity: action.payload.quantity,
                totalPrice: item.product.price * action.payload.quantity +
                  Object.values(item.customizations).reduce(
                    (sum, option) => sum + (option.price * action.payload.quantity), 0
                  )
              }
            : item
        ),
        totalItems: state.totalItems + quantityDifference,
        totalAmount: state.totalAmount + priceDifference
      };
      
    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0
      };
      
    case "SET_CART":
      return action.payload;
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalAmount: 0
  });

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "SET_CART", payload: parsedCart });
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
