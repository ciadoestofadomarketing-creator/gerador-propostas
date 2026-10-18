import { ImagePlus, Trash2 } from "lucide-react";
import { FONT_PAIRS, THEMES } from "../../../lib/proposal";
import { Field, FieldSet, Group, TextField } from "./fields";
import type { GroupProps } from "./types";

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function LogoUpload({ value, onChange }: { value?: string; onChange: (dataUrl?: string) => void }) {
  const handleFile = async (file?: File) => {
    if (file) onChange(await readFileAsDataUrl(file));
  };

  return (
    <FieldSet label="Logo (opcional)">
      <div className="flex items-center gap-3">
        <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-soft px-3 py-3 text-xs text-ink-dim hover:border-accent hover:text-accent">
          {value ? <img src={value} alt="Logo" className="h-8 max-w-[140px] object-contain" /> : <ImagePlus size={16} />}
          {value ? "Trocar logo" : "Enviar imagem"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        </label>
        {value && (
          <button type="button" onClick={() => onChange(undefined)} className="rounded-lg p-2 text-ink-dim hover:text-red-400" title="Remover logo">
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </FieldSet>
  );
}

export function AccentPicker({ value, onChange }: { value: string; onChange: (hex: string) => void }) {
  return (
    <Field label="Cor de destaque">
      <div className="flex items-center gap-3">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-9 w-12 cursor-pointer rounded border border-soft bg-transparent" />
        <span className="font-mono text-xs uppercase text-ink-dim">{value}</span>
      </div>
    </Field>
  );
}

export function BrandGroup({ p, set }: GroupProps) {
  return (
    <Group title="A · Sua marca" defaultOpen>
      <TextField label="Nome da empresa" value={p.company} onChange={(company) => set({ company })} />
      <LogoUpload value={p.logoDataUrl} onChange={(logoDataUrl) => set({ logoDataUrl })} />
      <AccentPicker value={p.accent} onChange={(accent) => set({ accent })} />

      <FieldSet label="Tema">
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => set({ theme: t.id, accent: t.accent })}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs ${
                p.theme === t.id ? "border-accent text-ink" : "border-soft text-ink-dim hover:text-ink"
              }`}
            >
              <span className="h-4 w-4 shrink-0 rounded-full border border-soft" style={{ background: `linear-gradient(135deg, ${t.paper} 50%, ${t.accent} 50%)` }} />
              {t.label}
            </button>
          ))}
        </div>
      </FieldSet>

      <FieldSet label="Tipografia">
        <div className="grid grid-cols-2 gap-2">
          {FONT_PAIRS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => set({ fontPair: f.id })}
              className={`rounded-lg border px-3 py-2 text-left ${p.fontPair === f.id ? "border-accent" : "border-soft hover:border-ink-dim"}`}
            >
              <span className="block text-lg leading-tight text-ink" style={{ fontFamily: `"${f.display}"` }}>
                Aa Proposta
              </span>
              <span className="text-[11px] text-ink-dim">{f.label}</span>
            </button>
          ))}
        </div>
      </FieldSet>
    </Group>
  );
}
