# Gerador de Propostas Comerciais

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
| `#/` | Home com os 6 modelos e o wizard guiado |
| `#/editor/:id` | Painel de edição à esquerda e preview A4 à direita |

## Estrutura

```
src/
  main.tsx                     rotas
  styles.css                   temas, pares de fontes e classes do documento
  lib/
    proposal.ts                tipos, utilitários (fmtBRL, realPrice...) e store Zustand
    templates.ts               os 6 modelos pré-preenchidos + fromTemplate()
    exportPdf.ts               geração do PDF (html-to-image + jsPDF)
  pages/
    HomePage.tsx
    EditorPage.tsx             toggle mobile, overlay de export, "não encontrada"
  components/proposal/
    ProposalPreview.tsx        monta capa + seções na ordem escolhida
    preview/                   uma página A4 por arquivo (Capa, Diagnóstico...)
    EditorPanel.tsx            barra lateral do editor
    editor/                    grupos do formulário e campos reutilizáveis
    Wizard.tsx                 assistente de 3 passos
    TemplateIcon.tsx
```

## Como customizar

- **Novo tema:** crie um bloco `[data-theme="meu-tema"]` em `src/styles.css`, adicione o id em `ThemeId` e em `THEMES` (`src/lib/proposal.ts`).
- **Novo par de fontes:** adicione a fonte no `<link>` do `index.html`, crie `#print-root[data-font="..."]` em `styles.css` e registre em `FONT_PAIRS`.
- **Novo modelo de segmento:** copie um objeto de `TEMPLATES` em `src/lib/templates.ts` e ajuste o texto.
- **Nova seção do documento:** crie o componente em `components/proposal/preview/`, adicione o id em `SectionId`/`SECTION_LABELS` e o `case` em `ProposalPreview.tsx`.

## Licença

MIT

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
