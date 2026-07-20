async function readBody(req) {
  // Tenta req.body (Vercel parse automático)
  if (req.body && typeof req.body === 'object') return req.body;
  // Se req.body é string (body já lido mas não parseado)
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (e) { return {}; }
  }
  // Lê raw body manualmente
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { return {}; }
    }
  } catch (e) {
    // req pode não ser async iterável em runtimes antigos
  }
  return {};
}

module.exports = async function handler(req, res) {
  // GET: verificar se endpoint está ativo
  if (req.method === 'GET') {
    const configured = !!(process.env.ADMIN_PIN && process.env.ADMIN_PIN.trim());
    return res.status(200).json({
      ok: configured,
      status: configured ? 'ADMIN_PIN configurado' : 'ADMIN_PIN nao configurado'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const body = await readBody(req);
    const pin = String(body && body.pin !== undefined ? body.pin : '').trim();

    if (!pin) {
      return res.status(400).json({ ok: false, message: 'PIN é obrigatório' });
    }

    const adminPin = process.env.ADMIN_PIN;
    if (!adminPin || !adminPin.trim()) {
      return res.status(503).json({
        ok: false,
        message: 'Acesso administrativo indisponível — ADMIN_PIN não configurado no servidor.'
      });
    }

    if (String(pin) === String(adminPin).trim()) {
      return res.status(200).json({ ok: true });
    }

    return res.status(401).json({ ok: false, message: 'PIN de administrador incorreto.' });
  } catch (err) {
    console.error('Admin verify error:', err);
    return res.status(500).json({ ok: false, message: 'Erro interno do servidor' });
  }
};
