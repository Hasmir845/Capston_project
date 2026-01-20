import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function ConsumerDashboard() {
  const { products } = useProducts();
  const { addToCart, totals } = useCart();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const s = search.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesSearch =
        !s ||
        p.name?.toLowerCase().includes(s) ||
        p.farmerName?.toLowerCase().includes(s) ||
        p.category?.toLowerCase().includes(s);
      const matchesCategory = category === 'all' || p.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sort === 'priceAsc') list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sort === 'priceDesc') list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sort === 'nameAsc') list = [...list].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    if (sort === 'newest') list = [...list].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    return list;
  }, [products, search, category, sort]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {user?.name || 'Consumer'}
              </h1>
              <p className="text-gray-600">Browse products and add them to your cart.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/consumer/orders"
                className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                My Orders
              </Link>
              <Link
                to="/cart"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Cart {totals.count > 0 ? `(${totals.count})` : ''}
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, farmers, categories..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            >
              <option value="newest">Newest</option>
              <option value="priceAsc">Price: Low → High</option>
              <option value="priceDesc">Price: High → Low</option>
              <option value="nameAsc">Name: A → Z</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              farmerName={product.farmerName}
              imageUrl={product.imageUrl}
              onAction={() => addToCart(product, 1)}
              actionLabel="Add to Cart"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

