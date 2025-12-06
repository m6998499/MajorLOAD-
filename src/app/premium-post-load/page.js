import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authSettings";
import { checkPremium } from "../../actions/checkPremium";
import { redirect } from "next/navigation";
import PremiumPostLoadForm from "../../components/PremiumPostLoadForm";

export default async function PremiumPostLoadPage() {
  // 1. Get the session
  const session = await getServerSession(authOptions);

  // 2. Secure the page: If not logged in, redirect to login
  if (!session) {
    redirect("/api/auth/signin");
  }

  // 3. Check Database: Is this user Premium?
  const isPremium = await checkPremium(session.user.email);

  // 4. If not premium, redirect to pricing page
  if (!isPremium) {
    redirect("/pricing");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Premium Badge */}
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-1 rounded-lg mb-6">
          <div className="bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  Premium Load Posting
                </h2>
                <p className="text-sm text-gray-300 mt-1">
                  Welcome, {session.user.name || session.user.email}! Post your high-value loads here.
                </p>
              </div>
              <div className="bg-emerald-500 px-4 py-2 rounded-full text-sm font-bold">
                PREMIUM
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-slate-800 p-8 rounded-lg shadow-2xl border border-slate-700">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Post a Premium Load
          </h1>
          
          <PremiumPostLoadForm userEmail={session.user.email} />
        </div>

        {/* Premium Features Info */}
        <div className="mt-6 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
          <h3 className="font-bold text-lg mb-3 text-emerald-400">Premium Posting Benefits:</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>Priority placement in load board</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>Extended load details and custom fields</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>Instant notifications to premium carriers</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">✓</span>
              <span>Advanced analytics on your posted loads</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
