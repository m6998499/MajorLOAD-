"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    equipment: "",
    origin: "",
    destination: "",
    minRate: "",
    maxMiles: "",
  });

  // Sort
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // Check premium status and fetch loads
    const checkAndFetchLoads = async () => {
      try {
        // Check if user is premium (you'll need to implement this check)
        const response = await fetch("/api/loads?premium=true");
        
        if (!response.ok) {
          throw new Error("Failed to fetch loads");
        }

        const data = await response.json();
        setLoads(data);
        setIsPremium(true);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching loads:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    checkAndFetchLoads();
  }, []);

  // Filter and sort loads
  const filteredAndSortedLoads = loads
    .filter((load) => {
      if (filters.equipment && !load.equipment?.toLowerCase().includes(filters.equipment.toLowerCase())) return false;
      if (filters.origin && !load.origin?.city?.toLowerCase().includes(filters.origin.toLowerCase())) return false;
      if (filters.destination && !load.destination?.city?.toLowerCase().includes(filters.destination.toLowerCase())) return false;
      if (filters.minRate && load.price < parseFloat(filters.minRate)) return false;
      if (filters.maxMiles && load.distance > parseFloat(filters.maxMiles)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "highest-rate") return b.price - a.price;
      if (sortBy === "shortest-distance") return a.distance - b.distance;
      return new Date(b.postedTime) - new Date(a.postedTime); // newest
    });

  const avgRate = filteredAndSortedLoads.length > 0
    ? (filteredAndSortedLoads.reduce((sum, load) => sum + load.price, 0) / filteredAndSortedLoads.length).toFixed(2)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading premium loads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 py-8 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">🎉 Welcome to Premium!</h1>
              <p className="text-cyan-100 text-lg">
                Your payment was successful. Access exclusive premium loads below.
              </p>
            </div>
            <Link
              href="/premium-post-load"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              ✨ Post Premium Load
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-sm text-gray-400 mb-1">Total Premium Loads</div>
            <div className="text-3xl font-bold text-cyan-400">{filteredAndSortedLoads.length}</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-sm text-gray-400 mb-1">Average Rate</div>
            <div className="text-3xl font-bold text-emerald-400">${avgRate}</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-sm text-gray-400 mb-1">Status</div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-bold">Premium Active</span>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
          <h3 className="text-xl font-bold mb-4 text-cyan-400">Filters & Sort</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Equipment type..."
              value={filters.equipment}
              onChange={(e) => setFilters({ ...filters, equipment: e.target.value })}
              className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Origin city..."
              value={filters.origin}
              onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
              className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Destination city..."
              value={filters.destination}
              onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
              className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Min rate ($)..."
              value={filters.minRate}
              onChange={(e) => setFilters({ ...filters, minRate: e.target.value })}
              className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max miles..."
              value={filters.maxMiles}
              onChange={(e) => setFilters({ ...filters, maxMiles: e.target.value })}
              className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="highest-rate">Highest Rate</option>
              <option value="shortest-distance">Shortest Distance</option>
            </select>
          </div>
        </div>

        {/* Load List */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6 text-red-400">
            Error: {error}
          </div>
        )}

        {filteredAndSortedLoads.length === 0 ? (
          <div className="bg-slate-800 p-12 rounded-lg border border-slate-700 text-center">
            <p className="text-gray-400 text-lg">No premium loads available at the moment.</p>
            <Link
              href="/premium-post-load"
              className="inline-block mt-4 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-bold transition"
            >
              Post the First Load
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedLoads.map((load, index) => (
              <div
                key={index}
                className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {load.origin?.city}, {load.origin?.state} → {load.destination?.city}, {load.destination?.state}
                    </h3>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>📦 {load.equipment}</span>
                      <span>⚖️ {load.weight?.toLocaleString()} lbs</span>
                      <span>🛣️ {load.distance} mi</span>
                      <span>📋 {load.commodity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-400">${load.price}</div>
                    <div className="text-sm text-gray-400">
                      ${(load.price / load.distance).toFixed(2)}/mi
                    </div>
                  </div>
                </div>

                {load.specialInstructions && (
                  <p className="text-gray-300 text-sm mb-4 bg-slate-700/50 p-3 rounded">
                    📝 {load.specialInstructions}
                  </p>
                )}

                <div className="flex gap-3">
                  <button className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg font-semibold transition">
                    Contact Shipper
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-semibold transition">
                    Save Load
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 p-6 rounded-lg text-center">
          <p className="text-white text-lg mb-4">
            Want to post your own premium loads?
          </p>
          <Link
            href="/premium-post-load"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Post Premium Load
          </Link>
        </div>
      </div>
    </div>
  );
}
