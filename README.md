# Propostas DP NeXT

Gerador de propostas comerciais da **DP NeXT — Soluções Digitais**, focado em projetos de desenvolvimento de aplicativos. O app abre direto no editor, com o logo, as cores (azul-marinho, azul elétrico, ciano e laranja) e a tipografia do manual da marca.

Ferramenta open source para montar, em minutos, uma proposta comercial premium e persuasiva, com preview A4 em tempo real e exportação em PDF.

Sem login, sem backend, sem banco de dados e sem variáveis de ambiente: tudo roda no navegador e o rascunho fica salvo no `localStorage` (chave `proposals-v1`).

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a versão de produção em dist/
```

Requer Node 20.19+ (ou 22.12+), por causa do Vite 7.

## Stack

React 19 + TypeScript · Vite 7 · Tailwind CSS v4 (sem `tailwind.config.js`) · React Router · Zustand (`persist`) · lucide-react · nanoid · html-to-image + jsPDF (carregados só na hora de exportar).

## Rotas

| Rota | O que faz |
| --- | --- |
| `#/` | Abre o rascunho mais recente (ou cria um novo) |
| `#/nova` | Começa uma proposta nova a partir do modelo DP NeXT |
| `#/editor/:id` | Painel de edição à esquerda e preview A4 à direita |

## Estrutura

```
src/
  main.tsx                     rotas
  styles.css                   temas DP NeXT (escuro/claro), fontes e classes do documento
  assets/                      logos oficiais DP NeXT (fundo escuro e claro)
  lib/
    proposal.ts                tipos, utilitários (fmtBRL, realPrice...) e store Zustand
    templates.ts               modelo DP NeXT de desenvolvimento de app + fromTemplate()
    exportPdf.ts               geração do PDF (html-to-image + jsPDF)
  pages/
    StartPage.tsx              abre direto no editor
    EditorPage.tsx             toggle mobile, overlay de export, "não encontrada"
  components/proposal/
    ProposalPreview.tsx        monta capa + seções na ordem escolhida
    preview/                   uma página A4 por arquivo (Capa, Diagnóstico...)
    EditorPanel.tsx            barra lateral do editor
    editor/                    grupos do formulário e campos reutilizáveis
```

## Como customizar

- **Textos e valores padrão:** edite `DPNEXT_APP_TEMPLATE` em `src/lib/templates.ts`.
- **Cores da marca:** variáveis `[data-theme="dp-next"]` e `[data-theme="dp-next-claro"]` em `src/styles.css`.
- **Logos:** troque os arquivos em `src/assets/` mantendo os nomes.

## Publicar online

O projeto usa rotas com `#` (HashRouter) e caminhos relativos, então o build funciona em qualquer hospedagem estática.

- **GitHub Pages (como está configurado):** o site publicado fica na pasta `docs/`. Depois de mudar o código, rode `npm run build`, copie o conteúdo de `dist/` para `docs/` e faça o push. No GitHub, *Settings → Pages* aponta para a branch `main`, pasta `/docs`.
- **Netlify / Vercel:** comando de build `npm run build`, pasta de saída `dist`.

## Licença

MIT

## Publicar online

O projeto usa rotas com `#` (HashRouter) e caminhos relativos, então a pasta `dist/` funciona em qualquer hospedagem estática.

- **GitHub Pages:** suba o projeto para um repositório, vá em *Settings → Pages* e escolha *GitHub Actions* como fonte. O workflow em `.github/workflows/deploy.yml` publica a cada push na `main`.
- **Netlify / Vercel:** comando de build `npm run build`, pasta de saída `dist`.
