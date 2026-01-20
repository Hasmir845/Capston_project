export default function ProductCard({ name, price, category, farmerName, imageUrl, actionLabel = 'Order', onAction }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image Placeholder */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400">Product Image</span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          {category}
        </span>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{name}</h3>

        {/* Farmer Name */}
        <p className="text-sm text-gray-600 mb-3">
          By <span className="font-semibold">{farmerName}</span>
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">${price}</span>
        </div>

        {/* Action Button */}
        <button 
          onClick={onAction}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
