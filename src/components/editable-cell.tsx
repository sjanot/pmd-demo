"use client";

import { useState, useRef, useEffect } from "react";

interface EditableCellProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  type?: "text" | "number";
  placeholder?: string;
}

export function EditableCell({
  value,
  onSave,
  className = "",
  type = "text",
  placeholder = "",
}: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  function commit() {
    setEditing(false);
    if (draft !== value) {
      onSave(draft);
    }
  }

  if (!editing) {
    return (
      <span
        onDoubleClick={() => setEditing(true)}
        className={`block min-h-[1.25rem] cursor-text rounded px-1 -mx-1 hover:bg-primary/5 hover:ring-1 hover:ring-primary/20 ${className}`}
        title="Dvojklik na úpravu"
      >
        {value || <span className="text-muted/30">{placeholder || "—"}</span>}
      </span>
    );
  }

  return (
    <input
      ref={inputRef}
      type={type}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
          setDraft(value);
          setEditing(false);
        }
      }}
      className="h-6 w-full min-w-[3rem] rounded border border-ring bg-card px-1 text-sm outline-none focus:ring-2 focus:ring-ring/30"
    />
  );
}
