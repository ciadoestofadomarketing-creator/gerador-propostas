import type { Proposal } from "../../../lib/proposal";
import { A4Page, PageFooter, SectionHeader } from "./Page";

interface PageProps {
  p: Proposal;
  number: number;
  page: number;
}

export function ProofPage({ p, number, page }: PageProps) {
  const initial = p.consultant.trim().charAt(0).toUpperCase() || "?";

  return (
    <A4Page footer={<PageFooter p={p} page={page} />}>
      <SectionHeader number={number} kicker="Prova e autoridade" title="Quem está por trás" />

      <div className="no-break flex gap-6">
        <div className="font-display flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-paper-2 text-3xl font-bold text-accent">
          {initial}
        </div>
        <div>
          <div className="font-display text-2xl font-bold text-ink">{p.consultant}</div>
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{p.consultantRole}</div>
          <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-ink">{p.bioText}</p>
          {p.bioCredentials && <p className="mt-3 text-[13px] text-ink-dim">{p.bioCredentials}</p>}
        </div>
      </div>

      {p.metricsLine && (
        <div className="no-break mt-10 rounded-2xl border border-soft bg-paper-2 px-6 py-5 text-center font-mono text-[13px] tracking-wide text-ink">
          {p.metricsLine}
        </div>
      )}

      {p.testimonials.length > 0 && (
        <div className="mt-10 space-y-4">
          {p.testimonials.slice(0, 3).map((t) => (
            <figure key={t.id} className="no-break rounded-2xl border border-soft bg-paper-2 p-6">
              {t.result && <span className="chip chip-accent">{t.result}</span>}
              <blockquote className="mt-4 text-[15px] italic leading-relaxed text-ink">“{t.text}”</blockquote>
              <figcaption className="mt-4 text-[13px] text-ink-dim">
                <span className="font-semibold text-ink">{t.name}</span>
                {t.company && ` · ${t.company}`}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </A4Page>
  );
}
