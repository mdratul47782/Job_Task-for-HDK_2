"use client";
import { useState } from "react";

export default function FloorTable() {
  const floors = ["A2", "B2", "A3", "B3", "A4", "B4", "A5", "K3", "SMD"];

  const [date, setDate] = useState(() => {
  const today = new Date();
  // মাস (month) JavaScript এ 0-based, তাই +1 দিতে হয়
  const month = today.getMonth() + 1;
  const day = today.getDate();
  // const year = today.getFullYear().toString().slice(-2);
  // Format: M/D
  return `${month}/${day}`;
});

  const [data, setData] = useState(
    floors.map(() => ({
      regular: "",
      mini: "",
      short: "",
      dayValue: "",
    }))
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (i, field, value) => {
    const newData = [...data];
    newData[i][field] = value;
    setData(newData);
  };

  // Totals
  const totals = {
    regular: data.reduce((t, r) => t + Number(r.regular || 0), 0),
    mini: data.reduce((t, r) => t + Number(r.mini || 0), 0),
    short: data.reduce((t, r) => t + Number(r.short || 0), 0),
    dayValue: data.reduce((t, r) => t + Number(r.dayValue || 0), 0),
  };

  const grandTotal = totals.regular + totals.mini + totals.short;

  // Save to API
  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    // Format data (replace blanks with 0)
    const formattedData = data.map((item, i) => ({
      floor: floors[i],
      regular: Number(item.regular) || 0,
      mini: Number(item.mini) || 0,
      short: Number(item.short) || 0,
      dayValue: Number(item.dayValue) || 0,
    }));

    try {
      const res = await fetch("/api/floor-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, data: formattedData }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("✅ Saved successfully!");
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 px-0 overflow-x-auto">
      <table className="border-collapse border border-gray-400 text-center">
        <thead>
          <tr className="bg-green-400 font-bold">
            <th colSpan={4} className="border border-gray-400 px-2 py-1 text-center">
              Floor Summary
            </th>
            <th className="border border-gray-400 px-2 py-1 text-center">
              Date
            </th>
          </tr>
          <tr className="bg-green-300">
            <th className="border border-gray-400 px-2 py-1">Floor</th>
            <th className="border border-gray-400 px-2 py-1">Line (Regular)</th>
            <th className="border border-gray-400 px-2 py-1">Mini (10–15)</th>
            <th className="border border-gray-400 px-2 py-1">Short (20–30)</th>
            <th className="border border-gray-400 px-2 py-1">
              
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-20 text-center border-none outline-none bg-green-300"
              />
            </th>
          </tr>
        </thead>

        <tbody>
          {floors.map((floor, i) => (
            <tr key={floor} className="border border-gray-400">
              <td className="border border-gray-400 px-2 py-1 font-semibold">
                {floor}
              </td>
              <td className="border border-gray-400">
                <input
                  type="number"
                  className="w-20 text-center border-none outline-none"
                  placeholder="0"
                  value={data[i].regular}
                  onChange={(e) => handleChange(i, "regular", e.target.value)}
                />
              </td>
              <td className="border border-gray-400">
                <input
                  type="number"
                  className="w-20 text-center border-none outline-none"
                  placeholder="0"
                  value={data[i].mini}
                  onChange={(e) => handleChange(i, "mini", e.target.value)}
                />
              </td>
              <td className="border border-gray-400">
                
                <input
                  type="number"
                  className="w-20 text-center border-none outline-none"
                  placeholder="0"
                  value={data[i].short}
                  onChange={(e) => handleChange(i, "short", e.target.value)}
                />
              </td>
              <td className="border border-gray-400">
                <span>$</span>
                <input
                  type="number"
                  className="w-20 text-center border-none outline-none"
                  placeholder="0"
                  value={data[i].dayValue}
                  onChange={(e) => handleChange(i, "dayValue", e.target.value)}
                />
              </td>
            </tr>
          ))}

          <tr className="font-bold bg-green-100">
            <td className="border border-gray-400">TOTAL</td>
            <td className="border border-gray-400">{totals.regular}</td>
            <td className="border border-gray-400">{totals.mini}</td>
            <td className="border border-gray-400">{totals.short}</td>
            <td className="border border-gray-400 text-red-600">
              <span>$ </span>
             
              {totals.dayValue}
            </td>
          </tr>

          <tr className="font-bold bg-green-300">
            <td colSpan={5} className="border border-gray-400 py-2">
              GRAND TOTAL (Line + Mini + Short): {grandTotal}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-1 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        {message && <span className="text-sm">{message}</span>}
      </div>
    </div>
  );
}
