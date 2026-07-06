'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignOutButton from "../components/SignoutButton";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-blue-500 font-bold text-xl">
          AuthSystem
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          {session ? (
            // Logged in navigation
            <>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                Profile
              </Link>
              <span className="text-gray-400 text-sm">
                {session.user?.name}
              </span>
              <SignOutButton />
            </>
          ) : (
            // Logged out navigation
            <>
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}