import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Access denied</h1>
      <p className="text-gray-600 mb-6">
        You don’t have permission to view this page. Please log in with the correct role.
      </p>
      <div className="flex gap-3">
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Login
        </Link>
        <Link
          to="/"
          className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-50 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

