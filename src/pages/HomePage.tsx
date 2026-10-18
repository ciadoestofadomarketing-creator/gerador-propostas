import { useState } from "react";
import { ArrowRight, FileText, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useProposals } from "../lib/proposal";
import { fromTemplate, TEMPLATES, type TemplateKey } from "../lib/templates";
import { TemplateIcon } from "../components/proposal/TemplateIcon";
import { Wizard } from "../components/proposal/Wizard";

export function HomePage() {
  const navigate = useNavigate();
  const create = useProposals((s) => s.create);
  const [wizardOpen, setWizardOpen] = useState(false);

  const startFromTemplate = (key: TemplateKey) => {
    const id = create(fromTemplate(key));
    navigate(`/editor/${id}`);
  };

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <FileText size={22} className="text-accent" />
          <span className="wordmark text-lg">Gerador de Propostas</span>
        </div>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim sm:block">
          Open source · sem login · 100% no navegador
        </span>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="paper-radial rounded-3xl border border-soft px-6 py-12 sm:px-12 sm:py-16">
          <span className="chip chip-accent">Proposta comercial premium</span>
          <h1 className="wordmark mt-6 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
            Monte uma proposta que vende, em minutos.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ink-dim sm:text-lg">
            Escolha um modelo, ajuste o texto e veja cada página A4 mudar em tempo real. Quando estiver pronto, baixe o PDF.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setWizardOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-app-bg hover:brightness-110"
            >
              <Plus size={18} /> Nova proposta
            </button>
            <button type="button" onClick={() => setWizardOpen(true)} className="text-sm text-ink-dim underline-offset-4 hover:text-ink hover:underline">
              Prefiro o wizard guiado
            </button>
          </div>

          <div className="mt-12">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">Ou comece por um modelo pronto</div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => startFromTemplate(t.key)}
                  className="group flex flex-col items-start rounded-2xl border border-soft bg-paper/70 p-5 text-left transition hover:border-accent hover:bg-paper-2"
                >
                  <TemplateIcon iconKey={t.iconKey} size={24} className="text-accent" />
                  <span className="mt-4 text-base font-semibold text-ink">{t.label}</span>
                  <span className="mt-1 text-sm text-ink-dim">{t.description}</span>
                  <span className="mt-4 flex items-center gap-1 text-xs font-medium text-accent opacity-70 group-hover:opacity-100">
                    Usar este modelo <ArrowRight size={14} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {wizardOpen && <Wizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}
