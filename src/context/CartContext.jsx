import { useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartContextDefinition';
import { useAuth } from '../hooks/useAuth';

function getStorageKey(email) {
  return email ? `cart:${email}` : 'cart:guest';
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const email = user?.email || null;

  const [items, setItems] = useState([]);

  // Load cart whenever user changes (supports per-user cart)
  useEffect(() => {
    const key = getStorageKey(email);
    const stored = localStorage.getItem(key);
    if (!stored) {
      setItems([]);
      return;
    }
    try {
      setItems(JSON.parse(stored) || []);
    } catch {
      localStorage.removeItem(key);
      setItems([]);
    }
  }, [email]);

  // Persist cart for current user
  useEffect(() => {
    const key = getStorageKey(email);
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, email]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.productId === product.id);
      if (existing) {
        return prev.map((x) =>
          x.productId === product.id ? { ...x, quantity: x.quantity + quantity } : x
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          farmerName: product.farmerName,
          farmerEmail: product.farmerEmail,
          category: product.category,
          imageUrl: product.imageUrl,
          quantity
        }
      ];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((x) => x.productId !== productId));
  };

  const setQuantity = (productId, quantity) => {
    const q = Number(quantity);
    if (!Number.isFinite(q)) return;
    if (q <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) => prev.map((x) => (x.productId === productId ? { ...x, quantity: q } : x)));
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { subtotal, count: items.reduce((sum, item) => sum + item.quantity, 0) };
  }, [items]);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, setQuantity, clearCart, totals }),
    [items, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

