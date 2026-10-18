import { useState } from "react";
import { Eye, Loader2, PencilLine } from "lucide-react";
import { Link, useParams } from "react-router";
import { EditorPanel } from "../components/proposal/EditorPanel";
import { ProposalPreview } from "../components/proposal/ProposalPreview";
import { exportPdf } from "../lib/exportPdf";
import { slug, useProposals } from "../lib/proposal";

type MobileView = "edit" | "preview";

export function EditorPage() {
  const { id = "" } = useParams();
  const p = useProposals((s) => s.proposals[id]);
  const [view, setView] = useState<MobileView>("edit");
  const [exporting, setExporting] = useState(false);

  if (!p) return <NotFound />;

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportPdf(`proposta-${slug(p.clientCompany)}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Não foi possível gerar o PDF. Tente novamente.");
    } finally {
      setExporting(false);
    }
  };

  // Durante o export o preview precisa estar visível, inclusive no mobile.
  const showPreview = view === "preview" || exporting;

  return (
    <div className="min-h-screen lg:flex">
      <MobileToggle view={view} onChange={setView} />

      <div className={`${view === "edit" ? "block" : "hidden"} lg:block`}>
        <EditorPanel p={p} onExport={handleExport} exporting={exporting} />
      </div>

      <main className={`${showPreview ? "block" : "hidden"} min-w-0 flex-1 overflow-x-auto py-10 lg:block`}>
        <div className="w-max min-w-full px-4 lg:px-10">
          <ProposalPreview p={p} />
        </div>
      </main>

      {exporting && <ExportOverlay />}
    </div>
  );
}

function MobileToggle({ view, onChange }: { view: MobileView; onChange: (v: MobileView) => void }) {
  const options: { id: MobileView; label: string; icon: typeof Eye }[] = [
    { id: "edit", label: "Editar", icon: PencilLine },
    { id: "preview", label: "Ver preview", icon: Eye },
  ];

  return (
    <div className="sticky top-0 z-20 flex gap-1 border-b border-soft bg-paper p-2 lg:hidden">
      {options.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium ${
            view === id ? "bg-accent text-app-bg" : "text-ink-dim"
          }`}
        >
          <Icon size={16} /> {label}
        </button>
      ))}
    </div>
  );
}

function ExportOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm" role="alertdialog" aria-live="assertive">
      <div className="w-full max-w-sm rounded-2xl border border-soft bg-paper p-8 text-center">
        <Loader2 size={32} className="mx-auto animate-spin text-accent" />
        <div className="wordmark mt-4 text-xl text-ink">Gerando PDF</div>
        <p className="mt-2 text-sm text-ink-dim">Renderizando páginas com cores e fundos preservados</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="wordmark text-3xl">Proposta não encontrada</h1>
      <p className="max-w-md text-sm text-ink-dim">Ela pode ter sido criada em outro navegador ou os dados locais foram apagados.</p>
      <Link to="/" className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-app-bg hover:brightness-110">
        Criar nova proposta
      </Link>
    </div>
  );
}
