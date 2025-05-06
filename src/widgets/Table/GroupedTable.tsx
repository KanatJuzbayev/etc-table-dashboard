import { FC, useState, useEffect, useMemo, useCallback } from "react";
import {
  MaterialReactTable,
  MRT_Row,
  MRT_TableState,
} from "material-react-table";
import { ThemeProvider } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

// Import types
import { SupplyRow } from "@/shared/types/supply.types.ts";

// Import theme
import { tableTheme } from "./theme/tableTheme";

// Import utils
import { getColumns } from "./utils/columnDefinitions";

// Import components
import TableLoading from "./components/TableLoading";
import TableError from "./components/TableError";

const muiTableProps = {
  muiTableContainerProps: {
    sx: { maxHeight: 650 },
    className:
      "border border-gray-200 rounded-b-lg h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
  },
  muiTableHeadProps: {
    className: "bg-gray-50 sticky top-0 z-10",
  },
  muiTableBodyProps: {
    className: "bg-white",
  },
  muiTopToolbarProps: {
    className:
      "bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 p-2",
  },
  muiBottomToolbarProps: {
    className: "bg-gray-50 border-t border-gray-200",
  },
  muiPaginationProps: {
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    className: "text-gray-600",
  },
};

const tableOptions = {
  enableColumnResizing: true,
  enableStickyHeader: true,
  enableStickyFooter: true,
  enableColumnFilterModes: true,
  enableColumnOrdering: true,
  enableGrouping: true,
  enableRowSelection: true,
  enableExpanding: true,
  enableDensityToggle: true,
  enableFullScreenToggle: true,
  enableGlobalFilter: true,
  enablePagination: true,

  autoResetPageIndex: false,
  positionGlobalFilter: "left" as "left" | "none" | "right",
  positionToolbarAlertBanner: "bottom" as
    | "none"
    | "bottom"
    | "top"
    | "head-overlay",
};

const GroupedTable: FC = () => {
  const [data, setData] = useState<SupplyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = useMemo(() => getColumns(), []);

  const getRowProps = useCallback(
    (row: MRT_Row<SupplyRow>) => ({
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
    }),
    [],
  );

  // Fetch data when component mounts
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

  if (loading) return <TableLoading />;

  if (error) return <TableError error={error} />;

  const initialState: Partial<MRT_TableState<SupplyRow>> = {
    density: "compact",
    pagination: { pageIndex: 0, pageSize: 25 },
    columnVisibility: {},
    isFullScreen: true,
  };

  return (
    <div className="flex flex-col rounded-lg shadow-md bg-white overflow-hidden h-full">
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns}
          data={data}
          initialState={initialState}
          muiTableBodyRowProps={({ row }) => getRowProps(row)}
          {...tableOptions}
          {...muiTableProps}
        />
      </ThemeProvider>
    </div>
  );
};

export default GroupedTable;
