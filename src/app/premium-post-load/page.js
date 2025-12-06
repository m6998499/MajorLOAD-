// src/app/premium-post-load/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isUserPremium } from '@/lib/premium';

export default function PremiumLoadBoard() {
  const router = useRouter();
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    equipment: '',
    origin: '',
    destination: '',
    minRate: '',
    maxMiles: ''
  });
  const [sortBy, setSortBy] = useState('rate'); // 'rate', 'miles', 'date'

  useEffect(() => {
    checkPremiumAccess();
    fetchPremiumLoads();
  }, []);

  const checkPremiumAccess = async () => {
    const isPremium = await isUserPremium();
    if (!isPremium) {
      router.push('/pricing');
    }
  };

  const fetchPremiumLoads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/loads?premium=true');
      const data = await response.json();
      setLoads(data.loads || []);
    } catch (error) {
      console.error('Error fetching premium loads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredLoads = loads.filter(load => {
    if (filters.equipment && !load.equipment.toLowerCase().includes(filters.equipment.toLowerCase())) return false;
    if (filters.origin && !load.origin.toLowerCase().includes(filters.origin.toLowerCase())) return false;
    if (filters.destination && !load.destination.toLowerCase().includes(filters.destination.toLowerCase())) return false;
    if (filters.minRate && load.rate < parseFloat(filters.minRate)) return false;
    if (filters.maxMiles && load.miles > parseFloat(filters.maxMiles)) return false;
    return true;
  });

  const sortedLoads = [...filteredLoads].sort((a, b) => {
    switch (sortBy) {
      case 'rate':
        return b.rate - a.rate;
      case 'miles':
        return a.miles - b.miles;
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Premium Load Board</h1>
          <p className="text-cyan-100">Exclusive access to premium loads with real-time updates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Advanced Filters */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-cyan-400">Advanced Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Equipment Type"
              value={filters.equipment}
              onChange={(e) => handleFilterChange('equipment', e.target.value)}
              className="px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Origin City/State"
              value={filters.origin}
              onChange={(e) => handleFilterChange('origin', e.target.value)}
              className="px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Destination"
              value={filters.destination}
              onChange={(e) => handleFilterChange('destination', e.target.value)}
              className="px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Min Rate ($)"
              value={filters.minRate}
              onChange={(e) => handleFilterChange('minRate', e.target.value)}
              className="px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max Miles"
              value={filters.maxMiles}
              onChange={(e) => handleFilterChange('maxMiles', e.target.value)}
              className="px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <label className="text-gray-300">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-cyan-500 focus:outline-none"
            >
              <option value="rate">Highest Rate</option>
              <option value="miles">Shortest Distance</option>
              <option value="date">Newest</option>
            </select>
            <button
              onClick={() => setFilters({ equipment: '', origin: '', destination: '', minRate: '', maxMiles: '' })}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 rounded-lg p-4 shadow-md">
            <div className="text-cyan-400 text-sm font-semibold">Total Loads</div>
            <div className="text-2xl font-bold">{sortedLoads.length}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 shadow-md">
            <div className="text-cyan-400 text-sm font-semibold">Avg Rate</div>
            <div className="text-2xl font-bold">
              ${sortedLoads.length > 0 ? Math.round(sortedLoads.reduce((sum, l) => sum + l.rate, 0) / sortedLoads.length) : 0}
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 shadow-md">
            <div className="text-cyan-400 text-sm font-semibold">Premium Only</div>
            <div className="text-2xl font-bold">✓</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 shadow-md">
            <div className="text-cyan-400 text-sm font-semibold">Real-Time</div>
            <div className="text-2xl font-bold">⚡</div>
          </div>
        </div>

        {/* Loads List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            <p className="mt-4 text-gray-400">Loading premium loads...</p>
          </div>
        ) : sortedLoads.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg">No loads match your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedLoads.map((load, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-cyan-500/20 transition border border-slate-700 hover:border-cyan-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-xs text-gray-400 uppercase mb-1">Route</div>
                    <div className="font-semibold">{load.origin}</div>
                    <div className="text-cyan-400 text-sm">→</div>
                    <div className="font-semibold">{load.destination}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-400 uppercase mb-1">Equipment</div>
                    <div className="font-semibold">{load.equipment}</div>
                    <div className="text-sm text-gray-400 mt-1">{load.weight} lbs</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-400 uppercase mb-1">Details</div>
                    <div className="text-sm">{load.miles} mi</div>
                    <div className="text-sm text-gray-400">{load.commodity}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-400 uppercase mb-1">Rate</div>
                    <div className="text-3xl font-bold text-cyan-400">${load.rate}</div>
                    <div className="text-sm text-gray-400">${(load.rate / load.miles).toFixed(2)}/mi</div>
                    <div className="text-xs text-gray-500 mt-2">{new Date(load.createdAt).toLocaleTimeString()}</div>
                  </div>
                </div>
                
                {load.specialInstructions && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="text-xs text-gray-400 uppercase mb-1">Special Instructions</div>
                    <div className="text-sm text-gray-300">{load.specialInstructions}</div>
                  </div>
                )}
                
                <div className="mt-4 flex gap-3">
                  <button className="flex-1 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded font-semibold transition">
                    Contact Shipper
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition">
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
