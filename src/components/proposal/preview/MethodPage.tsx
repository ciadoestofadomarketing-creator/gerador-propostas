import type { Proposal } from "../../../lib/proposal";
import { A4Page, PageFooter, SectionHeader } from "./Page";

interface PageProps {
  p: Proposal;
  number: number;
  page: number;
}

export function MethodPage({ p, number, page }: PageProps) {
  return (
    <A4Page footer={<PageFooter p={p} page={page} />}>
      <SectionHeader number={number} kicker="O Método" title="Como vamos chegar lá" />

      <div className="font-display text-[30px] font-bold text-accent">{p.methodName}</div>
      <p className="mt-5 whitespace-pre-line text-[16px] leading-relaxed text-ink">{p.methodIntro}</p>

      {p.methodSteps.length > 0 && (
        <div className="no-break mt-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">Pilares</div>
          <div className="mt-4 flex flex-wrap gap-3">
            {p.methodSteps.map((step, i) => (
              <span key={step.id} className="chip !text-[12px] !normal-case !tracking-normal">
                <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                {step.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {p.milestones.length > 0 && (
        <div className="no-break mt-14">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">Linha do tempo</div>
          <Timeline titles={p.milestones.map((m) => ({ id: m.id, title: m.title }))} />
        </div>
      )}
    </A4Page>
  );
}

function Timeline({ titles }: { titles: { id: string; title: string }[] }) {
  return (
    <div className="relative mt-6">
      <div className="absolute left-[6px] right-[6px] top-[6px] h-px bg-accent opacity-40" />
      <div className="relative grid" style={{ gridTemplateColumns: `repeat(${titles.length}, minmax(0, 1fr))` }}>
        {titles.map((m) => (
          <div key={m.id} className="pr-3">
            <div className="h-[13px] w-[13px] rounded-full border-2 border-accent bg-paper" />
            <div className="mt-4 text-[13px] font-medium leading-snug text-ink">{m.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
