(function () {
  // Config — set these via env or settings
  var AI_ENDPOINT = localStorage.getItem('chave_ai_endpoint') || '/api/enhance';
  var AI_MODEL = 'groq-llama3';

  function isConfigured() {
    return AI_ENDPOINT.length > 0;
  }

  function setEndpoint(url) {
    AI_ENDPOINT = url;
    localStorage.setItem('chave_ai_endpoint', url);
  }

  function getEndpoint() {
    return AI_ENDPOINT;
  }

  async function enhanceText(text, style) {
    style = style || 'profissional';

    if (!text || text.trim().length < 3) {
      throw new Error('Escreve primeiro uma descrição para melhorar.');
    }

    if (!isConfigured()) {
      return mockEnhance(text, style);
    }

    try {
      var response = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          style: style,
          model: AI_MODEL
        })
      });

      if (!response.ok) {
        throw new Error('Erro do servidor: ' + response.status);
      }

      var data = await response.json();
      return data.result || data.text || text;
    } catch (err) {
      console.warn('AI call failed, using mock:', err);
      return mockEnhance(text, style);
    }
  }

  function mockEnhance(text, style) {
    var lines = text.split(/[.!?\n]+/).filter(Boolean).map(function (l) { return l.trim(); });
    if (lines.length === 0) lines = [text];

    var results = lines.map(function (line) {
      line = line.trim();
      if (!line) return '';
      line = line.charAt(0).toUpperCase() + line.slice(1);
      if (!line.endsWith('.') && !line.endsWith('!') && !line.endsWith('?')) line += '.';
      line = line.replace(/\bvc\b/gi, 'você');
      line = line.replace(/\btb\b/gi, 'também');
      line = line.replace(/\bpq\b/gi, 'porque');
      line = line.replace(/\bq\b/gi, 'que');
      line = line.replace(/\bnej\b/gi, 'ninguém');
      line = line.replace(/\btd\b/gi, 'tudo');
      line = line.replace(/\bng\b/gi, 'não');
      line = line.replace(/\bflr\b/gi, 'falar');
      line = line.replace(/\bblz\b/gi, 'beleza');
      return line;
    });

    return results.join(' ');
  }

  function suggestModel(cargo) {
    if (!cargo) return null;
    var c = cargo.toLowerCase();

    if (/criativo|design|arte|publicidade|marketing|comunicação|social media|jornalista/.test(c)) {
      return { model: 'criativo', reason: 'Perfis criativos destacam-se com um modelo visual expressivo.' };
    }
    if (/executivo|director|gerente|chefe|supervisor|coordena|presidente|ceo|cto|cfo/.test(c)) {
      return { model: 'executivo', reason: 'Um tom sóbrio e formal para cargos de liderança.' };
    }
    if (/engenheiro|programador|analista|técnico|consultor|advogado|médico|professor/.test(c)) {
      return { model: 'classico', reason: 'Elegância clássica para perfis profissionais tradicionais.' };
    }
    if (/estudante|estagiário|junior|aprendiz|trainee/.test(c)) {
      return { model: 'moderno', reason: 'Limpado e moderno — ideal para quem está a começar.' };
    }
    return null;
  }

  function getSetupInstructions() {
    return {
      cloudflare: {
        name: 'Cloudflare Workers',
        setup: `
1. Vai a https://dash.cloudflare.com → Workers & Pages
2. Cria um novo Worker
3. Cola o código de workers/ai-worker.js
4. Define as variáveis de ambiente:
   - API_KEY (ex: da DeepSeek, OpenAI, etc)
   - API_URL (ex: https://api.deepseek.com/v1/chat/completions)
5. Faz deploy e copia o URL do Worker
6. No Tá Feito, vai a Definições > IA e cola o URL
        `.trim()
      }
    };
  }

  window.AI = {
    enhanceText: enhanceText,
    isConfigured: isConfigured,
    setEndpoint: setEndpoint,
    getEndpoint: getEndpoint,
    suggestModel: suggestModel,
    getSetupInstructions: getSetupInstructions,
    mockEnhance: mockEnhance
  };
})();
