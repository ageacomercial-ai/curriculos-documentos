module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }
  const { pin } = req.body || {};
  if (!pin) {
    return res.status(400).json({ ok: false, message: 'PIN é obrigatório' });
  }
  const adminPin = process.env.ADMIN_PIN;
  if (!adminPin) {
    return res.status(503).json({ ok: false, message: 'Acesso administrativo indisponível' });
  }
  if (pin === adminPin) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false, message: 'PIN inválido' });
};
