"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../config/api";

export default function PremiumPostLoadForm({ userEmail }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
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
    specialInstructions: "",
    contactPhone: "",
    loadNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      origin: { city: formData.originCity, state: formData.originState },
      destination: { city: formData.destinationCity, state: formData.destinationState },
      pickupDate: formData.pickupDate,
      equipment: formData.equipment,
      weight: Number(formData.weight),
      distance: Number(formData.distance),
      price: Number(formData.price),
      commodity: formData.commodity,
      specialInstructions: formData.specialInstructions,
      contactPhone: formData.contactPhone,
      loadNumber: formData.loadNumber,
      isPremium: true,
      postedBy: userEmail,
      postedTime: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/loads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to post load");

      alert("✅ Premium load posted successfully!");
      router.push("/loadboard");

    } catch (error) {
      console.error(error);
      alert("❌ Error posting load. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Load Number - Premium Feature */}
      <div className="bg-slate-700/50 p-4 rounded-lg border border-emerald-500/30">
        <label className="block mb-2 font-semibold text-emerald-400 flex items-center gap-2">
          <span>✨</span> Load Number / Reference ID
        </label>
        <input
          type="text"
          name="loadNumber"
          placeholder="e.g., LOAD-2024-001"
          value={formData.loadNumber}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800 border border-slate-600 w-full text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
        />
      </div>

      {/* Origin */}
      <div>
        <label className="block mb-2 font-semibold text-gray-200">Origin</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="originCity"
            placeholder="City"
            value={formData.originCity}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="originState"
            placeholder="State"
            value={formData.originState}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Destination */}
      <div>
        <label className="block mb-2 font-semibold text-gray-200">Destination</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="destinationCity"
            placeholder="City"
            value={formData.destinationCity}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="destinationState"
            placeholder="State"
            value={formData.destinationState}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Pickup Date */}
      <div>
        <label className="block mb-2 font-semibold text-gray-200">Pickup Date</label>
        <input
          type="date"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800 border border-slate-600 w-full text-white focus:border-cyan-500 focus:outline-none"
          required
        />
      </div>

      {/* Equipment */}
      <div>
        <label className="block mb-2 font-semibold text-gray-200">Equipment Type</label>
        <input
          type="text"
          name="equipment"
          placeholder="Reefer, Van, Flatbed, etc."
          value={formData.equipment}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800 border border-slate-600 w-full text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
          required
        />
      </div>

      {/* Weight / Distance / Price */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-semibold text-gray-200 text-sm">Weight (lbs)</label>
          <input
            type="number"
            name="weight"
            placeholder="45000"
            value={formData.weight}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-200 text-sm">Distance (mi)</label>
          <input
            type="number"
            name="distance"
            placeholder="500"
            value={formData.distance}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-200 text-sm">Price ($)</label>
          <input
            type="number"
            name="price"
            placeholder="2500"
            value={formData.price}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none w-full"
            required
          />
        </div>
      </div>

      {/* Commodity */}
      <div>
        <label className="block mb-2 font-semibold text-gray-200">Commodity</label>
        <input
          type="text"
          name="commodity"
          placeholder="What are you hauling?"
          value={formData.commodity}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800 border border-slate-600 w-full text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
          required
        />
      </div>

      {/* Contact Phone - Premium Feature */}
      <div className="bg-slate-700/50 p-4 rounded-lg border border-emerald-500/30">
        <label className="block mb-2 font-semibold text-emerald-400 flex items-center gap-2">
          <span>✨</span> Contact Phone Number
        </label>
        <input
          type="tel"
          name="contactPhone"
          placeholder="(555) 123-4567"
          value={formData.contactPhone}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800 border border-slate-600 w-full text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
        />
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block mb-2 font-semibold text-gray-200">Special Instructions</label>
        <textarea
          name="specialInstructions"
          placeholder="Additional details for carriers..."
          value={formData.specialInstructions}
          onChange={handleChange}
          className="p-3 rounded bg-slate-800 border border-slate-600 w-full h-32 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 transition p-4 rounded-lg font-bold text-white text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Posting Load..." : "🚚 Post Premium Load"}
      </button>
    </form>
  );
}
