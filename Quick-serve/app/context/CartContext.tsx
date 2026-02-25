import React, { createContext, useContext, useState } from 'react';

// 1. تعريف شكل البيانات (يجب أن يتطابق مع ما نمرره في الأسفل)
interface CartContextType {
  cartItems: any[];     // تأكد من هذا الاسم
  cartCount: number;
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // 2. هنا نمرر القيم (يجب أن تطابق الـ Interface فوق)
  return (
    <CartContext.Provider value={{ 
      cartItems,       // تأكد أن الاسم هنا هو cartItems
      cartCount, 
      addToCart, 
      removeFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};