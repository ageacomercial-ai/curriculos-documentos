const ModelRegistry = {
  _models: {},

  register(type, id, config) {
    if (!this._models[type]) this._models[type] = {};
    this._models[type][id] = { id, ...config };
  },

  get(type, id) {
    return this._models[type]?.[id] || null;
  },

  list(type) {
    return Object.values(this._models[type] || {});
  },

  getDefault(type) {
    const list = this.list(type);
    return list[0] || null;
  }
};

const DocTypes = {
  tipos: [
    { id: 'declaracao-residencia', name: 'Declaração de Residência', icon: '🏠', desc: 'Comprovativo de morada para fins administrativos' },
    { id: 'declaracao-trabalho', name: 'Declaração de Trabalho', icon: '💼', desc: 'Comprovativo de vínculo laboral e função' },
    { id: 'carta-apresentacao', name: 'Carta de Apresentação', icon: '✉️', desc: 'Carta de motivação para candidatura a emprego' },
    { id: 'carta-recomendacao', name: 'Carta de Recomendação', icon: '⭐', desc: 'Recomendação profissional ou académica' },
    { id: 'contrato-servicos', name: 'Contrato de Prestação de Serviços', icon: '📋', desc: 'Acordo formal entre prestador e contratante' },
    { id: 'requerimento', name: 'Requerimento', icon: '📄', desc: 'Requisição formal a entidade pública ou privada' }
  ],

  get(id) {
    return this.tipos.find(t => t.id === id) || null;
  },

  getFormFields(id) {
    const forms = {
      'declaracao-residencia': [
        { key: 'declarante', label: 'Nome do declarante', type: 'text', placeholder: 'Nome completo' },
        { key: 'bi', label: 'BI / Passaporte', type: 'text', placeholder: 'Nº do documento' },
        { key: 'morada', label: 'Morada atual', type: 'text', placeholder: 'Rua, bairro, município' },
        { key: 'tempo', label: 'Tempo de residência', type: 'text', placeholder: 'Ex.: 5 anos' },
        { key: 'finalidade', label: 'Para efeitos de', type: 'text', placeholder: 'Ex.: inscrição escolar, comprovativo bancário' },
        { key: 'local', label: 'Local', type: 'text', placeholder: 'Ex.: Luanda' },
        { key: 'data', label: 'Data', type: 'date' }
      ],
      'declaracao-trabalho': [
        { key: 'funcionario', label: 'Nome do funcionário', type: 'text', placeholder: 'Nome completo' },
        { key: 'bi', label: 'BI / Passaporte', type: 'text', placeholder: 'Nº do documento' },
        { key: 'cargo', label: 'Cargo', type: 'text', placeholder: 'Ex.: Analista de Sistemas' },
        { key: 'empresa', label: 'Empresa', type: 'text', placeholder: 'Nome da empresa' },
        { key: 'admissao', label: 'Data de admissão', type: 'text', placeholder: 'Ex.: 15 de Março de 2022' },
        { key: 'salario', label: 'Salário (opcional)', type: 'text', placeholder: 'Ex.: 250.000 Kz' },
        { key: 'finalidade', label: 'Para efeitos de', type: 'text', placeholder: 'Ex.: obtenção de visto, crédito bancário' },
        { key: 'local', label: 'Local', type: 'text', placeholder: 'Ex.: Luanda' },
        { key: 'data', label: 'Data', type: 'date' }
      ],
      'carta-apresentacao': [
        { key: 'destinatario', label: 'Destinatário', type: 'text', placeholder: 'Nome da empresa ou recrutador' },
        { key: 'cargo', label: 'Cargo pretendido', type: 'text', placeholder: 'Ex.: Engenheiro Informático' },
        { key: 'corpo', label: 'Corpo da carta', type: 'textarea', placeholder: 'Escreve a tua carta de motivação...' },
        { key: 'remetente', label: 'O teu nome', type: 'text', placeholder: 'Nome completo' },
        { key: 'contacto', label: 'Teu contacto', type: 'text', placeholder: 'Email ou telefone' },
        { key: 'local', label: 'Local', type: 'text', placeholder: 'Ex.: Luanda' },
        { key: 'data', label: 'Data', type: 'date' }
      ],
      'carta-recomendacao': [
        { key: 'recomendado', label: 'Nome do recomendado', type: 'text', placeholder: 'Nome completo' },
        { key: 'relacao', label: 'Relação com o recomendado', type: 'text', placeholder: 'Ex.: supervisor, professor' },
        { key: 'qualidades', label: 'Qualidades e competências', type: 'textarea', placeholder: 'Descreve as qualidades, habilidades e conquistas...' },
        { key: 'recomendador', label: 'Teu nome (recomendador)', type: 'text', placeholder: 'Nome completo' },
        { key: 'cargo_rec', label: 'Teu cargo', type: 'text', placeholder: 'Ex.: Diretor de Recursos Humanos' },
        { key: 'contacto_rec', label: 'Teu contacto', type: 'text', placeholder: 'Email ou telefone' },
        { key: 'local', label: 'Local', type: 'text', placeholder: 'Ex.: Luanda' },
        { key: 'data', label: 'Data', type: 'date' }
      ],
      'contrato-servicos': [
        { key: 'prestador', label: 'Prestador (nome)', type: 'text', placeholder: 'Nome completo ou empresa' },
        { key: 'prestador_bi', label: 'BI/NIF do prestador', type: 'text', placeholder: 'Nº do documento' },
        { key: 'contratante', label: 'Contratante (nome)', type: 'text', placeholder: 'Nome completo ou empresa' },
        { key: 'contratante_bi', label: 'BI/NIF do contratante', type: 'text', placeholder: 'Nº do documento' },
        { key: 'objeto', label: 'Objeto do contrato', type: 'text', placeholder: 'Ex.: Desenvolvimento de website' },
        { key: 'valor', label: 'Valor', type: 'text', placeholder: 'Ex.: 500.000 Kz' },
        { key: 'prazo', label: 'Prazo', type: 'text', placeholder: 'Ex.: 60 dias, de 01/01 a 01/03/2025' },
        { key: 'clausulas', label: 'Cláusulas adicionais', type: 'textarea', placeholder: 'Descreve termos e condições específicas...' },
        { key: 'local', label: 'Local', type: 'text', placeholder: 'Ex.: Luanda' },
        { key: 'data', label: 'Data', type: 'date' }
      ],
      'requerimento': [
        { key: 'destinatario', label: 'Exmo(a). Senhor(a)', type: 'text', placeholder: 'Cargo ou entidade (Ex.: Diretor da Escola)' },
        { key: 'requerente', label: 'Nome do requerente', type: 'text', placeholder: 'Nome completo' },
        { key: 'bi', label: 'BI / Processo', type: 'text', placeholder: 'Nº do documento' },
        { key: 'assunto', label: 'Assunto', type: 'text', placeholder: 'Ex.: Pedido de certidão' },
        { key: 'corpo', label: 'Corpo do requerimento', type: 'textarea', placeholder: 'Descreve o que estás a solicitar e os fundamentos...' },
        { key: 'local', label: 'Local', type: 'text', placeholder: 'Ex.: Luanda' },
        { key: 'data', label: 'Data', type: 'date' }
      ]
    };
    return forms[id] || [];
  },

  getRenderFn(id) {
    const fns = {
      'declaracao-residencia': renderDeclaracaoResidencia,
      'declaracao-trabalho': renderDeclaracaoTrabalho,
      'carta-apresentacao': renderCartaApresentacao,
      'carta-recomendacao': renderCartaRecomendacao,
      'contrato-servicos': renderContratoServicos,
      'requerimento': renderRequerimento
    };
    return fns[id] || null;
  }
};
