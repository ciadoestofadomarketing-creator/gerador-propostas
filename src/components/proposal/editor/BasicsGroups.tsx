import type { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SECTION_LABELS, validUntil, type Section } from "../../../lib/proposal";
import { Checkbox, DateField, Group, NumberField, TextAreaField, TextField } from "./fields";
import type { GroupProps } from "./types";

export function ClientGroup({ p, set }: GroupProps) {
  return (
    <Group title="B · Cliente" defaultOpen>
      <TextField label="Nome do cliente" value={p.clientName} onChange={(clientName) => set({ clientName })} />
      <TextField label="Empresa do cliente" value={p.clientCompany} onChange={(clientCompany) => set(renameClient(p, clientCompany))} />
    </Group>
  );
}

/** Troca o nome da empresa do cliente e atualiza a mensagem final, que cita esse nome. */
function renameClient(p: GroupProps["p"], clientCompany: string) {
  const closingMessage = p.clientCompany ? p.closingMessage.split(p.clientCompany).join(clientCompany) : p.closingMessage;
  return { clientCompany, closingMessage };
}

export function ProposalGroup({ p, set }: GroupProps) {
  return (
    <Group title="C · Proposta">
      <TextField label="Nome da oferta" value={p.offer} onChange={(offer) => set({ offer })} />
      <DateField label="Data da proposta" value={p.proposalDate} onChange={(proposalDate) => set({ proposalDate })} />
      <NumberField
        label="Validade (dias)"
        value={p.validityDays}
        onChange={(validityDays) => set({ validityDays })}
        hint={`Válida até ${validUntil(p)}`}
      />
      <TextField label="Consultor responsável" value={p.consultant} onChange={(consultant) => set({ consultant })} />
      <TextField label="Cargo" value={p.consultantRole} onChange={(consultantRole) => set({ consultantRole })} />
    </Group>
  );
}

export function SectionsGroup({ p, set }: GroupProps) {
  const setSections = (sections: Section[]) => set({ sections });

  const toggle = (index: number, enabled: boolean) =>
    setSections(p.sections.map((s, i) => (i === index ? { ...s, enabled } : s)));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= p.sections.length) return;
    const next = [...p.sections];
    [next[index], next[target]] = [next[target], next[index]];
    setSections(next);
  };

  return (
    <Group title="D · Seções do documento">
      <p className="text-xs text-ink-dim">A capa sempre aparece. Marque, desmarque e reordene as demais páginas.</p>
      <ul className="space-y-1.5">
        {p.sections.map((s, i) => (
          <li key={s.id} className="flex items-center justify-between rounded-lg border border-soft px-3 py-2">
            <Checkbox label={SECTION_LABELS[s.id]} checked={s.enabled} onChange={(v) => toggle(i, v)} />
            <div className="flex gap-1">
              <MoveButton label="Subir" disabled={i === 0} onClick={() => move(i, -1)}>
                <ArrowUp size={14} />
              </MoveButton>
              <MoveButton label="Descer" disabled={i === p.sections.length - 1} onClick={() => move(i, 1)}>
                <ArrowDown size={14} />
              </MoveButton>
            </div>
          </li>
        ))}
      </ul>
    </Group>
  );
}

function MoveButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded-md p-1.5 text-ink-dim hover:bg-paper-2 hover:text-accent disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

export function CoverGroup({ p, set }: GroupProps) {
  return (
    <Group title="Capa">
      <TextField label="Eyebrow (texto acima do título)" value={p.coverEyebrow} onChange={(coverEyebrow) => set({ coverEyebrow })} />
      <TextAreaField label="Título principal" rows={3} value={p.coverHeadline} onChange={(coverHeadline) => set({ coverHeadline })} />
      <TextAreaField label="Subtítulo" rows={3} value={p.coverSubtitle} onChange={(coverSubtitle) => set({ coverSubtitle })} />
    </Group>
  );
}

export function DiagnosisGroup({ p, set }: GroupProps) {
  return (
    <Group title="Diagnóstico">
      <TextAreaField label="Situação atual do cliente" rows={6} value={p.diagnosisText} onChange={(diagnosisText) => set({ diagnosisText })} />
      <NumberField
        label="Custo mensal do problema (R$)"
        value={p.monthlyPainCost}
        step={100}
        onChange={(monthlyPainCost) => set({ monthlyPainCost })}
        hint="Use 0 para esconder a projeção de 6 e 12 meses."
      />
    </Group>
  );
}

export function ClosingGroup({ p, set }: GroupProps) {
  return (
    <Group title="Fechamento">
      <TextAreaField label="Mensagem final" rows={4} value={p.closingMessage} onChange={(closingMessage) => set({ closingMessage })} />
      <TextField label="Texto do botão (CTA)" value={p.ctaText} onChange={(ctaText) => set({ ctaText })} />
    </Group>
  );
}
