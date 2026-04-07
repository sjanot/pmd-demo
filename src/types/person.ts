export interface Person {
  id: number;
  datumZapisu: string | null;
  oslovenie: string;
  priezvisko: string;
  meno: string;
  ulica: string;
  psc: string;
  obec: string;
  email: string;
  poznamka: string;
  vs: string;
  nechceDL: boolean;
  clenskaKarta: boolean;
  clen: boolean;
  nechceKalendar: boolean;
  nechceCasopis: boolean;
  telefon: string;
  misijneNovinky: string;
  /** Donation amounts per employee key */
  dary: Record<string, number | null>;
}

export interface Employee {
  id: string;
  name: string;
}

export const EMPLOYEES: Employee[] = [
  { id: "katka", name: "Katka" },
  { id: "marek", name: "Marek" },
  { id: "jana", name: "Jana" },
  { id: "peter", name: "Peter" },
  { id: "lucia", name: "Lucia" },
];
