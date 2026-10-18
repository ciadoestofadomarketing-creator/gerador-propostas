import { nanoid } from "nanoid";
import type { Deliverable, PayMode, Testimonial } from "../../../lib/proposal";
import { fmtBRL, realPrice, valueStackSum } from "../../../lib/proposal";
import { AddButton, Checkbox, Group, inputClass, ItemCard, NumberField, RemoveButton, TextAreaField, TextField } from "./fields";
import type { GroupProps } from "./types";

/* ------------------------------------------------------------------
   Lista simples de títulos (pilares e marcos do método)
   ------------------------------------------------------------------ */

interface TitleItem {
  id: string;
  title: string;
}

function TitleListEditor({ label, items, onChange, addLabel }: { label: string; items: TitleItem[]; onChange: (items: TitleItem[]) => void; addLabel: string }) {
  const edit = (id: string, title: string) => onChange(items.map((it) => (it.id === id ? { ...it, title } : it)));

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-ink-dim">{label}</span>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={it.id} className="flex items-center gap-2">
            <span className="w-5 font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
            <input className={inputClass} value={it.title} onChange={(e) => edit(it.id, e.target.value)} />
            <RemoveButton onClick={() => onChange(items.filter((x) => x.id !== it.id))} />
          </div>
        ))}
        <AddButton label={addLabel} onClick={() => onChange([...items, { id: nanoid(6), title: "" }])} />
      </div>
    </div>
  );
}

export function MethodGroup({ p, set }: GroupProps) {
  return (
    <Group title="O Método">
      <TextField label="Nome do método" value={p.methodName} onChange={(methodName) => set({ methodName })} />
      <TextAreaField label="Introdução" rows={6} value={p.methodIntro} onChange={(methodIntro) => set({ methodIntro })} />
      <TitleListEditor label="Pilares" addLabel="Adicionar pilar" items={p.methodSteps} onChange={(methodSteps) => set({ methodSteps })} />
      <TitleListEditor label="Marcos da linha do tempo" addLabel="Adicionar marco" items={p.milestones} onChange={(milestones) => set({ milestones })} />
    </Group>
  );
}

/* ------------------------------------------------------------------
   Value Stack
   ------------------------------------------------------------------ */

export function ValueStackGroup({ p, set }: GroupProps) {
  const edit = (id: string, patch: Partial<Deliverable>) =>
    set({ deliverables: p.deliverables.map((d) => (d.id === id ? { ...d, ...patch } : d)) });

  const add = () => set({ deliverables: [...p.deliverables, { id: nanoid(6), title: "Nova entrega", desc: "", value: 0 }] });

  return (
    <Group title="Value Stack">
      {p.deliverables.map((d) => (
        <ItemCard key={d.id} onRemove={() => set({ deliverables: p.deliverables.filter((x) => x.id !== d.id) })}>
          <TextField label="Entrega" value={d.title} onChange={(title) => edit(d.id, { title })} />
          <TextField label="Descrição (1 frase)" value={d.desc} onChange={(desc) => edit(d.id, { desc })} />
          <div className="grid grid-cols-2 items-end gap-3">
            <NumberField label="Valor (R$)" value={d.value} step={100} onChange={(value) => edit(d.id, { value })} />
            <div className="pb-2">
              <Checkbox label="É bônus" checked={Boolean(d.bonus)} onChange={(bonus) => edit(d.id, { bonus })} />
            </div>
          </div>
        </ItemCard>
      ))}
      <AddButton label="Adicionar entrega" onClick={add} />
      <p className="text-xs text-ink-dim">
        Valor total do stack: <span className="text-accent">{fmtBRL(valueStackSum(p))}</span>
      </p>
    </Group>
  );
}

/* ------------------------------------------------------------------
   Prova e autoridade
   ------------------------------------------------------------------ */

const MAX_TESTIMONIALS = 3;

export function ProofGroup({ p, set }: GroupProps) {
  const edit = (id: string, patch: Partial<Testimonial>) =>
    set({ testimonials: p.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)) });

  const add = () =>
    set({ testimonials: [...p.testimonials, { id: nanoid(6), name: "", company: "", result: "", text: "" }] });

  return (
    <Group title="Prova e autoridade">
      <TextAreaField label="Bio" rows={4} value={p.bioText} onChange={(bioText) => set({ bioText })} />
      <TextField label="Credenciais" value={p.bioCredentials} onChange={(bioCredentials) => set({ bioCredentials })} />
      <TextField label="Linha de métricas" value={p.metricsLine} onChange={(metricsLine) => set({ metricsLine })} />

      <span className="block text-xs font-medium text-ink-dim">Depoimentos (até {MAX_TESTIMONIALS})</span>
      {p.testimonials.map((t) => (
        <ItemCard key={t.id} onRemove={() => set({ testimonials: p.testimonials.filter((x) => x.id !== t.id) })}>
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Nome" value={t.name} onChange={(name) => edit(t.id, { name })} />
            <TextField label="Empresa" value={t.company} onChange={(company) => edit(t.id, { company })} />
          </div>
          <TextField label="Resultado" placeholder="3x em 90 dias" value={t.result} onChange={(result) => edit(t.id, { result })} />
          <TextAreaField label="Depoimento" rows={3} value={t.text} onChange={(text) => edit(t.id, { text })} />
        </ItemCard>
      ))}
      <AddButton label="Adicionar depoimento" onClick={add} disabled={p.testimonials.length >= MAX_TESTIMONIALS} />
    </Group>
  );
}

/* ------------------------------------------------------------------
   Investimento
   ------------------------------------------------------------------ */

const PAY_MODES: { id: PayMode; label: string }[] = [
  { id: "cartao", label: "Cartão" },
  { id: "pix", label: "Pix" },
  { id: "boleto", label: "Boleto" },
];

export function InvestmentGroup({ p, set }: GroupProps) {
  return (
    <Group title="Investimento">
      <div>
        <span className="mb-1.5 block text-xs font-medium text-ink-dim">Forma de pagamento em destaque</span>
        <div className="grid grid-cols-3 gap-2" role="radiogroup">
          {PAY_MODES.map((m) => (
            <label
              key={m.id}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-xs font-medium ${
                p.payMode === m.id ? "border-accent text-accent" : "border-soft text-ink-dim hover:text-ink"
              }`}
            >
              <input type="radio" name="payMode" className="sr-only" checked={p.payMode === m.id} onChange={() => set({ payMode: m.id })} />
              {m.label}
            </label>
          ))}
        </div>
      </div>

      {p.payMode === "cartao" && (
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Parcelas" value={p.cardCount} min={1} onChange={(cardCount) => set({ cardCount })} />
          <NumberField label="Valor da parcela (R$)" value={p.cardInstallment} onChange={(cardInstallment) => set({ cardInstallment })} />
        </div>
      )}
      {p.payMode === "pix" && (
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Valor cheio (R$)" value={p.pixValue} step={100} onChange={(pixValue) => set({ pixValue })} />
          <NumberField label="Desconto (%)" value={p.pixDiscount} onChange={(pixDiscount) => set({ pixDiscount })} />
        </div>
      )}
      {p.payMode === "boleto" && (
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Parcelas" value={p.boletoCount} min={1} onChange={(boletoCount) => set({ boletoCount })} />
          <NumberField label="Valor da parcela (R$)" value={p.boletoInstallment} onChange={(boletoInstallment) => set({ boletoInstallment })} />
        </div>
      )}
      <p className="text-xs text-ink-dim">
        Total cobrado: <span className="text-accent">{fmtBRL(realPrice(p))}</span>
      </p>

      <Checkbox label="Oferecer garantia" checked={p.guaranteeEnabled} onChange={(guaranteeEnabled) => set({ guaranteeEnabled })} />
      {p.guaranteeEnabled && (
        <TextAreaField label="Texto da garantia" rows={3} value={p.guaranteeText} onChange={(guaranteeText) => set({ guaranteeText })} />
      )}
      <TextAreaField label="Motivo da urgência" rows={2} value={p.urgencyReason} onChange={(urgencyReason) => set({ urgencyReason })} />
      <TextField label="Rótulo do preço âncora" value={p.fullPriceText} onChange={(fullPriceText) => set({ fullPriceText })} />
    </Group>
  );
}
