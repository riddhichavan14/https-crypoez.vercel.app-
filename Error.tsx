import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl text-red-100 font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg text-yellow-400 mb-6 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
