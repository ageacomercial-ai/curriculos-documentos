// Vercel Serverless Function — Chat IA para o Tá Feito
// Conversa inteligente sobre currículos e documentos

const ALLOWED_ORIGINS = [
  'https://ageacomercial-ai.github.io',
  'https://ta-feito-documentos.vercel.app',
  'https://ta-feito-doc.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'file://'
];

function isAllowed(origin, referer) {
  const o = origin || referer || '';
  if (!o) return false;
  // Allow any Vercel preview deployment for ta-feito project
  if (o.includes('.vercel.app') && o.includes('ta-feito')) return true;
  return ALLOWED_ORIGINS.some(a => o.startsWith(a));
}

function buildContext(context) {
  if (!context) return '';
  const { type, model, data } = context;
  if (!data) return '';

  let ctx = '\n\nContexto do documento:\n';

  if (type === 'cv') {
    ctx += `Tipo: Currículo (modelo: ${model || 'clássico'})\n`;
    if (data.nome) ctx += `Nome: ${data.nome}\n`;
    if (data.cargo) ctx += `Cargo pretendido: ${data.cargo}\n`;
    if (data.email) ctx += `Email: ${data.email}\n`;
    if (data.telefone) ctx += `Telefone: ${data.telefone}\n`;
    if (data.morada) ctx += `Morada: ${data.morada}\n`;
    if (data.resumo) ctx += `Resumo profissional: ${data.resumo}\n`;
    if (data.experiencias && data.experiencias.length) {
      ctx += 'Experiências:\n';
      data.experiencias.forEach(e => {
        ctx += `- ${e.cargo || '(sem cargo)'} na ${e.empresa || '(sem empresa)'} (${e.inicio || '?'} a ${e.fim || 'presente'})\n`;
        if (e.descricao) ctx += `  Descrição: ${e.descricao}\n`;
      });
    }
    if (data.formacoes && data.formacoes.length) {
      ctx += 'Formação:\n';
      data.formacoes.forEach(f => {
        ctx += `- ${f.curso || '(sem curso)'} — ${f.instituicao || '(sem instituição)'} (${f.inicio || '?'} a ${f.fim || '?'})\n`;
      });
    }
    if (data.competencias && data.competencias.length) {
      ctx += `Competências: ${data.competencias.map(c => c.nome).join(', ')}\n`;
    }
    if (data.idiomas && data.idiomas.length) {
      ctx += `Idiomas: ${data.idiomas.map(i => `${i.idioma} (${i.nivel})`).join(', ')}\n`;
    }
  } else {
    ctx += `Tipo: ${type || 'documento'}\n`;
    for (const [key, val] of Object.entries(data)) {
      if (val && typeof val === 'string' && val.length < 300) {
        ctx += `${key}: ${val}\n`;
      }
    }
  }

  ctx += '\nNota: O utilizador pode fazer perguntas sobre este documento. Sê útil, prático e específico.';
  return ctx;
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  if (isAllowed(origin, referer)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!isAllowed(origin, referer)) return res.status(403).json({ error: 'Origin not allowed' });

  try {
    const { messages, context } = req.body || {};
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Mensagens inválidas' });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: 'API key não configurada' });
    }

    const contextStr = buildContext(context);
    const lastMessage = messages[messages.length - 1]?.content || '';

    const systemMessage = `És um assistente inteligente e prático do "Tá Feito — Documentos", uma plataforma angolana de criação de currículos e documentos profissionais.

O teu objectivo é ajudar o utilizador a criar documentos melhores. Podes:
- Avaliar currículos e sugerir melhorias concretas
- Responder a dúvidas sobre o mercado de trabalho em Angola
- Dar dicas de escrita profissional, ortografia e formatação
- Sugerir competências, cursos ou experiências relevantes
- Ajudar a preparar entrevistas de emprego
- Explicar conceitos profissionais e administrativos

Regras:
- Responde em português de Angola (pt-AO)
- Sê directo, prático e útil — sem rodeios
- Se pedirem avaliação, sê honesto mas construtivo
- Se não souberes algo, admite
- Máximo 500 tokens por resposta
- Usa o contexto do documento fornecido para dar respostas personalizadas${contextStr}`;

    const apiMessages = [
      { role: 'system', content: systemMessage },
      ...messages.filter(m => m.role !== 'system')
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: apiMessages,
        max_tokens: 600,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error('Groq chat error:', response.status, errBody);
      return res.status(502).json({ error: 'Erro da API Groq', detail: errBody });
    }

    const data = await response.json();
    const reply = (data.choices?.[0]?.message?.content || '').trim() || 'Desculpa, não consegui gerar uma resposta. Tenta de novo.';

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
