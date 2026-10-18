import type { ReactNode } from "react";
import { ShieldCheck, Clock } from "lucide-react";
import { fmtBRL, mainPriceLabel, pricePerDay, realPrice, validUntil, valueStackSum, type Proposal } from "../../../lib/proposal";
import { A4Page, PageFooter, SectionHeader } from "./Page";

interface PageProps {
  p: Proposal;
  number: number;
  page: number;
}

const PAY_MODE_NOTE: Record<Proposal["payMode"], string> = {
  cartao: "no cartão de crédito",
  pix: "via Pix",
  boleto: "no boleto bancário",
};

export function InvestmentPage({ p, number, page }: PageProps) {
  const perDay = Math.ceil(pricePerDay(p));
  const pixNote = p.payMode === "pix" && p.pixDiscount > 0 ? ` com ${p.pixDiscount}% de desconto` : "";

  return (
    <A4Page radial footer={<PageFooter p={p} page={page} />}>
      <SectionHeader number={number} kicker="Investimento" title="Seu investimento" />

      <div className="no-break">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">{p.fullPriceText}</div>
        <div className="font-display mt-2 text-[56px] font-bold leading-none text-ink-dim line-through decoration-accent decoration-2">
          {fmtBRL(valueStackSum(p))}
        </div>
      </div>

      <div className="invest-card no-break mt-10 px-8 py-10 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">Nesta proposta</div>
        <div className="font-display mt-4 text-[54px] font-bold leading-none text-accent">{mainPriceLabel(p)}</div>
        <div className="mt-4 text-sm text-ink-dim">
          {PAY_MODE_NOTE[p.payMode]}
          {pixNote} · total de {fmtBRL(realPrice(p))}
        </div>
        <div className="mt-6">
          <span className="chip chip-accent">Menos de {fmtBRL(perDay)} por dia</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {p.guaranteeEnabled && (
          <InfoCard icon={<ShieldCheck size={22} />} title="Garantia" text={p.guaranteeText} />
        )}
        <InfoCard
          icon={<Clock size={22} />}
          title={`Proposta válida até ${validUntil(p)}`}
          text={p.urgencyReason ? `Por quê? ${capitalize(p.urgencyReason)}.` : ""}
        />
      </div>
    </A4Page>
  );
}

function InfoCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="no-break flex gap-4 rounded-2xl border border-soft bg-paper-2 p-5">
      <div className="mt-0.5 shrink-0 text-accent">{icon}</div>
      <div>
        <div className="text-[15px] font-semibold text-ink">{title}</div>
        {text && <p className="mt-1 text-[13px] leading-relaxed text-ink-dim">{text}</p>}
      </div>
    </div>
  );
}

function capitalize(text: string): string {
  const clean = text.trim().replace(/\.$/, "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}
