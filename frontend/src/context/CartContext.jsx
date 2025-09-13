import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart (default quantity 1, increment if exists)
  const addToCart = (item) => {
    setCart((prev) => {
      // Find index by id or name
      const index = prev.findIndex(
        (cartItem) =>
          (item.id && cartItem.id === item.id) ||
          (!item.id && cartItem.name === item.name)
      );
      if (index !== -1) {
        // Item exists, increment quantity
        return prev.map((cartItem, i) =>
          i === index
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }
      // Item not in cart, add new
      return [
        ...prev,
        { ...item, quantity: item.quantity || 1 }
      ];
    });
  };

  // Remove item
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Update quantity for a cart item
  const updateQuantity = (index, quantity) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: quantity < 1 ? 1 : quantity } : item
      )
    );
  };

  // Calculate total price using quantity
  const getTotal = () => {
    return cart.reduce(
      (sum, item) => sum + (parseInt(item.price.replace("₹", "")) * (item.quantity || 1)),
      0
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}