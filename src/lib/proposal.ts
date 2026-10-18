import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ------------------------------------------------------------------
   Tipos
   ------------------------------------------------------------------ */

export type ThemeId = "dp-next" | "dp-next-claro";
export type FontPairId = "montserrat" | "manrope";
export type PayMode = "cartao" | "pix" | "boleto";
export type SectionId = "diagnostico" | "metodo" | "valuestack" | "prova" | "investimento" | "fechamento";

export interface Section {
  id: SectionId;
  enabled: boolean;
}

export interface MethodStep {
  id: string;
  title: string;
}

export interface Milestone {
  id: string;
  title: string;
}

export interface Deliverable {
  id: string;
  title: string;
  desc: string;
  value: number;
  bonus?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  result: string;
  text: string;
}

export interface Proposal {
  id: string;
  createdAt: string;
  updatedAt: string;

  // Marca
  company: string;
  logoDataUrl?: string;
  accent: string;
  theme: ThemeId;
  fontPair: FontPairId;

  // Cliente
  clientName: string;
  clientCompany: string;

  // Proposta
  offer: string;
  proposalDate: string;
  validityDays: number;
  consultant: string;
  consultantRole: string;

  sections: Section[];

  // Capa
  coverEyebrow: string;
  coverHeadline: string;
  coverSubtitle: string;

  // Diagnóstico
  diagnosisText: string;
  monthlyPainCost: number;

  // Método
  methodName: string;
  methodIntro: string;
  methodSteps: MethodStep[];
  milestones: Milestone[];

  // Value Stack
  deliverables: Deliverable[];

  // Prova
  bioText: string;
  bioCredentials: string;
  metricsLine: string;
  testimonials: Testimonial[];

  // Investimento
  payMode: PayMode;
  cardInstallment: number;
  cardCount: number;
  pixValue: number;
  pixDiscount: number;
  boletoInstallment: number;
  boletoCount: number;
  guaranteeEnabled: boolean;
  guaranteeText: string;
  urgencyReason: string;
  fullPriceText: string;

  // Fechamento
  closingMessage: string;
  ctaText: string;
}

/* ------------------------------------------------------------------
   Catálogos (temas, fontes, seções)
   ------------------------------------------------------------------ */

/* Identidade DP NeXT (manual técnico v1.0): azul-marinho, azul elétrico, ciano e o laranja do X. */
export const BRAND = {
  company: "DP NeXT",
  descriptor: "Soluções Digitais",
  accent: "#087BFF",
} as const;

export const THEMES: { id: ThemeId; label: string; paper: string; accent: string }[] = [
  { id: "dp-next", label: "Escuro (padrão)", paper: "#030A1B", accent: "#087BFF" },
  { id: "dp-next-claro", label: "Claro (impressão)", paper: "#FFFFFF", accent: "#087BFF" },
];

export const FONT_PAIRS: { id: FontPairId; label: string; display: string }[] = [
  { id: "montserrat", label: "Montserrat + Inter", display: "Montserrat" },
  { id: "manrope", label: "Manrope + Inter", display: "Manrope" },
];

export const SECTION_LABELS: Record<SectionId, string> = {
  diagnostico: "Diagnóstico",
  metodo: "O Método",
  valuestack: "Value Stack",
  prova: "Prova e autoridade",
  investimento: "Investimento",
  fechamento: "Fechamento",
};

export const DEFAULT_SECTIONS: Section[] = (Object.keys(SECTION_LABELS) as SectionId[]).map((id) => ({
  id,
  enabled: true,
}));

/* ------------------------------------------------------------------
   Utilitários
   ------------------------------------------------------------------ */

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function fmtBRL(n: number): string {
  return brl.format(Number.isFinite(n) ? n : 0);
}

export function fmtDateLong(iso: string): string {
  const date = new Date(`${iso.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

export function todayIso(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export function addDaysIso(iso: string, days: number): string {
  const date = new Date(`${iso.slice(0, 10)}T12:00:00`);
  date.setDate(date.getDate() + (Number.isFinite(days) ? days : 0));
  return date.toISOString().slice(0, 10);
}

export function validUntil(p: Proposal): string {
  return fmtDateLong(addDaysIso(p.proposalDate, p.validityDays));
}

export function valueStackSum(p: Proposal): number {
  return p.deliverables.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
}

export function realPrice(p: Proposal): number {
  switch (p.payMode) {
    case "cartao":
      return p.cardInstallment * p.cardCount;
    case "boleto":
      return p.boletoInstallment * p.boletoCount;
    case "pix":
      return p.pixValue - (p.pixValue * p.pixDiscount) / 100;
  }
}

export function pricePerDay(p: Proposal): number {
  return realPrice(p) / 365;
}

/** Texto principal do preço, conforme a forma de pagamento. Ex.: "12x de R$ 997". */
export function mainPriceLabel(p: Proposal): string {
  switch (p.payMode) {
    case "cartao":
      return `${p.cardCount}x de ${fmtBRL(p.cardInstallment)}`;
    case "boleto":
      return `${p.boletoCount}x de ${fmtBRL(p.boletoInstallment)}`;
    case "pix":
      return `${fmtBRL(realPrice(p))} à vista`;
  }
}

export function slug(text: string): string {
  return (
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "cliente"
  );
}

/* ------------------------------------------------------------------
   Store (Zustand + localStorage)
   ------------------------------------------------------------------ */

interface ProposalsState {
  proposals: Record<string, Proposal>;
  create: (p: Proposal) => string;
  update: (id: string, patch: Partial<Proposal>) => void;
  remove: (id: string) => void;
}

export const useProposals = create<ProposalsState>()(
  persist(
    (set) => ({
      proposals: {},
      create: (p) => {
        set((state) => ({ proposals: { ...state.proposals, [p.id]: p } }));
        return p.id;
      },
      update: (id, patch) =>
        set((state) => {
          const current = state.proposals[id];
          if (!current) return state;
          const next = { ...current, ...patch, updatedAt: new Date().toISOString() };
          return { proposals: { ...state.proposals, [id]: next } };
        }),
      remove: (id) =>
        set((state) => {
          const rest = { ...state.proposals };
          delete rest[id];
          return { proposals: rest };
        }),
    }),
    { name: "proposals-v1" },
  ),
);
