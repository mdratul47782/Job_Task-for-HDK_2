"use client";

import FobReportCard from "./FobReportCard";
import HourlyReportTable from "./HourlyReportTable";
import ProductionInputTable from "./ProductionInputTable";
import Image from "next/image";

export default function DashboardClient() {
  return (
    <div className="min-h-screen p-12 bg-gray-50 relative">
      {/* Top Left Logo */}
      <div className="absolute top-6 left-11">
        <div className="p-2 rounded-2xl  from-indigo-200 to-indigo-300 shadow-lg hover:shadow-indigo-400 transition duration-300">
          <Image
            src="/Screenshot_91.png"
            alt="HKD International (CEPZ) Ltd. Logo"
            width={200}
            height={80}
            className="rounded-xl object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full max-w-7xl mt-24"> {/* mt-24 to avoid overlapping with logo */}
          {/* Top Row - Two Components Side by Side */}
          <div className="flex flex-col md:flex-row gap-2">
            <FobReportCard className="flex-1" />
            <HourlyReportTable className="flex-1" />
          </div>

          {/* Bottom Row - Full Width */}
          <div className="mt-4">
            <ProductionInputTable />
          </div>
        </div>
      </div>
    </div>
  );
}
