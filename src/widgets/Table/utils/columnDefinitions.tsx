import { MRT_ColumnDef } from "material-react-table";
import { Tooltip } from "@mui/material";
import { SupplyRow } from "@/shared/types/supply.types.ts";
import { formatCurrency, formatNumber, formatArray } from "./formatters";

/**
 * Column definitions for the GroupedTable component
 */
export const getColumns = (): MRT_ColumnDef<SupplyRow>[] => [
  {
    header: "Request ID",
    accessorKey: "requestId",
    enableGrouping: true,
    Cell: ({ cell, row }) => (
      <div className={`font-medium ${row.depth > 0 ? "text-blue-700" : ""}`}>
        {cell.getValue<string>()}
      </div>
    ),
  },
  {
    header: "Wagon Type",
    accessorKey: "wagonType",
    enableGrouping: true,
    Cell: ({ cell }) => (
      <Tooltip
        title={cell.getValue<string>() || ""}
        arrow
        placement="top-start"
      >
        <div className="truncate max-w-[120px]">{cell.getValue<string>()}</div>
      </Tooltip>
    ),
  },
  {
    header: "Client",
    accessorKey: "client",
    enableGrouping: true,
    Cell: ({ cell }) => (
      <Tooltip
        title={cell.getValue<string>() || ""}
        arrow
        placement="top-start"
      >
        <div className="truncate max-w-[120px] font-medium">
          {cell.getValue<string>()}
        </div>
      </Tooltip>
    ),
  },
  { header: "Manager", accessorKey: "manager", enableGrouping: true },
  { header: "Shipper", accessorKey: "shipper", enableGrouping: true },
  {
    header: "Cargo Class",
    accessorKey: "cargoClass",
    enableGrouping: true,
  },
  {
    header: "Weight (t)",
    accessorKey: "weightTons",
    Cell: ({ cell }) => (
      <div className="text-right font-mono">
        {formatNumber(cell.getValue<number>())}
      </div>
    ),
    muiTableHeadCellProps: {
      align: "right",
    },
  },
  {
    header: "Wagons Req'd",
    accessorKey: "wagonsRequested",
    Cell: ({ cell }) => (
      <div className="text-right font-mono">{cell.getValue<number>()}</div>
    ),
    muiTableHeadCellProps: {
      align: "right",
    },
  },
  {
    header: "Mandatory",
    accessorKey: "mandatory",
    Cell: ({ cell }) => (
      <div className="text-right font-mono">
        {formatNumber(cell.getValue<number>())}
      </div>
    ),
    muiTableHeadCellProps: {
      align: "right",
    },
  },
  { header: "Send Station", accessorKey: "sendStation" },
  { header: "Destination", accessorKey: "destStation" },
  { header: "Return Station", accessorKey: "returnStation" },
  {
    header: "Turnover Days",
    accessorKey: "turnoverDays",
  },
  { header: "Reposition", accessorKey: "reposition" },
  { header: "Loading", accessorKey: "loading" },
  { header: "Loaded Transit", accessorKey: "loadedTransit" },
  { header: "Unloading", accessorKey: "unloading" },
  { header: "Return Move", accessorKey: "returnMovement" },
  { header: "Wagon Days", accessorKey: "wagonDays" },
  {
    header: "Client Rate",
    accessorKey: "clientRateKZT",
    Cell: ({ cell }) => (
      <div className="text-right font-mono text-green-700">
        {formatCurrency(cell.getValue<number>())}
      </div>
    ),
    muiTableHeadCellProps: {
      align: "right",
    },
  },
  {
    header: "Empty Rate",
    accessorKey: "emptyRateKZT",
    Cell: ({ cell }) => (
      <div className="text-right font-mono">
        {formatCurrency(cell.getValue<number>())}
      </div>
    ),
    muiTableHeadCellProps: {
      align: "right",
    },
  },
  {
    header: "Loaded Rate",
    accessorKey: "loadedRateKZT",
    Cell: ({ cell }) => (
      <div className="text-right font-mono">
        {formatCurrency(cell.getValue<number>())}
      </div>
    ),
    muiTableHeadCellProps: {
      align: "right",
    },
  },
  {
    header: "Revenue",
    accessorKey: "revenueKZT",
    Cell: ({ cell }) => (
      <div className="text-right font-mono font-medium text-green-700">
        {formatCurrency(cell.getValue<number>())}
      </div>
    ),
    muiTableHeadCellProps: {
      align: "right",
    },
  },
  {
    header: "Daily Rev",
    accessorKey: "dailyRevenueKZT",
    Cell: ({ cell }) => (
      <div className="text-right font-mono text-green-700">
        {formatCurrency(cell.getValue<number>())}
      </div>
    ),
    muiTableHeadCellProps: {
      align: "right",
    },
  },
  {
    header: "Total Sum",
    accessorKey: "totalSumKZT",
    Cell: ({ cell }) => (
      <div className="text-right font-mono font-bold text-green-700">
        {formatCurrency(cell.getValue<number>())}
      </div>
    ),
    muiTableHeadCellProps: {
      align: "right",
    },
  },
  {
    header: "Siding Days",
    accessorKey: "sidingDays",
    Cell: ({ cell }) => (
      <div className="text-right font-mono">
        {formatNumber(cell.getValue<number>())}
      </div>
    ),
    muiTableHeadCellProps: {
      align: "right",
    },
  },
  { header: "Supply Type", accessorKey: "supplyType" },
  {
    header: "Decades",
    accessorKey: "decade",
    Cell: ({ cell }) => (
      <div>{formatArray(cell.getValue<Array<number | null>>())}</div>
    ),
  },
];
