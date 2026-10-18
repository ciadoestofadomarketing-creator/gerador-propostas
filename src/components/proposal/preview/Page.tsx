import type { ReactNode } from "react";
import type { Proposal } from "../../../lib/proposal";

interface A4PageProps {
  children: ReactNode;
  radial?: boolean;
  footer?: ReactNode;
}

/** Uma folha A4. Cada seção do documento é uma página separada. */
export function A4Page({ children, radial = false, footer }: A4PageProps) {
  return (
    <section className={`a4-page ${radial ? "paper-radial" : "paper"} mx-auto mb-10 flex flex-col`}>
      <div className="flex-1">{children}</div>
      {footer}
    </section>
  );
}

interface SectionHeaderProps {
  number: number;
  kicker: string;
  title: string;
}

export function SectionHeader({ number, kicker, title }: SectionHeaderProps) {
  return (
    <header className="no-break mb-10">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
        <span className="text-accent">{String(number).padStart(2, "0")}</span>
        <span className="mx-2 opacity-50">/</span>
        {kicker}
      </div>
      <h2 className="font-display mt-4 text-[40px] font-semibold leading-[1.05] tracking-tight text-ink">{title}</h2>
    </header>
  );
}

interface PageFooterProps {
  p: Proposal;
  page: number;
}

export function PageFooter({ p, page }: PageFooterProps) {
  return (
    <footer className="mt-10 flex items-center justify-between border-t border-soft pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
      <span>
        {p.company} · {p.offer}
      </span>
      <span>{String(page).padStart(2, "0")}</span>
    </footer>
  );
}

export function BrandMark({ p }: { p: Proposal }) {
  if (p.logoDataUrl) {
    return <img src={p.logoDataUrl} alt={p.company} className="h-10 max-w-[180px] object-contain object-left" />;
  }
  return <span className="wordmark text-2xl text-ink">{p.company}</span>;
}
