"use client";

import { useMemo, useState } from "react";
import { Header } from "../components/header";
import { StatsCards } from "../components/stats-cards";
import { DataTable } from "../components/data-table";
import { LoginForm } from "../components/login-form";
import { generateData } from "../data/generate";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const initialData = useMemo(() => generateData(40000), []);

  if (!loggedIn) {
    return <LoginForm onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <Header onLogout={() => setLoggedIn(false)} />
      <main className="mx-auto w-full max-w-[1600px] flex-1 space-y-4 px-4 py-4 sm:px-6">
        <StatsCards data={initialData} />
        <DataTable data={initialData} />
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
