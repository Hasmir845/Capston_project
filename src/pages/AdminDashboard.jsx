export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-purple-700">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Farmers</h3>
            <p className="text-3xl font-bold text-green-700">456</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Consumers</h3>
            <p className="text-3xl font-bold text-blue-700">778</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-orange-700">892</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Manage Users</h2>
            <p className="text-gray-600 mb-4">View, edit, or delete user accounts</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Manage Users</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Manage Products</h2>
            <p className="text-gray-600 mb-4">Review and manage all products</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Manage Products</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Manage Orders</h2>
            <p className="text-gray-600 mb-4">Monitor and track all orders</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Manage Orders</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Reports</h2>
            <p className="text-gray-600 mb-4">View analytics and platform reports</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Reports</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Settings</h2>
            <p className="text-gray-600 mb-4">Configure platform settings</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Settings</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Support</h2>
            <p className="text-gray-600 mb-4">View user feedback and support tickets</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Support</button>
          </div>
        </div>
      </div>
    </div>
  )
}
