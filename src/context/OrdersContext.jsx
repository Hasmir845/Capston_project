import { useEffect, useMemo, useState } from 'react';
import { OrdersContext } from './ordersContextDefinition';
import { apiGet, apiPost } from '../lib/api';

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const data = await apiGet('/api/orders');
      const normalized = (data || []).map((o) => ({ ...o, id: o._id || o.id }));
      setOrders(normalized);
    } catch (e) {
      console.warn('Orders API unavailable', e);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createOrder = async ({ consumerEmail, consumerName, items, subtotal }) => {
    const saved = await apiPost('/api/orders', { consumerEmail, consumerName, items, subtotal });
    const normalized = { ...saved, id: saved._id || saved.id };
    setOrders((prev) => [normalized, ...prev]);
    return normalized;
  };

  const value = useMemo(() => ({ orders, loading, refresh, createOrder }), [orders, loading]);

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

