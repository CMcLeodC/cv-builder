import html2pdf from "html2pdf.js";

export function exportPDF(elementId = "resume") {
  const element = document.getElementById(elementId);
  html2pdf().from(element).save("resume.pdf");
}
