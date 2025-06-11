"use client";
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';

const NavBar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="text-xl font-bold text-purple-600">
          Mystery Message
        </a>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-sm text-gray-700">
                Welcome, <span className="font-medium">{user.username || user.email}</span>
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/sign-in">
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
