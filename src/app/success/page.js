"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Success page after Stripe payment
 * 
 * This page is displayed after a successful Stripe payment.
 * It automatically refreshes the NextAuth session to ensure
 * the premium status updated by the webhook is immediately
 * reflected in the user's session.
 * 
 * Best Practice for Session Refresh:
 * - After backend updates (like webhook-driven premium status changes),
 *   use update() from useSession() to refresh the session token
 * - This avoids requiring users to sign out and back in
 * - The update() function triggers a session refetch from the server
 */
export default function SuccessPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Success page accessed");
    
    const refreshSession = async () => {
      try {
        console.log("Starting session refresh for authenticated user");
        
        // Force session refresh to pick up premium status from database
        // This is called after Stripe webhook has updated the database
        await update();
        
        console.log("Session refresh completed successfully");
        
        // Show success message briefly before redirecting
        setIsRefreshing(false);
        
        // Redirect to loadboard after showing success message
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Redirecting to loadboard");
        router.push("/loadboard");
      } catch (err) {
        console.error("Error refreshing session:", err);
        setError("Failed to refresh session. Please try signing out and back in.");
        setIsRefreshing(false);
      }
    };

    if (session) {
      refreshSession();
    } else if (session === null) {
      // User is not signed in - redirect to sign in page
      console.log("User not signed in on success page, redirecting to sign in");
      setError("Please sign in to view this page.");
      setIsRefreshing(false);
      setTimeout(() => {
        router.push("/api/auth/signin");
      }, 2000);
    }
    // session === undefined means loading, so we wait
  }, [session, update, router]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <div className="mb-6">
          {isRefreshing ? (
            <>
              <div className="text-6xl mb-4">⏳</div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Payment Successful!
              </h1>
              <p className="text-slate-300">
                Activating your premium access...
              </p>
            </>
          ) : error ? (
            <>
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Almost There
              </h1>
              <p className="text-slate-300 mb-4">{error}</p>
              <Link
                href="/loadboard"
                className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded transition"
              >
                Go to Load Board
              </Link>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">✅</div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to Premium!
              </h1>
              <p className="text-slate-300 mb-4">
                Your premium access is now active. Redirecting to load board...
              </p>
              <div className="animate-pulse text-slate-400">
                Please wait...
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
