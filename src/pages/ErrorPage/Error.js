import React from 'react';
import { Link } from 'react-router-dom';


const Error = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-500 mb-8">Oops! Looks like the page you're trying to access doesn't exist.</p>
        <Link to = '/' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go Home
        </Link>
      </div>
     
    );
};

export default Error;