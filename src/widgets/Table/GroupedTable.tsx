import { FC, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_VisibilityState,
  MRT_TableInstance,
  MRT_Column,
} from "material-react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { LogisticsRow } from "@/shared/types/supply.types.ts";

const allLeafKeys = [
  "phase1_requestWagon",
  "phase1_psType",
  "phase1_client",
  "phase1_manager",
  "phase1_shipper",
  "phase1_cargoClass",
  "phase1_weight",
  "phase1_wagonsRequested",
  "phase2_requestWagon",
  "phase2_plannedWagons",
  "phase2_ownedWagons",
  "phase2_hiredWagons",
  "phase3_requestWagon",
  "phase3_source",
  "phase3_psType",
  "phase3_client",
  "phase4_requestWagon",
  "phase4_psType",
  "phase4_client",
  "phase5_requestWagon",
  "phase5_invoice",
  "phase5_psType",
  "phase5_client",
] as const;

const TableHeader = ({
  header,
  phase,
  table,
  handleClick,
}: {
  header: string;
  phase: string;
  table: MRT_TableInstance<LogisticsRow>;
  handleClick: (
    leaves: MRT_Column<LogisticsRow, unknown>[],
    allVisible: boolean
  ) => void;
}) => {
  const leaves = table
    .getAllLeafColumns()
    .filter((c) => c.id.startsWith(`${phase}_`));

  const allVisible = leaves.every(
    (c) => table.getState().columnVisibility[c.id]
  );

  return (
    <button
      onClick={() => handleClick(leaves, allVisible)}
      className="flex items-center gap-2 cursor-pointer text-nowrap"
    >
      {allVisible ? (
        <ChevronLeftIcon width={16} height={16} />
      ) : (
        <ChevronRightIcon width={16} height={16} />
      )}
      <span>{header}</span>
    </button>
  );
};

const GroupedTable: FC<{ data: LogisticsRow[] }> = ({ data }) => {
  const initialVisibility = useMemo<MRT_VisibilityState>(() => {
    const vis: MRT_VisibilityState = {};
    allLeafKeys.forEach((k) => (vis[k] = true));

    ["stub", "stub2", "stub3", "stub4", "stub5"].forEach(
      (s) => (vis[s] = false)
    );

    return vis;
  }, []);

  const [columnVisibility, setColumnVisibility] =
    useState<MRT_VisibilityState>(initialVisibility);

  const handleHeaderToggle = (
    leaves: MRT_Column<LogisticsRow, unknown>[],
    allVisible: boolean
  ) => {
    const old = table.getState().columnVisibility;
    const newVis = { ...old };

    leaves.forEach((c) => {
      newVis[c.id] = !allVisible;
    });

    setColumnVisibility((old) => {
      const newVis = { ...old };

      leaves.forEach((c) => {
        newVis[c.id] = !allVisible;
      });

      const phase = leaves[0].id.split("_")[0];
      const stubId = `stub${phase.slice(-1)}`;

      const anyLeftVisible = leaves.some((c) => newVis[c.id]);
      newVis[stubId] = !anyLeftVisible;

      return newVis;
    });
  };

  const columns = useMemo<MRT_ColumnDef<LogisticsRow>[]>(
    () => [
      {
        id: "phase1",
        header: "Спрос",
        Header: ({ table }) => (
          <TableHeader
            table={table}
            handleClick={handleHeaderToggle}
            phase="phase1"
            header="Спрос"
          />
        ),
        columns: [
          {
            header: "Фаза 1",
            accessorKey: "stub1",
          },
          { header: "Заявка/вагон", accessorKey: "phase1_requestWagon" },
          { header: "Род ПС", accessorKey: "phase1_psType" },
          { header: "Клиент", accessorKey: "phase1_client" },
          { header: "Менеджер", accessorKey: "phase1_manager" },
          { header: "Грузоотправитель", accessorKey: "phase1_shipper" },
          { header: "Груз, класс", accessorKey: "phase1_cargoClass" },
          { header: "Вес, тн", accessorKey: "phase1_weight" },
          { header: "Заявлено вагонов", accessorKey: "phase1_wagonsRequested" },
        ],
      },

      {
        id: "phase2",
        header: "План оптимизатора",
        Header: ({ table }) => (
          <TableHeader
            table={table}
            handleClick={handleHeaderToggle}
            phase="phase2"
            header="План оптимизатора"
          />
        ),
        columns: [
          {
            header: "Фаза 2",
            accessorKey: "stub2",
          },
          { header: "Заявка/вагон", accessorKey: "phase2_requestWagon" },
          { header: "Плановые вагоны", accessorKey: "phase2_plannedWagons" },
          { header: "Собственные вагоны", accessorKey: "phase2_ownedWagons" },
          { header: "Привлечённые вагоны", accessorKey: "phase2_hiredWagons" },
        ],
      },

      {
        id: "phase3",
        header: "Проект плана",
        Header: ({ table }) => (
          <TableHeader
            table={table}
            handleClick={handleHeaderToggle}
            phase="phase3"
            header="Проект плана"
          />
        ),
        columns: [
          {
            header: "Фаза 3",
            accessorKey: "stub3",
          },
          { header: "Заявка/вагон", accessorKey: "phase3_requestWagon" },
          { header: "Источник", accessorKey: "phase3_source" },
          { header: "Род ПС", accessorKey: "phase3_psType" },
          { header: "Клиент", accessorKey: "phase3_client" },
        ],
      },

      {
        id: "phase4",
        header: "Согласованный план",
        Header: ({ table }) => (
          <TableHeader
            table={table}
            handleClick={handleHeaderToggle}
            phase="phase4"
            header="Согласованный план"
          />
        ),
        columns: [
          {
            header: "Фаза 4",
            accessorKey: "stub4",
          },
          { header: "Заявка/вагон", accessorKey: "phase4_requestWagon" },
          { header: "Род ПС", accessorKey: "phase4_psType" },
          { header: "Клиент", accessorKey: "phase4_client" },
        ],
      },

      {
        id: "phase5",
        header: "Факт",
        Header: ({ table }) => (
          <TableHeader
            table={table}
            handleClick={handleHeaderToggle}
            phase="phase5"
            header="Факт"
          />
        ),
        columns: [
          {
            header: "Фаза 5",
            accessorKey: "stub5",
          },
          { header: "Заявка/вагон", accessorKey: "phase5_requestWagon" },
          { header: "Счет-фактура", accessorKey: "phase5_invoice" },
          { header: "Род ПС", accessorKey: "phase5_psType" },
          { header: "Клиент", accessorKey: "phase5_client" },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable<LogisticsRow>({
    columns,
    data,
    enableExpanding: true,
    state: { columnVisibility, density: "compact" },
    onColumnVisibilityChange: setColumnVisibility,
    muiTableHeadProps: () => ({
      className: "bg-black",
    }),
    muiTableHeadCellProps: () => ({
      sx: {
        "& .Mui-TableHeadCell-Content": {
          padding: "0",
        },
        padding: 0,
      },
    }),
    enableFullScreenToggle: false,
    enableDensityToggle: false,
  });

  return <MaterialReactTable table={table} />;
};

export default GroupedTable;
