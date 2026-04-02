import { X, User, MapPin, Mail, Phone, Calendar, CreditCard } from "lucide-react";
import { cn } from "../lib/utils";
import type { Person } from "../types/person";

interface PersonDetailProps {
  person: Person;
  onClose: () => void;
}

export function PersonDetail({ person, onClose }: PersonDetailProps) {
  const fields = [
    { icon: User, label: "Oslovenie", value: person.oslovenie },
    { icon: User, label: "Priezvisko a meno", value: `${person.priezvisko} ${person.meno}` },
    { icon: MapPin, label: "Adresa", value: `${person.ulica}, ${person.psc} ${person.obec}` },
    { icon: Mail, label: "E-mail", value: person.email || "—" },
    { icon: Phone, label: "Telefón", value: person.telefon || "—" },
    { icon: Calendar, label: "Dátum zápisu", value: person.datumZapisu ? new Date(person.datumZapisu).toLocaleDateString("sk-SK") : "—" },
    { icon: CreditCard, label: "Variabilný symbol", value: person.vs || "—" },
  ];

  const flags = [
    { label: "Člen", value: person.clen },
    { label: "Členská karta", value: person.clenskaKarta },
    { label: "Nechce ĎL", value: person.nechceDL },
    { label: "Nechce kalendár", value: person.nechceKalendar },
    { label: "Nechce časopis", value: person.nechceCasopis },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
          <h2 className="text-sm font-semibold text-white">
            Detail záznamu #{person.id}
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-white/60 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Basic info */}
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.label} className="flex items-start gap-3">
                <field.icon className="mt-0.5 h-4 w-4 text-muted shrink-0" />
                <div>
                  <p className="text-xs text-muted">{field.label}</p>
                  <p className="text-sm font-medium">{field.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Flags */}
          <div className="rounded-lg border border-border p-3">
            <p className="mb-2 text-xs font-semibold text-muted uppercase tracking-wider">
              Príznaky
            </p>
            <div className="flex flex-wrap gap-2">
              {flags.map((flag) => (
                <span
                  key={flag.label}
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                    flag.value
                      ? "bg-success/10 text-success"
                      : "bg-muted-bg text-muted"
                  )}
                >
                  {flag.label}: {flag.value ? "Áno" : "Nie"}
                </span>
              ))}
            </div>
          </div>

          {/* Misijné novinky */}
          {person.misijneNovinky && (
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted">Misijné novinky</p>
              <p className="text-sm font-medium">{person.misijneNovinky}</p>
            </div>
          )}

          {/* Poznámka */}
          {person.poznamka && (
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted">Poznámka</p>
              <p className="text-sm">{person.poznamka}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
