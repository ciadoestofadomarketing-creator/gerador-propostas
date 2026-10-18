/**
 * Gera um PDF A4 com uma imagem por página (.a4-page).
 * As bibliotecas são importadas só aqui, para não pesar no carregamento inicial.
 */
export async function exportPdf(fileName: string): Promise<void> {
  const pages = Array.from(document.querySelectorAll<HTMLElement>(".a4-page"));
  document.body.classList.add("pdf-exporting");

  try {
    await document.fonts?.ready;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const { toPng } = await import("html-to-image");
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });

    for (let i = 0; i < pages.length; i++) {
      const dataUrl = await toPng(pages[i], {
        pixelRatio: 2.5,
        cacheBust: true,
        backgroundColor: getComputedStyle(pages[i]).backgroundColor,
        // A página é centralizada com margin auto; no clone isso vira px e desloca o conteúdo.
        style: { margin: "0" },
      });
      if (i > 0) pdf.addPage("a4", "portrait");
      pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297, undefined, "FAST");
    }

    pdf.save(fileName);
  } finally {
    document.body.classList.remove("pdf-exporting");
  }
}
