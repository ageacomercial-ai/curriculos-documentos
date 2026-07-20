(function () {
  var PRICE_PER_DOC = (window.CONFIG && CONFIG.perDocPrice) || 1000;
  const PAYMENT_REF_PREFIX = '242';

  function generateReference() {
    const ts = Date.now().toString().slice(-8);
    const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return PAYMENT_REF_PREFIX + ts + rand;
  }

  function showPaymentModal() {
    const existing = document.getElementById('payment-modal');
    if (existing) existing.remove();

    const ref = generateReference();
    const modal = document.createElement('div');
    modal.id = 'payment-modal';
    modal.style.cssText = `
      position:fixed;inset:0;z-index:1000;
      display:flex;align-items:center;justify-content:center;
      background:rgba(0,0,0,0.5);padding:20px;
      animation:fadeIn 0.2s ease
    `;
    modal.innerHTML = `
      <div style="
        background:#fff;border-radius:16px;padding:28px 24px;
        max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.2);
        animation:slideUp 0.3s ease
      ">
        <div style="text-align:center;margin-bottom:20px">
          <div style="font-size:36px;margin-bottom:8px">🔑</div>
          <h2 style="font-family:'Playfair Display',serif;font-size:20px;color:#1a2332;margin:0 0 4px">
            Desbloquear PDF
          </h2>
          <p style="color:#7f8c8d;font-size:14px;margin:0">
            Exporta o teu documento sem marcas de água
          </p>
        </div>

        <div style="background:#f8f6f3;border-radius:12px;padding:16px;margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:#7f8c8d;font-size:13px">Documento</span>
            <span style="font-weight:600;font-size:13px">1 unidade</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="color:#7f8c8d;font-size:13px">Valor</span>
            <span style="font-weight:700;font-size:18px;color:#1a2332">${PRICE_PER_DOC} Kz</span>
          </div>
          <hr style="border:none;border-top:1px solid #e0ddd9;margin:12px 0">
          <div style="text-align:center">
            <p style="font-size:12px;color:#7f8c8d;margin:0 0 6px">Referência Multicaixa Express</p>
            <div style="
              font-family:monospace;font-size:22px;font-weight:700;
              letter-spacing:4px;color:#1a2332;
              background:#fff;padding:10px;border-radius:8px;
              border:2px dashed #c9a96e
            ">${ref}</div>
          </div>
        </div>

        <div style="background:#fef9e7;border-radius:8px;padding:10px 12px;margin-bottom:16px;font-size:12px;color:#7f8c8d;display:flex;align-items:start;gap:8px">
          <span style="font-size:14px">💡</span>
          <span>
            Paga numa caixa Multicaixa Express ou app do teu banco usando esta referência.
            Após o pagamento, confirma abaixo.
          </span>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px">
          <button id="btn-pay-confirm" style="
            width:100%;padding:14px;background:#1a2332;color:#fff;
            border:none;border-radius:12px;font-size:16px;font-weight:600;
            cursor:pointer;transition:all 0.2s
          " onmouseover="this.style.background='#2a3a4e'" onmouseout="this.style.background='#1a2332'">
            Já paguei — Confirmar
          </button>
          <button id="btn-pay-cancel" style="
            width:100%;padding:10px;background:none;color:#7f8c8d;
            border:none;border-radius:12px;font-size:14px;
            cursor:pointer
          " onmouseover="this.style.color='#2c3e50'" onmouseout="this.style.color='#7f8c8d'">
            Voltar à pré-visualização
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    return new Promise(function (resolve) {
      document.getElementById('btn-pay-confirm').addEventListener('click', function () {
        Storage.setPaid(ref);
        modal.remove();
        resolve(true);
      });
      document.getElementById('btn-pay-cancel').addEventListener('click', function () {
        modal.remove();
        resolve(false);
      });
      modal.addEventListener('click', function (e) {
        if (e.target === modal) { modal.remove(); resolve(false); }
      });
    });
  }

  window.Payment = {
    requestPayment: showPaymentModal,
    PRICE: PRICE_PER_DOC
  };
})();
