import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';

export default function CartPage() {
  const { items, totals, removeFromCart, setQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (items.length === 0) return;

    createOrder({
      consumerEmail: user.email,
      consumerName: user.name || user.email,
      items,
      subtotal: totals.subtotal
    });

    alert('Order placed successfully!');
    clearCart();
    navigate('/consumer');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
            <p className="text-gray-600">{totals.count} items</p>
          </div>
          <Link to="/" className="text-indigo-700 hover:underline font-medium">
            Continue Shopping
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">${item.price} • {item.category}</p>
                    <p className="text-xs text-gray-500">Farmer: {item.farmerName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      className="w-16 border rounded px-2 py-1"
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.productId, Number(e.target.value))}
                    />
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2">
                <span>Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

