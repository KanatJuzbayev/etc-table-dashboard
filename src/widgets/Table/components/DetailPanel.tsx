import { FC } from "react";
import { SupplyRow } from "@/shared/types/supply.types.ts";
import { formatCurrency } from "../utils/formatters";

interface DetailPanelProps {
  row: {
    original: SupplyRow;
  };
}

const DetailPanel: FC<DetailPanelProps> = ({ row }) => {
  return (
    <div className="p-4 bg-blue-50 border-t border-blue-100">
      <h4 className="text-sm font-semibold text-blue-800 mb-2">
        Details for Request {row.original.requestId}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Client</div>
          <div className="font-medium">{row.original.client}</div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Route</div>
          <div className="font-medium">
            {row.original.sendStation} → {row.original.destStation}
          </div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Total Revenue</div>
          <div className="font-medium text-green-700">
            {formatCurrency(row.original.totalSumKZT)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
