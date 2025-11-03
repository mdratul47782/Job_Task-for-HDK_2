"use client";
import { useState } from "react";

export default function FloorTable() {
  const floors = ["A2", "B2", "A3", "B3", "A4", "B4", "A5", "K3", "SMD"];

  // Only one date (like "11/1")
  const [date, setDate] = useState("11/1");

  // Floor data — each floor has Regular, Mini, Short, and one date value
  const [data, setData] = useState(
    floors.map(() => ({
      regular: "",
      mini: "",
      short: "",
      dayValue: "",
    }))
  );

  // Handle input changes
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

  return (
    <div className="p-4 overflow-x-auto">
      <table className="border-collapse border border-gray-400 text-center">
        <thead>
          {/* Header row */}
          <tr className="bg-green-400 font-bold">
            <th colSpan={4} className="border border-gray-400 px-2 py-1 text-center">
              Floor Summary
            </th>
            <th className="border border-gray-400 px-2 py-1 text-center">
              Date
            </th>
          </tr>

          {/* Labels row */}
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
                  value={data[i].regular}
                  onChange={(e) => handleChange(i, "regular", e.target.value)}
                />
              </td>

              <td className="border border-gray-400">
                <input
                  type="number"
                  className="w-20 text-center border-none outline-none"
                  value={data[i].mini}
                  onChange={(e) => handleChange(i, "mini", e.target.value)}
                />
              </td>

              <td className="border border-gray-400">
                <input
                  type="number"
                  className="w-20 text-center border-none outline-none"
                  value={data[i].short}
                  onChange={(e) => handleChange(i, "short", e.target.value)}
                />
              </td>

              <td className="border border-gray-400">
                <input
                  type="number"
                  className="w-20 text-center border-none outline-none"
                  value={data[i].dayValue}
                  onChange={(e) => handleChange(i, "dayValue", e.target.value)}
                />
              </td>
            </tr>
          ))}

          {/* Totals row */}
          <tr className="font-bold bg-green-100">
            <td className="border border-gray-400">TOTAL</td>
            <td className="border border-gray-400">{totals.regular}</td>
            <td className="border border-gray-400">{totals.mini}</td>
            <td className="border border-gray-400">{totals.short}</td>
            <td className="border border-gray-400 text-red-600">
              {totals.dayValue}
            </td>
          </tr>

          {/* Grand total */}
          <tr className="font-bold bg-green-300">
            <td colSpan={5} className="border border-gray-400 py-2">
              GRAND TOTAL (Line + Mini + Short): {grandTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
