import { ArrowLeft, Check, FileDown } from "lucide-react";
import { Link } from "react-router";
import { useProposals, type Proposal } from "../../lib/proposal";
import { BrandGroup } from "./editor/BrandGroup";
import { ClientGroup, ClosingGroup, CoverGroup, DiagnosisGroup, ProposalGroup, SectionsGroup } from "./editor/BasicsGroups";
import { InvestmentGroup, MethodGroup, ProofGroup, ValueStackGroup } from "./editor/ContentGroups";

interface EditorPanelProps {
  p: Proposal;
  onExport: () => void;
  exporting: boolean;
}

export function EditorPanel({ p, onExport, exporting }: EditorPanelProps) {
  const update = useProposals((s) => s.update);
  const set = (patch: Partial<Proposal>) => update(p.id, patch);
  const groupProps = { p, set };

  return (
    <aside className="flex h-full w-full flex-col border-r border-soft bg-paper lg:sticky lg:top-0 lg:h-screen lg:w-[380px] lg:shrink-0">
      <div className="sticky top-[53px] z-10 border-b border-soft bg-paper px-5 py-4 lg:top-0">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-ink-dim hover:text-ink">
            <ArrowLeft size={16} /> Nova proposta
          </Link>
          <span className="flex items-center gap-1 text-xs text-ink-dim">
            <Check size={14} className="text-accent" /> Auto-salvo
          </span>
        </div>
        <button
          type="button"
          onClick={onExport}
          disabled={exporting}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-app-bg transition hover:brightness-110 disabled:opacity-60"
        >
          <FileDown size={18} /> {exporting ? "Gerando PDF..." : "Exportar PDF"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <BrandGroup {...groupProps} />
        <ClientGroup {...groupProps} />
        <ProposalGroup {...groupProps} />
        <SectionsGroup {...groupProps} />
        <CoverGroup {...groupProps} />
        <DiagnosisGroup {...groupProps} />
        <MethodGroup {...groupProps} />
        <ValueStackGroup {...groupProps} />
        <ProofGroup {...groupProps} />
        <InvestmentGroup {...groupProps} />
        <ClosingGroup {...groupProps} />
      </div>
    </aside>
  );
}
