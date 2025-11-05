"use client";

export default function FobSummary() {
  const weekInputs = {
    monthly: ["12H:", "12H:", "12H:", "12H:", "12H:", "12H:", "12H:"],
    yearly: ["10H:", "10H:", "10H:", "10H:", "10H:", "10H:", "10H:"],
    run: ["8H:", "8H:", "8H:", "8H:", "8H:", "8H:", "8H:"],
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 bg-gradient-to-b from-blue-100 to-blue-200 rounded-3xl shadow-xl border border-blue-300/50 p-6">
      <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">
        Weekly Work Hours Overview
      </h2>

      {/* Layout: 3 rows */}
      <div className="flex flex-col gap-4">
        {/* === Row 1: Monthly Updated FOB === */}
        <div className="flex items-center justify-between bg-blue-100/70 p-3 rounded-xl shadow-sm">
          {/* Left side */}
          <div className="flex items-center gap-2 w-1/3">
            <span className="font-semibold text-blue-900 w-48">
              Monthly Updated FOB:
            </span>
            <span className="font-bold text-blue-800 text-lg">$0</span>
          </div>

          {/* Right side: 7 input boxes */}
          <div className="flex gap-2 w-2/3 justify-end">
            {weekInputs.monthly.map((val, i) => (
              <input
                key={i}
                type="text"
                defaultValue={val}
                className="w-14 text-center px-2 py-1 rounded-md border border-blue-300 bg-white/70 text-blue-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            ))}
          </div>
        </div>

        {/* === Row 2: Yearly Updated FOB === */}
        <div className="flex items-center justify-between bg-blue-100/70 p-3 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 w-1/3">
            <span className="font-semibold text-blue-900 w-48">
              Yearly Updated FOB:
            </span>
            <span className="font-bold text-blue-800 text-lg">$0</span>
          </div>

          <div className="flex gap-2 w-2/3 justify-end">
            {weekInputs.yearly.map((val, i) => (
              <input
                key={i}
                type="text"
                defaultValue={val}
                className="w-14 text-center px-2 py-1 rounded-md border border-blue-300 bg-white/70 text-blue-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            ))}
          </div>
        </div>

        {/* === Row 3: Run Day === */}
        <div className="flex items-center justify-between bg-blue-100/70 p-3 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 w-1/3">
            <span className="font-semibold text-blue-900 w-48">Run Day:</span>
            <span className="font-bold text-blue-800 text-lg">0</span>
          </div>

          <div className="flex gap-2 w-2/3 justify-end">
            {weekInputs.run.map((val, i) => (
              <input
                key={i}
                type="text"
                defaultValue={val}
                className="w-14 text-center px-2 py-1 rounded-md border border-blue-300 bg-white/70 text-blue-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
