module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const pin = String(body.pin || '').trim();
    if (!pin) {
      return res.status(400).json({ ok: false, message: 'PIN é obrigatório' });
    }
    const adminPin = process.env.ADMIN_PIN;
    if (!adminPin || !adminPin.trim()) {
      return res.status(503).json({ ok: false, message: 'Acesso administrativo indisponível' });
    }
    if (pin === adminPin.trim()) {
      return res.status(200).json({ ok: true });
    }
    return res.status(401).json({ ok: false, message: 'PIN de administrador incorreto.' });
  } catch (err) {
    console.error('Admin verify error:', err);
    return res.status(500).json({ ok: false, message: 'Erro interno do servidor' });
  }
};
