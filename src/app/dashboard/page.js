import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authSettings";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome, {session.user.name}!</h1>
          <p className="text-gray-600 mb-6">You're successfully logged in.</p>
          
          <div className="space-y-4">
            <Link 
              href="/loadboard"
              className="block w-full bg-cyan-500 hover:bg-cyan-600 text-white text-center font-semibold py-3 px-6 rounded transition"
            >
              Go to Load Board
            </Link>
            
            <Link 
              href="/pricing"
              className="block w-full bg-slate-200 hover:bg-slate-300 text-slate-900 text-center font-semibold py-3 px-6 rounded transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
