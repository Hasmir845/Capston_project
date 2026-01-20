import { useEffect, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';

const categories = ['Vegetables', 'Fruits', 'Dairy', 'Grains'];

export default function FarmerDashboard() {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, getProductsByFarmer } = useProducts();
  const { orders } = useOrders();
  const [form, setForm] = useState({ name: '', price: '', category: '', quantity: '', imageUrl: '', imageFile: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      setMyProducts(products.filter((p) => p.farmerEmail === user.email));
    }
  }, [products, user]);

  useEffect(() => {
    if (!user?.email) {
      setMyOrders([]);
      return;
    }
    const filtered = (orders || [])
      .map((order) => {
        const items = (order.items || []).filter((i) => i.farmerEmail === user.email);
        return items.length ? { ...order, items } : null;
      })
      .filter(Boolean);
    setMyOrders(filtered);
  }, [orders, user]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setForm({ ...form, imageFile: file });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category || !form.quantity) return;

    let imageUrl = form.imageUrl;

    // If user uploaded a file, convert to base64
    if (form.imageFile) {
      const reader = new FileReader();
      imageUrl = await new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(form.imageFile);
      });
    }

    const payload = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      quantity: Number(form.quantity),
      imageUrl: imageUrl || '',
      farmerName: user?.name || user?.email || 'Farmer',
      farmerEmail: user?.email || ''
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await addProduct(payload);
      }
      setForm({ name: '', price: '', category: '', quantity: '', imageUrl: '', imageFile: null });
      setImagePreview(null);
      setEditingId(null);
    } catch (err) {
      alert('Failed to save product. Please check your server/.env and MongoDB connection.');
      console.error(err);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: product.quantity ?? 0,
      imageUrl: product.imageUrl || '',
      imageFile: null
    });
    setImagePreview(product.imageUrl || null);
  };

  const handleDelete = (id) => deleteProduct(id);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Farmer Dashboard</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingId ? 'Update Product' : 'Add New Product'}
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Organic Tomatoes"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Quantity (units)</label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  key={editingId || 'new'} // Reset file input when editing changes
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                />
                <p className="text-xs text-gray-500">
                  Upload an image from your device (max 5MB). Or paste an image URL below.
                </p>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => {
                    setForm({ ...form, imageUrl: e.target.value });
                    if (e.target.value) setImagePreview(e.target.value);
                  }}
                  placeholder="Or paste image URL: https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 mb-2 font-semibold">Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="max-w-xs max-h-48 rounded-lg border border-gray-300 object-cover"
                      onError={() => setImagePreview(null)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                {editingId ? 'Save Changes' : 'Add Product'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ name: '', price: '', category: '', quantity: '', imageUrl: '', imageFile: null });
                    setImagePreview(null);
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders for My Products</h2>
          {myOrders.length === 0 ? (
            <p className="text-gray-600 text-center py-6">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {myOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        Consumer: {order.consumerName} ({order.consumerEmail})
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-3 py-2 text-sm font-semibold text-gray-700">Product</th>
                          <th className="px-3 py-2 text-sm font-semibold text-gray-700">Qty</th>
                          <th className="px-3 py-2 text-sm font-semibold text-gray-700">Price</th>
                          <th className="px-3 py-2 text-sm font-semibold text-gray-700">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item.productId} className="border-b">
                            <td className="px-3 py-2 text-sm text-gray-900">{item.name}</td>
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
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Products</h2>

          {myProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-700">Product Name</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Category</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Quantity</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900 font-medium">{product.name}</td>
                      <td className="px-4 py-3 text-gray-600">{product.category}</td>
                      <td className="px-4 py-3 text-gray-900 font-semibold">${product.price}</td>
                      <td className="px-4 py-3 text-gray-600">{product.quantity ?? 0} units</td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>
                        <span className="text-gray-400">|</span>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No products added yet. Add your first product above!</p>
          )}
        </div>
      </div>
    </div>
  );
}
