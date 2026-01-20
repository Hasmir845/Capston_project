import { useState, useEffect } from 'react';
import { ProductContext } from './productContextDefinition';
import { apiDelete, apiGet, apiPost, apiPut } from '../lib/api';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from MongoDB API
  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet('/api/products');
        // Normalize Mongo _id to id for UI consistency
        const normalized = (data || []).map((p) => ({ ...p, id: p._id || p.id }));
        setProducts(normalized);
      } catch (e) {
        console.error('Failed to load products from database:', e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Add a new product
  const addProduct = async (productData) => {
    const saved = await apiPost('/api/products', productData);
    const normalized = { ...saved, id: saved._id || saved.id };
    setProducts((prev) => [normalized, ...prev]);
    return normalized;
  };

  // Update an existing product
  const updateProduct = async (productId, updatedData) => {
    const idStr = String(productId);
    const saved = await apiPut(`/api/products/${idStr}`, updatedData);
    const normalized = { ...saved, id: saved._id || saved.id };
    setProducts((prev) => prev.map((p) => (String(p.id) === idStr ? normalized : p)));
  };

  // Delete a product
  const deleteProduct = async (productId) => {
    const idStr = String(productId);
    await apiDelete(`/api/products/${idStr}`);
    setProducts((prev) => prev.filter((p) => String(p.id) !== idStr));
  };

  // Get products by farmer email
  const getProductsByFarmer = (farmerEmail) => {
    return products.filter((product) => product.farmerEmail === farmerEmail);
  };

  // Get product by ID
  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByFarmer,
    getProductById
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
