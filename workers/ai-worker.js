// Cloudflare Worker — Proxy de IA para a Chave
// Faz o relay seguro entre a app e a API de IA (DeepSeek, OpenAI, etc)
// sem expor a chave de API ao cliente.

const ALLOWED_ORIGINS = [
  'https://ageacomercial-ai.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'file://'
];

function getClientOrigin(request) {
  const origin = request.headers.get('Origin') || '';
  const referer = request.headers.get('Referer') || '';
  return origin || referer;
}

function isAllowed(request) {
  const origin = getClientOrigin(request);
  return ALLOWED_ORIGINS.some(a => origin.startsWith(a));
}

function buildPrompt(text, style) {
  const styleMap = {
    profissional: 'profissional, com verbos de acção e tom formal',
    conciso: 'conciso, directo, em 1 linha',
    formal: 'formal, com linguagem jurídica/administrativa',
    criativo: 'criativo e dinâmico, mantendo profissionalismo'
  };

  const desc = styleMap[style] || styleMap.profissional;

  return [
    'Melhora o seguinte texto em português de Angola para um contexto profissional de currículo.',
    'Torna-o ' + desc + '.',
    'Usa verbos de acção no pretérito perfeito (ex: Liderei, Coordenei, Implementei).',
    'Responde APENAS com o texto melhorado, sem introduções nem explicações.',
    '',
    'Texto original:',
    text
  ].join('\n');
}

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  // Verificar autenticação
  const authHeader = request.headers.get('Authorization') || '';
  const expectedKey = API_KEY || '';

  if (expectedKey && authHeader !== 'Bearer ' + expectedKey) {
    return new Response(JSON.stringify({ error: 'Não autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const body = await request.json();
    const text = body.text || '';
    const style = body.style || 'profissional';
    const model = body.model || 'deepseek-chat';

    if (!text.trim()) {
      return new Response(JSON.stringify({ error: 'Texto vazio' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const prompt = buildPrompt(text, style);
    const apiUrl = API_URL || 'https://api.deepseek.com/v1/chat/completions';

    const aiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: text }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      return new Response(JSON.stringify({ error: 'Erro da API de IA: ' + aiResponse.status, detail: errText }), {
        status: aiResponse.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const aiData = await aiResponse.json();
    const result = aiData.choices?.[0]?.message?.content || text;

    return new Response(JSON.stringify({ result: result }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erro interno: ' + err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
