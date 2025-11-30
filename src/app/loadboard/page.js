"use client";

import { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";

export default function LoadBoardPage() {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLoads() {
      try {
        const res = await fetch(`${API_BASE_URL}/loads`);
        if (!res.ok) {
          throw new Error("Failed to fetch loads");
        }
        const data = await res.json();
        setLoads(data || []);
      } catch (err) {
        setError(err.message || "Error loading loads");
      } finally {
        setLoading(false);
      }
    }

    fetchLoads();
  }, []);

  if (loading) {
    return <p className="mt-10 text-slate-300">Loading loads…</p>;
  }

  if (error) {
    return (
      <p className="mt-10 text-red-400 text-sm">
        {error}
      </p>
    );
  }

  if (!loads.length) {
    return (
      <p className="mt-10 text-slate-300 text-sm">
        No loads available right now.
      </p>
    );
  }

  return (
    <section className="mt-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Available Loads</h1>
      <div className="space-y-3">
        {loads.map(load => (
          <article
            key={load.id}
            className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-semibold">
                  {load.origin?.city}, {load.origin?.state} →{" "}
                  {load.destination?.city}, {load.destination?.state}
                </p>
                <p className="text-xs text-slate-400">
                  Load ID: {load.id} • {load.company}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-majorTeal">
                  ${load.price?.toLocaleString?.() ?? load.price}
                </p>
                <p className="text-xs text-slate-400">
                  {load.distance} mi • ${load.ratePerMile}/mi
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
              <p>Pickup: {load.pickupDate}</p>
              <p>Equipment: {load.equipment}</p>
              <p>Weight: {load.weight} lbs</p>
              <p>Status: {load.status}</p>
              <p>Deadhead: {load.deadhead} mi</p>
              <p>Credit score: {load.creditScore}</p>
              <p>Days to pay: {load.daysToPay}</p>
              <p>Factoring: {load.factoring ? "Yes" : "No"}</p>
            </div>

            {load.specialInstructions && (
              <p className="mt-2 text-xs text-slate-400">
                Notes: {load.specialInstructions}
              </p>
            )}

            {load.brokerPhone && (
              <p className="mt-2 text-xs">
                Broker:{" "}
                <span className="font-semibold">{load.brokerPhone}</span>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
                  }
