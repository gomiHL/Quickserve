import React, { createContext, useContext, useState } from 'react';

// 1. تعريف شكل البيانات (Types)
interface CartContextType {
  items: any[];         
  cartCount: number;
  addToCart: (item: any) => void;
  removeFromCart: (id: string | number) => void; // مسح منتج نهائياً
  updateQuantity: (id: string | number, action: 'plus' | 'minus') => void; // التحكم في الكمية
  clearCart: () => void;
  getTotalPrice: () => number; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([]);

  // إضافة منتج للسلة
  const addToCart = (product: any) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      
      if (existing) {
        return prev.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + (product.quantity || 1) } 
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  // دالة التحكم في الكمية (زيادة أو نقصان)
  const updateQuantity = (id: string | number, action: 'plus' | 'minus') => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const currentQty = item.quantity || 1;
          const newQty = action === 'plus' ? currentQty + 1 : currentQty - 1;
          
          // نضمن أن الكمية لا تقل عن 1
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  // حذف منتج واحد نهائياً من السلة
  const removeFromCart = (id: string | number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // مسح السلة كاملة بعد نجاح الطلب
  const clearCart = () => setItems([]);

  // حساب عدد العناصر الإجمالي (اللي كيبان في Badge السلة)
  const cartCount = items.reduce((total, item) => total + (item.quantity || 0), 0);

  // حساب مجموع ثمن المنتجات الأساسي (بدون رسوم إضافية)
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0; 
      const qty = item.quantity || 1;
      return total + (price * qty);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      items,       
      cartCount, 
      addToCart, 
      removeFromCart, 
      updateQuantity, // ضفنا الدالة هنا
      clearCart,
      getTotalPrice 
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