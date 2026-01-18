export default function ConsumerHome() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Farmer to Consumer Platform</h2>
          <p className="text-gray-600 mb-6">Browse fresh products directly from local farmers</p>
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Browse Products</h3>
            <p className="text-gray-600 mb-4">Explore fresh products from local farmers</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Browse</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-700 mb-2">My Orders</h3>
            <p className="text-gray-600 mb-4">Track your orders and delivery status</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Orders</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-700 mb-2">My Cart</h3>
            <p className="text-gray-600 mb-4">Review and checkout your items</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Cart</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Favorites</h3>
            <p className="text-gray-600 mb-4">Save your favorite products and farmers</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Favorites</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Find Farmers</h3>
            <p className="text-gray-600 mb-4">Discover local farmers and their profiles</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Find Farmers</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-700 mb-2">My Profile</h3>
            <p className="text-gray-600 mb-4">Manage your account and preferences</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}
