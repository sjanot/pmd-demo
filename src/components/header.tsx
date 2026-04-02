import { Cross, Database, LogOut } from "lucide-react";

interface HeaderProps {
  onLogout: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="border-b border-border bg-primary text-white">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <Cross className="h-6 w-6 text-gold" />
          <Database className="h-5 w-5 text-white/70" />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold leading-tight">
            Pápežské misijné diela
          </h1>
          <p className="text-xs text-white/60">Správa databázy kontaktov</p>
        </div>
        <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold">
          Demo
        </span>
        <div className="flex items-center gap-2 ml-2 border-l border-white/20 pl-3">
          <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium">
            D
          </div>
          <span className="hidden text-sm sm:inline">demo@pmd.sk</span>
          <button
            onClick={onLogout}
            className="rounded p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            title="Odhlásiť sa"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
