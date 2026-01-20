import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAdd = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-10 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-4xl font-extrabold mb-3">Fresh Products, Direct from Farmers</h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Explore seasonal produce, support local farms, and order in minutes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-white/15 px-3 py-1 rounded-full text-sm font-semibold">No middleman</span>
            <span className="bg-white/15 px-3 py-1 rounded-full text-sm font-semibold">Local & fresh</span>
            <span className="bg-white/15 px-3 py-1 rounded-full text-sm font-semibold">Easy checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              farmerName={product.farmerName}
              imageUrl={product.imageUrl}
              onAction={() => handleAdd(product)}
              actionLabel={user ? 'Add to Cart' : 'Login to Order'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

