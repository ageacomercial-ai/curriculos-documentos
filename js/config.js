/* ─── CONFIGURAÇÃO CENTRAL TÁ FEITO ─── */
const CONFIG = {

  // ─── MARCA ───
  brand: {
    name: 'Tá Feito',
    slogan: 'Tu dizes. Nós fazemos.',
    tagline: 'Precisas de um documento? Tá Feito.',
    signature: 'Tá Feito — documentos sem stress.',
    description: 'Plataforma de criação de documentos profissionais.',
    locale: 'pt-AO',
    currency: 'Kz',
    year: new Date().getFullYear()
  },

  // ─── PLANOS ───
  plans: {
    free: { name: 'Grátis', docs: 3, price: 0, watermark: true },
    basic: { name: 'Básico', docs: 20, price: 2500, watermark: false },
    pro: { name: 'Profissional', docs: 50, price: 5000, watermark: false },
    unlimited: { name: 'Ilimitado', docs: 100, price: 8500, watermark: false }
  },

  // ─── PREÇO POR DOCUMENTO AVULSO ───
  perDocPrice: 500,

  // ─── CÓDIGOS DE ACTIVAÇÃO ───
  activation: {
    expiryHours: 48,
    prefix: 'TF-'
  },

  // ─── ADMINISTRAÇÃO ───
  admin: {
    // PIN será validado via backend/worker. Este é apenas fallback local.
    localPin: '2468'
  },

  // ─── MÉTODOS DE PAGAMENTO ───
  banks: [
    {
      id: 'bfa',
      name: 'BFA',
      logo: '🏦',
      iban: 'AO06 0040 0000 8864 9766 3011 4',
      titular: 'Adelino Graça Daniel João',
      tipo: 'iban',
      note: null,
      badge: null,
      instructions: [
        'Faz a transferência para o IBAN acima.',
        'Tira um screenshot ou foto do comprovativo.',
        'Clica no botão abaixo para enviar.'
      ]
    },
    {
      id: 'bai',
      name: 'BAI',
      logo: '🏦',
      iban: 'AO06 0040 0000 2479 2016 1017 5',
      titular: 'Adelino Graça Daniel João',
      tipo: 'iban',
      note: null,
      badge: null,
      instructions: [
        'Faz a transferência para o IBAN acima.',
        'Tira um screenshot ou foto do comprovativo.',
        'Clica no botão abaixo para enviar.'
      ]
    },
    {
      id: 'bic',
      name: 'BIC',
      logo: '🏦',
      iban: 'AO06 0051 0000 2320 4454 1011 3',
      titular: 'Adelino Graça Daniel João',
      tipo: 'iban',
      note: null,
      badge: null,
      instructions: [
        'Faz a transferência para o IBAN acima.',
        'Tira um screenshot ou foto do comprovativo.',
        'Clica no botão abaixo para enviar.'
      ]
    },
    {
      id: 'multicaixa',
      name: 'Multicaixa Express',
      logo: '⚡',
      iban: '937 876 711',
      titular: 'Adelino Graça Daniel João',
      tipo: 'number',
      note: 'Para uma confirmação mais rápida, sempre que possível, utiliza o mesmo banco de onde estás a fazer a transferência. Transferências entre bancos diferentes podem demorar até 24 horas a refletir.',
      badge: '⚡ IMEDIATO',
      instructions: [
        'Faz o pagamento no Multicaixa Express usando o número acima.',
        'Tira um screenshot ou foto do comprovativo.',
        'Clica no botão abaixo para enviar.'
      ]
    }
  ],

  // ─── WHATSAPP ───
  whatsapp: {
    number: '+244937876711',
    messageTemplate: function (data) {
      return [
        'Olá! Quero activar o plano ' + (data.plano || '') + '.',
        'Nome: ' + (data.nome || ''),
        'Valor: ' + (data.valor || '') + ' Kz',
        'Método: ' + (data.metodo || ''),
        '',
        'Segue em anexo o comprovativo.'
      ].join('\n');
    }
  },

  // ─── IA ───
  ai: {
    provider: 'groq',
    model: 'llama3-70b-8192',
    // O endpoint do worker será configurado via Definições
    defaultEndpoint: '',
    maxTokens: 1024,
    temperature: 0.7
  },

  // ─── REDES SOCIAIS ───
  social: {
    website: 'https://ta-feito-documentos.vercel.app',
    github: 'https://github.com/ageacomercial-ai/curriculos-documentos',
    whatsapp: 'https://wa.me/244937876711'
  },

  // ─── APPEARANCE ───
  themes: ['light', 'dark', 'system'],
  defaultTheme: 'system',

  // ─── VERSÃO ───
  version: '2.0.0'
};

window.CONFIG = CONFIG;
