import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { useProposals, type Proposal } from "../../lib/proposal";
import { getTemplate, fromTemplate, TEMPLATES, type TemplateKey } from "../../lib/templates";
import { AccentPicker, LogoUpload } from "./editor/BrandGroup";
import { TextField } from "./editor/fields";
import { TemplateIcon } from "./TemplateIcon";

const STEPS = ["Segmento", "Sua marca", "Quem propõe"];

export function Wizard({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const create = useProposals((s) => s.create);

  const [step, setStep] = useState(0);
  const [templateKey, setTemplateKey] = useState<TemplateKey>("consultoria");
  const [company, setCompany] = useState("");
  const [logoDataUrl, setLogoDataUrl] = useState<string>();
  const [accent, setAccent] = useState(getTemplate("consultoria").content.accent);
  const [consultant, setConsultant] = useState("");
  const [consultantRole, setConsultantRole] = useState("");

  const chooseTemplate = (key: TemplateKey) => {
    setTemplateKey(key);
    setAccent(getTemplate(key).content.accent);
  };

  const start = (key: TemplateKey, overrides: Partial<Proposal> = {}) => {
    const id = create(fromTemplate(key, overrides));
    navigate(`/editor/${id}`);
  };

  const finish = () => {
    const overrides: Partial<Proposal> = { accent, logoDataUrl };
    if (company.trim()) overrides.company = company.trim();
    if (consultant.trim()) overrides.consultant = consultant.trim();
    if (consultantRole.trim()) overrides.consultantRole = consultantRole.trim();
    start(templateKey, overrides);
  };

  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-app-bg" role="dialog" aria-modal="true" aria-label="Wizard de nova proposta">
      <div className="h-1 w-full bg-paper-2">
        <div className="h-full bg-accent transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-dim">
          Passo {step + 1} de {STEPS.length} · {STEPS[step]}
        </span>
        <button type="button" onClick={onClose} className="rounded-lg p-2 text-ink-dim hover:text-ink" aria-label="Fechar">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-10">
        <div className="mx-auto max-w-2xl pt-6">
          {step === 0 && (
            <>
              <WizardTitle title="Qual é o seu segmento?" subtitle="Vamos preencher a proposta com um texto pronto para o seu mercado." />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => chooseTemplate(t.key)}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                      templateKey === t.key ? "border-accent bg-paper-2" : "border-soft bg-paper hover:border-ink-dim"
                    }`}
                  >
                    <TemplateIcon iconKey={t.iconKey} size={22} className="mt-0.5 shrink-0 text-accent" />
                    <span>
                      <span className="block text-sm font-semibold text-ink">{t.label}</span>
                      <span className="mt-1 block text-xs text-ink-dim">{t.description}</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <WizardTitle title="Sua marca" subtitle="Ela aparece na capa, no rodapé e na assinatura." />
              <TextField label="Nome da empresa" placeholder="Ex.: DP NeXT" value={company} onChange={setCompany} />
              <LogoUpload value={logoDataUrl} onChange={setLogoDataUrl} />
              <AccentPicker value={accent} onChange={setAccent} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <WizardTitle title="Quem propõe?" subtitle="Seu nome aparece na seção de autoridade e na assinatura." />
              <TextField label="Seu nome" value={consultant} onChange={setConsultant} />
              <TextField label="Seu cargo" placeholder="Ex.: Sócio-fundador" value={consultantRole} onChange={setConsultantRole} />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-soft bg-paper px-6 py-4">
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={() => start("consultoria")} className="text-sm text-ink-dim underline-offset-4 hover:text-ink hover:underline">
            Pular e começar do zero
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="rounded-xl border border-soft px-4 py-2.5 text-sm text-ink hover:border-ink-dim">
                Voltar
              </button>
            )}
            <button
              type="button"
              onClick={isLast ? finish : () => setStep(step + 1)}
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-app-bg hover:brightness-110"
            >
              {isLast ? "Criar proposta" : "Continuar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WizardTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h2 className="wordmark text-3xl text-ink">{title}</h2>
      <p className="mt-2 text-sm text-ink-dim">{subtitle}</p>
    </div>
  );
}
