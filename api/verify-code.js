async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (e) { return {}; }
  }
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { return {}; }
    }
  } catch (e) {}
  return {};
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const body = await readBody(req);
    const code = String(body && body.code || '').trim().toUpperCase();

    if (!code) {
      return res.status(400).json({ ok: false, message: 'Código é obrigatório' });
    }

    // Get valid codes from env var (JSON object: { "TF-XXXX-XXXX-XXXX": "ilimitado", ... })
    var validCodes = {};
    try {
      validCodes = JSON.parse(process.env.ACTIVATION_CODES || '{}');
    } catch (e) {
      console.error('Invalid ACTIVATION_CODES env var:', e.message);
    }

    if (validCodes[code]) {
      return res.status(200).json({
        ok: true,
        plan: validCodes[code] || 'basico',
        message: 'Código válido'
      });
    }

    return res.status(200).json({
      ok: false,
      message: 'Código inválido. Verifica e tenta novamente.'
    });
  } catch (err) {
    console.error('Verify code error:', err);
    return res.status(500).json({ ok: false, message: 'Erro interno do servidor' });
  }
};
