import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-300 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Welcome to <span className="text-blue-500">AuthSystem</span>
      </h1>
      <p className="text-gray-700 text-lg mb-8 max-w-md">
        A secure authentication system built with Next.js and NextAuth.js
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="border border-blue-600 hover:border-blue-500 text-blue-900 hover:text-white px-6 py-3 rounded-lg transition-colors"
        >
          Create Account
        </Link>
      </div>
    </main>
  );
}