import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkPremium } from "@/actions/checkPremium";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoadBoardPage() {
  // 1. Get the session
  const session = await getServerSession(authOptions);

  // 2. Secure the page: If not logged in, redirect to login
  if (!session) {
    redirect("/api/auth/signin");
  }

  // 3. Check Database: Is this user Premium?
  const isPremium = await checkPremium(session.user.email);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* --- HERO BANNER --- */}
      <div className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Load Board</h1>
            <p className="text-slate-400">Find the best freight for your truck.</p>
          </div>
          
          <Link 
            href="/post-load" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg"
          >
            + Post a Load
          </Link>
        </div>
      </div>
      {/* ------------------- */}

      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome Message */}
        <div className="mb-6">
          <p className="text-slate-600">
            Welcome back, <span className="font-semibold text-slate-900">{session.user.name}</span>
          </p>
        </div>

        {/* Premium vs Free Logic */}
        {isPremium ? (
          // IF PREMIUM: Show Green Box
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-8">
            <h3 className="font-bold text-green-800">✅ Premium Access Active</h3>
            <p className="text-green-700 text-sm">You are viewing all premium high-paying loads.</p>
          </div>
        ) : (
          // IF FREE: Show Upgrade Box
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-yellow-800 text-lg">Unlock Premium Loads</h3>
              <p className="text-yellow-700 text-sm">Upgrade to see rates and exclusive shipper contacts.</p>
            </div>
            <Link href="/pricing" className="whitespace-nowrap bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition">
              Upgrade Now
            </Link>
          </div>
        )}

        {/* Placeholder for Data */}
        <div className="bg-white rounded-lg shadow p-8 text-center text-slate-400">
          (Load List Component will appear here)
        </div>
      </div>
    </div>
  );
}
