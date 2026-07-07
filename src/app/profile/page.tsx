import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "../../components/SignoutButton";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4">
              {session.user?.name?.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-bold text-white">{session.user?.name}</h1>
            <p className="text-gray-400">{session.user?.email}</p>
          </div>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-3 border-b border-gray-700">
              <span className="text-gray-400">Full Name</span>
              <span className="text-white">{session.user?.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-700">
              <span className="text-gray-400">Email</span>
              <span className="text-white">{session.user?.email}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-700">
              <span className="text-gray-400">Account Status</span>
              <span className="text-green-400 font-medium">Active ✓</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Back to Dashboard
            </Link>
            <SignOutButton />
          </div>
        </div>
      </div>
    </main>
  );
}