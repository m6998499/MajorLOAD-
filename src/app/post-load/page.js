"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../config/api";

export default function PostLoadPage() {
  const router = useRouter();

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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      postedTime: "Just now",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/loads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to post load");

      alert("Load posted successfully!");
      router.push("/loadboard");

    } catch (error) {
      console.error(error);
      alert("Error posting load.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-[#161b22] p-8 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center">Post a Load</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Origin */}
          <div>
            <label className="block mb-1 font-semibold">Origin</label>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="originCity" placeholder="City" onChange={handleChange}
                className="p-3 rounded bg-gray-800 border border-gray-700" required />
              <input type="text" name="originState" placeholder="State" onChange={handleChange}
                className="p-3 rounded bg-gray-800 border border-gray-700" required />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block mb-1 font-semibold">Destination</label>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="destinationCity" placeholder="City" onChange={handleChange}
                className="p-3 rounded bg-gray-800 border border-gray-700" required />
              <input type="text" name="destinationState" placeholder="State" onChange={handleChange}
                className="p-3 rounded bg-gray-800 border border-gray-700" required />
            </div>
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block mb-1 font-semibold">Pickup Date</label>
            <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className="p-3 rounded bg-gray-800 border border-gray-700 w-full" />
          </div>

          {/* Equipment */}
          <div>
            <label className="block mb-1 font-semibold">Equipment</label>
            <input type="text" name="equipment" placeholder="Reefer, Van, Flatbed..."
              onChange={handleChange} className="p-3 rounded bg-gray-800 border border-gray-700 w-full" required />
          </div>

          {/* Weight / Distance / Price */}
          <div className="grid grid-cols-3 gap-4">
            <input type="number" name="weight" placeholder="Weight (lbs)" onChange={handleChange}
              className="p-3 rounded bg-gray-800 border border-gray-700" required />
            <input type="number" name="distance" placeholder="Miles" onChange={handleChange}
              className="p-3 rounded bg-gray-800 border border-gray-700" required />
            <input type="number" name="price" placeholder="Price ($)" onChange={handleChange}
              className="p-3 rounded bg-gray-800 border border-gray-700" required />
          </div>

          {/* Commodity */}
          <div>
            <label className="block mb-1 font-semibold">Commodity</label>
            <input type="text" name="commodity" placeholder="What are you hauling?"
              onChange={handleChange} className="p-3 rounded bg-gray-800 border border-gray-700 w-full" required />
          </div>

          {/* Instructions */}
          <div>
            <label className="block mb-1 font-semibold">Special Instructions</label>
            <textarea name="specialInstructions" placeholder="Details for the driver..."
              onChange={handleChange} className="p-3 rounded bg-gray-800 border border-gray-700 w-full h-24" />
          </div>

          {/* Submit */}
          <button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-bold">
            Post Load
          </button>
        </form>
      </div>
    </div>
  );
    }
