import { nanoid } from "nanoid";
import {
  BRAND,
  DEFAULT_SECTIONS,
  todayIso,
  type Deliverable,
  type Proposal,
  type Testimonial,
} from "./proposal";

/** Conteúdo do modelo: a Proposal sem campos gerados (ids, datas) e com listas sem id. */
type TemplateContent = Omit<
  Proposal,
  "id" | "createdAt" | "updatedAt" | "proposalDate" | "sections" | "logoDataUrl" | "methodSteps" | "milestones" | "deliverables" | "testimonials"
> & {
  methodSteps: string[];
  milestones: string[];
  deliverables: Omit<Deliverable, "id">[];
  testimonials: Omit<Testimonial, "id">[];
};

/*
 * Modelo único: proposta de desenvolvimento de aplicativo da DP NeXT.
 * Textos institucionais vêm do manual da marca. Valores, prazos e o custo do problema
 * são exemplos para ajustar em cada proposta (o manual pede para não inventar números).
 */
export const DPNEXT_APP_TEMPLATE: TemplateContent = {
  company: BRAND.company,
  accent: BRAND.accent,
  theme: "dp-next",
  fontPair: "montserrat",

  clientName: "Nome do cliente",
  clientCompany: "Empresa do cliente",

  offer: "Desenvolvimento de Aplicativo Sob Medida",
  validityDays: 10,
  consultant: "Denis Pereira",
  consultantRole: "DP NeXT · Soluções Digitais",

  coverEyebrow: "Proposta comercial · Desenvolvimento de aplicativo",
  coverHeadline: "O caminho para tirar sua operação das planilhas em 12 semanas, sem depender de sistemas engessados.",
  coverSubtitle:
    "Um aplicativo feito para a realidade da sua empresa: menos tarefas manuais, mais controle e dados claros para decidir melhor.",

  diagnosisText:
    "Hoje boa parte da operação depende de planilhas, mensagens e controles manuais, e as informações ficam espalhadas entre pessoas e ferramentas. Esse cenário custa em média R$ 8.000 por mês em retrabalho, erros e horas que a equipe poderia usar no que gera resultado. Em 12 meses, isso representa R$ 96.000.",
  monthlyPainCost: 8000,

  methodName: "Método NeXT",
  methodIntro:
    "A maioria tenta adaptar um sistema pronto ou contratar um desenvolvimento sem entender o processo e falha porque o aplicativo não conversa com a rotina de quem usa. O Método NeXT é diferente: começamos pela gestão e pelos processos, desenhamos a solução com você e entregamos em ciclos curtos, com o aplicativo funcionando desde as primeiras semanas.",
  methodSteps: ["Diagnóstico do processo", "Protótipo navegável", "Desenvolvimento em ciclos", "Implantação e evolução"],
  milestones: ["Semana 2 · Protótipo aprovado", "Semana 6 · Primeira versão em uso", "Semana 10 · Integrações", "Semana 12 · Lançamento"],

  deliverables: [
    { title: "Diagnóstico e mapeamento de processos", desc: "Entendemos a rotina da equipe e definimos o que o aplicativo precisa resolver primeiro.", value: 4500 },
    { title: "Protótipo navegável", desc: "Você vê e testa as telas antes de qualquer linha de código.", value: 3500 },
    { title: "Aplicativo web e mobile", desc: "Desenvolvimento sob medida, com acesso pelo navegador e pelo celular.", value: 38000 },
    { title: "Painel de gestão e indicadores", desc: "Os números da operação em tempo real, num só lugar.", value: 8000 },
    { title: "Integração com sistemas existentes", desc: "Conexão com ERP, CRM, planilhas ou outras ferramentas que você já usa.", value: 7000 },
    { title: "Treinamento da equipe e suporte na implantação", desc: "Acompanhamento no lançamento para todos usarem o aplicativo com segurança.", value: 4000, bonus: true },
  ],

  bioText:
    "A DP NeXT · Soluções Digitais conecta gestão, processos e tecnologia para desenvolver soluções adequadas à realidade de cada empresa. Atuamos com automação de processos, inteligência artificial, sistemas e aplicativos personalizados, dashboards e indicadores, CRM e gestão comercial, sites e integração de sistemas.",
  bioCredentials: "Tecnologia, automação e IA para empresas.",
  metricsLine: "Ideias → Soluções → Resultados",
  testimonials: [],

  payMode: "cartao",
  cardInstallment: 3990,
  cardCount: 12,
  pixValue: 47880,
  pixDiscount: 10,
  boletoInstallment: 7980,
  boletoCount: 6,
  guaranteeEnabled: false,
  guaranteeText: "Descreva aqui a garantia oferecida, por exemplo o período de correções incluído após a entrega.",
  urgencyReason:
    "nossa agenda de desenvolvimento é organizada por ordem de aprovação, e esta proposta reserva o início do seu projeto até essa data",
  fullPriceText: "Valor de cada entrega contratada separadamente",

  closingMessage:
    "Essa proposta foi desenhada sob medida para a Empresa do cliente. O próximo passo é um só: confirmar de acordo abaixo.",
  ctaText: "Aprovar e iniciar o projeto",
};

/** Gera uma Proposal completa (com ids e datas) a partir do modelo da DP NeXT. */
export function fromTemplate(overrides: Partial<Proposal> = {}): Proposal {
  const content = DPNEXT_APP_TEMPLATE;
  const now = new Date().toISOString();

  return {
    ...content,
    id: nanoid(10),
    createdAt: now,
    updatedAt: now,
    proposalDate: todayIso(),
    sections: DEFAULT_SECTIONS.map((s) => ({ ...s })),
    methodSteps: content.methodSteps.map((title) => ({ id: nanoid(6), title })),
    milestones: content.milestones.map((title) => ({ id: nanoid(6), title })),
    deliverables: content.deliverables.map((d) => ({ ...d, id: nanoid(6) })),
    testimonials: content.testimonials.map((t) => ({ ...t, id: nanoid(6) })),
    ...overrides,
  };
}
