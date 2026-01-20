import { Link } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';

export default function ConsumerOrders() {
  const { orders } = useOrders();
  const { user } = useAuth();

  const myOrders = (orders || []).filter((o) => o.consumerEmail === user?.email);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600">Your recent orders and details.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/cart" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold">
              Go to Cart
            </Link>
            <Link to="/" className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition font-semibold">
              Shop More
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          {myOrders.length === 0 ? (
            <p className="text-gray-600">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {myOrders.map((order) => (
                <div key={order.id} className="border rounded-xl p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <p className="font-semibold text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-3 py-2 text-sm font-semibold text-gray-700">Product</th>
                          <th className="px-3 py-2 text-sm font-semibold text-gray-700">Farmer</th>
                          <th className="px-3 py-2 text-sm font-semibold text-gray-700">Qty</th>
                          <th className="px-3 py-2 text-sm font-semibold text-gray-700">Price</th>
                          <th className="px-3 py-2 text-sm font-semibold text-gray-700">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(order.items || []).map((item) => (
                          <tr key={item.productId} className="border-b">
                            <td className="px-3 py-2 text-sm text-gray-900">{item.name}</td>
                            <td className="px-3 py-2 text-sm text-gray-700">{item.farmerName}</td>
                            <td className="px-3 py-2 text-sm text-gray-700">{item.quantity}</td>
                            <td className="px-3 py-2 text-sm text-gray-700">${item.price}</td>
                            <td className="px-3 py-2 text-sm text-gray-900 font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end pt-3 text-gray-900 font-semibold">
                    Subtotal: ${Number(order.subtotal || 0).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

