// Vercel Serverless Function — Proxy de IA para o Tá Feito
// Relay seguro entre a app e a API Groq, sem expor chave ao cliente.

const ALLOWED_ORIGINS = [
  'https://ageacomercial-ai.github.io',
  'https://ta-feito-documentos.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'file://'
];

function isAllowed(origin, referer) {
  const o = origin || referer || '';
  return ALLOWED_ORIGINS.some(a => o.startsWith(a));
}

function buildPrompt(text, style) {
  const styleMap = {
    profissional: 'profissional, com verbos de acção e tom formal',
    conciso: 'conciso, directo, em 1 linha',
    formal: 'formal, com linguagem jurídica/administrativa',
    criativo: 'criativo e dinâmico, mantendo profissionalismo'
  };
  const estilo = styleMap[style] || styleMap.profissional;
  return `Melhora o texto seguinte para um tom ${estilo} em português de Angola (pt-AO). Mantém o significado original. Apenas devolve o texto melhorado, sem explicações.\n\nTexto original: "${text}"\n\nTexto melhorado:`;
}

module.exports = async function handler(req, res) {
  // CORS
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  if (isAllowed(origin, referer)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Only allow configured origins
  if (!isAllowed(origin, referer)) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  try {
    const { text, style } = req.body || {};

    if (!text || text.trim().length < 3) {
      return res.status(400).json({ error: 'Texto muito curto' });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: 'API key não configurada. Define GROQ_API_KEY nas variáveis de ambiente da Vercel.' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'És um assistente profissional de documentos. Melhoras textos para português de Angola (pt-AO). Apenas devolves o texto melhorado, sem explicações.'
          },
          {
            role: 'user',
            content: buildPrompt(text, style)
          }
        ],
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error('Groq API error:', response.status, errBody);
      return res.status(502).json({ error: 'Erro da API Groq', detail: errBody });
    }

    const data = await response.json();
    const result = (data.choices?.[0]?.message?.content || text).trim();

    return res.status(200).json({ result });

  } catch (err) {
    console.error('Enhance error:', err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
