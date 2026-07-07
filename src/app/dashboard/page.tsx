import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { redirect } from "next/navigation";
import SignOutButton from "../../components/SignoutButton";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {session.user?.name}! 👋
        </h1>
        <p className="text-gray-400 mb-8">
          You are logged in as {session.user?.email}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-white font-bold mb-2">Profile</h3>
            <p className="text-gray-400 text-sm">View and edit your profile</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-white font-bold mb-2">Settings</h3>
            <p className="text-gray-400 text-sm">Manage your preferences</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-white font-bold mb-2">Activity</h3>
            <p className="text-gray-400 text-sm">View your recent activity</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href="/profile" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            View Profile
          </Link>
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}