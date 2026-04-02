"use client";

import { useMemo } from "react";
import { Header } from "../components/header";
import { StatsCards } from "../components/stats-cards";
import { DataTable } from "../components/data-table";
import { generateData } from "../data/generate";

export default function Home() {
  const data = useMemo(() => generateData(40000), []);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1600px] flex-1 space-y-4 px-4 py-4 sm:px-6">
        <StatsCards data={data} />
        <DataTable data={data} />
      </main>
      <footer className="border-t border-border py-3 text-center text-xs text-muted">
        Demo verzia — Pápežské misijné diela © {new Date().getFullYear()} |
        Vytvoril{" "}
        <a
          href="https://it-dk.sk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          it-dk.sk
        </a>
      </footer>
    </>
  );
}
