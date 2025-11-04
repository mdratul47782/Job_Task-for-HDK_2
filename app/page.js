import Image from "next/image";
import FobReportCard from "./Components/FobReportCard";
import HourlyReportTable from "./Components/HourlyReportTable";
import ProductionInputTable from "./Components/ProductionInputTable";

export default function Home() {
  return (
    <div className="p-2 ">
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
