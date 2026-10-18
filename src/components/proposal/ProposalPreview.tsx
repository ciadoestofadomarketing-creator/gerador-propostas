import type { CSSProperties } from "react";
import type { Proposal, SectionId } from "../../lib/proposal";
import { ClosingPage } from "./preview/ClosingPage";
import { CoverPage } from "./preview/CoverPage";
import { DiagnosisPage } from "./preview/DiagnosisPage";
import { InvestmentPage } from "./preview/InvestmentPage";
import { MethodPage } from "./preview/MethodPage";
import { ProofPage } from "./preview/ProofPage";
import { ValueStackPage } from "./preview/ValueStackPage";

/** Documento completo: capa + seções habilitadas, na ordem escolhida. */
export function ProposalPreview({ p }: { p: Proposal }) {
  const enabled = p.sections.filter((s) => s.enabled);

  return (
    <div
      id="print-root"
      data-theme={p.theme}
      data-font={p.fontPair}
      style={{ "--accent": p.accent } as CSSProperties}
    >
      <CoverPage p={p} />
      {enabled.map((section, index) => (
        <SectionPage key={section.id} id={section.id} p={p} number={index + 1} page={index + 2} />
      ))}
    </div>
  );
}

interface SectionPageProps {
  id: SectionId;
  p: Proposal;
  number: number;
  page: number;
}

function SectionPage({ id, p, number, page }: SectionPageProps) {
  switch (id) {
    case "diagnostico":
      return <DiagnosisPage p={p} number={number} page={page} />;
    case "metodo":
      return <MethodPage p={p} number={number} page={page} />;
    case "valuestack":
      return <ValueStackPage p={p} number={number} page={page} />;
    case "prova":
      return <ProofPage p={p} number={number} page={page} />;
    case "investimento":
      return <InvestmentPage p={p} number={number} page={page} />;
    case "fechamento":
      return <ClosingPage p={p} number={number} />;
  }
}
