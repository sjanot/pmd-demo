"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Eye,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { Person } from "../types/person";
import { PersonDetail } from "./person-detail";

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "priezvisko",
    header: "Priezvisko",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("priezvisko")}</span>
    ),
  },
  {
    accessorKey: "meno",
    header: "Meno",
  },
  {
    accessorKey: "obec",
    header: "Obec",
  },
  {
    accessorKey: "psc",
    header: "PSČ",
  },
  {
    accessorKey: "email",
    header: "E-mail",
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return email ? (
        <span className="text-primary-light">{email}</span>
      ) : (
        <span className="text-muted/40">—</span>
      );
    },
  },
  {
    accessorKey: "telefon",
    header: "Telefón",
    cell: ({ row }) => {
      const phone = row.getValue("telefon") as string;
      return phone || <span className="text-muted/40">—</span>;
    },
  },
  {
    accessorKey: "clen",
    header: "Člen",
    cell: ({ row }) => {
      const val = row.getValue("clen") as boolean;
      return (
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
            val
              ? "bg-success/10 text-success"
              : "bg-muted-bg text-muted"
          )}
        >
          {val ? "Áno" : "Nie"}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      if (value === "all") return true;
      return row.getValue(id) === (value === "true");
    },
  },
  {
    accessorKey: "datumZapisu",
    header: "Dátum zápisu",
    cell: ({ row }) => {
      const val = row.getValue("datumZapisu") as string | null;
      if (!val) return <span className="text-muted/40">—</span>;
      return new Date(val).toLocaleDateString("sk-SK");
    },
  },
  {
    accessorKey: "oslovenie",
    header: "Oslovenie",
    enableHiding: true,
  },
  {
    accessorKey: "ulica",
    header: "Ulica",
    enableHiding: true,
  },
  {
    accessorKey: "vs",
    header: "VS",
    enableHiding: true,
  },
  {
    accessorKey: "misijneNovinky",
    header: "Mis. novinky",
    cell: ({ row }) => {
      const val = row.getValue("misijneNovinky") as string;
      if (!val) return <span className="text-muted/40">—</span>;
      return (
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
            val === "áno"
              ? "bg-gold/10 text-gold"
              : "bg-muted-bg text-muted"
          )}
        >
          {val}
        </span>
      );
    },
    enableHiding: true,
  },
];

const DEFAULT_HIDDEN: Record<string, boolean> = {
  oslovenie: false,
  ulica: false,
  vs: false,
  misijneNovinky: false,
};

interface DataTableProps {
  data: Person[];
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(DEFAULT_HIDDEN);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showColumns, setShowColumns] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 50 },
    },
  });

  const filteredCount = table.getFilteredRowModel().rows.length;
  const memberFilter =
    (columnFilters.find((f) => f.id === "clen")?.value as string) ?? "all";

  function exportCSV() {
    const headers = ["Priezvisko", "Meno", "Obec", "PSČ", "E-mail", "Telefón", "Člen"];
    const rows = table.getFilteredRowModel().rows.map((row) => {
      const p = row.original;
      return [p.priezvisko, p.meno, p.obec, p.psc, p.email, p.telefon, p.clen ? "Áno" : "Nie"].join(";");
    });
    const csv = [headers.join(";"), ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pmd-databaza-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Vyhľadať meno, priezvisko, obec, e-mail..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-9 w-full rounded-md border border-border bg-card pl-9 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
          />
          {globalFilter && (
            <button
              onClick={() => setGlobalFilter("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <select
          value={memberFilter}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "all") {
              setColumnFilters((prev) => prev.filter((f) => f.id !== "clen"));
            } else {
              setColumnFilters((prev) => [
                ...prev.filter((f) => f.id !== "clen"),
                { id: "clen", value: val },
              ]);
            }
          }}
          className="h-9 rounded-md border border-border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/20"
        >
          <option value="all">Všetci</option>
          <option value="true">Len členovia</option>
          <option value="false">Nečlenovia</option>
        </select>

        <div className="relative">
          <button
            onClick={() => setShowColumns(!showColumns)}
            className="flex h-9 items-center gap-1 rounded-md border border-border bg-card px-3 text-sm text-muted hover:text-foreground"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Stĺpce</span>
          </button>
          {showColumns && (
            <div className="absolute right-0 top-10 z-20 w-48 rounded-md border border-border bg-card p-2 shadow-lg">
              {table.getAllLeafColumns().map((column) => (
                <label
                  key={column.id}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted-bg"
                >
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    className="rounded border-border"
                  />
                  {typeof column.columnDef.header === "string"
                    ? column.columnDef.header
                    : column.id}
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={exportCSV}
          className="flex h-9 items-center gap-1 rounded-md border border-border bg-card px-3 text-sm text-muted hover:text-foreground"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export CSV</span>
        </button>
      </div>

      {/* Count */}
      <p className="text-xs text-muted">
        Zobrazených{" "}
        <span className="font-medium text-foreground">
          {filteredCount.toLocaleString("sk-SK")}
        </span>{" "}
        z {data.length.toLocaleString("sk-SK")} záznamov
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border bg-muted-bg/50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      "whitespace-nowrap px-3 py-2.5 text-left text-xs font-semibold text-muted uppercase tracking-wider",
                      header.column.getCanSort() && "cursor-pointer select-none hover:text-foreground"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="text-muted/50">
                          {header.column.getIsSorted() === "asc" ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ChevronDown className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronsUpDown className="h-3.5 w-3.5" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => setSelectedPerson(row.original)}
                className="cursor-pointer border-b border-border/50 transition-colors hover:bg-primary/[0.02]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="whitespace-nowrap px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Riadkov na stránku:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-8 rounded-md border border-border bg-card px-2 text-xs outline-none"
          >
            {[25, 50, 100, 250].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs text-muted mr-2">
            Strana {table.getState().pagination.pageIndex + 1} z{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="rounded p-1 hover:bg-muted-bg disabled:opacity-30"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded p-1 hover:bg-muted-bg disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded p-1 hover:bg-muted-bg disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="rounded p-1 hover:bg-muted-bg disabled:opacity-30"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Detail panel */}
      {selectedPerson && (
        <PersonDetail
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </div>
  );
}
