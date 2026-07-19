(function () {
  function esc(s) { if (s == null) return ''; const d = document.createElement('div'); d.textContent = String(s); return d.innerHTML; }

  var loadCV = function() { return Storage.loadCV(); };
  var saveCV = function(d) { Storage.saveCV(d); };
  var loadDoc = function() { return Storage.loadDoc(); };
  var saveDoc = function(d) { Storage.saveDoc(d); };
  var getDocType = function() { return Storage.getDocType(); };
  var setDocType = function(t) { Storage.setDocType(t); };

  /* ─── NAVEGAÇÃO ─── */

  function atualizarNav(route) {
    document.querySelectorAll('.sidebar-item, .bottom-nav-item').forEach(function (el) {
      el.classList.toggle('active', el.dataset.route === route);
    });
  }

  window.navegar = function (route) {
    const cur = Router.current;
    if (cur === 'criar-curriculo' || cur === 'preencher-doc') {
      if (cur === 'criar-curriculo') guardarCV();
      if (cur === 'preencher-doc') guardarDoc();
    }
    Router.go(route);
  };

  /* ─── HOME / DASHBOARD ─── */

  Router.register('home', {
    title: 'Início',
    render: function () {
      var d = loadCV();
      var hasCV = Object.keys(d).length > 1;
      var expCount = (d.experiencias || []).filter(function (e) { return e.cargo; }).length;
      var totalDocs = DocTypes ? DocTypes.tipos.length : 0;
      var isPaid = Storage ? Storage.isPaid() : false;

      return '<div class="page">' +
        '<div class="dashboard-hero">' +
          '<div class="dashboard-emblem">' +
            '<svg viewBox="0 0 44 44" fill="none">' +
              '<rect x="2" y="2" width="40" height="40" rx="10" stroke="#c9a96e" stroke-width="2.5" fill="none"/>' +
              '<path d="M22 10 L22 34 M12 22 L32 22" stroke="#c9a96e" stroke-width="2.5" stroke-linecap="round"/>' +
              '<circle cx="22" cy="22" r="5" fill="#c9a96e"/>' +
            '</svg>' +
          '</div>' +
          '<h1>Bem-vindo à Chave</h1>' +
          '<p class="subtitle">Cria currículos, declarações, cartas e contratos com <strong>modelos premium</strong> — tudo num só lugar.</p>' +
        '</div>' +
        '<div class="dashboard-stats">' +
          '<div class="stat-card"><div class="stat-value">' + (hasCV ? '1' : '0') + '</div><div class="stat-label">Currículos</div></div>' +
          '<div class="stat-card"><div class="stat-value">' + expCount + '</div><div class="stat-label">Experiências</div></div>' +
          '<div class="stat-card"><div class="stat-value">' + totalDocs + '</div><div class="stat-label">Documentos</div></div>' +
          '<div class="stat-card"><div class="stat-value">' + (isPaid ? '✓' : '—') + '</div><div class="stat-label">Pagamento</div></div>' +
        '</div>' +
        '<div class="card-grid">' +
          '<div class="card" onclick="navegar(\'criar-curriculo\')" style="animation-delay:0.1s">' +
            '<div class="card-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>' +
            '<h3>Criar Currículo</h3><p>Escolhe entre 5 modelos premium e preenche os teus dados.</p>' +
          '</div>' +
          '<div class="card" onclick="navegar(\'selecionar-doc\')" style="animation-delay:0.2s">' +
            '<div class="card-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="9" y2="9"/></svg></div>' +
            '<h3>Criar Documento</h3><p>Declarações, cartas, contratos e requerimentos formais.</p>' +
          '</div>' +
        '</div>' +
        (hasCV ? '<div class="home-resume"><button class="btn-primary" onclick="navegar(\'pre-visualizar-cv\')" style="animation-delay:0.25s"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Continuar último currículo</button></div>' : '') +
        '<div class="home-tip">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' +
          '<span>Podes usar voz para preencher campos — toca no 🎤 ao lado dos inputs</span>' +
        '</div>' +
      '</div>';
    }
  });

  /* ─── CRIAR CURRÍCULO ─── */

  Router.register('criar-curriculo', {
    title: 'Criar Currículo',
    render() {
      const d = loadCV();
      const fotoPreview = d.foto && d.foto.startsWith('data:')
        ? `<img src="${esc(d.foto)}" alt="" class="photo-preview">`
        : (d.foto ? `<img src="${esc(d.foto)}" alt="" class="photo-preview" onerror="this.parentElement.innerHTML='<span class=\\'photo-preview-placeholder\\'>📷</span>'">` : '');
      return `<div class="page">
        <h1>Criar Currículo</h1>
        <p class="subtitle">Preenche os teus dados. Podes usar voz, adicionar IA e trocar de modelo depois.</p>
        <div class="form-section"><h2>Dados Pessoais</h2>
          <div class="form-group"><label>Nome completo</label><div class="input-with-mic"><input type="text" id="input-nome" value="${esc(d.nome||'')}" placeholder="Ex.: João Manuel Silva Santos"><button class="btn-mic" data-mic="input-nome" aria-label="Voz"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></button></div></div>
          <div class="form-row"><div class="form-group"><label>Cargo / Profissão</label><input type="text" id="input-cargo" value="${esc(d.cargo||'')}" placeholder="Ex.: Engenheiro Informático"></div><div class="form-group"><label>Redes sociais</label><input type="text" id="input-social" value="${esc(d.social||'')}" placeholder="linkedin.com/in/..."></div></div>
          <div class="form-group"><label>Foto</label><div class="photo-upload"><div class="photo-preview-wrap" id="photo-preview-wrap">${fotoPreview || '<span class="photo-preview-placeholder">📷</span>'}</div><div class="photo-upload-fields"><button class="btn-secondary btn-small" onclick="document.getElementById('file-foto').click()">Escolher ficheiro</button><input type="file" id="file-foto" accept="image/*" style="display:none"><input type="url" id="input-foto" value="${esc(d.foto&&!d.foto.startsWith('data:')?d.foto:'')}" placeholder="Ou URL da foto..." style="margin-top:6px;font-size:13px"></div></div></div>
          <div class="form-group"><label>Resumo profissional</label><div class="input-with-mic textarea-mic"><textarea id="input-resumo" placeholder="Conta a tua história profissional... Podes usar o microfone para ditar." rows="4">${esc(d.resumo||'')}</textarea><button class="btn-mic" data-mic="input-resumo" aria-label="Voz"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></button></div></div>
          <div class="form-row"><div class="form-group"><label>Email</label><input type="email" id="input-email" value="${esc(d.email||'')}" placeholder="exemplo@email.com"></div><div class="form-group"><label>Telefone</label><input type="tel" id="input-telefone" value="${esc(d.telefone||'')}" placeholder="+244 900 000 000"></div></div>
          <div class="form-group"><label>Morada</label><input type="text" id="input-morada" value="${esc(d.morada||'')}" placeholder="Ex.: Luanda, Angola"></div></div>
        <div class="form-section"><h2>Experiência Profissional</h2><div id="exp-container">${(d.experiencias||[{cargo:'',empresa:'',inicio:'',fim:'',descricao:''}]).map((e,i) => renderExp(e,i)).join('')}</div><button class="btn-secondary add-btn" onclick="adicionarExp()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar experiência</button></div>
        <div class="form-section"><h2>Formação Académica</h2><div id="formacao-container">${(d.formacoes||[{curso:'',instituicao:'',inicio:'',fim:''}]).map((f,i) => renderForm(f,i)).join('')}</div><button class="btn-secondary add-btn" onclick="adicionarForm()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar formação</button></div>
        <div class="form-section"><h2>Competências</h2><div id="skills-container">${(d.competencias||[{nome:'',nivel:'3'}]).map((s,i) => renderSkill(s,i)).join('')}</div><button class="btn-secondary add-btn" onclick="adicionarSkill()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar competência</button></div>
        <div class="form-section"><h2>Idiomas</h2><div id="idiomas-container">${(d.idiomas||[{idioma:'',nivel:'Iniciante'}]).map((l,i) => renderIdioma(l,i)).join('')}</div><button class="btn-secondary add-btn" onclick="adicionarIdioma()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar idioma</button></div>
        <div class="form-actions"><button class="btn-primary" onclick="guardarEprevCV()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Pré-visualizar</button></div>
      </div>`;
    },
    onLeave() { guardarCV(); }
  });

  /* ─── PRÉ-VISUALIZAR CV ─── */

  Router.register('pre-visualizar-cv', {
    title: 'Pré-visualizar',
    onRender: function () { scalePreview('preview-frame'); },
    render() {
      const d = loadCV();
      const modelos = ModelRegistry.list('cv');
      const atual = d.modelo || 'classico';
      const model = ModelRegistry.get('cv', atual) || modelos[0];
      const suggestion = AI && AI.suggestModel ? AI.suggestModel(d.cargo) : null;
      return `<div class="page">
        <h1>Pré-visualizar</h1>
        <p class="subtitle">Vê como está a ficar o teu currículo. Podes trocar de modelo e voltar a editar.</p>
        ${suggestion && suggestion.model !== atual ? `<div class="model-suggestion" onclick="selecionarModelo('${suggestion.model}')"><strong>💡 Sugestão:</strong> ${esc(suggestion.reason)} <span class="model-suggestion-link">Experimentar ${modelos.find(m => m.id === suggestion.model)?.name || suggestion.model}</span></div>` : ''}
        <div class="model-selector">${modelos.map(m => `<div class="model-option ${m.id === atual ? 'selected' : ''}" onclick="selecionarModelo('${m.id}')"><span class="model-dot"></span> ${esc(m.name)}</div>`).join('')}</div>
        <div class="preview-container"><div id="preview-frame">${model ? model.render(d) : '<div class="loading-model"><div class="spinner"></div><p>A carregar...</p></div>'}</div></div>
        <div class="export-bar">
          <button class="btn-primary btn-exportar-pdf" onclick="PDFExport.exportPreview('preview-frame','curriculo.pdf')" style="flex:1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> Exportar PDF</button>
          <button class="btn-secondary" style="width:auto;padding:14px" onclick="partilharWhatsApp('curriculo')" aria-label="Partilhar"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></button>
        </div>
        <button class="btn-secondary" onclick="navegar('criar-curriculo')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Voltar e editar</button>
      </div>`;
    }
  });

  /* ─── SELECIONAR DOCUMENTO ─── */

  Router.register('selecionar-doc', {
    title: 'Criar Documento',
    render() {
      return `<div class="page">
        <h1>Que documento queres criar?</h1>
        <p class="subtitle">Escolhe o tipo de documento e preenche os dados. Nós formatamos com um modelo profissional.</p>
        <div class="card-grid">${DocTypes.tipos.map(t => `<div class="card" onclick="iniciarDoc('${t.id}')" style="animation-delay:${0.1 + DocTypes.tipos.indexOf(t) * 0.05}s"><div class="card-icon" style="font-size:28px">${t.icon}</div><h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p></div>`).join('')}</div>
      </div>`;
    }
  });

  window.iniciarDoc = function (id) {
    setDocType(id);
    saveDoc({});
    Router.go('preencher-doc');
  };

  /* ─── PREENCHER DOCUMENTO ─── */

  Router.register('preencher-doc', {
    title: 'Preencher Documento',
    render() {
      const tipo = getDocType();
      const info = DocTypes.get(tipo);
      const fields = DocTypes.getFormFields(tipo);
      const d = loadDoc();
      if (!info) return '<div class="page"><p>Tipo de documento não encontrado.</p><button class="btn-secondary" onclick="navegar(\'selecionar-doc\')">Voltar</button></div>';
      return `<div class="page">
        <h1>${esc(info.name)}</h1>
        <p class="subtitle">Preenche os campos abaixo. O documento será formatado automaticamente.</p>
        <div class="form-section"><h2>Dados do Documento</h2>${fields.map(f => {
          const val = esc(d[f.key] || '');
          if (f.type === 'textarea') {
            return `<div class="form-group"><label>${esc(f.label)}</label><div class="input-with-mic textarea-mic"><textarea name="doc-${f.key}" placeholder="${esc(f.placeholder||'')}" rows="5">${val}</textarea><button class="btn-mic" data-mic="doc-${f.key}" aria-label="Voz"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></button></div></div>`;
          }
          return `<div class="form-group"><label>${esc(f.label)}</label><input type="${f.type === 'date' ? 'date' : 'text'}" name="doc-${f.key}" value="${val}" placeholder="${esc(f.placeholder||'')}"></div>`;
        }).join('')}</div>
        <div class="form-actions"><button class="btn-primary" onclick="guardarEprevDoc()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Pré-visualizar</button></div>
      </div>`;
    },
    onLeave() { guardarDoc(); }
  });

  /* ─── PRÉ-VISUALIZAR DOC ─── */

  Router.register('pre-visualizar-doc', {
    title: 'Pré-visualizar',
    onRender: function () { scalePreview('preview-frame'); },
    render() {
      const tipo = getDocType();
      const info = DocTypes.get(tipo);
      const d = loadDoc();
      const renderFn = DocTypes.getRenderFn(tipo);
      if (!info) return '<div class="page"><p>Tipo de documento não encontrado.</p><button class="btn-secondary" onclick="navegar(\'selecionar-doc\')">Voltar</button></div>';
      return `<div class="page">
        <h1>Pré-visualizar</h1>
        <p class="subtitle">Vê como está a ficar o documento. Podes voltar atrás para ajustar.</p>
        <div class="preview-container"><div id="preview-frame">${renderFn ? renderFn(d) : '<div class="loading-model"><div class="spinner"></div><p>A preparar documento...</p></div>'}</div></div>
        <div class="export-bar">
          <button class="btn-primary btn-exportar-pdf" onclick="exportarDocPDF()" style="flex:1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> Exportar PDF</button>
          <button class="btn-secondary" style="width:auto;padding:14px" onclick="partilharWhatsApp('documento')" aria-label="Partilhar"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></button>
        </div>
        <button class="btn-secondary" onclick="navegar('preencher-doc')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Voltar e editar</button>
      </div>`;
    }
  });

  /* ─── RENDERERS DE FORMULÁRIO ─── */

  function renderExp(e, i) {
    return `<div class="exp-item"><div class="form-row"><div class="form-group"><label>Cargo</label><input type="text" name="exp-cargo-${i}" value="${esc(e.cargo)}" placeholder="Ex.: Analista"></div><div class="form-group"><label>Empresa</label><input type="text" name="exp-empresa-${i}" value="${esc(e.empresa)}" placeholder="Ex.: Empresa XYZ"></div></div><div class="form-row"><div class="form-group"><label>Início</label><input type="text" name="exp-inicio-${i}" value="${esc(e.inicio)}" placeholder="Ex.: 2020"></div><div class="form-group"><label>Fim</label><input type="text" name="exp-fim-${i}" value="${esc(e.fim)}" placeholder="Ex.: Presente"></div></div><div class="form-group"><label>Descrição</label><div class="input-with-mic textarea-mic"><textarea name="exp-descricao-${i}" placeholder="Descreve as tuas responsabilidades...">${esc(e.descricao)}</textarea><button class="btn-mic" data-mic="exp-descricao-${i}" aria-label="Voz"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></button></div><div class="ai-actions"><button class="btn-ai" onclick="melhorarDescricao(${i},'profissional')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg> Melhorar</button><button class="btn-ai btn-ai-secondary" onclick="melhorarDescricao(${i},'conciso')">Conciso</button></div></div><button class="btn-remove" onclick="removerExp(${i})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Remover</button></div>`;
  }

  function renderForm(f, i) {
    return `<div class="exp-item"><div class="form-row"><div class="form-group"><label>Curso</label><input type="text" name="form-curso-${i}" value="${esc(f.curso)}" placeholder="Ex.: Licenciatura"></div><div class="form-group"><label>Instituição</label><input type="text" name="form-instituicao-${i}" value="${esc(f.instituicao)}" placeholder="Ex.: Universidade"></div></div><div class="form-row"><div class="form-group"><label>Início</label><input type="text" name="form-inicio-${i}" value="${esc(f.inicio)}" placeholder="Ex.: 2015"></div><div class="form-group"><label>Fim</label><input type="text" name="form-fim-${i}" value="${esc(f.fim)}" placeholder="Ex.: 2021"></div></div><button class="btn-remove" onclick="removerForm(${i})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Remover</button></div>`;
  }

  function renderSkill(s, i) {
    const niveis = ['', 'Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Expert'];
    return `<div class="skill-row"><div class="form-group" style="flex:1;margin-bottom:0"><label>Competência</label><input type="text" name="skill-nome-${i}" value="${esc(s.nome)}" placeholder="Ex.: Liderança"></div><div class="form-group" style="width:110px;margin-bottom:0"><label>Nível</label><select name="skill-nivel-${i}">${niveis.map((n, ni) => `<option value="${ni}" ${(s.nivel==ni)?'selected':''}>${n}</option>`).join('')}</select></div><button class="btn-icon-sm" onclick="removerSkill(${i})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>`;
  }

  function renderIdioma(l, i) {
    const niveis = ['Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo'];
    return `<div class="skill-row"><div class="form-group" style="flex:1;margin-bottom:0"><label>Idioma</label><input type="text" name="idioma-nome-${i}" value="${esc(l.idioma)}" placeholder="Ex.: Inglês"></div><div class="form-group" style="width:130px;margin-bottom:0"><label>Nível</label><select name="idioma-nivel-${i}">${niveis.map(n => `<option value="${n}" ${l.nivel===n?'selected':''}>${n}</option>`).join('')}</select></div><button class="btn-icon-sm" onclick="removerIdioma(${i})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>`;
  }

  /* ─── ACÇÕES CV ─── */

  window.guardarCV = function () {
    const d = {};
    d.nome = document.getElementById('input-nome')?.value || '';
    d.cargo = document.getElementById('input-cargo')?.value || '';
    d.social = document.getElementById('input-social')?.value || '';
    const fotoUrl = document.getElementById('input-foto')?.value || '';
    d.foto = window._fotoDataUrl || fotoUrl;
    d.resumo = document.getElementById('input-resumo')?.value || '';
    d.email = document.getElementById('input-email')?.value || '';
    d.telefone = document.getElementById('input-telefone')?.value || '';
    d.morada = document.getElementById('input-morada')?.value || '';
    d.experiencias = []; document.querySelectorAll('[name^="exp-cargo-"]').forEach((el,i) => { d.experiencias.push({cargo:el.value, empresa:document.querySelector(`[name="exp-empresa-${i}"]`)?.value||'', inicio:document.querySelector(`[name="exp-inicio-${i}"]`)?.value||'', fim:document.querySelector(`[name="exp-fim-${i}"]`)?.value||'', descricao:document.querySelector(`[name="exp-descricao-${i}"]`)?.value||''}); });
    d.formacoes = []; document.querySelectorAll('[name^="form-curso-"]').forEach((el,i) => { d.formacoes.push({curso:el.value, instituicao:document.querySelector(`[name="form-instituicao-${i}"]`)?.value||'', inicio:document.querySelector(`[name="form-inicio-${i}"]`)?.value||'', fim:document.querySelector(`[name="form-fim-${i}"]`)?.value||''}); });
    d.competencias = []; document.querySelectorAll('[name^="skill-nome-"]').forEach((el,i) => { d.competencias.push({nome:el.value, nivel:document.querySelector(`[name="skill-nivel-${i}"]`)?.value||'3'}); });
    d.idiomas = []; document.querySelectorAll('[name^="idioma-nome-"]').forEach((el,i) => { d.idiomas.push({idioma:el.value, nivel:document.querySelector(`[name="idioma-nivel-${i}"]`)?.value||'Iniciante'}); });
    d.modelo = loadCV().modelo || 'classico';
    saveCV(d);
    return d;
  };

  window.adicionarExp = function () { const d = guardarCV(); d.experiencias = d.experiencias||[]; d.experiencias.push({}); saveCV(d); Router.go('criar-curriculo'); };
  window.adicionarForm = function () { const d = guardarCV(); d.formacoes = d.formacoes||[]; d.formacoes.push({}); saveCV(d); Router.go('criar-curriculo'); };
  window.adicionarSkill = function () { const d = guardarCV(); d.competencias = d.competencias||[]; d.competencias.push({nome:'',nivel:'3'}); saveCV(d); Router.go('criar-curriculo'); };
  window.adicionarIdioma = function () { const d = guardarCV(); d.idiomas = d.idiomas||[]; d.idiomas.push({idioma:'',nivel:'Iniciante'}); saveCV(d); Router.go('criar-curriculo'); };
  window.removerExp = function (i) { const d = guardarCV(); d.experiencias.splice(i,1); if(!d.experiencias.length) d.experiencias.push({}); saveCV(d); Router.go('criar-curriculo'); };
  window.removerForm = function (i) { const d = guardarCV(); d.formacoes.splice(i,1); if(!d.formacoes.length) d.formacoes.push({}); saveCV(d); Router.go('criar-curriculo'); };
  window.removerSkill = function (i) { const d = guardarCV(); d.competencias.splice(i,1); if(!d.competencias.length) d.competencias.push({nome:'',nivel:'3'}); saveCV(d); Router.go('criar-curriculo'); };
  window.removerIdioma = function (i) { const d = guardarCV(); d.idiomas.splice(i,1); if(!d.idiomas.length) d.idiomas.push({idioma:'',nivel:'Iniciante'}); saveCV(d); Router.go('criar-curriculo'); };
  window.guardarEprevCV = function () { guardarCV(); Router.go('pre-visualizar-cv'); };

  window.selecionarModelo = function (id) {
    const d = loadCV();
    d.modelo = id;
    saveCV(d);
    Router.go('pre-visualizar-cv');
  };

  window.melhorarDescricao = async function (i, style) {
    const guardar = guardarCV();
    const exp = guardar.experiencias[i];
    if (!exp || !exp.descricao || exp.descricao.trim().length < 3) {
      alert('Escreve primeiro uma descrição da tua experiência.');
      return;
    }
    const btn = document.querySelector(`[onclick="melhorarDescricao(${i},'${style}')"]`);
    if (btn) { btn.disabled = true; btn.textContent = 'A melhorar...'; }
    try {
      const melhorado = await AI.enhanceText(exp.descricao, style);
      const textarea = document.querySelector(`[name="exp-descricao-${i}"]`);
      if (textarea) {
        textarea.value = melhorado;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } catch (err) {
      alert(err.message || 'Erro ao melhorar descrição');
    }
    if (btn) { btn.disabled = false; btn.textContent = style === 'conciso' ? 'Conciso' : 'Melhorar'; }
  };

  /* ─── ACÇÕES DOC ─── */

  window.guardarDoc = function () {
    const d = {};
    document.querySelectorAll('[name^="doc-"]').forEach(el => {
      d[el.name.replace('doc-', '')] = el.value;
    });
    saveDoc(d);
    return d;
  };

  window.guardarEprevDoc = function () {
    guardarDoc();
    Router.go('pre-visualizar-doc');
  };

  window.exportarDocPDF = function () {
    const tipo = getDocType();
    const info = DocTypes.get(tipo);
    const nome = info ? info.name : 'documento';
    PDFExport.exportPreview('preview-frame', nome.toLowerCase().replace(/\s+/g, '-') + '.pdf');
  };

  window.partilharWhatsApp = function (tipo) {
    const texto = encodeURIComponent(
      'Criei o meu ' + (tipo === 'curriculo' ? 'currículo' : 'documento') +
      ' com a Chave! 🚀\n\nModelos premium, rápido e sem complicação.\n\n' +
      '👉 ' + window.location.href
    );
    window.open('https://wa.me/?text=' + texto, '_blank');
  };

  window.partilharLink = function () {
    if (navigator.share) {
      navigator.share({
        title: 'Chave — Currículos & Documentos',
        text: 'Cria documentos profissionais com modelos premium. Rápido, simples e gratuito.',
        url: window.location.href
      }).catch(function () {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(function () {
        alert('Link copiado! Cola no WhatsApp ou onde quiseres.');
      }).catch(function () {
        window.partilharWhatsApp('link');
      });
    }
  };

  /* ─── FOTO UPLOAD ─── */

  document.addEventListener('change', function (e) {
    if (e.target.id !== 'file-foto') return;
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Imagem muito grande. Escolhe uma com menos de 2MB.'); return; }
    const reader = new FileReader();
    reader.onload = function (ev) {
      const img = new Image();
      img.onload = function () {
        let w = img.width, h = img.height;
        if (w > 400 || h > 400) { const r = Math.min(400/w, 400/h); w = Math.round(w*r); h = Math.round(h*r); }
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        window._fotoDataUrl = c.toDataURL('image/jpeg', 0.85);
        const wrap = document.getElementById('photo-preview-wrap');
        if (wrap) wrap.innerHTML = `<img src="${esc(window._fotoDataUrl)}" alt="" class="photo-preview">`;
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  /* ─── VOZ ─── */

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    let currentRec = null;
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-mic');
      if (!btn) return;
      e.preventDefault();
      const targetId = btn.getAttribute('data-mic');
      const target = document.getElementById(targetId) || document.querySelector(`[name="${targetId}"]`);
      if (!target) return;
      if (currentRec) { currentRec.abort(); currentRec = null; document.querySelectorAll('.btn-mic').forEach(b => b.classList.remove('recording')); return; }
      const rec = new SpeechRecognition();
      rec.lang = 'pt-PT'; rec.continuous = false; rec.interimResults = true;
      currentRec = rec; btn.classList.add('recording');
      rec.onresult = function (ev) {
        const t = ev.results[ev.results.length-1][0].transcript;
        if (ev.results[ev.results.length-1].isFinal) {
          const start = target.selectionStart || target.value.length;
          target.value = target.value.slice(0, start) + t + target.value.slice(target.selectionEnd || start);
          target.setSelectionRange(start + t.length, start + t.length);
          target.dispatchEvent(new Event('input', { bubbles: true }));
          btn.classList.remove('recording'); currentRec = null;
        }
      };
      rec.onerror = rec.onend = function () { btn.classList.remove('recording'); currentRec = null; };
      rec.start();
    });
  } else {
    document.querySelectorAll('.btn-mic').forEach(b => { b.style.opacity = '0.3'; b.title = 'Voz não disponível'; });
  }

  /* ─── DEFINIÇÕES ─── */

  Router.register('definicoes', {
    title: 'Definições',
    render() {
      const endpoint = localStorage.getItem('chave_ai_endpoint') || '';
      const isPaid = Storage.isPaid();
      return `<div class="page">
        <h1>Definições</h1>
        <p class="subtitle">Configura a tua experiência na Chave.</p>

        <div class="settings-section">
          <h2>IA — Melhoria de Texto</h2>
          <div class="settings-card">
            <h3>Endpoint de IA</h3>
            <p>Conecta a Chave a um Cloudflare Worker para melhorar descrições profissionalmente. Sem endpoint, o modo offline é usado.</p>
            <div class="form-group" style="margin-bottom:8px">
              <input type="url" id="ai-endpoint" value="${esc(endpoint)}" placeholder="https://teu-worker.workers.dev">
            </div>
            <button class="btn-primary" onclick="guardarEndpoint()" style="width:auto">Guardar</button>
            ${!endpoint
              ? '<div class="settings-status info"><span>💡</span> Modo offline ativo — melhorias básicas disponíveis</div>'
              : '<div class="settings-status success"><span>✓</span> Endpoint configurado</div>'}
          </div>
        </div>

        <div class="settings-section">
          <h2>Pagamento</h2>
          <div class="settings-card">
            <h3>Exportação de PDF</h3>
            <p>Os PDFs gratuitos incluem uma marca de água "Pré-visualização — Chave". Paga via Multicaixa Express para remover a marca.</p>
            ${isPaid
              ? '<div class="settings-status success"><span>✓</span> Pagamento confirmado — PDFs sem marca de água</div>'
              : '<div class="settings-status info"><span>💡</span> Marca de água ativa — <a href="#" onclick="PDFExport.exportPreview(\'settings-preview\',\'teste.pdf\');return false" style="color:#c9a96e">testar exportação</a></div>'}
          </div>
        </div>

        <div class="settings-section">
          <h2>Sobre</h2>
          <div class="settings-card">
            <h3>Chave — Currículos & Documentos</h3>
            <p>Versão 1.0.0<br>Feito em Angola, para Angola.<br>Criado pela <strong>AGEA Comercial</strong>.</p>
          </div>
        </div>
      </div>`;
    }
  });

  window.guardarEndpoint = function () {
    const url = document.getElementById('ai-endpoint')?.value || '';
    if (url && AI) AI.setEndpoint(url);
    else localStorage.setItem('chave_ai_endpoint', url);
    Router.go('definicoes');
  };

  /* ─── PREVIEW SCALING ─── */

  function scalePreview(frameId) {
    const frame = document.getElementById(frameId);
    if (!frame) return;
    const wrap = frame.parentElement;
    if (!wrap) return;
    const modelo = frame.querySelector('.cv-modelo') || frame.querySelector('.documento');
    if (!modelo) return;

    const wrapWidth = wrap.clientWidth - 32;
    if (wrapWidth <= 0) return;

    const modeloWidth = 210;
    const scale = Math.min(1, wrapWidth / modeloWidth);

    if (scale < 1) {
      modelo.style.transform = 'scale(' + scale + ')';
      modelo.style.transformOrigin = 'top center';
      modelo.style.width = '210mm';
      frame.style.height = (297 * scale) + 'mm';
    } else {
      modelo.style.transform = '';
      modelo.style.transformOrigin = '';
      modelo.style.width = '210mm';
      frame.style.height = '';
    }
  }

  window.scalePreview = scalePreview;

  window.addEventListener('resize', function () {
    if (Router.current === 'pre-visualizar-cv' || Router.current === 'pre-visualizar-doc') {
      scalePreview('preview-frame');
    }
  });

  /* ─── START ─── */

  Router.go('home');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
