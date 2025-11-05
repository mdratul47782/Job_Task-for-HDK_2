"use client";
import { useState } from "react";

export default function FloorTable() {
  const floors = ["A2", "B2", "A3", "B3", "A4", "B4", "A5", "K3", "SMD"];

  // Dates - editable by user
  const [dates, setDates] = useState([
    "11/5", "11/6", "11/7", "11/8", "11/9", "11/10", "11/11"
  ]);

  // Floor data
  const [data, setData] = useState(
    floors.map(() => ({
      regular: "",
      mini: "",
      short: "",
      days: dates.map(() => "")
    }))
  );

  // Floor column change
  const handleChange = (i, field, value) => {
    const newData = [...data];
    newData[i][field] = value;
    setData(newData);
  };

  // Date cell change
  const handleDayChange = (i, j, value) => {
    const newData = [...data];
    newData[i].days[j] = value;
    setData(newData);
  };

  // Date header change
  const handleDateChange = (index, value) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  // Totals
  const totals = {
    regular: data.reduce((t, r) => t + Number(r.regular || 0), 0),
    mini: data.reduce((t, r) => t + Number(r.mini || 0), 0),
    short: data.reduce((t, r) => t + Number(r.short || 0), 0),
    days: dates.map((_, j) =>
      data.reduce((t, r) => t + Number(r.days[j] || 0), 0)
    )
  };

  const grandTotal = totals.regular + totals.mini + totals.short;

  return (
    <div className="p-4 overflow-x-auto">
      <table className="border-collapse border border-gray-400 text-center">
        <thead className="bg-green-300">
          <tr>
            <th className="border border-gray-400 px-2 py-1">Floor</th>
            <th className="border border-gray-400 px-2 py-1">Line (Regular)</th>
            <th className="border border-gray-400 px-2 py-1">Mini (10-15)</th>
            <th className="border border-gray-400 px-2 py-1">Short (20-30)</th>
            {dates.map((date, index) => (
              <th key={index} className="border border-gray-400 px-2 py-1">
                <input
                  type="text"
                  value={date}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  className="w-20 text-center border-none outline-none bg-green-300"
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {floors.map((floor, i) => (
            <tr key={floor} className="border border-gray-400">
              <td className="border border-gray-400 px-2 py-1 font-semibold">{floor}</td>
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

              {/* Date columns */}
              {dates.map((_, j) => (
                <td key={j} className="border border-gray-400">
                  <input
                    type="number"
                    className="w-20 text-center border-none outline-none"
                    value={data[i].days[j]}
                    onChange={(e) => handleDayChange(i, j, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}

          {/* Totals row */}
          <tr className="font-bold bg-green-100">
            <td className="border border-gray-400">TOTAL</td>
            <td className="border border-gray-400">{totals.regular}</td>
            <td className="border border-gray-400">{totals.mini}</td>
            <td className="border border-gray-400">{totals.short}</td>
            {totals.days.map((v, i) => (
              <td key={i} className="border border-gray-400 text-red-600">{v}</td>
            ))}
          </tr>

          {/* Grand total */}
          <tr className="font-bold bg-green-300">
            <td colSpan={dates.length + 4} className="border border-gray-400 py-2">
              GRAND TOTAL (Line + Mini + Short): {grandTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
