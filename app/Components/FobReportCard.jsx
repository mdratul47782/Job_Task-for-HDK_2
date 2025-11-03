"use client";

import { useState } from "react";

export default function FobReportCardForm() {
  const [date, setDate] = useState("");
  const [monthlyUptoFOB, setMonthlyUptoFOB] = useState("");
  const [yearlyUptoFOB, setYearlyUptoFOB] = useState("");
  const [runday, setRunday] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/fobreport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          monthlyUptoFOB,
          yearlyUptoFOB,
          runday,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Data saved successfully!");
        setDate("");
        setMonthlyUptoFOB("");
        setYearlyUptoFOB("");
        setRunday("");
      } else {
        setMessage(`❌ Error: ${data.error || "Failed to save data"}`);
      }
    } catch (error) {
      setMessage("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-black w-fit text-sm font-semibold p-3 space-y-2">
      {/* Date Input */}
      <div className="flex border-b border-black">
        <div className="border-r border-black px-3 py-2">DATE:</div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 w-52 outline-none"
        />
      </div>

      {/* Monthly Upto FOB */}
      <div className="flex border-b border-black">
        <div className="border-r border-black px-3 py-2 w-40">
          Monthly Upto FOB:
        </div>
        <div className="flex items-center justify-between px-3 py-2 w-52">
          <span>$</span>
          <input
            type="number"
            step="0.01"
            value={monthlyUptoFOB}
            onChange={(e) => setMonthlyUptoFOB(e.target.value)}
            className="w-full text-right outline-none"
          />
        </div>
      </div>

      {/* Yearly Upto FOB */}
      <div className="flex border-b border-black">
        <div className="border-r border-black px-3 py-2 w-40">
          Yearly Upto FOB:
        </div>
        <div className="flex items-center justify-between px-3 py-2 w-52">
          <span>$</span>
          <input
            type="number"
            step="0.01"
            value={yearlyUptoFOB}
            onChange={(e) => setYearlyUptoFOB(e.target.value)}
            className="w-full text-right outline-none"
          />
        </div>
      </div>

      {/* Runday */}
      <div className="flex border-b border-black">
        <div className="border-r border-black px-3 py-2 w-40">Runday:</div>
        <input
          type="number"
          value={runday}
          onChange={(e) => setRunday(e.target.value)}
          className="px-3 py-2 w-52 outline-none"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save"}
      </button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
