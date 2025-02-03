import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black h-screen text-white px-6 py-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Welcome to Your Next Adventure
        </h1>
        <p className="text-xl mb-6">
          Discover amazing products, connect with other innovators, and be part of an exciting tech community.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login" 
            className="bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
