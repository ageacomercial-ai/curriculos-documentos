(function () {
  const PDF_EXPORT_KEY = 'chave_pdf_export';

  function getExportCount() {
    try { return parseInt(localStorage.getItem(PDF_EXPORT_KEY)) || 0; }
    catch { return 0; }
  }

  function incrementExportCount() {
    localStorage.setItem(PDF_EXPORT_KEY, String(getExportCount() + 1));
  }

  function canExport() {
    return true;
  }

  async function exportToPDF(element, filename, options) {
    options = options || {};
    const scale = options.scale || 2;
    const watermark = options.watermark !== false;

    if (!element) {
      throw new Error('Elemento de pré-visualização não encontrado');
    }

    try {
      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const imgWidth = 210;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeight = 297;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      if (watermark && !Storage.isPaid()) {
        pdf.setFontSize(7);
        pdf.setTextColor(200, 200, 200);
        for (let y = 50; y < 280; y += 60) {
          for (let x = 20; x < 190; x += 70) {
            pdf.text('Pré-visualização — Tá Feito', x, y, { angle: 30 });
          }
        }
        pdf.setTextColor(0, 0, 0);
      }

      pdf.save(filename || 'documento.pdf');
      incrementExportCount();
      return true;
    } catch (err) {
      console.error('Erro na exportação PDF:', err);
      throw new Error('Não foi possível gerar o PDF. Tenta novamente.');
    }
  }

  async function exportPreview(containerId, filename) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const previewFrame = container.querySelector('#preview-frame') || container;
    const cvModelo = previewFrame.querySelector('.cv-modelo') || previewFrame.querySelector('.documento');
    const element = cvModelo || previewFrame;

    if (window.Payment && !Storage.isPaid()) {
      const shouldPay = await window.Payment.requestPayment();
      if (!shouldPay) return;
    }

    try {
      const btn = document.querySelector('.btn-exportar-pdf') || document.querySelector('[onclick*="exportPDF"]');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner" style="width:18px;height:18px;border-width:2px;margin:0"></span> A gerar PDF...';
      }

      await exportToPDF(element, filename, { watermark: true });

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> Exportar PDF';
      }
    } catch (err) {
      alert(err.message || 'Erro ao exportar PDF');
      const btn = document.querySelector('.btn-exportar-pdf');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> Exportar PDF';
      }
    }
  }

  window.PDFExport = {
    exportToPDF: exportToPDF,
    exportPreview: exportPreview,
    canExport: canExport
  };
})();
