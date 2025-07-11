import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

/**
 * Exports the content of the #resume element as a PDF.
 */
export const exportPDF = async () => {
  try {
    const resumeElement = document.getElementById('resume');
    if (!resumeElement) {
      alert("Resume element not found!");
      return;
    }

    // Scroll to top to avoid rendering issues
    window.scrollTo(0, 0);

    // Convert the resume to canvas
    const canvas = await html2canvas(resumeElement, {
      useCORS: true,
      scale: 2, // Higher scale = better quality
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Calculate dimensions
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('cv.pdf');
  } catch (error) {
    console.error("PDF export error:", error);
    alert("An error occurred while exporting the PDF.");
  }
};
