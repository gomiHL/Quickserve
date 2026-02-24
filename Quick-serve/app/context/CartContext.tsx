import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

    const addToCart = (product: any) => {
        setCart((prev) => {
              const existing = prev.find((item) => item.id === product.id);
                    if (existing) {
                            return prev.map((item) =>
                                      item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
                                              );
                                                    }
                                                          return [...prev, { ...product, qty: 1 }];
                                                              });
                                                                };

                                                                  const removeFromCart = (productId: string) => {
                                                                      setCart((prev) => prev.filter((item) => item.id !== productId));
                                                                        };

                                                                          const clearCart = () => setCart([]);

                                                                            const cartCount = cart.reduce((total, item) => total + (item.qty || 1), 0);

                                                                              // حساب المجموع مع تنظيف النص من الحروف (مثل DH)
                                                                                const totalPrice = cart.reduce((total, item) => {
                                                                                    const priceStr = String(item.price).replace(/[^\d]/g, '');
                                                                                        const priceNum = parseInt(priceStr) || 0;
                                                                                            return total + (priceNum * (item.qty || 1));
                                                                                              }, 0);

                                                                                                return (
                                                                                                    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, totalPrice }}>
                                                                                                          {children}
                                                                                                              </CartContext.Provider>
                                                                                                                );
                                                                                                                }

                                                                                                                export const useCart = () => useContext(CartContext);