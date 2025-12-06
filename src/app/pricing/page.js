// src/app/pricing/page.js
"use client";

import { useEffect, useState } from "react";

export default function PricingPage() {
  // Base Stripe checkout link - update this with your actual Stripe payment link
  const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/test_9B64gA2zcfhv3cX1R69Ve00";
  
  const [stripeLink, setStripeLink] = useState(STRIPE_CHECKOUT_URL);
  
  useEffect(() => {
    // Set success URL dynamically on client side to redirect to premium post-load page
    const successUrl = `${window.location.origin}/premium-post-load`;
    setStripeLink(`${STRIPE_CHECKOUT_URL}?success_url=${encodeURIComponent(successUrl)}`);
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Pricing</h1>
        
        <div className="bg-slate-700 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-center mb-2 text-white">Pro Plan</h2>
          <div className="text-center mb-4">
            <span className="text-5xl font-bold text-cyan-500">$49</span>
            <span className="text-xl text-gray-300">/month</span>
          </div>
          
          <ul className="space-y-3 mb-6 text-gray-200">
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">✓</span>
              <span>Full access to load board</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">✓</span>
              <span>Post unlimited loads</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">✓</span>
              <span>Real-time notifications</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">✓</span>
              <span>Priority support</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 mr-2">✓</span>
              <span>Advanced analytics</span>
            </li>
          </ul>
          
          <a
            href={stripeLink}
            className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded mb-4 font-semibold text-white transition block text-center"
          >
            Subscribe Now
          </a>
          
          <p className="text-center text-sm text-gray-400">
            Recurring monthly subscription • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
