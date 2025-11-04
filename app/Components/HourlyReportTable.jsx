"use client";

import { useState, useEffect } from "react";

export default function HourlyReportTable() {
  const rowsLabels = ["12H", "10H", "8H"];

  const [data, setData] = useState({
    "12H": "",
    "10H": "",
    "8H": "",
  });

  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Auto set today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleChange = (label, value) => {
    setData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSave = async () => {
    // ✅ Validation: all fields required
    if (!data["12H"] || !data["10H"] || !data["8H"]) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/hourlyreport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, data }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("✅ Data saved successfully!");
        setData({ "12H": "", "10H": "", "8H": "" });
      } else {
        setMessage(`❌ Error: ${result.error || "Failed to save data"}`);
      }
    } catch (err) {
      console.error("Save failed:", err);
      setMessage("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-black text-sm font-semibold w-fit p-3 space-y-2">
      {/* Auto Date Display */}
      <div className="flex border-b border-black mb-2">
        <div className="border-r border-black px-3 py-2">DATE:</div>
        <input
          type="date"
          value={date}
          readOnly
          className="px-3 py-2 w-52 outline-none bg-gray-100"
        />
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-1">
        {rowsLabels.map((label) => (
          <div
            key={label}
            className="flex border-b border-black box-border w-fit"
          >
            <div className="border-r border-black w-32 h-10 flex items-center justify-between px-2 box-border">
              <span>{label}:</span>
              <input
                type="number"
                required
                value={data[label]}
                onChange={(e) => handleChange(label, e.target.value)}
                className="w-20 text-center border-none outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save"}
      </button>

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes("✅")
              ? "text-green-600"
              : message.includes("⚠️")
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
