import { fmtBRL, type Proposal } from "../../../lib/proposal";
import { A4Page, PageFooter, SectionHeader } from "./Page";

interface PageProps {
  p: Proposal;
  number: number;
  page: number;
}

export function DiagnosisPage({ p, number, page }: PageProps) {
  const cost = p.monthlyPainCost;
  const projections = [
    { label: "Custo por mês", value: cost, highlight: false },
    { label: "Em 6 meses", value: cost * 6, highlight: false },
    { label: "Em 12 meses", value: cost * 12, highlight: true },
  ];

  return (
    <A4Page footer={<PageFooter p={p} page={page} />}>
      <SectionHeader number={number} kicker="Diagnóstico" title="Onde você está hoje" />
      <p className="whitespace-pre-line text-[17px] leading-relaxed text-ink">{p.diagnosisText}</p>

      {cost > 0 && (
        <div className="no-break mt-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">O custo de não agir</div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {projections.map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border p-5 ${
                  item.highlight ? "border-accent bg-paper-2" : "border-soft bg-paper-2"
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">{item.label}</div>
                <div className={`font-display mt-3 text-[26px] font-bold ${item.highlight ? "text-accent" : "text-ink"}`}>
                  {fmtBRL(item.value)}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-dim">
            Cada mês sem uma solução estruturada aumenta essa conta. A boa notícia: ela tem conserto.
          </p>
        </div>
      )}
    </A4Page>
  );
}
