"use client";

import FobReportCard from "./FobReportCard";
import HourlyReportTable from "./HourlyReportTable";
import ProductionInputTable from "./ProductionInputTable";

export default function DashboardClient() {
  return (
    <div className="p-2">
      {/* Top Row - Two Components Side by Side */}
      <div className="flex flex-col md:flex-row gap-2">
        <FobReportCard className="flex-1" />
        <HourlyReportTable className="flex-1" />
      </div>

      {/* Bottom Row - Full Width */}
      <div className="ml-0">
        <ProductionInputTable />
      </div>
    </div>
  );
}
