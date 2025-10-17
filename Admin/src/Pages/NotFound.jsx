import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ minHeight: '60vh' }} className="flex items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-sky-600">404</h1>
        <p className="mt-2 text-lg text-gray-700">Page not found</p>
        <p className="mt-1 text-sm text-gray-500">The page you are looking for doesn’t exist or has been moved.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block rounded-md bg-sky-600 px-5 py-2 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;



