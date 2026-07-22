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
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  if (origin.includes('.vercel.app') && origin.includes('ta-feito')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (origin === 'http://localhost:3000' || origin === 'http://127.0.0.1:3000') {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = await readBody(req);
    const { text, type } = body;
    if (!text || text.trim().length < 5) {
      return res.status(400).json({ error: 'Texto muito curto' });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: 'API key não configurada' });
    }

    let systemPrompt = '';
    let responseFormat = '';

    if (type === 'experiencia') {
      systemPrompt = `És um assistente especializado em extrair dados estruturados de currículos.
A partir do texto do utilizador, extrai APENAS a informação disponível e devolve em JSON.
Não inventes informação que não esteja no texto.`;

      responseFormat = `Extrai os dados da experiência profissional do texto abaixo.
Devolve APENAS um JSON object com os campos que conseguires extrair.
Exemplo de formato esperado:
{
  "cargo": "Técnico de Informática",
  "empresa": "Empresa XPTO",
  "inicio": "2020",
  "fim": "2024",
  "descricao": "Descrição das responsabilidades extraídas",
  "responsabilidades": "Responsabilidade 1; Responsabilidade 2; Responsabilidade 3",
  "conquistas": "Conquista 1; Conquista 2"
}

IMPORTANTE: Usa valores vazios para campos não encontrados. Devolve APENAS o JSON, sem explicações.`;
    } else if (type === 'resumo') {
      systemPrompt = 'És um escritor profissional de currículos em português de Angola.';
      responseFormat = `Transforma o texto abaixo num resumo profissional de alto impacto (máximo 3 frases).
        Devolve APENAS o texto transformado, sem explicações, sem aspas.`;
    } else {
      return res.status(400).json({ error: 'Tipo de extracção inválido' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: responseFormat + '\n\nTexto: "' + text + '"' }
        ],
        max_tokens: 1024,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error('Groq extract error:', response.status, errBody);
      return res.status(502).json({ error: 'Erro da API Groq' });
    }

    const data = await response.json();
    const reply = (data.choices?.[0]?.message?.content || '').trim();

    if (type === 'experiencia') {
      try {
        const parsed = JSON.parse(reply);
        return res.status(200).json({ result: parsed });
      } catch (e) {
        // Try to extract JSON from the response
        const match = reply.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            const parsed = JSON.parse(match[0]);
            return res.status(200).json({ result: parsed });
          } catch (e2) {}
        }
        return res.status(200).json({ result: { descricao: reply } });
      }
    }

    return res.status(200).json({ result: reply });
  } catch (err) {
    console.error('Extract error:', err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
