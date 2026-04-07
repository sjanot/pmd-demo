"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Download,
  Eye,
  Plus,
  Trash2,
  Undo2,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { Person } from "../types/person";
import { EMPLOYEES } from "../types/person";
import { PersonDetail } from "./person-detail";
import { EditableCell } from "./editable-cell";

function buildColumns(
  onUpdate: (rowIndex: number, key: string, value: unknown) => void,
  onDelete: (rowIndex: number) => void
): ColumnDef<Person>[] {
  const base: ColumnDef<Person>[] = [
    {
      id: "actions",
      header: "",
      size: 36,
      enableSorting: false,
      cell: ({ row }) => (
        <button
          onClick={() => onDelete(row.index)}
          className="rounded p-0.5 text-muted/40 hover:text-accent hover:bg-accent/10 transition-colors"
          title="Vymazať riadok"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      ),
    },
    {
      accessorKey: "priezvisko",
      header: "Priezvisko",
      size: 140,
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
      size: 110,
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
      size: 180,
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
      size: 150,
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
      size: 70,
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
      size: 210,
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
      size: 150,
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
      size: 80,
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
      size: 80,
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
      size: 80,
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
      size: 70,
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
      size: 110,
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
      size: 120,
      enableHiding: true,
    },
    {
      accessorKey: "vs",
      header: "VS",
      size: 70,
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
      size: 100,
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
    size: 75,
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

  // Clear all donations for a row
  const clearDonationsCol: ColumnDef<Person> = {
    id: "clear_dary",
    header: "",
    size: 36,
    enableSorting: false,
    cell: ({ row }: { row: { index: number; original: Person } }) => {
      const hasDary = EMPLOYEES.some((e) => row.original.dary[e.id] != null);
      if (!hasDary) return null;
      return (
        <button
          onClick={() => {
            for (const e of EMPLOYEES) {
              onUpdate(row.index, `dar_${e.id}`, null);
            }
          }}
          className="rounded p-0.5 text-muted/40 hover:text-accent hover:bg-accent/10 transition-colors"
          title="Vymazať všetky dary v riadku"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      );
    },
  };

  // actions(0) + 7 data columns, then donations + clear, then the rest
  return [...base.slice(0, 8), ...donationColumns, clearDonationsCol, ...base.slice(8)];
}

const DEFAULT_HIDDEN: Record<string, boolean> = {
  oslovenie: false,
  datumZapisu: false,
  vs: false,
  misijneNovinky: false,
};

const ROW_HEIGHT = 33;

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
  const [deletedToast, setDeletedToast] = useState<{
    person: Person;
    index: number;
  } | null>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const topScrollRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  useEffect(() => {
    const table = tableContainerRef.current;
    const top = topScrollRef.current;
    if (!table || !top) return;

    function onTableScroll() {
      if (syncing.current) return;
      syncing.current = true;
      if (top) top.scrollLeft = table!.scrollLeft;
      syncing.current = false;
    }
    function onTopScroll() {
      if (syncing.current) return;
      syncing.current = true;
      if (table) table.scrollLeft = top!.scrollLeft;
      syncing.current = false;
    }

    table.addEventListener("scroll", onTableScroll);
    top.addEventListener("scroll", onTopScroll);
    return () => {
      table.removeEventListener("scroll", onTableScroll);
      top.removeEventListener("scroll", onTopScroll);
    };
  }, []);

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

  const handleDelete = useCallback((rowIndex: number) => {
    setData((prev) => {
      const person = prev[rowIndex];
      setDeletedToast({ person, index: rowIndex });
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setDeletedToast(null), 8000);
      return prev.filter((_, i) => i !== rowIndex);
    });
  }, []);

  const handleUndo = useCallback(() => {
    if (!deletedToast) return;
    const { person, index } = deletedToast;
    setData((prev) => {
      const next = [...prev];
      next.splice(Math.min(index, next.length), 0, person);
      return next;
    });
    setDeletedToast(null);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
  }, [deletedToast]);

  const columns = buildColumns(handleUpdate, handleDelete);

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
    enableMultiSort: true,
    maxMultiSortColCount: 3,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 20,
  });

  // Build CSS grid template from visible columns
  const visibleColumns = table.getVisibleLeafColumns();
  const gridTemplate = useMemo(
    () => visibleColumns.map((col) => `${col.getSize()}px`).join(" "),
    [visibleColumns]
  );
  const totalWidth = useMemo(
    () => visibleColumns.reduce((sum, col) => sum + col.getSize(), 0),
    [visibleColumns]
  );

  const filteredCount = rows.length;
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
    tableContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function exportCSV() {
    const headers = [
      "Priezvisko", "Meno", "Ulica", "Obec", "PSČ", "E-mail", "Telefón",
      ...EMPLOYEES.map((e) => `Dar - ${e.name}`),
      "Ďak. list", "Časopis", "Kalendár", "Člen",
    ];
    const csvRows = table.getFilteredRowModel().rows.map((row) => {
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
    const csv = [headers.join(";"), ...csvRows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pmd-databaza-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 180px)" }}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
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
      <div className="flex items-center justify-between pb-2">
        <p className="text-xs text-muted">
          Zobrazených{" "}
          <span className="font-medium text-foreground">
            {filteredCount.toLocaleString("sk-SK")}
          </span>{" "}
          z {data.length.toLocaleString("sk-SK")} záznamov
        </p>
        <p className="text-xs text-muted/60">
          Dvojklik = úprava · Shift+klik na hlavičku = zoradiť podľa viacerých stĺpcov
        </p>
      </div>

      {/* Top horizontal scrollbar */}
      <div
        ref={topScrollRef}
        className="overflow-x-auto scrollbar-visible"
        style={{ overflowY: "hidden", maxHeight: 12 }}
      >
        <div style={{ width: `${totalWidth}px`, height: 1 }} />
      </div>

      {/* Virtualized scrollable table using CSS grid for column alignment */}
      <div
        ref={tableContainerRef}
        className="flex-1 overflow-auto rounded-lg border border-border bg-card shadow-sm scrollbar-visible"
      >
        <div style={{ minWidth: `${totalWidth}px` }}>
          {/* Header */}
          <div
            className="sticky top-0 z-10 border-b border-border bg-muted-bg"
            style={{ display: "grid", gridTemplateColumns: gridTemplate }}
          >
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => {
                const isDonation = header.id.startsWith("dar_");
                return (
                  <div
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
                        <span className="text-muted/50 flex items-center">
                          {header.column.getIsSorted() === "asc" ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ChevronDown className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronsUpDown className="h-3.5 w-3.5" />
                          )}
                          {sorting.length > 1 && header.column.getIsSorted() && (
                            <span className="ml-0.5 text-[9px] font-bold text-primary">
                              {header.column.getSortIndex() + 1}
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Body */}
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <div
                  key={row.id}
                  className="border-b border-border/50 transition-colors hover:bg-primary/[0.02]"
                  style={{
                    display: "grid",
                    gridTemplateColumns: gridTemplate,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isDonation = cell.column.id.startsWith("dar_");
                    return (
                      <div
                        key={cell.id}
                        className={cn(
                          "flex items-center whitespace-nowrap px-3 overflow-hidden",
                          isDonation && "bg-gold/[0.02] border-l border-gold/10"
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selectedPerson && (
        <PersonDetail
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}

      {/* Undo toast */}
      {deletedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <span className="text-sm">
            Vymazaný záznam:{" "}
            <strong>
              {deletedToast.person.priezvisko} {deletedToast.person.meno}
            </strong>
          </span>
          <button
            onClick={handleUndo}
            className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary/90"
          >
            <Undo2 className="h-3.5 w-3.5" />
            Obnoviť
          </button>
          <button
            onClick={() => setDeletedToast(null)}
            className="text-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
