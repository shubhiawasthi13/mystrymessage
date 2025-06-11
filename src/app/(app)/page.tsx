import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-purple-600">
          Send Anonymous Messages with Confidence
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl">
          Share secrets, express thoughts, or play pranks—your identity stays hidden. Messages are private and never linked back to you.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/sign-up"
            className="bg-blue-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md text-lg font-semibold"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-purple-600">Features</h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">Anonymous Messaging</h4>
              <p className="text-gray-600">
                Share your message without revealing who you are. Your identity is never stored.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">Private & Confidential</h4>
              <p className="text-gray-600">
                Messages are stored safely and can only be accessed with the unique link or code.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">Message Control</h4>
              <p className="text-gray-600">
                Set expiration dates, limit views, or lock messages with a passcode.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 p-6 text-center text-gray-500">
        &copy; 2025 Mystery Message. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
