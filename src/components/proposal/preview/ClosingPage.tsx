import { validUntil, type Proposal } from "../../../lib/proposal";
import { A4Page, BrandMark, SectionHeader } from "./Page";

interface PageProps {
  p: Proposal;
  number: number;
}

export function ClosingPage({ p, number }: PageProps) {
  return (
    <A4Page radial>
      <div className="flex min-h-[253mm] flex-col">
        <SectionHeader number={number} kicker="Fechamento" title="Próximo passo" />

        <p className="whitespace-pre-line text-[20px] leading-relaxed text-ink">{p.closingMessage}</p>

        <div className="mt-12">
          <span className="chip chip-accent !px-8 !py-4 !text-[15px]">{p.ctaText} →</span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-12 pt-20">
          <Signature label="Pela empresa" name={p.consultant} detail={p.company} />
          <Signature label="De acordo" name={p.clientName} detail={p.clientCompany} />
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-soft pt-5">
          <BrandMark p={p} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            Proposta válida até {validUntil(p)}
          </span>
        </div>
      </div>
    </A4Page>
  );
}

function Signature({ label, name, detail }: { label: string; name: string; detail: string }) {
  return (
    <div>
      <div className="h-12 border-b border-ink-dim" />
      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">{label}</div>
      <div className="mt-1 text-sm font-medium text-ink">{name}</div>
      <div className="text-xs text-ink-dim">{detail}</div>
    </div>
  );
}
