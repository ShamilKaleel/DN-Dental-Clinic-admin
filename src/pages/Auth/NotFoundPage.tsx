import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-full hover:opacity-50  transition"
      >
        Go back home
      </Link>
    </div>
  );
}
