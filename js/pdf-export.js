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

  function checkPlan() {
    const plan = localStorage.getItem('tf_plan');
    return plan && plan.trim() !== '';
  }

  async function exportToPDF(element, filename, options) {
    options = options || {};
    const watermark = options.watermark !== false;

    if (!element) {
      throw new Error('Elemento de pré-visualização não encontrado');
    }

    // Save original styles that might affect capture
    const originalTransform = element.style.transform;
    const originalTransformOrigin = element.style.transformOrigin;
    const originalWidth = element.style.width;

    try {
      // Remove CSS transform so html2canvas captures at natural (unscaled) size
      element.style.transform = 'none';
      element.style.transformOrigin = '';
      element.style.width = '210mm';

      // Wait for browser reflow
      await new Promise(function (resolve) {
        requestAnimationFrame(resolve);
      });
      await new Promise(function (resolve) {
        setTimeout(resolve, 50);
      });

      const captureScale = 1.5;
      const canvas = await html2canvas(element, {
        scale: captureScale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      const A4_W = 210;
      const A4_H = 297;
      const imgWidth = A4_W;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Scale to fit in exactly one A4 page
      const scale = imgHeight > A4_H ? A4_H / imgHeight : 1;
      const scaledW = imgWidth * scale;
      const scaledH = imgHeight * scale;
      const xOffset = (A4_W - scaledW) / 2;
      const yOffset = (A4_H - scaledH) / 2;

      pdf.addImage(imgData, 'JPEG', xOffset, yOffset, scaledW, scaledH);

      // Watermark only if user has no active plan
      if (watermark && !checkPlan()) {
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
      if (window.incrementExportCount) window.incrementExportCount();
      return true;
    } catch (err) {
      console.error('Erro na exportação PDF:', err);
      throw new Error('Não foi possível gerar o PDF. Tenta novamente.');
    } finally {
      // Restore original styles
      element.style.transform = originalTransform;
      element.style.transformOrigin = originalTransformOrigin;
      element.style.width = originalWidth;
    }
  }

  async function exportPreview(containerId, filename) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const previewFrame = container.querySelector('#preview-frame') || container;
    const cvModelo = previewFrame.querySelector('.cv-modelo') || previewFrame.querySelector('.documento');
    const element = cvModelo || previewFrame;

    // Check plan instead of old payment system
    if (!checkPlan()) {
      const shouldProceed = await requestPlan();
      if (!shouldProceed) return;
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

  function requestPlan() {
    return new Promise(function (resolve) {
      var existing = document.getElementById('plan-request-modal');
      if (existing) existing.remove();

      var modal = document.createElement('div');
      modal.id = 'plan-request-modal';
      modal.style.cssText = 'position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);padding:20px;animation:fadeIn 0.2s ease';
      modal.innerHTML =
        '<div style="background:#fff;border-radius:16px;padding:28px 24px;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.2);animation:slideUp 0.3s ease">' +
          '<div style="text-align:center;margin-bottom:20px">' +
            '<div style="font-size:36px;margin-bottom:8px">🔒</div>' +
            '<h2 style="font-family:\'Playfair Display\',serif;font-size:20px;color:#1a2332;margin:0 0 4px">Plano necessário</h2>' +
            '<p style="color:#7f8c8d;font-size:14px;margin:0">Activa um plano para exportar PDF sem marcas de água</p>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:8px">' +
            '<button id="btn-plan-go" style="width:100%;padding:14px;background:#1a2332;color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer">Ver planos</button>' +
            '<button id="btn-plan-cancel" style="width:100%;padding:10px;background:none;color:#7f8c8d;border:none;border-radius:12px;font-size:14px;cursor:pointer">Voltar</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(modal);

      document.getElementById('btn-plan-go').addEventListener('click', function () {
        modal.remove();
        // Save pending action for return after plan activation
        if (window.setPendingAction) {
          var docId = '';
          var params = new URLSearchParams(window.location.search);
          if (params.get('id')) docId = params.get('id');
          window.setPendingAction({ type: 'export_pdf', documentId: docId, returnPath: window.location.hash || window.location.search });
        }
        if (window.navegar) window.navegar('planos');
        resolve(false);
      });
      document.getElementById('btn-plan-cancel').addEventListener('click', function () {
        modal.remove();
        resolve(false);
      });
      modal.addEventListener('click', function (e) {
        if (e.target === modal) { modal.remove(); resolve(false); }
      });
    });
  }

  window.PDFExport = {
    exportToPDF: exportToPDF,
    exportPreview: exportPreview,
    canExport: canExport,
    checkPlan: checkPlan
  };
})();
