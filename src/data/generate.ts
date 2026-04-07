import type { Person } from "../types/person";
import { EMPLOYEES } from "../types/person";

const SURNAMES = [
  "NOVÁK", "HORVÁTH", "KOVÁČ", "VARGA", "TÓTH", "NAGY", "BALÁŽ", "MOLNÁR",
  "SZABÓ", "LUKÁČ", "ČERNÝ", "DVOŘÁK", "POLÁK", "HRUŠKA", "ONDREJKA",
  "KUČERA", "POSPÍŠIL", "PROCHÁZKA", "ŠIMKO", "JURČO", "KRAJČÍ", "ŠTEFAN",
  "MIKULA", "BEŇO", "GAJDOŠ", "ORAVEC", "KOVÁČIK", "HRABOVSKÝ", "ZÁBORSKÝ",
  "HOLUB", "MÉSZÁROS", "KISS", "TAKÁČ", "BÍRO", "FARKAŠ", "HEGEDÜŠ",
  "LACKO", "DANKO", "MACHALA", "SEDLÁK", "KOLESÁR", "RUSNÁK", "PAVLOV",
  "HUDÁK", "ČECH", "BEDNÁR", "STANÍK", "ĎURČO", "VRÁBEL", "JANČO",
];

const MALE_NAMES = [
  "Ján", "Peter", "Jozef", "Martin", "Milan", "Michal", "Tomáš", "Lukáš",
  "Andrej", "Marek", "Štefan", "Pavol", "Vladimír", "František", "Róbert",
  "Dávid", "Daniel", "Matúš", "Jakub", "Samuel", "Patrik", "Filip",
  "Rastislav", "Adrián", "Branislav", "Eduard", "Kamil", "Roman", "Ivan",
];

const FEMALE_NAMES = [
  "Mária", "Anna", "Eva", "Zuzana", "Katarína", "Jana", "Martina", "Helena",
  "Monika", "Veronika", "Lucia", "Petra", "Ivana", "Natália", "Lenka",
  "Andrea", "Daniela", "Silvia", "Renáta", "Gabriela", "Barbora", "Kristína",
  "Beáta", "Dominika", "Simona", "Tatiana", "Michaela", "Alena", "Božena",
];

const CITIES = [
  "Bratislava", "Košice", "Prešov", "Žilina", "Banská Bystrica", "Nitra",
  "Trnava", "Trenčín", "Martin", "Poprad", "Zvolen", "Považská Bystrica",
  "Michalovce", "Piešťany", "Nové Zámky", "Spišská Nová Ves", "Komárno",
  "Humenné", "Levice", "Bardejov", "Liptovský Mikuláš", "Ružomberok",
  "Topoľčany", "Dubnica nad Váhom", "Čadca", "Rimavská Sobota", "Lučenec",
  "Pezinok", "Šaľa", "Partizánske", "Skalica", "Senica", "Dolný Kubín",
  "Snina", "Gelnica", "Kežmarok", "Stará Ľubovňa", "Trstená", "Tvrdošín",
  "Moldava nad Bodvou", "Revúca", "Brezno", "Detva", "Turčianske Teplice",
];

const STREETS = [
  "Hlavná", "Dlhá", "Krátka", "Nová", "Školská", "Záhradná", "Kvetná",
  "Hviezdoslavova", "Námestie SNP", "Štúrova", "Partizánska", "Mierová",
  "Lipová", "Slnečná", "Kukučínova", "Štefánikova", "Jesenského",
  "Moyzesova", "Rázusova", "Bernolákova", "Bottova", "Chalupkova",
  "Dostojevského", "Francisciho", "Gorazdova", "Hurbanová", "Jánošíkova",
  "Kalinčiakova", "Lazovná", "Matuškova", "Okružná", "Poľná", "Robotnícka",
  "Sadová", "Tatranská", "Ulica mieru", "Vajanského", "Wolkerova",
];

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePSC(): string {
  return `${rand(1, 9)}${rand(0, 9)}${rand(0, 9)} ${rand(0, 9)}${rand(0, 9)}`;
}

function generatePhone(): string {
  if (Math.random() < 0.3) return "";
  const prefix = pick(["902", "903", "905", "907", "910", "911", "915", "917", "918", "919", "940", "944", "948", "949", "950", "951"]);
  return `+421 ${prefix} ${rand(100, 999)} ${rand(100, 999)}`;
}

function generateEmail(name: string, surname: string): string {
  if (Math.random() < 0.4) return "";
  const domains = ["gmail.com", "zoznam.sk", "azet.sk", "centrum.sk", "post.sk", "yahoo.com", "outlook.com"];
  const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const s = surname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const variants = [`${n}.${s}`, `${s}.${n}`, `${n}${s}`, `${n[0]}.${s}`, `${s}${rand(1, 99)}`];
  return `${pick(variants)}@${pick(domains)}`;
}

function generateDate(): string | null {
  if (Math.random() < 0.1) return null;
  const year = rand(2015, 2025);
  const month = rand(1, 12);
  const day = rand(1, 28);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function generateData(count: number): Person[] {
  const generated: Person[] = [];

  for (let i = 1; i <= count; i++) {
    const isFemale = Math.random() < 0.6;
    const surname = pick(SURNAMES);
    const displaySurname = isFemale ? surname + "OVÁ" : surname;
    const name = isFemale ? pick(FEMALE_NAMES) : pick(MALE_NAMES);

    generated.push({
      id: i,
      datumZapisu: generateDate(),
      oslovenie: isFemale ? "Vážená pani" : "Vážený pán",
      priezvisko: displaySurname,
      meno: name,
      ulica: `${pick(STREETS)} ${rand(1, 200)}/${rand(1, 50)}`,
      psc: generatePSC(),
      obec: pick(CITIES),
      email: generateEmail(name, displaySurname),
      poznamka: Math.random() < 0.1 ? pick(["Z webu", "Telefonicky", "Osobne", "Odporúčanie", "Akcia", "Farnosť"]) : "",
      vs: Math.random() < 0.3 ? String(rand(1000, 9999)) : "",
      nechceDL: Math.random() < 0.05,
      clenskaKarta: Math.random() < 0.2,
      clen: Math.random() < 0.25,
      nechceKalendar: Math.random() < 0.08,
      nechceCasopis: Math.random() < 0.06,
      telefon: generatePhone(),
      misijneNovinky: Math.random() < 0.3 ? "áno" : Math.random() < 0.1 ? "nie" : "",
      dary: Object.fromEntries(
        EMPLOYEES.map((e) => [
          e.id,
          Math.random() < 0.15 ? rand(5, 200) : null,
        ])
      ),
    });
  }

  return generated;
}
