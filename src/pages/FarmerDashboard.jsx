export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-green-700 mb-4">My Products</h2>
            <p className="text-gray-600 mb-4">Manage and view your farm products</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">View Products</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-green-700 mb-4">Orders</h2>
            <p className="text-gray-600 mb-4">Track orders from consumers</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">View Orders</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-green-700 mb-4">Sales</h2>
            <p className="text-gray-600 mb-4">Monitor your sales and earnings</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">View Sales</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-green-700 mb-4">Add Product</h2>
            <p className="text-gray-600 mb-4">List a new product for sale</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Product</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-green-700 mb-4">Profile</h2>
            <p className="text-gray-600 mb-4">Update your profile information</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Edit Profile</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-green-700 mb-4">Messages</h2>
            <p className="text-gray-600 mb-4">Communicate with consumers</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">View Messages</button>
          </div>
        </div>
      </div>
    </div>
  )
}
