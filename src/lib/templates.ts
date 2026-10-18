import { nanoid } from "nanoid";
import {
  DEFAULT_SECTIONS,
  todayIso,
  type Deliverable,
  type Proposal,
  type Testimonial,
} from "./proposal";

export type TemplateKey = "agencia" | "consultoria" | "juridico" | "saude" | "tech" | "infoproduto";
export type TemplateIconKey = "TrendingUp" | "Target" | "Scale" | "Stethoscope" | "Code2" | "Rocket";

/** Conteúdo de um template: a Proposal sem campos gerados (ids, datas) e com listas sem id. */
type TemplateContent = Omit<
  Proposal,
  "id" | "createdAt" | "updatedAt" | "proposalDate" | "sections" | "logoDataUrl" | "methodSteps" | "milestones" | "deliverables" | "testimonials"
> & {
  methodSteps: string[];
  milestones: string[];
  deliverables: Omit<Deliverable, "id">[];
  testimonials: Omit<Testimonial, "id">[];
};

export interface Template {
  key: TemplateKey;
  label: string;
  iconKey: TemplateIconKey;
  description: string;
  content: TemplateContent;
}

/* Campos de marca comuns a todos os templates (o usuário troca no wizard ou no editor). */
const BRAND = {
  company: "Sua Empresa",
  accent: "#d9a94a",
  theme: "dark-gold",
  fontPair: "modern",
  validityDays: 7,
  consultant: "Seu Nome",
  payMode: "cartao",
  guaranteeEnabled: true,
} as const;

export const TEMPLATES: Template[] = [
  {
    key: "agencia",
    label: "Agência de Marketing",
    iconKey: "TrendingUp",
    description: "Tráfego pago, conteúdo e funil para gerar demanda previsível.",
    content: {
      ...BRAND,
      consultantRole: "Diretor de Growth",
      clientName: "Mariana Costa",
      clientCompany: "Costa Móveis Planejados",
      offer: "Programa de Aquisição Previsível",
      coverEyebrow: "Proposta comercial · Marketing de performance",
      coverHeadline: "O caminho para dobrar seus pedidos qualificados em 90 dias, sem depender de indicação.",
      coverSubtitle:
        "Um plano de aquisição desenhado para transformar investimento em mídia em vendas rastreáveis, mês após mês.",
      diagnosisText:
        "Hoje a maior parte das vendas chega por indicação e o investimento em anúncios não tem retorno medido. Esse cenário custa em média R$ 18.000 por mês em vendas que vão para a concorrência. Em 12 meses, isso representa R$ 216.000.",
      monthlyPainCost: 18000,
      methodName: "Método Funil Previsível",
      methodIntro:
        "A maioria tenta impulsionar posts e trocar de agência a cada trimestre e falha porque não existe um funil medido de ponta a ponta. O Método Funil Previsível é diferente: conectamos anúncio, página, atendimento e venda em um único painel, e otimizamos pelo custo por venda, não por curtida.",
      methodSteps: ["Diagnóstico de funil", "Oferta e páginas", "Campanhas de mídia", "Otimização semanal"],
      milestones: ["Semana 1 · Setup", "Mês 1 · Primeiras vendas", "Mês 2 · Escala", "Mês 3 · Previsibilidade"],
      deliverables: [
        { title: "Auditoria completa de funil", desc: "Mapeamos cada etapa do lead até a venda e onde o dinheiro vaza.", value: 4500 },
        { title: "Gestão de tráfego Meta e Google", desc: "Campanhas criadas, testadas e otimizadas toda semana.", value: 3500 },
        { title: "Landing pages de alta conversão", desc: "Duas páginas com copy e design focados em pedido de orçamento.", value: 6000 },
        { title: "Criativos mensais", desc: "Doze peças por mês entre vídeo curto e estático.", value: 4800 },
        { title: "Painel de resultados em tempo real", desc: "Custo por lead, por venda e retorno sobre mídia num só lugar.", value: 2500 },
        { title: "Script de atendimento comercial", desc: "Roteiro para seu time converter mais leads em visitas.", value: 1900, bonus: true },
      ],
      bioText:
        "Há 9 anos ajudamos empresas regionais a construir canais de aquisição que não dependem de sorte. Nosso time já gerenciou mais de R$ 40 milhões em mídia paga.",
      bioCredentials: "Google Partner · Meta Business Partner · 120+ clientes atendidos",
      metricsLine: "R$ 40 mi em mídia gerenciada · ROAS médio de 6,2x · 92% de renovação",
      testimonials: [
        {
          name: "Rafael Nunes",
          company: "Nunes Pisos",
          result: "3x em 90 dias",
          text: "Triplicamos os pedidos de orçamento sem aumentar a verba. Pela primeira vez sei exatamente quanto custa cada venda.",
        },
        {
          name: "Juliana Prado",
          company: "Prado Arquitetura",
          result: "R$ 380 mil em contratos",
          text: "Em um semestre fechamos mais projetos do que no ano anterior inteiro.",
        },
      ],
      cardInstallment: 997,
      cardCount: 12,
      pixValue: 11964,
      pixDiscount: 10,
      boletoInstallment: 1097,
      boletoCount: 12,
      guaranteeText:
        "Se em 60 dias o custo por lead não cair em relação ao seu cenário atual, trabalhamos o mês seguinte sem cobrar nada.",
      urgencyReason: "trabalhamos com no máximo 6 novos clientes por trimestre para manter a qualidade da operação",
      fullPriceText: "Contratando cada entrega separadamente",
      closingMessage:
        "Essa proposta foi desenhada sob medida para a Costa Móveis Planejados. O próximo passo é um só: confirmar de acordo abaixo.",
      ctaText: "Quero começar agora",
    },
  },
  {
    key: "consultoria",
    label: "Consultoria",
    iconKey: "Target",
    description: "Projetos de estratégia, processos e gestão com resultado mensurável.",
    content: {
      ...BRAND,
      consultantRole: "Consultor Sênior",
      clientName: "Carlos Mendes",
      clientCompany: "Mendes Distribuidora",
      offer: "Programa Margem Saudável",
      coverEyebrow: "Proposta comercial · Consultoria de gestão",
      coverHeadline: "O caminho para recuperar 8 pontos de margem em 6 meses, sem demitir ninguém.",
      coverSubtitle: "Um projeto de eficiência operacional com metas claras, rituais de gestão e acompanhamento semanal.",
      diagnosisText:
        "Hoje a empresa cresce em faturamento, mas a margem encolhe por retrabalho, estoque parado e preços desatualizados. Esse cenário custa em média R$ 35.000 por mês. Em 12 meses, isso representa R$ 420.000.",
      monthlyPainCost: 35000,
      methodName: "Método Margem Saudável",
      methodIntro:
        "A maioria tenta cortar custos no escuro e falha porque corta onde dói, não onde vaza. O Método Margem Saudável é diferente: medimos a rentabilidade por cliente, produto e processo e atacamos primeiro os três maiores vazamentos.",
      methodSteps: ["Raio-X financeiro", "Mapa de vazamentos", "Plano de ação 90 dias", "Rituais de gestão"],
      milestones: ["Mês 1 · Diagnóstico", "Mês 2 · Quick wins", "Mês 4 · Processos", "Mês 6 · Margem recuperada"],
      deliverables: [
        { title: "Raio-X de rentabilidade", desc: "Margem real por cliente, produto e canal de venda.", value: 9000 },
        { title: "Revisão da política de preços", desc: "Tabela recalculada com base no custo real e no valor percebido.", value: 7500 },
        { title: "Redesenho de processos críticos", desc: "Compras, estoque e expedição sem retrabalho.", value: 12000 },
        { title: "Painel de indicadores", desc: "Os 10 números que o dono precisa ver toda segunda-feira.", value: 4500 },
        { title: "Mentoria semanal com a liderança", desc: "Uma hora por semana para destravar decisões.", value: 8000 },
        { title: "Treinamento do time comercial", desc: "Como negociar sem dar desconto que destrói margem.", value: 3500, bonus: true },
      ],
      bioText:
        "Ex-diretor financeiro de uma rede com 40 lojas, há 12 anos ajudo empresas de médio porte a crescer com lucro, e não só com faturamento.",
      bioCredentials: "MBA em Finanças (FGV) · Certificação Lean Six Sigma Black Belt · 70+ projetos entregues",
      metricsLine: "R$ 28 mi em margem recuperada · 70 projetos · 4,9/5 de satisfação",
      testimonials: [
        {
          name: "Fernanda Lopes",
          company: "Lopes Alimentos",
          result: "+11 pontos de margem",
          text: "Descobrimos que 20% dos clientes davam prejuízo. Ajustamos a política e a margem voltou ao patamar de cinco anos atrás.",
        },
      ],
      cardInstallment: 2970,
      cardCount: 12,
      pixValue: 35640,
      pixDiscount: 10,
      boletoInstallment: 5940,
      boletoCount: 6,
      guaranteeText:
        "Se ao final do 3º mês não identificarmos pelo menos 3x o valor do investimento em ganhos de margem, devolvemos 100% do que foi pago.",
      urgencyReason: "trabalhamos com no máximo 4 empresas por semestre, porque cada projeto tem acompanhamento direto do consultor",
      fullPriceText: "Valor de mercado das entregas avulsas",
      closingMessage:
        "Essa proposta foi desenhada sob medida para a Mendes Distribuidora. O próximo passo é um só: confirmar de acordo abaixo.",
      ctaText: "Aprovar e agendar o kickoff",
    },
  },
  {
    key: "juridico",
    label: "Serviços Jurídicos",
    iconKey: "Scale",
    description: "Assessoria jurídica preventiva para empresas e profissionais.",
    content: {
      ...BRAND,
      consultantRole: "Advogada sócia",
      clientName: "Pedro Almeida",
      clientCompany: "Almeida Tech Ltda.",
      offer: "Blindagem Jurídica Empresarial",
      coverEyebrow: "Proposta de honorários · Assessoria preventiva",
      coverHeadline: "O caminho para uma empresa juridicamente protegida em 60 dias, sem surpresas trabalhistas.",
      coverSubtitle: "Contratos, compliance trabalhista e LGPD organizados para você crescer sem medo de passivos.",
      diagnosisText:
        "Hoje a empresa opera com contratos genéricos, sem política de LGPD e com riscos trabalhistas não mapeados. Esse cenário custa em média R$ 12.000 por mês em provisões, acordos e horas perdidas. Em 12 meses, isso representa R$ 144.000.",
      monthlyPainCost: 12000,
      methodName: "Protocolo Escudo",
      methodIntro:
        "A maioria tenta resolver o jurídico só quando o processo chega e falha porque o custo de remediar é dez vezes o de prevenir. O Protocolo Escudo é diferente: mapeamos os riscos antes, padronizamos os documentos e deixamos um canal de consulta aberto para o dia a dia.",
      methodSteps: ["Auditoria de riscos", "Contratos padronizados", "Adequação à LGPD", "Consultoria contínua"],
      milestones: ["Semana 2 · Mapa de riscos", "Semana 4 · Contratos", "Semana 6 · LGPD", "Semana 8 · Empresa blindada"],
      deliverables: [
        { title: "Auditoria jurídica completa", desc: "Análise de contratos, rotinas trabalhistas e societárias.", value: 8000 },
        { title: "Kit de contratos padronizados", desc: "Prestação de serviço, NDA, parceria e fornecedores.", value: 6500 },
        { title: "Adequação à LGPD", desc: "Política de privacidade, termos de uso e mapeamento de dados.", value: 7000 },
        { title: "Revisão do contrato social", desc: "Cláusulas de saída, sucessão e resolução de conflitos.", value: 3500 },
        { title: "Consultoria mensal ilimitada", desc: "Dúvidas respondidas em até 24 horas úteis.", value: 4000 },
        { title: "Treinamento de gestores", desc: "O que líderes não podem fazer para evitar processos trabalhistas.", value: 2500, bonus: true },
      ],
      bioText:
        "Advogada com 15 anos de atuação em direito empresarial, especialista em proteger empresas em crescimento antes que o problema vire processo.",
      bioCredentials: "OAB/SP · Pós-graduada em Direito Empresarial (PUC-SP) · Membro da Comissão de Direito Digital",
      metricsLine: "300+ empresas assessoradas · 15 anos de atuação · 0 passivos novos em clientes ativos",
      testimonials: [
        {
          name: "Larissa Teixeira",
          company: "Teixeira Logística",
          result: "R$ 210 mil evitados",
          text: "A auditoria identificou um risco trabalhista que teria virado uma ação coletiva. Resolvemos antes de começar.",
        },
        {
          name: "Bruno Ferraz",
          company: "Ferraz Studio",
          result: "Contratos em 3 semanas",
          text: "Hoje fecho clientes com segurança. Os contratos novos ainda passam mais profissionalismo.",
        },
      ],
      cardInstallment: 1490,
      cardCount: 12,
      pixValue: 17880,
      pixDiscount: 8,
      boletoInstallment: 1490,
      boletoCount: 12,
      guaranteeText:
        "Se você não ficar satisfeito com a auditoria entregue no primeiro mês, cancela sem multa e fica com todo o material produzido.",
      urgencyReason: "atendemos no máximo 5 novas empresas por mês para manter o prazo de resposta de 24 horas",
      fullPriceText: "Honorários das entregas contratadas avulsas",
      closingMessage:
        "Essa proposta foi desenhada sob medida para a Almeida Tech. O próximo passo é um só: confirmar de acordo abaixo.",
      ctaText: "Contratar a assessoria",
    },
  },
  {
    key: "saude",
    label: "Saúde e Clínicas",
    iconKey: "Stethoscope",
    description: "Programas de saúde, tratamentos e pacotes para clínicas.",
    content: {
      ...BRAND,
      theme: "light-editorial",
      accent: "#a37918",
      fontPair: "editorial",
      consultantRole: "Diretora clínica",
      clientName: "Ana Ribeiro",
      clientCompany: "Ana Ribeiro",
      offer: "Programa Vitalidade 12 Semanas",
      coverEyebrow: "Plano de tratamento personalizado",
      coverHeadline: "O caminho para recuperar sua energia e disposição em 12 semanas, sem dietas radicais.",
      coverSubtitle:
        "Um acompanhamento integrado entre médico, nutricionista e educador físico, com metas claras a cada etapa.",
      diagnosisText:
        "Hoje você convive com cansaço frequente, sono ruim e exames fora da faixa ideal. Esse cenário custa em média R$ 1.200 por mês entre consultas avulsas, suplementos sem orientação e dias de baixa produtividade. Em 12 meses, isso representa R$ 14.400.",
      monthlyPainCost: 1200,
      methodName: "Protocolo Vitalidade",
      methodIntro:
        "A maioria tenta resolver com dietas da moda e consultas isoladas e falha porque ninguém olha o quadro completo. O Protocolo Vitalidade é diferente: uma equipe integrada acompanha seus exames, alimentação, sono e movimento com ajustes a cada 15 dias.",
      methodSteps: ["Avaliação completa", "Plano integrado", "Acompanhamento quinzenal", "Manutenção"],
      milestones: ["Semana 1 · Exames", "Semana 4 · Sono regulado", "Semana 8 · Novos exames", "Semana 12 · Alta com plano"],
      deliverables: [
        { title: "Check-up laboratorial completo", desc: "Painel com mais de 40 marcadores de saúde.", value: 1800 },
        { title: "Consultas médicas mensais", desc: "Três consultas com a médica responsável pelo programa.", value: 2100 },
        { title: "Plano nutricional individual", desc: "Cardápio ajustado à sua rotina e aos seus exames.", value: 1500 },
        { title: "Treino guiado por educador físico", desc: "Rotina de 3x por semana, presencial ou online.", value: 2400 },
        { title: "Suporte por mensagem", desc: "Equipe disponível para dúvidas em dias úteis.", value: 900 },
        { title: "Sessão de higiene do sono", desc: "Protocolo para dormir melhor já na primeira semana.", value: 450, bonus: true },
      ],
      bioText:
        "Médica com 14 anos de experiência em medicina preventiva e longevidade, lidera uma equipe multidisciplinar dedicada a resultados sustentáveis.",
      bioCredentials: "CRM-SP 123456 · Título de especialista em Clínica Médica · Pós em Nutrologia",
      metricsLine: "2.400 pacientes acompanhados · 87% concluem o programa · nota 4,9 no Google",
      testimonials: [
        {
          name: "Roberto Siqueira",
          company: "Empresário",
          result: "-9 kg em 12 semanas",
          text: "Voltei a dormir a noite toda e a ter energia à tarde. Os exames melhoraram em todos os marcadores.",
        },
      ],
      cardInstallment: 580,
      cardCount: 12,
      pixValue: 6960,
      pixDiscount: 10,
      boletoInstallment: 1160,
      boletoCount: 6,
      guaranteeText:
        "Se em 30 dias você não perceber melhora na sua disposição, devolvemos o valor da primeira mensalidade.",
      urgencyReason: "a equipe acompanha no máximo 20 novos pacientes por mês para garantir atenção individual",
      fullPriceText: "Valor dos serviços contratados separadamente",
      closingMessage:
        "Essa proposta foi desenhada sob medida para você, Ana. O próximo passo é um só: confirmar de acordo abaixo.",
      ctaText: "Quero iniciar meu programa",
    },
  },
  {
    key: "tech",
    label: "Tecnologia / Software",
    iconKey: "Code2",
    description: "Desenvolvimento de sistemas, apps e automações sob medida.",
    content: {
      ...BRAND,
      theme: "dark-indigo",
      accent: "#7075f0",
      fontPair: "tech",
      consultantRole: "CTO",
      clientName: "Thiago Moreira",
      clientCompany: "Moreira Transportes",
      offer: "Plataforma de Gestão de Frota",
      coverEyebrow: "Proposta técnica e comercial · Software sob medida",
      coverHeadline: "O caminho para controlar toda a sua frota em tempo real em 16 semanas, sem planilhas.",
      coverSubtitle: "Um sistema web e mobile feito para a sua operação, com entregas a cada duas semanas e código seu.",
      diagnosisText:
        "Hoje a operação depende de planilhas, ligações e grupos de mensagem para saber onde está cada veículo. Esse cenário custa em média R$ 22.000 por mês em rotas ineficientes, multas e horas de retrabalho. Em 12 meses, isso representa R$ 264.000.",
      monthlyPainCost: 22000,
      methodName: "Método Sprint Seguro",
      methodIntro:
        "A maioria tenta contratar um sistema pronto ou um desenvolvedor freelancer e falha porque o software não se adapta à operação ou nunca fica pronto. O Método Sprint Seguro é diferente: você vê software funcionando a cada duas semanas e decide as prioridades com a gente.",
      methodSteps: ["Imersão na operação", "Protótipo navegável", "Sprints quinzenais", "Implantação e suporte"],
      milestones: ["Semana 2 · Protótipo", "Semana 6 · Rastreamento", "Semana 12 · App motorista", "Semana 16 · Go-live"],
      deliverables: [
        { title: "Imersão e especificação", desc: "Mapeamento da operação e escopo priorizado com você.", value: 12000 },
        { title: "Painel web de gestão", desc: "Rastreamento, rotas, manutenção e custos por veículo.", value: 38000 },
        { title: "App para motoristas", desc: "Checklist, ocorrências e comprovante de entrega no celular.", value: 26000 },
        { title: "Integrações", desc: "Conexão com ERP, rastreadores e emissão de documentos.", value: 14000 },
        { title: "Implantação e treinamento", desc: "Migração dos dados e treinamento de toda a equipe.", value: 6000 },
        { title: "3 meses de suporte e evolução", desc: "Correções e pequenas melhorias após o go-live.", value: 9000, bonus: true },
      ],
      bioText:
        "Software house com 10 anos de mercado, especializada em sistemas para operações logísticas e industriais. Já colocamos mais de 60 produtos em produção.",
      bioCredentials: "AWS Partner · Time de 25 engenheiros · Código entregue com documentação e testes",
      metricsLine: "60+ sistemas em produção · 98% das entregas no prazo · 1,2 mi de usuários ativos",
      testimonials: [
        {
          name: "Patrícia Gomes",
          company: "Gomes Cargas",
          result: "-23% em custo por km",
          text: "Em quatro meses tiramos a operação das planilhas. O sistema pagou o investimento antes de completar um ano.",
        },
        {
          name: "Eduardo Lima",
          company: "LimaLog",
          result: "Go-live em 14 semanas",
          text: "As entregas quinzenais deram muita segurança. Sabíamos exatamente em que ponto o projeto estava.",
        },
      ],
      cardInstallment: 7900,
      cardCount: 12,
      pixValue: 94800,
      pixDiscount: 7,
      boletoInstallment: 9480,
      boletoCount: 10,
      guaranteeText:
        "Se ao fim do primeiro sprint você não aprovar o protótipo, encerramos o contrato e você não paga nada além da imersão.",
      urgencyReason: "iniciamos no máximo 2 novos projetos por mês para manter um time dedicado em cada cliente",
      fullPriceText: "Valor de cada módulo orçado separadamente",
      closingMessage:
        "Essa proposta foi desenhada sob medida para a Moreira Transportes. O próximo passo é um só: confirmar de acordo abaixo.",
      ctaText: "Aprovar e iniciar o projeto",
    },
  },
  {
    key: "infoproduto",
    label: "Infoproduto / Curso",
    iconKey: "Rocket",
    description: "Mentorias, cursos e programas de alto valor.",
    content: {
      ...BRAND,
      fontPair: "serif-bold",
      consultantRole: "Mentora e fundadora",
      clientName: "Camila Duarte",
      clientCompany: "Camila Duarte Fotografia",
      offer: "Mentoria Agenda Cheia",
      coverEyebrow: "Convite para a mentoria · Turma fechada",
      coverHeadline: "O caminho para lotar sua agenda com clientes que pagam bem em 90 dias, sem viver de promoção.",
      coverSubtitle: "Um programa prático de posicionamento, oferta e vendas para profissionais criativos.",
      diagnosisText:
        "Hoje sua agenda oscila entre meses cheios e meses vazios, e boa parte dos clientes chega pedindo desconto. Esse cenário custa em média R$ 6.500 por mês em projetos que você deixa de cobrar pelo valor justo. Em 12 meses, isso representa R$ 78.000.",
      monthlyPainCost: 6500,
      methodName: "Método Agenda Cheia",
      methodIntro:
        "A maioria tenta postar mais e baixar o preço e falha porque compete com quem cobra menos. O Método Agenda Cheia é diferente: você constrói uma oferta premium, um posicionamento claro e um processo de vendas que atrai quem valoriza o seu trabalho.",
      methodSteps: ["Posicionamento", "Oferta premium", "Conteúdo que vende", "Processo de vendas"],
      milestones: ["Semana 2 · Nova oferta", "Semana 4 · Primeiras vendas", "Semana 8 · Preço novo", "Semana 12 · Agenda cheia"],
      deliverables: [
        { title: "12 encontros ao vivo em grupo", desc: "Aulas práticas semanais com implementação guiada.", value: 4800 },
        { title: "2 sessões individuais", desc: "Análise do seu perfil, oferta e preços, um a um.", value: 2400 },
        { title: "Biblioteca de aulas gravadas", desc: "Mais de 40 aulas para assistir no seu ritmo.", value: 1997 },
        { title: "Modelos de proposta e scripts", desc: "Textos prontos para orçamento, follow-up e fechamento.", value: 997 },
        { title: "Comunidade de alunos", desc: "Grupo exclusivo para trocar experiências e indicações.", value: 600 },
        { title: "Imersão presencial de 1 dia", desc: "Encontro presencial para planejar o próximo ano.", value: 1500, bonus: true },
      ],
      bioText:
        "Fotógrafa há 11 anos, saí da guerra de preços e passei a cobrar 4x mais por ensaio. Hoje ensino esse processo a outros profissionais criativos.",
      bioCredentials: "1.800 alunos formados · Palestrante em eventos de fotografia · Autora do livro Preço Justo",
      metricsLine: "1.800 alunos · 74% aumentam o preço na primeira turma · nota 4,9/5",
      testimonials: [
        {
          name: "Letícia Maia",
          company: "Maia Design",
          result: "Ticket 2,5x maior",
          text: "Saí do primeiro mês com a oferta nova e fechei três clientes com o preço que antes eu tinha vergonha de cobrar.",
        },
        {
          name: "Gustavo Reis",
          company: "Reis Filmes",
          result: "Agenda fechada em 60 dias",
          text: "Pela primeira vez tenho fila de espera. O método é simples e funciona.",
        },
      ],
      cardInstallment: 397,
      cardCount: 12,
      pixValue: 4764,
      pixDiscount: 15,
      boletoInstallment: 794,
      boletoCount: 6,
      guaranteeText:
        "Garantia incondicional de 7 dias: se não for para você, devolvemos 100% do valor, sem perguntas.",
      urgencyReason: "trabalhamos com no máximo 30 alunos por turma, e esta turma fecha na data de validade desta proposta",
      fullPriceText: "Soma do valor de cada entrega",
      closingMessage:
        "Essa proposta foi desenhada sob medida para a Camila Duarte Fotografia. O próximo passo é um só: confirmar de acordo abaixo.",
      ctaText: "Garantir minha vaga",
    },
  },
];

export function getTemplate(key: TemplateKey): Template {
  return TEMPLATES.find((t) => t.key === key) ?? TEMPLATES[1];
}

/** Gera uma Proposal completa (com ids e datas) a partir de um template. */
export function fromTemplate(key: TemplateKey, overrides: Partial<Proposal> = {}): Proposal {
  const { content } = getTemplate(key);
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
