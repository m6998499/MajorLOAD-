"use client";
import Link from "next/link";
import NavBar from "@/components/NavBar"; // Ensure this path matches your structure

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <NavBar />
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-8">Upgrade to Premium</h1>
        
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-700 text-center">
          <h2 className="text-2xl font-bold mb-4">Pro Access</h2>
          <p className="text-slate-400 mb-6">Get unlimited access to load details and premium filters.</p>
          <div className="text-5xl font-bold mb-8">$20<span className="text-lg text-slate-500">/mo</span></div>
          
          {/* THE BUTTON WITH YOUR STRIPE LINK */}
          <a 
            href="https://buy.stripe.com/00w6oIb5I8T7fZJdzO9Ve01" 
            className="block w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-lg transition"
          >
            Subscribe Now
          </a>
          
          <p className="text-xs text-slate-500 mt-4">Secure payment via Stripe</p>
        </div>
      </div>
    </div>
  );
}
