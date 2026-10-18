import { fmtBRL, valueStackSum, type Proposal } from "../../../lib/proposal";
import { A4Page, PageFooter, SectionHeader } from "./Page";

interface PageProps {
  p: Proposal;
  number: number;
  page: number;
}

export function ValueStackPage({ p, number, page }: PageProps) {
  const core = p.deliverables.filter((d) => !d.bonus);
  const bonuses = p.deliverables.filter((d) => d.bonus);

  return (
    <A4Page footer={<PageFooter p={p} page={page} />}>
      <SectionHeader number={number} kicker="Value Stack" title="Tudo o que você recebe" />

      <ul className="space-y-5">
        {core.map((d) => (
          <li key={d.id} className="no-break">
            <div className="flex items-baseline gap-3">
              <span className="gold-check text-[16px] font-semibold text-ink">{d.title}</span>
              <span className="dot-lead" />
              <span className="chip">{fmtBRL(d.value)}</span>
            </div>
            {d.desc && <p className="mt-1 pl-6 text-[13px] text-ink-dim">{d.desc}</p>}
          </li>
        ))}
      </ul>

      {bonuses.length > 0 && (
        <div className="mt-10 space-y-3">
          {bonuses.map((d) => (
            <div key={d.id} className="bonus-card no-break flex items-center justify-between gap-6 p-5">
              <div>
                <span className="chip chip-accent">Bônus</span>
                <div className="mt-3 text-[16px] font-semibold text-ink">{d.title}</div>
                {d.desc && <p className="mt-1 text-[13px] text-ink-dim">{d.desc}</p>}
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm text-ink-dim line-through">{fmtBRL(d.value)}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  Incluso nesta proposta
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="no-break mt-12 border-t border-soft pt-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
          Valor total se contratado separadamente
        </div>
        <div className="font-display mt-2 text-[56px] font-bold leading-none text-ink-dim line-through decoration-accent decoration-2">
          {fmtBRL(valueStackSum(p))}
        </div>
      </div>
    </A4Page>
  );
}
