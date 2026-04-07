"use client";

import { useState, useCallback } from "react";
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
  Plus,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { Person } from "../types/person";
import { EMPLOYEES } from "../types/person";
import { PersonDetail } from "./person-detail";
import { EditableCell } from "./editable-cell";

function buildColumns(
  onUpdate: (rowIndex: number, key: string, value: unknown) => void
): ColumnDef<Person>[] {
  const base: ColumnDef<Person>[] = [
    {
      accessorKey: "priezvisko",
      header: "Priezvisko",
      cell: ({ row }) => (
        <EditableCell
          value={row.getValue("priezvisko")}
          onSave={(v) => onUpdate(row.index, "priezvisko", v)}
          className="font-medium"
        />
      ),
    },
    {
      accessorKey: "meno",
      header: "Meno",
      cell: ({ row }) => (
        <EditableCell
          value={row.getValue("meno")}
          onSave={(v) => onUpdate(row.index, "meno", v)}
        />
      ),
    },
    {
      accessorKey: "ulica",
      header: "Ulica",
      cell: ({ row }) => (
        <EditableCell
          value={row.getValue("ulica")}
          onSave={(v) => onUpdate(row.index, "ulica", v)}
        />
      ),
    },
    {
      accessorKey: "obec",
      header: "Obec",
      cell: ({ row }) => (
        <EditableCell
          value={row.getValue("obec")}
          onSave={(v) => onUpdate(row.index, "obec", v)}
        />
      ),
    },
    {
      accessorKey: "psc",
      header: "PSČ",
      cell: ({ row }) => (
        <EditableCell
          value={row.getValue("psc")}
          onSave={(v) => onUpdate(row.index, "psc", v)}
        />
      ),
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: ({ row }) => (
        <EditableCell
          value={row.getValue("email")}
          onSave={(v) => onUpdate(row.index, "email", v)}
          className="text-primary-light"
          placeholder=""
        />
      ),
    },
    {
      accessorKey: "telefon",
      header: "Telefón",
      cell: ({ row }) => (
        <EditableCell
          value={row.getValue("telefon")}
          onSave={(v) => onUpdate(row.index, "telefon", v)}
          placeholder=""
        />
      ),
    },
    {
      accessorKey: "nechceDL",
      header: "Ďak. list",
      cell: ({ row }) => {
        const val = row.getValue("nechceDL") as boolean;
        return (
          <button
            onClick={() => onUpdate(row.index, "nechceDL", !val)}
            className={cn(
              "inline-flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer transition-colors",
              val
                ? "bg-accent/10 text-accent"
                : "bg-success/10 text-success"
            )}
          >
            {val ? "Nechce" : "Chce"}
          </button>
        );
      },
    },
    {
      accessorKey: "nechceCasopis",
      header: "Časopis",
      cell: ({ row }) => {
        const val = row.getValue("nechceCasopis") as boolean;
        return (
          <button
            onClick={() => onUpdate(row.index, "nechceCasopis", !val)}
            className={cn(
              "inline-flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer transition-colors",
              val
                ? "bg-accent/10 text-accent"
                : "bg-success/10 text-success"
            )}
          >
            {val ? "Nechce" : "Chce"}
          </button>
        );
      },
    },
    {
      accessorKey: "nechceKalendar",
      header: "Kalendár",
      cell: ({ row }) => {
        const val = row.getValue("nechceKalendar") as boolean;
        return (
          <button
            onClick={() => onUpdate(row.index, "nechceKalendar", !val)}
            className={cn(
              "inline-flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer transition-colors",
              val
                ? "bg-accent/10 text-accent"
                : "bg-success/10 text-success"
            )}
          >
            {val ? "Nechce" : "Chce"}
          </button>
        );
      },
    },
    {
      accessorKey: "clen",
      header: "Člen",
      cell: ({ row }) => {
        const val = row.getValue("clen") as boolean;
        return (
          <button
            onClick={() => onUpdate(row.index, "clen", !val)}
            className={cn(
              "inline-flex rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer transition-colors",
              val
                ? "bg-success/10 text-success"
                : "bg-muted-bg text-muted"
            )}
          >
            {val ? "Áno" : "Nie"}
          </button>
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
      enableHiding: true,
    },
    {
      accessorKey: "oslovenie",
      header: "Oslovenie",
      enableHiding: true,
    },
    {
      accessorKey: "vs",
      header: "VS",
      enableHiding: true,
      cell: ({ row }) => (
        <EditableCell
          value={row.getValue("vs")}
          onSave={(v) => onUpdate(row.index, "vs", v)}
        />
      ),
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

  // Employee donation columns
  const donationColumns: ColumnDef<Person>[] = EMPLOYEES.map((emp) => ({
    id: `dar_${emp.id}`,
    accessorFn: (row: Person) => row.dary[emp.id],
    header: emp.name,
    cell: ({ row }: { row: { index: number; original: Person } }) => {
      const val = row.original.dary[emp.id];
      return (
        <EditableCell
          value={val != null ? String(val) : ""}
          onSave={(v) => {
            const num = v === "" ? null : Number(v);
            onUpdate(row.index, `dar_${emp.id}`, num);
          }}
          type="number"
          placeholder=""
          className={val != null ? "text-success font-medium" : ""}
        />
      );
    },
  }));

  // Insert donation columns after telefon (index 6) — before the boolean flags
  return [...base.slice(0, 7), ...donationColumns, ...base.slice(7)];
}

const DEFAULT_HIDDEN: Record<string, boolean> = {
  oslovenie: false,
  datumZapisu: false,
  vs: false,
  misijneNovinky: false,
};

interface DataTableProps {
  data: Person[];
}

export function DataTable({ data: initialData }: DataTableProps) {
  const [data, setData] = useState(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(DEFAULT_HIDDEN);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showColumns, setShowColumns] = useState(false);

  const handleUpdate = useCallback(
    (rowIndex: number, key: string, value: unknown) => {
      setData((prev) => {
        const next = [...prev];
        const row = { ...next[rowIndex] };
        if (key.startsWith("dar_")) {
          const empId = key.slice(4);
          row.dary = { ...row.dary, [empId]: value as number | null };
        } else {
          (row as Record<string, unknown>)[key] = value;
        }
        next[rowIndex] = row as Person;
        return next;
      });
    },
    []
  );

  const columns = buildColumns(handleUpdate);

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

  function addRow() {
    const newPerson: Person = {
      id: data.length + 1,
      datumZapisu: new Date().toISOString().slice(0, 10),
      oslovenie: "",
      priezvisko: "",
      meno: "",
      ulica: "",
      psc: "",
      obec: "",
      email: "",
      poznamka: "",
      vs: "",
      nechceDL: false,
      clenskaKarta: false,
      clen: false,
      nechceKalendar: false,
      nechceCasopis: false,
      telefon: "",
      misijneNovinky: "",
      dary: Object.fromEntries(EMPLOYEES.map((e) => [e.id, null])),
    };
    setData((prev) => [newPerson, ...prev]);
    table.setPageIndex(0);
  }

  function exportCSV() {
    const headers = [
      "Priezvisko", "Meno", "Ulica", "Obec", "PSČ", "E-mail", "Telefón",
      ...EMPLOYEES.map((e) => `Dar - ${e.name}`),
      "Ďak. list", "Časopis", "Kalendár", "Člen",
    ];
    const rows = table.getFilteredRowModel().rows.map((row) => {
      const p = row.original;
      return [
        p.priezvisko, p.meno, p.ulica, p.obec, p.psc, p.email, p.telefon,
        ...EMPLOYEES.map((e) => p.dary[e.id] ?? ""),
        p.nechceDL ? "Nechce" : "Chce",
        p.nechceCasopis ? "Nechce" : "Chce",
        p.nechceKalendar ? "Nechce" : "Chce",
        p.clen ? "Áno" : "Nie",
      ].join(";");
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
            <div className="absolute right-0 top-10 z-20 max-h-80 w-48 overflow-y-auto rounded-md border border-border bg-card p-2 shadow-lg">
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
          onClick={addRow}
          className="flex h-9 items-center gap-1 rounded-md bg-primary px-3 text-sm text-white hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nový riadok</span>
        </button>

        <button
          onClick={exportCSV}
          className="flex h-9 items-center gap-1 rounded-md border border-border bg-card px-3 text-sm text-muted hover:text-foreground"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export CSV</span>
        </button>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          Zobrazených{" "}
          <span className="font-medium text-foreground">
            {filteredCount.toLocaleString("sk-SK")}
          </span>{" "}
          z {data.length.toLocaleString("sk-SK")} záznamov
        </p>
        <p className="text-xs text-muted/60">
          Dvojklik na bunku = úprava
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm scrollbar-visible">
        <table className="min-w-max text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border bg-muted-bg/50">
                {headerGroup.headers.map((header) => {
                  const isDonation = header.id.startsWith("dar_");
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        "whitespace-nowrap px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider",
                        isDonation
                          ? "bg-gold/5 text-gold border-l border-gold/20"
                          : "text-muted",
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
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border/50 transition-colors hover:bg-primary/[0.02]"
              >
                {row.getVisibleCells().map((cell) => {
                  const isDonation = cell.column.id.startsWith("dar_");
                  return (
                    <td
                      key={cell.id}
                      className={cn(
                        "whitespace-nowrap px-3 py-1.5",
                        isDonation && "bg-gold/[0.02] border-l border-gold/10"
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
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
