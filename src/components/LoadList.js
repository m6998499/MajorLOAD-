"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

export default function LoadList() {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLoads();
  }, []);

  const fetchLoads = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/loads`);
      if (!response.ok) throw new Error("Failed to fetch loads");
      const data = await response.json();
      setLoads(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-slate-400">Loading loads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">Error loading loads: {error}</p>
      </div>
    );
  }

  if (loads.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-slate-400">No loads available. Post one to see it here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loads.map((load) => (
        <div
          key={load._id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Origin → Destination */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Route</p>
              <p className="text-lg font-bold text-slate-900">
                {load.origin.city}, {load.origin.state} → {load.destination.city}, {load.destination.state}
              </p>
            </div>

            {/* Equipment */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Equipment</p>
              <p className="text-lg font-semibold text-slate-700">{load.equipment}</p>
            </div>

            {/* Details */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Details</p>
              <p className="text-sm text-slate-600">
                {load.weight.toLocaleString()} lbs • {load.distance} mi
              </p>
              <p className="text-sm text-slate-600">Commodity: {load.commodity}</p>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-500 uppercase">Rate</p>
              <p className="text-3xl font-bold text-green-600">${load.price.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{load.postedTime}</p>
            </div>
          </div>

          {load.specialInstructions && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase">Special Instructions</p>
              <p className="text-sm text-slate-600 mt-1">{load.specialInstructions}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
