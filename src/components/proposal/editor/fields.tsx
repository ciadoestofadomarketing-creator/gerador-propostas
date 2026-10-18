import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";

/* Componentes de formulário reutilizados por todos os grupos do editor. */

const inputClass =
  "w-full rounded-lg border border-soft bg-paper-2 px-3 py-2 text-sm text-ink outline-none transition placeholder:text-ink-dim/60 focus:border-accent";

export function Group({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = open ? ChevronDown : ChevronRight;

  return (
    <div className="border-b border-soft">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-5 py-4 text-left text-sm font-semibold text-ink hover:text-accent"
      >
        <Icon size={16} className="text-ink-dim" />
        {title}
      </button>
      {open && <div className="space-y-4 px-5 pb-6">{children}</div>}
    </div>
  );
}

/** Rótulo + controles que não são um único input (grades de botões, upload). */
export function FieldSet({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={label}>
      <span className="mb-1.5 block text-xs font-medium text-ink-dim">{label}</span>
      {children}
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-dim">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-accent">{hint}</span>}
    </label>
  );
}

interface TextProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
}

export function TextField({ label, value, onChange, hint, placeholder }: TextProps) {
  return (
    <Field label={label} hint={hint}>
      <input className={inputClass} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function TextAreaField({ label, value, onChange, hint, rows = 4 }: TextProps & { rows?: number }) {
  return (
    <Field label={label} hint={hint}>
      <textarea className={`${inputClass} resize-y leading-relaxed`} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

interface NumberProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  min?: number;
  step?: number;
}

export function NumberField({ label, value, onChange, hint, min = 0, step = 1 }: NumberProps) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="number"
        inputMode="decimal"
        className={inputClass}
        value={Number.isFinite(value) ? value : 0}
        min={min}
        step={step}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </Field>
  );
}

export function DateField({ label, value, onChange, hint }: TextProps) {
  return (
    <Field label={label} hint={hint}>
      <input type="date" className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
      <input type="checkbox" className="h-4 w-4 accent-[var(--accent)]" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function AddButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-soft py-2 text-xs font-medium text-ink-dim hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Plus size={14} /> {label}
    </button>
  );
}

export function RemoveButton({ onClick, label = "Remover" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className="shrink-0 rounded-md p-1.5 text-ink-dim hover:bg-paper-2 hover:text-red-400">
      <X size={14} />
    </button>
  );
}

/** Caixa que agrupa os campos de um item de lista (entregável, depoimento). */
export function ItemCard({ children, onRemove }: { children: ReactNode; onRemove: () => void }) {
  return (
    <div className="relative space-y-3 rounded-xl border border-soft bg-paper-2/40 p-3 pr-9">
      <div className="absolute right-1.5 top-1.5">
        <RemoveButton onClick={onRemove} />
      </div>
      {children}
    </div>
  );
}

export { inputClass };
