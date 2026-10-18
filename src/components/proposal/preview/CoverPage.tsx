import { fmtDateLong, validUntil, type Proposal } from "../../../lib/proposal";
import { A4Page, BrandMark } from "./Page";

export function CoverPage({ p }: { p: Proposal }) {
  const details = [
    { label: "Preparado para", value: p.clientName },
    { label: "Empresa", value: p.clientCompany },
    { label: "Data", value: fmtDateLong(p.proposalDate) },
    { label: "Válida até", value: validUntil(p) },
  ];

  return (
    <A4Page radial>
      <div className="flex min-h-[253mm] flex-col">
        <div className="flex items-center justify-between">
          <BrandMark p={p} size="lg" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">Proposta comercial</span>
        </div>

        <div className="my-auto py-16">
          <span className="chip chip-accent">{p.coverEyebrow}</span>
          <h1 className="font-display mt-8 text-[52px] font-bold leading-[1.02] tracking-tight text-ink">
            {p.coverHeadline}
          </h1>
          <p className="mt-8 max-w-[140mm] text-lg leading-relaxed text-ink-dim">{p.coverSubtitle}</p>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-highlight">{p.offer}</p>
        </div>

        <div className="grid grid-cols-4 gap-6 border-t border-soft pt-6">
          {details.map((d) => (
            <div key={d.label}>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">{d.label}</div>
              <div className="mt-2 text-sm font-medium text-ink">{d.value}</div>
            </div>
          ))}
        </div>
      </div>
    </A4Page>
  );
}
