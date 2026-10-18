import { ImagePlus, Trash2 } from "lucide-react";
import logoEscuro from "../../../assets/dpnext-logo-escuro.png";
import { FONT_PAIRS, THEMES } from "../../../lib/proposal";
import { FieldSet, Group, TextField } from "./fields";
import type { GroupProps } from "./types";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function LogoUpload({ value, onChange }: { value?: string; onChange: (dataUrl?: string) => void }) {
  const handleFile = async (file?: File) => {
    if (file) onChange(await readFileAsDataUrl(file));
  };

  return (
    <FieldSet label="Logo">
      <div className="flex items-center gap-3">
        <div className="flex h-12 flex-1 items-center rounded-lg border border-soft bg-app-bg px-3">
          <img src={value ?? logoEscuro} alt="Logo atual" className={`h-9 max-w-[160px] object-contain ${value ? "" : "brand-logo"}`} />
        </div>
        <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-soft px-3 py-3 text-xs text-ink-dim hover:border-accent hover:text-accent">
          <ImagePlus size={15} /> Trocar
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        </label>
        {value && (
          <button type="button" onClick={() => onChange(undefined)} className="rounded-lg p-2 text-ink-dim hover:text-red-400" title="Voltar ao logo oficial">
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <span className="mt-1 block text-xs text-ink-dim">O logo oficial da DP NeXT já é usado. Troque só se precisar.</span>
    </FieldSet>
  );
}

export function BrandGroup({ p, set }: GroupProps) {
  return (
    <Group title="A · Sua marca">
      <TextField label="Nome da empresa" value={p.company} onChange={(company) => set({ company })} />
      <LogoUpload value={p.logoDataUrl} onChange={(logoDataUrl) => set({ logoDataUrl })} />

      <FieldSet label="Fundo do documento">
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
              <span className="block text-lg font-bold leading-tight text-ink" style={{ fontFamily: `"${f.display}"` }}>
                Aa NeXT
              </span>
              <span className="text-[11px] text-ink-dim">{f.label}</span>
            </button>
          ))}
        </div>
      </FieldSet>
    </Group>
  );
}
