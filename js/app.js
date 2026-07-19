(function () {
  const CV_KEY = 'curriculo_dados';
  const DOC_KEY = 'documento_dados';
  const DOC_TYPE_KEY = 'documento_tipo';

  function load(k) { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch { return {}; } }
  function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

  function loadCV() { return load(CV_KEY); }
  function saveCV(d) { save(CV_KEY, d); }
  function loadDoc() { return load(DOC_KEY); }
  function saveDoc(d) { save(DOC_KEY, d); }
  function getDocType() { return localStorage.getItem(DOC_TYPE_KEY) || ''; }
  function setDocType(t) { localStorage.setItem(DOC_TYPE_KEY, t); }

  function esc(s) { if (s == null) return ''; const d = document.createElement('div'); d.textContent = String(s); return d.innerHTML; }

  document.getElementById('btn-back').addEventListener('click', () => {
    const cur = Router.current;
    if (cur === 'criar-curriculo') { guardarCV(); Router.go('home'); }
    else if (cur === 'pre-visualizar-cv') { Router.go('criar-curriculo'); }
    else if (cur === 'selecionar-doc') { Router.go('home'); }
    else if (cur === 'preencher-doc') { Router.go('selecionar-doc'); }
    else if (cur === 'pre-visualizar-doc') { Router.go('preencher-doc'); }
    else { Router.go('home'); }
  });

  /* ─── HOME ─── */

  function renderHome() {
    const hasCV = Object.keys(loadCV()).length > 1;
    return `
      <div class="page">
        <div class="home-hero">
          <div class="home-emoji">✨</div>
          <h1>Documentos profissionais,<br>com qualidade de design</h1>
          <p class="subtitle">Cria currículos, declarações, cartas, contratos e muito mais — tudo no teu telemóvel, com modelos premium prontos a exportar.</p>
        </div>
        <div class="card-grid">
          <div class="card" onclick="Router.go('criar-curriculo')" style="animation-delay:0.1s">
            <div class="card-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
            <h3>Criar Currículo</h3>
            <p>Escolhe entre 5 modelos premium e preenche os teus dados passo a passo.</p>
          </div>
          <div class="card" onclick="Router.go('selecionar-doc')" style="animation-delay:0.2s">
            <div class="card-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
            <h3>Criar Documento</h3>
            <p>Declarações, cartas, contratos e requerimentos formais.</p>
          </div>
        </div>
        ${hasCV ? `<div class="home-resume"><button class="btn-primary" onclick="Router.go('pre-visualizar-cv')" style="animation-delay:0.25s">Continuar último currículo</button></div>` : ''}
        <div class="home-tip">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span>Podes usar voz para preencher campos — toca no 🎤 ao lado dos inputs</span>
        </div>
      </div>
    `;
  }

  Router.register('home', { render: renderHome, title: 'Currículos & Documentos' });

  /* ─── CRIAR CURRÍCULO ─── */

  Router.register('criar-curriculo', {
    title: 'Criar Currículo',
    render() {
      const d = loadCV();
      const fotoPreview = d.foto && d.foto.startsWith('data:')
        ? `<img src="${esc(d.foto)}" alt="" class="photo-preview">`
        : (d.foto ? `<img src="${esc(d.foto)}" alt="" class="photo-preview" onerror="this.parentElement.innerHTML='<span class=\\'photo-preview-placeholder\\'>📷</span>'">` : '');
      return `<div class="page">
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
    render() {
      const d = loadCV();
      const modelos = ModelRegistry.list('cv');
      const atual = d.modelo || 'classico';
      const model = ModelRegistry.get('cv', atual) || modelos[0];
      return `<div class="page">
        <h1>Pré-visualizar</h1>
        <p class="subtitle">Vê como está a ficar o teu currículo. Podes trocar de modelo e voltar a editar.</p>
        <div class="model-selector">${modelos.map(m => `<div class="model-option ${m.id === atual ? 'selected' : ''}" onclick="selecionarModelo('${m.id}')"><span class="model-dot"></span> ${esc(m.name)}</div>`).join('')}</div>
        <div class="preview-container"><div id="preview-frame">${model ? model.render(d) : '<div class="loading-model"><div class="spinner"></div><p>A carregar...</p></div>'}</div></div>
        <div class="export-bar"><button class="btn-primary" onclick="window.print()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> Exportar PDF</button></div>
        <button class="btn-secondary" onclick="Router.go('criar-curriculo')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Voltar e editar</button>
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
      if (!info) return '<div class="page"><p>Tipo de documento não encontrado.</p><button class="btn-secondary" onclick="Router.go(\'selecionar-doc\')">Voltar</button></div>';
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
    render() {
      const tipo = getDocType();
      const info = DocTypes.get(tipo);
      const d = loadDoc();
      const renderFn = DocTypes.getRenderFn(tipo);
      if (!info) return '<div class="page"><p>Tipo de documento não encontrado.</p><button class="btn-secondary" onclick="Router.go(\'selecionar-doc\')">Voltar</button></div>';
      return `<div class="page">
        <h1>Pré-visualizar</h1>
        <p class="subtitle">Vê como está a ficar o documento. Podes voltar atrás para ajustar.</p>
        <div class="preview-container"><div id="preview-frame">${renderFn ? renderFn(d) : '<div class="loading-model"><div class="spinner"></div><p>A preparar documento...</p></div>'}</div></div>
        <div class="export-bar"><button class="btn-primary" onclick="window.print()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> Exportar PDF</button></div>
        <button class="btn-secondary" onclick="Router.go('preencher-doc')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Voltar e editar</button>
      </div>`;
    }
  });

  /* ─── RENDERERS DE FORMULÁRIO ─── */

  function renderExp(e, i) {
    return `<div class="exp-item"><div class="form-row"><div class="form-group"><label>Cargo</label><input type="text" name="exp-cargo-${i}" value="${esc(e.cargo)}" placeholder="Ex.: Analista"></div><div class="form-group"><label>Empresa</label><input type="text" name="exp-empresa-${i}" value="${esc(e.empresa)}" placeholder="Ex.: Empresa XYZ"></div></div><div class="form-row"><div class="form-group"><label>Início</label><input type="text" name="exp-inicio-${i}" value="${esc(e.inicio)}" placeholder="Ex.: 2020"></div><div class="form-group"><label>Fim</label><input type="text" name="exp-fim-${i}" value="${esc(e.fim)}" placeholder="Ex.: Presente"></div></div><div class="form-group"><label>Descrição</label><div class="input-with-mic textarea-mic"><textarea name="exp-descricao-${i}" placeholder="Descreve as tuas responsabilidades...">${esc(e.descricao)}</textarea><button class="btn-mic" data-mic="exp-descricao-${i}" aria-label="Voz"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></button></div></div><button class="btn-remove" onclick="removerExp(${i})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Remover</button></div>`;
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

  /* ─── START ─── */

  Router.go('home');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
