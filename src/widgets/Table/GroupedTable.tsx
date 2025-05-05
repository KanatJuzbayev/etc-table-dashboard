import { FC, useState, useEffect, useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
// Import MUI theme components for customization
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { Tooltip } from "@mui/material";

// 1. Mirror your JSON schema
export type SupplyRow = {
  requestId: string;
  wagonType: string;
  client: string;
  manager: string;
  shipper: string;
  cargoClass: string;
  weightTons: number;
  wagonsRequested: number;
  mandatory?: number;
  sendStation: string;
  destStation: string;
  returnStation: string;
  turnoverDays: number;
  reposition: number;
  loading: number;
  loadedTransit: number;
  unloading: number;
  returnMovement: number;
  wagonDays: number;
  clientRateKZT: number;
  emptyRateKZT: number;
  loadedRateKZT: number;
  revenueKZT: number;
  dailyRevenueKZT: number;
  totalSumKZT: number;
  sidingDays?: number;
  supplyType: string;
  decade: Array<number | null>;
};

const GroupedTable: FC = () => {
  // 2. State + fetch
  const [data, setData] = useState<SupplyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/mock_data.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: SupplyRow[] = await res.json();
        setData(json);
      } catch (e) {
        setError(e!.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#3b82f6", // Tailwind blue-500
            light: "#93c5fd", // blue-300
            dark: "#1d4ed8", // blue-700
          },
          secondary: {
            main: "#6366f1", // Tailwind indigo-500
          },
          background: {
            default: "#ffffff",
          },
          info: {
            main: "#0ea5e9", // sky-500
          },
          success: {
            main: "#10b981", // emerald-500
          },
          warning: {
            main: "#f59e0b", // amber-500
          },
          error: {
            main: "#ef4444", // red-500
          },
          grey: {
            50: "#f9fafb",
            100: "#f3f4f6",
            200: "#e5e7eb",
            300: "#d1d5db",
            400: "#9ca3af",
            500: "#6b7280",
            600: "#4b5563",
            700: "#374151",
            800: "#1f2937",
            900: "#111827",
          },
        },
        typography: {
          fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", sans-serif',
          fontSize: 13,
          button: {
            textTransform: "none",
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 6,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                borderRadius: "0.375rem",
              },
            },
          },
          MuiTableHead: {
            styleOverrides: {
              root: {
                backgroundColor: "#f9fafb", // Tailwind gray-50
                "& .MuiTableCell-head": {
                  fontWeight: 600,
                  color: "#374151", // Tailwind gray-700
                  borderBottom: "2px solid #e5e7eb",
                  whiteSpace: "nowrap",
                  padding: "8px 16px",
                },
              },
            },
          },
          MuiTableRow: {
            styleOverrides: {
              root: {
                "&:nth-of-type(even)": {
                  backgroundColor: alpha("#f3f4f6", 0.3), // Light gray for zebra striping
                },
                "&:hover": {
                  backgroundColor: alpha("#bfdbfe", 0.3), // Light blue hover
                },
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: alpha("#93c5fd", 0.2), // Lighter blue for selected rows
                },
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderBottom: "1px solid #e5e7eb", // Tailwind gray-200
                fontSize: "0.875rem",
                padding: "6px 16px",
                "&.MuiTableCell-body": {
                  color: "#374151", // Tailwind gray-700
                },
              },
              head: {
                fontWeight: 600,
                color: "#374151", // Tailwind gray-700
                backgroundColor: "#f9fafb", // Tailwind gray-50
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 500,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                },
              },
              sizeSmall: {
                padding: "4px 10px",
                fontSize: "0.75rem",
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                padding: 8,
                "&:hover": {
                  backgroundColor: alpha("#3b82f6", 0.08),
                },
              },
              sizeSmall: {
                padding: 4,
              },
            },
          },
          MuiTablePagination: {
            styleOverrides: {
              root: {
                color: "#4b5563", // Tailwind gray-600
                fontSize: "0.875rem",
              },
              selectLabel: {
                fontSize: "0.875rem",
              },
              displayedRows: {
                fontSize: "0.875rem",
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                fontSize: "0.875rem",
              },
            },
          },
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                backgroundColor: "#1f2937",
                fontSize: "0.75rem",
                padding: "6px 10px",
                borderRadius: "4px",
              },
            },
          },
        },
      }),
    [],
  );

  // Helper function for formatting currency
  const formatCurrency = (value: number | null | undefined): string => {
    if (value == null) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // 3. Columns (always memoized)
  const columns = useMemo<MRT_ColumnDef<SupplyRow>[]>(
    () => [
      {
        header: "Request ID",
        accessorKey: "requestId",
        enableGrouping: true,
        Cell: ({ cell, row }) => (
          <div
            className={`font-medium ${row.depth > 0 ? "text-blue-700" : ""}`}
          >
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
            <div className="truncate max-w-[120px]">
              {cell.getValue<string>()}
            </div>
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
            {String(cell.getValue<number>() ?? "—")}
          </div>
        ),
      },
      {
        header: "Wagons Req'd",
        accessorKey: "wagonsRequested",
        Cell: ({ cell }) => (
          <div className="text-right font-mono">
            {String(cell.getValue<number>() ?? "—")}
          </div>
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
            {String(cell.getValue<number>() ?? "—")}
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
        Cell: ({ cell }) => String(cell.getValue<number>() ?? "—"),
      },
      { header: "Supply Type", accessorKey: "supplyType" },
      {
        header: "Decades",
        accessorKey: "decade",
        Cell: ({ cell }) =>
          (cell.getValue<Array<number | null>>() ?? [])
            .filter((n) => n != null)
            .join(", "),
      },
    ],
    [],
  );

  // 4. Early returns
  if (loading)
    return (
      <div className="flex justify-center items-center h-40 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 font-medium p-4 rounded-lg shadow-sm">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Error: {error}
        </div>
      </div>
    );
  }

  // 5. Final render
  return (
    <div className="flex flex-col rounded-lg shadow-md bg-white overflow-hidden h-full">
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableColumnResizing
          enableStickyHeader
          enableStickyFooter
          enableColumnFilterModes
          enableColumnOrdering
          enableGrouping
          enableRowSelection
          enableExpanding
          enableDensityToggle
          enableFullScreenToggle
          enableGlobalFilter
          enablePagination
          autoResetPageIndex={false}
          positionGlobalFilter="left"
          positionToolbarAlertBanner="bottom"
          initialState={{
            density: "compact",
            pagination: { pageIndex: 0, pageSize: 10 },
            columnVisibility: {},
            grouping: ["client"], // Default grouping by client
            expanded: true, // Start with expanded groups
          }}
          muiTableBodyRowProps={({ row }) => ({
            sx: {
              "& .MuiTableCell-root": {
                pl: row.depth > 0 ? `${row.depth * 16}px` : undefined,
                backgroundColor:
                  row.depth > 0
                    ? alpha("#bfdbfe", 0.1 * row.depth) // Progressively lighter blue for nested rows
                    : undefined,
                borderLeft:
                  row.depth > 0
                    ? `${row.depth}px solid ${alpha("#3b82f6", 0.2)}`
                    : undefined,
              },
            },
            className: `${row.depth > 0 ? "hover:bg-blue-50" : ""} transition-colors duration-150`,
          })}
          muiTableContainerProps={{
            sx: { maxHeight: 650 },
            className:
              "border border-gray-200 rounded-b-lg h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
          }}
          muiTableHeadProps={{
            className: "bg-gray-50 sticky top-0 z-10",
          }}
          muiTableBodyProps={{
            className: "bg-white",
          }}
          muiTopToolbarProps={{
            className:
              "bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 p-2",
          }}
          muiBottomToolbarProps={{
            className: "bg-gray-50 border-t border-gray-200",
          }}
          muiPaginationProps={{
            rowsPerPageOptions: [5, 10, 25, 50, 100],
            className: "text-gray-600",
          }}
          renderDetailPanel={({ row }) => (
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
                  <div className="text-xs text-gray-500 mb-1">
                    Total Revenue
                  </div>
                  <div className="font-medium text-green-700">
                    {formatCurrency(row.original.totalSumKZT)}
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </ThemeProvider>
    </div>
  );
};

export default GroupedTable;
