"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API_BASE_URL from "../../config/api";

export default function PostLoadPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    originCity: "",
    originState: "",
    destinationCity: "",
    destinationState: "",
    pickupDate: "",
    equipment: "",
    weight: "",
    distance: "",
    price: "",
    commodity: "",
    company: "",
    brokerPhone: "",
    specialInstructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const weightNum = form.weight ? Number(form.weight) : null;
      const distanceNum = form.distance ? Number(form.distance) : null;
      const priceNum = form.price ? Number(form.price) : null;

      const ratePerMile =
        distanceNum && priceNum ? Number((priceNum / distanceNum).toFixed(2)) : null;

      // Shape matches your backend sample loads
      const payload = {
        origin: {
          city: form.originCity,
          state: form.originState,
        },
        destination: {
          city: form.destinationCity,
          state: form.destinationState,
        },
        pickupDate: form.pickupDate,
        equipment: form.equipment,
        weight: weightNum,
        distance: distanceNum,
        price: priceNum,
        ratePerMile,
        commodity: form.commodity,
        company: form.company,
        brokerPhone: form.brokerPhone,
        specialInstructions: form.specialInstructions,
        // optional extras – your backend will add id, status, postedTime
        deadhead: 0,
        creditScore: 0,
        factoring: false,
        daysToPay: 0,
      };

      const res = await fetch(`${API_BASE_URL}/loads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Unable to post load. Please try again.");
      }

      const created = await res.json();

      setSuccess(`Load ${created.id || ""} posted successfully!`.trim());
      // Reset form
      setForm({
        originCity: "",
        originState: "",
        destinationCity: "",
        destinationState: "",
        pickupDate: "",
        equipment: "",
        weight: "",
        distance: "",
        price: "",
        commodity: "",
        company: "",
        brokerPhone: "",
        specialInstructions: "",
      });

      // Optional: go straight to load board after a short delay
      setTimeout(() => {
        router.push("/loadboard");
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-2">Post a New Load</h1>
        <p className="text-sm text-slate-300 mb-6">
          Enter the load details below. Required fields are marked with{" "}
          <span className="text-red-400">*</span>.
        </p>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl shadow-black/60 backdrop-blur-xl px-6 py-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Top messages */}
            {error && (
              <div className="rounded-xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-200 mb-2">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200 mb-2">
                {success}
              </div>
            )}

            {/* Origin / Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h2 className="text-sm font-semibold text-slate-200 mb-3">
                  Origin <span className="text-red-400">*</span>
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      City <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="originCity"
                      value={form.originCity}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Dallas"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      State <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="originState"
                      value={form.originState}
                      onChange={handleChange}
                      required
                      maxLength={2}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="TX"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-200 mb-3">
                  Destination <span className="text-red-400">*</span>
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      City <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="destinationCity"
                      value={form.destinationCity}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Chicago"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      State <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="destinationState"
                      value={form.destinationState}
                      onChange={handleChange}
                      required
                      maxLength={2}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="IL"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dates & equipment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Pickup Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={form.pickupDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Equipment Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="equipment"
                  value={form.equipment}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select equipment</option>
                  <option value="Van">Dry Van</option>
                  <option value="Reefer">Reefer</option>
                  <option value="Flatbed">Flatbed</option>
                  <option value="Step Deck">Step Deck</option>
                  <option value="Power Only">Power Only</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Commodity
                </label>
                <input
                  type="text"
                  name="commodity"
                  value={form.commodity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Frozen food, electronics, etc."
                />
              </div>
            </div>

            {/* Numeric stuff */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="42000"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Distance (miles)
                </label>
                <input
                  type="number"
                  name="distance"
                  value={form.distance}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="926"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="2400"
                />
              </div>
            </div>

            {/* Company & contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Arctic Logistics"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Broker Phone
                </label>
                <input
                  type="tel"
                  name="brokerPhone"
                  value={form.brokerPhone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Special instructions */}
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Special Instructions
              </label>
              <textarea
                name="specialInstructions"
                value={form.specialInstructions}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Appointment only, check in 30 mins early, etc."
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Posting..." : "Post Load"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
