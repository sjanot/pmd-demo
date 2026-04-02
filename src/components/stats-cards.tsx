import { Users, UserCheck, Mail, Newspaper } from "lucide-react";
import type { Person } from "../types/person";

interface StatsCardsProps {
  data: Person[];
}

export function StatsCards({ data }: StatsCardsProps) {
  const total = data.length;
  const members = data.filter((p) => p.clen).length;
  const withEmail = data.filter((p) => p.email).length;
  const newsletter = data.filter((p) => p.misijneNovinky === "áno").length;

  const stats = [
    { label: "Celkom záznamov", value: total.toLocaleString("sk-SK"), icon: Users, color: "text-primary" },
    { label: "Aktívni členovia", value: members.toLocaleString("sk-SK"), icon: UserCheck, color: "text-success" },
    { label: "S e-mailom", value: withEmail.toLocaleString("sk-SK"), icon: Mail, color: "text-primary-light" },
    { label: "Misijné novinky", value: newsletter.toLocaleString("sk-SK"), icon: Newspaper, color: "text-gold" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border bg-card p-4 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
            <span className="text-xs text-muted">{stat.label}</span>
          </div>
          <p className="mt-1 text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
