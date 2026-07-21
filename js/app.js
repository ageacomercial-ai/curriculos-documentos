(function () {
  function esc(s) { if (s == null) return ''; const d = document.createElement('div'); d.textContent = String(s); return d.innerHTML; }

  /* ─── LOGO SVG ─── */
  function logoSVG(big) {
    big = big || false;
    if (big) {
      return '<svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="42" y="2" width="36" height="36" rx="8" stroke="#2ecc71" stroke-width="3" fill="none"/>' +
        '<path d="M52 20 L58 26 L68 14" stroke="#2ecc71" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
        '<text x="60" y="72" text-anchor="middle" font-family="Inter,sans-serif" font-size="22" font-weight="700" fill="currentColor">Tá Feito</text>' +
      '</svg>';
    }
    return '<svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="6" y="2" width="28" height="28" rx="6" stroke="#2ecc71" stroke-width="2.5" fill="none"/>' +
      '<path d="M14 16 L20 22 L26 12" stroke="#2ecc71" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
    '</svg>';
  }

  window.renderLogoSVG = logoSVG;

  /* ─── MASCOT SVG ─── */
  function mascotSVG(size, expression) {
    expression = expression || 'smile';
    var eyes = expression === 'wink'
      ? '<ellipse cx="15" cy="18" rx="2.5" ry="2.5" fill="#1a1a2e"/><path d="M24 17 L27 20 L30 17" stroke="#1a1a2e" stroke-width="1.5" stroke-linecap="round" fill="none"/>'
      : expression === 'blink'
        ? '<path d="M12 18 Q15 16 18 18" stroke="#1a1a2e" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M24 18 Q27 16 30 18" stroke="#1a1a2e" stroke-width="1.5" stroke-linecap="round" fill="none"/>'
        : '<ellipse cx="15" cy="18" rx="2.5" ry="2.5" fill="#1a1a2e"/><ellipse cx="27" cy="18" rx="2.5" ry="2.5" fill="#1a1a2e"/>';
    var mouth = expression === 'smile'
      ? '<path d="M16 26 Q21 31 26 26" stroke="#1a1a2e" stroke-width="2" stroke-linecap="round" fill="none"/>'
      : expression === 'wink'
        ? '<path d="M16 26 Q21 30 26 26" stroke="#1a1a2e" stroke-width="1.5" stroke-linecap="round" fill="none"/>'
        : '<path d="M18 26 Q21 22 24 26" stroke="#1a1a2e" stroke-width="1.5" stroke-linecap="round" fill="none"/>';
    return '<svg class="tf-mascot-svg" viewBox="0 0 42 42" width="' + size + '" height="' + size + '" fill="none">' +
      '<circle cx="21" cy="21" r="19" fill="#2ecc71" opacity="0.12"/>' +
      '<rect x="8" y="8" width="26" height="26" rx="6" fill="#2ecc71" opacity="0.2"/>' +
      eyes +
      mouth +
    '</svg>';
  }

  window.mascotSVG = mascotSVG;

  /* ─── MASCOT BLINK TIMER ─── */
  var mascotBlinkTimer = null;
  function startMascotBlink() {
    if (mascotBlinkTimer) clearInterval(mascotBlinkTimer);
    function doBlink() {
      var els = document.querySelectorAll('.tf-mascot-svg');
      els.forEach(function (el) {
        var size = el.getAttribute('width') || 42;
        var newSvg = mascotSVG(size, 'blink');
        el.outerHTML = newSvg;
      });
      setTimeout(function () {
        var els2 = document.querySelectorAll('.tf-mascot-svg');
        els2.forEach(function (el) {
          var size = el.getAttribute('width') || 42;
          var newSvg = mascotSVG(size, 'smile');
          el.outerHTML = newSvg;
        });
      }, 150);
    }
    function scheduleNext() {
      var delay = 2000 + Math.random() * 5000;
      mascotBlinkTimer = setTimeout(function () {
        doBlink();
        scheduleNext();
      }, delay);
    }
    scheduleNext();
  }

  /* ─── INJECT LOGO ─── */
  function injectLogo() {
    var el = document.getElementById('brand-logo');
    if (el) el.innerHTML = logoSVG();
  }

  /* ─── TEMA ─── */

  function getTheme() {
    return localStorage.getItem('tf_theme') || 'system';
  }

  window.setTheme = function (theme) {
    localStorage.setItem('tf_theme', theme);
    applyTheme(theme);
  };

  function applyTheme(theme) {
    if (theme === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    // Update theme-color meta
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#111120' : '#1a1a2e';
  }

  function initTheme() {
    var theme = getTheme();
    applyTheme(theme);
    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (getTheme() === 'system') applyTheme('system');
    });
  }

  function themeIcon(theme) {
    if (theme === 'light') return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    if (theme === 'dark') return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  }

  /* ─── NAVEGAÇÃO ─── */

  function atualizarNav(route) {
    document.querySelectorAll('.sidebar-item, .bottom-nav-item').forEach(function (el) {
      el.classList.toggle('active', el.dataset.route === route);
    });
  }

  window.navegar = function (route) {
    Router.go(route);
  };

  /* ─── AUTO-SAVE ─── */

  var saveTimer = null;

  function mostrarSaveStatus(texto) {
    var el = document.getElementById('save-status');
    if (!el) return;
    el.textContent = texto;
    el.classList.add('visible');
    if (texto.indexOf('✓') === 0) {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () { el.classList.remove('visible'); }, 3000);
    }
  }

  function autosave() {
    mostrarSaveStatus('Guardando...');
    // The actual save is triggered by input events - this just shows the indicator
    setTimeout(function () { mostrarSaveStatus('✓ Guardado'); }, 400);
  }

  function saudacao() {
    var h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  /* ─── HOME / DASHBOARD ─── */

  Router.register('home', {
    title: 'Início',
    render: function () {
      var nome = Storage.getNome();

      return '<div class="page">' +
        '<div class="dashboard-hero">' +
          '<div class="dashboard-emblem">' +
            logoSVG(true) +
          '</div>' +
          '<h1>' + saudacao() + ', ' + esc(nome.split(' ')[0]) + ' ' + renderMascot(36, 'mascot-bounce') + '</h1>' +
          '<p class="subtitle">O que precisas de deixar <strong>feito</strong> hoje?</p>' +
        '</div>' +
        '<div class="home-grid">' +
          '<div class="home-card home-card-cv" onclick="navegar(\'cv-flow\')">' +
            '<div class="home-card-icon">' +
              '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' +
            '</div>' +
            '<h2>CURRÍCULO VITAE</h2>' +
            '<p>Cria um currículo profissional com modelos premium.</p>' +
          '</div>' +
          '<div class="home-card home-card-doc" onclick="navegar(\'outros-documentos\')">' +
            '<div class="home-card-icon">' +
              '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="9" y2="9"/></svg>' +
            '</div>' +
            '<h2>OUTROS DOCUMENTOS</h2>' +
            '<p>Declarações, cartas, contratos, requerimentos e mais.</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    },
    onRender: function () {
      startMascotBlink();
    }
  });

  /* ─── DOCUMENTOS ─── */

  Router.register('documentos', {
    title: 'Documentos',
    render: function () {
      var docs = Storage.listDocs();

      function renderDoc(d) {
        var tipoLabel = d.type === 'cv' ? 'CV' : 'Documento';
        var modelName = d.model || '';
        var cor = d.type === 'cv' ? '#2ecc71' : '#2a3a4e';
        return '<div class="doc-item">' +
          '<div class="doc-item-icon" style="background:' + cor + '">' +
            (d.type === 'cv'
              ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
              : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="9" y2="9"/></svg>') +
          '</div>' +
          '<div class="doc-item-info">' +
            '<strong>' + esc(d.name) + '</strong>' +
            '<span>' + tipoLabel + (modelName ? ' · ' + esc(modelName) : '') + ' · ' + Storage.timeAgo(d.updatedAt) + '</span>' +
          '</div>' +
          '<div class="doc-item-actions">' +
            '<button class="btn-doc-action" onclick="event.stopPropagation();abrirDoc(\'' + d.id + '\')" title="Abrir">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' +
            '</button>' +
            '<button class="btn-doc-action" onclick="event.stopPropagation();duplicarDoc(\'' + d.id + '\')" title="Duplicar">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
            '</button>' +
            '<button class="btn-doc-action btn-doc-action-danger" onclick="event.stopPropagation();confirmarEliminarDoc(\'' + d.id + '\')" title="Eliminar">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>';
      }

      return '<div class="page page-docs">' +
        '<div class="page-header-row">' +
          '<h1>Documentos</h1>' +
           '<button class="btn-create-sm" onclick="navegar(\'cv-flow\')">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Novo' +
          '</button>' +
        '</div>' +
        (docs.length > 0
          ? '<div class="doc-list">' + docs.map(renderDoc).join('') + '</div>'
           : '<div class="empty-state"><p>Nenhum documento ainda.</p><button class="btn-primary" onclick="navegar(\'cv-flow\')">Criar primeiro documento</button></div>'
        ) +
      '</div>';
    }
  });

  /* ─── PERFIL CENTRAL ─── */

  Router.register('perfil', {
    title: 'Meu Perfil',
    render: function () {
      var p = Storage.getProfile();
      var comp = Storage.profileCompletion();
      var niveisCompetencia = ['', 'Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Expert'];
      var niveisIdioma = ['Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo'];
      var fotoPreview = p.foto && p.foto.startsWith('data:')
        ? '<img src="' + esc(p.foto) + '" alt="" class="photo-preview">'
        : (p.foto ? '<img src="' + esc(p.foto) + '" alt="" class="photo-preview" onerror="this.parentElement.innerHTML=\'<span class=\\\'photo-preview-placeholder\\\'>📷</span>\'">' : '');

      return '<div class="page">' +
        '<div class="page-header-row">' +
          '<h1>Meu Perfil</h1>' +
          '<span class="profile-badge">' + comp.pct + '%</span>' +
        '</div>' +
        '<p class="subtitle">Preencha os seus dados uma vez. Eles serão usados em todos os seus documentos.</p>' +
        '<div class="profile-completion-bar" style="margin-bottom:20px"><div class="profile-completion-fill" style="width:' + comp.pct + '%"></div></div>' +

        // Photo
        '<div class="form-section"><h2>Foto</h2>' +
          '<div class="photo-upload">' +
            '<div class="photo-preview-wrap" id="perfil-photo-preview-wrap">' + (fotoPreview || '<span class="photo-preview-placeholder">📷</span>') + '</div>' +
            '<div class="photo-upload-fields">' +
              '<button class="btn-secondary btn-small" onclick="document.getElementById(\'perfil-file-foto\').click()">Escolher ficheiro</button>' +
              '<input type="file" id="perfil-file-foto" accept="image/*" style="display:none">' +
              '<input type="url" id="perfil-input-foto" value="' + esc(p.foto && !p.foto.startsWith('data:') ? p.foto : '') + '" placeholder="Ou URL da foto..." style="margin-top:6px;font-size:13px">' +
            '</div>' +
          '</div>' +
        '</div>' +

        // Personal info
        '<div class="form-section"><h2>Informações Pessoais</h2>' +
          '<div class="form-group"><label>Nome completo</label><input type="text" id="perfil-nome" value="' + esc(p.nome) + '" placeholder="Ex.: Adelino Graça"></div>' +
          '<div class="form-row">' +
            '<div class="form-group"><label>Cargo / Profissão</label><input type="text" id="perfil-cargo" value="' + esc(p.cargo) + '" placeholder="Ex.: Diretor Executivo"></div>' +
            '<div class="form-group"><label>Links profissionais</label><input type="text" id="perfil-social" value="' + esc(p.social) + '" placeholder="linkedin.com/in/..."></div>' +
          '</div>' +
          '<div class="form-row">' +
            '<div class="form-group"><label>Email</label><input type="email" id="perfil-email" value="' + esc(p.email) + '" placeholder="exemplo@email.com"></div>' +
            '<div class="form-group"><label>Telefone</label><input type="tel" id="perfil-telefone" value="' + esc(p.telefone) + '" placeholder="+244 900 000 000"></div>' +
          '</div>' +
          '<div class="form-group"><label>Morada</label><input type="text" id="perfil-morada" value="' + esc(p.morada) + '" placeholder="Ex.: Luanda, Angola"></div>' +
          '<div class="form-group"><label>Resumo profissional</label><textarea id="perfil-resumo" placeholder="Conte a sua história profissional..." rows="4">' + esc(p.resumo) + '</textarea></div>' +
        '</div>' +

        // Experience
        '<div class="form-section"><h2>Experiência Profissional</h2>' +
          '<div id="perfil-exp-container">' + (p.experiencias || []).map(function (e, i) {
            return '<div class="exp-item"><div class="form-row">' +
              '<div class="form-group"><label>Cargo</label><input type="text" name="perfil-exp-cargo-' + i + '" value="' + esc(e.cargo) + '" placeholder="Ex.: Diretor"></div>' +
              '<div class="form-group"><label>Empresa</label><input type="text" name="perfil-exp-empresa-' + i + '" value="' + esc(e.empresa) + '" placeholder="Ex.: AGEA Soluções Tecnológicas"></div></div>' +
              '<div class="form-row"><div class="form-group"><label>Início</label><input type="text" name="perfil-exp-inicio-' + i + '" value="' + esc(e.inicio) + '" placeholder="Ex.: 2020"></div>' +
              '<div class="form-group"><label>Fim</label><input type="text" name="perfil-exp-fim-' + i + '" value="' + esc(e.fim) + '" placeholder="Ex.: Presente"></div></div>' +
              '<div class="form-group"><label>Descrição</label><textarea name="perfil-exp-descricao-' + i + '" placeholder="Descreva as responsabilidades..." rows="3">' + esc(e.descricao) + '</textarea></div>' +
              '<button class="btn-remove" onclick="removerExpPerfil(' + i + ')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Remover</button></div>';
          }).join('') + '</div>' +
          '<button class="btn-secondary add-btn" onclick="adicionarExpPerfil()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar experiência</button>' +
        '</div>' +

        // Education
        '<div class="form-section"><h2>Formação Académica</h2>' +
          '<div id="perfil-formacao-container">' + (p.formacoes || []).map(function (f, i) {
            return '<div class="exp-item"><div class="form-row">' +
              '<div class="form-group"><label>Curso</label><input type="text" name="perfil-form-curso-' + i + '" value="' + esc(f.curso) + '" placeholder="Ex.: Licenciatura"></div>' +
              '<div class="form-group"><label>Instituição</label><input type="text" name="perfil-form-instituicao-' + i + '" value="' + esc(f.instituicao) + '" placeholder="Ex.: Universidade"></div></div>' +
              '<div class="form-row"><div class="form-group"><label>Início</label><input type="text" name="perfil-form-inicio-' + i + '" value="' + esc(f.inicio) + '" placeholder="Ex.: 2015"></div>' +
              '<div class="form-group"><label>Fim</label><input type="text" name="perfil-form-fim-' + i + '" value="' + esc(f.fim) + '" placeholder="Ex.: 2021"></div></div>' +
              '<button class="btn-remove" onclick="removerFormPerfil(' + i + ')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Remover</button></div>';
          }).join('') + '</div>' +
          '<button class="btn-secondary add-btn" onclick="adicionarFormPerfil()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar formação</button>' +
        '</div>' +

        // Skills
        '<div class="form-section"><h2>Competências</h2>' +
          '<div id="perfil-skills-container">' + (p.competencias || []).map(function (s, i) {
            return '<div class="skill-row"><div class="form-group" style="flex:1;margin-bottom:0"><label>Competência</label><input type="text" name="perfil-skill-nome-' + i + '" value="' + esc(s.nome) + '" placeholder="Ex.: Liderança"></div>' +
              '<div class="form-group" style="width:110px;margin-bottom:0"><label>Nível</label><select name="perfil-skill-nivel-' + i + '">' +
                niveisCompetencia.map(function (n, ni) { return '<option value="' + ni + '" ' + ((s.nivel == ni) ? 'selected' : '') + '>' + n + '</option>'; }).join('') +
              '</select></div>' +
              '<button class="btn-icon-sm" onclick="removerSkillPerfil(' + i + ')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
          }).join('') + '</div>' +
          '<button class="btn-secondary add-btn" onclick="adicionarSkillPerfil()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar competência</button>' +
        '</div>' +

        // Languages
        '<div class="form-section"><h2>Idiomas</h2>' +
          '<div id="perfil-idiomas-container">' + (p.idiomas || []).map(function (l, i) {
            return '<div class="skill-row"><div class="form-group" style="flex:1;margin-bottom:0"><label>Idioma</label><input type="text" name="perfil-idioma-nome-' + i + '" value="' + esc(l.idioma) + '" placeholder="Ex.: Português"></div>' +
              '<div class="form-group" style="width:130px;margin-bottom:0"><label>Nível</label><select name="perfil-idioma-nivel-' + i + '">' +
                niveisIdioma.map(function (n) { return '<option value="' + n + '" ' + (l.nivel === n ? 'selected' : '') + '>' + n + '</option>'; }).join('') +
              '</select></div>' +
              '<button class="btn-icon-sm" onclick="removerIdiomaPerfil(' + i + ')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
          }).join('') + '</div>' +
          '<button class="btn-secondary add-btn" onclick="adicionarIdiomaPerfil()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar idioma</button>' +
        '</div>' +

        // Certifications
        '<div class="form-section"><h2>Certificações</h2>' +
          '<div id="perfil-cert-container">' + (p.certificacoes || []).map(function (c, i) {
            return '<div class="exp-item"><div class="form-row">' +
              '<div class="form-group"><label>Certificação</label><input type="text" name="perfil-cert-nome-' + i + '" value="' + esc(c.nome) + '" placeholder="Ex.: Gestão de Projetos"></div>' +
              '<div class="form-group"><label>Instituição</label><input type="text" name="perfil-cert-instituicao-' + i + '" value="' + esc(c.instituicao) + '" placeholder="Ex.: PMI"></div></div>' +
              '<div class="form-group"><label>Data</label><input type="text" name="perfil-cert-data-' + i + '" value="' + esc(c.data) + '" placeholder="Ex.: 2023"></div>' +
              '<button class="btn-remove" onclick="removerCertPerfil(' + i + ')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Remover</button></div>';
          }).join('') + '</div>' +
          '<button class="btn-secondary add-btn" onclick="adicionarCertPerfil()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar certificação</button>' +
        '</div>' +

        '<div class="form-actions"><button class="btn-primary" onclick="guardarPerfil()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Guardar Perfil</button></div>' +
      '</div>';
    },
    onRender: function () {
      // Setup auto-save on inputs
      document.querySelectorAll('#app-content input, #app-content textarea, #app-content select').forEach(function (el) {
        el.removeEventListener('input', autosave);
        el.addEventListener('input', autosave);
      });
    }
  });

  /* ─── NOVO DOCUMENTO ─── */

  Router.register('novo-documento', {
    title: 'Novo Documento',
    render: function () {
      return '<div class="page">' +
        '<h1>Novo Documento</h1>' +
        '<p class="subtitle">Como queres criar o teu documento?</p>' +
        '<div class="choice-cards" style="margin-top:20px">' +
          '<div class="choice-card" onclick="Router.go(\'escolher-tipo\')">' +
            '<div class="choice-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>' +
            '<div class="choice-text"><h3>Quero fazer sozinho</h3><p>Editor livre — escolhes o tipo de documento e escreves à tua maneira.</p></div>' +
          '</div>' +
          '<div class="choice-card" onclick="Router.go(\'wizard-ajuda\')">' +
            '<div class="choice-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>' +
            '<div class="choice-text"><h3>Quero ajuda 🤖</h3><p>Respondes a algumas perguntas e a IA gera o documento por ti.</p></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }
  });

  /* ─── ESCOLHER TIPO (sozinho) ─── */

  Router.register('escolher-tipo', {
    title: 'Escolher Tipo',
    render: function () {
      return '<div class="page">' +
        '<h1>Escolher Tipo</h1>' +
        '<p class="subtitle">O que desejas criar?</p>' +
        '<div class="card-grid">' +
          '<div class="card" onclick="Router.go(\'cv-flow\')">' +
            '<div class="card-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>' +
            '<h3>Currículo / CV</h3>' +
            '<p>Cria um currículo profissional.</p>' +
          '</div>' +
          '<div class="card" onclick="Router.go(\'outros-documentos\')">' +
            '<div class="card-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="9" y2="9"/></svg></div>' +
            '<h3>Documento Profissional</h3>' +
            '<p>Declarações, cartas, contratos, requerimentos e mais.</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    }
  });

  /* ─── WIZARD: QUERO AJUDA ─── */

  Router.register('wizard-ajuda', {
    title: 'Assistente IA',
    render: function () {
      var wizardState = window._wizardState = window._wizardState || JSON.parse(sessionStorage.getItem('tf_wizard') || 'null') || {
        step: 0,
        tipo: null,
        descricao: '',
        respostas: {},
        perguntas: null,
        perguntaAtual: 0
      };

      if (wizardState.step === 0) {
        return renderWizardTipo();
      }
      if (wizardState.step === 1) {
        return renderWizardDescricao();
      }
      if (wizardState.step === 2) {
        return renderWizardPerguntas();
      }
      return renderWizardConcluido();
    },
    onRender: function () {
      var state = window._wizardState;
      if (state.step === 1) {
        var ta = document.getElementById('wizard-descricao');
        if (ta) ta.focus();
      }
    }
  });

  function renderWizardTipo() {
    return '<div class="page wizard-step">' +
      '<div class="wizard-progress"><span class="wizard-dot active"></span><span class="wizard-dot"></span><span class="wizard-dot"></span><span class="wizard-dot"></span></div>' +
      '<div class="wizard-question">' + renderMascot(40, 'mascot-wave') + ' O que precisas de deixar feito?</div>' +
      '<div class="choice-cards">' +
        '<div class="choice-card" onclick="wizardSetTipo(\'cv\')">' +
          '<div class="choice-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>' +
          '<div class="choice-text"><h3>Currículo / CV</h3><p>Um currículo profissional completo.</p></div>' +
        '</div>' +
        '<div class="choice-card" onclick="wizardSetTipo(\'doc\')">' +
          '<div class="choice-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="9" y2="9"/></svg></div>' +
          '<div class="choice-text"><h3>Documento Profissional</h3><p>Declarações, cartas, contratos e mais.</p></div>' +
        '</div>' +
      '</div>' +
      '<button class="btn-secondary" onclick="cancelarWizard()" style="margin-top:20px">Voltar</button>' +
    '</div>';
  }

  function renderWizardDescricao() {
    return '<div class="page wizard-step">' +
      '<div class="wizard-progress"><span class="wizard-dot done"></span><span class="wizard-dot active"></span><span class="wizard-dot"></span><span class="wizard-dot"></span></div>' +
      '<div class="wizard-question">' + renderMascot(40, 'mascot-bounce') + ' Descreve o que precisas...</div>' +
      '<p style="color:var(--tf-text-secondary);margin-bottom:16px">Conta-nos o que queres criar. Sê específico para a IA te ajudar melhor.</p>' +
      '<div class="wizard-input"><textarea id="wizard-descricao" placeholder="Ex.: Preciso de uma declaração de trabalho para apresentar na embaixada...">' + esc(window._wizardState.descricao) + '</textarea></div>' +
      '<div style="display:flex;gap:8px;margin-top:16px">' +
        '<button class="btn-secondary" onclick="wizardVoltar()">Voltar</button>' +
        '<button class="btn-primary" onclick="wizardAvancarDescricao()" style="flex:1">' +
          'Gerar perguntas <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>';
  }

  function renderWizardPerguntas() {
    var state = window._wizardState;
    var perguntas = state.perguntas || [];
    var idx = state.perguntaAtual || 0;
    if (idx >= perguntas.length) {
      return renderWizardConcluido();
    }
    var pergunta = perguntas[idx];
    var respostaAtual = state.respostas[pergunta.campo] || '';

    return '<div class="page wizard-step">' +
      '<div class="wizard-progress">' +
        perguntas.map(function (_, i) {
          var cls = i < idx ? 'done' : (i === idx ? 'active' : '');
          return '<span class="wizard-dot ' + cls + '"></span>';
        }).join('') +
      '</div>' +
      '<div class="wizard-question">' + esc(pergunta.pergunta) + '</div>' +
      (pergunta.dica ? '<p style="color:var(--tf-text-muted);font-size:13px;margin-bottom:12px">' + esc(pergunta.dica) + '</p>' : '') +
      '<div class="wizard-input">' +
        (pergunta.tipo === 'textarea'
          ? '<textarea id="wizard-resposta" placeholder="' + esc(pergunta.placeholder || '') + '" rows="4">' + esc(respostaAtual) + '</textarea>'
          : '<input type="text" id="wizard-resposta" value="' + esc(respostaAtual) + '" placeholder="' + esc(pergunta.placeholder || '') + '" style="width:100%;padding:14px;border:2px solid var(--tf-border-color);border-radius:var(--tf-radius);font-size:16px;background:var(--tf-bg-input);color:var(--tf-text-primary);outline:none">'
        ) +
      '</div>' +
      '<div style="display:flex;gap:8px;margin-top:16px">' +
        '<button class="btn-secondary" onclick="wizardPerguntaAnterior()">Anterior</button>' +
        '<button class="btn-primary" onclick="wizardProximaPergunta()" style="flex:1">' +
          (idx < perguntas.length - 1 ? 'Seguinte <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' : 'Concluir ✓') +
        '</button>' +
      '</div>' +
    '</div>';
  }

  function renderWizardConcluido() {
    return '<div class="page wizard-step" style="text-align:center">' +
      '<div style="margin:30px 0 20px">' + renderMascot(80, 'mascot-bounce') + '</div>' +
      '<h2 style="font-family:var(--tf-font-serif);font-size:24px;margin-bottom:8px">Quase lá!</h2>' +
      '<p style="color:var(--tf-text-secondary);margin-bottom:24px">A IA está a preparar o teu documento com base nas tuas respostas.</p>' +
      '<button class="btn-primary" onclick="wizardGerarDocumento()" style="width:100%;padding:16px">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Gerar meu documento' +
      '</button>' +
      '<button class="btn-secondary" onclick="wizardVoltarInicio()" style="margin-top:12px;width:100%">Voltar ao início</button>' +
    '</div>';
  }

  /* ─── WIZARD HELPERS ─── */

  function salvarWizard() {
    sessionStorage.setItem('tf_wizard', JSON.stringify(window._wizardState || {}));
  }

  function limparWizard() {
    window._wizardState = { step: 0, tipo: null, descricao: '', respostas: {}, perguntas: null, perguntaAtual: 0 };
    sessionStorage.removeItem('tf_wizard');
  }

  window.wizardSetTipo = function (tipo) {
    window._wizardState = window._wizardState || {};
    window._wizardState.tipo = tipo;
    window._wizardState.step = 1;
    salvarWizard();
    Router.go('wizard-ajuda');
  };

  window.wizardVoltar = function () {
    var state = window._wizardState;
    if (state.step > 0) state.step--;
    salvarWizard();
    Router.go('wizard-ajuda');
  };

  window.wizardVoltarInicio = function () {
    limparWizard();
    Router.go('cv-flow');
  };

  window.wizardAvancarDescricao = function () {
    var ta = document.getElementById('wizard-descricao');
    if (!ta) return;
    var desc = ta.value.trim();
    if (!desc) { ta.focus(); return; }
    var state = window._wizardState;
    state.descricao = desc;
    state.perguntas = gerarPerguntasWizard(state.tipo, desc);
    state.perguntaAtual = 0;
    state.respostas = {};
    state.step = 2;
    salvarWizard();
    Router.go('wizard-ajuda');
  };

  window.wizardProximaPergunta = function () {
    var el = document.getElementById('wizard-resposta');
    if (!el) return;
    var state = window._wizardState;
    var perguntas = state.perguntas || [];
    var idx = state.perguntaAtual || 0;
    var pergunta = perguntas[idx];
    if (pergunta) {
      var val = el.value.trim();
      if (pergunta.obrigatorio && !val) { el.focus(); return; }
      state.respostas[pergunta.campo] = val;
    }
    if (idx < perguntas.length - 1) {
      state.perguntaAtual = idx + 1;
      salvarWizard();
      Router.go('wizard-ajuda');
    } else {
      state.step = 3;
      salvarWizard();
      Router.go('wizard-ajuda');
    }
  };

  window.wizardPerguntaAnterior = function () {
    var el = document.getElementById('wizard-resposta');
    if (el) {
      var state = window._wizardState;
      var perguntas = state.perguntas || [];
      var idx = state.perguntaAtual || 0;
      var pergunta = perguntas[idx];
      if (pergunta) state.respostas[pergunta.campo] = el.value.trim();
    }
    var state = window._wizardState;
    if (state.perguntaAtual > 0) {
      state.perguntaAtual--;
      salvarWizard();
      Router.go('wizard-ajuda');
    } else {
      state.step = 1;
      salvarWizard();
      Router.go('wizard-ajuda');
    }
  };

  window.wizardGerarDocumento = function () {
    var state = window._wizardState;
    if (!state || !state.tipo) { alert('Algo deu errado. Tenta novamente.'); return; }

    var profile = Storage.getProfile();
    var nome = state.respostas.nomeCompleto || profile.nome || 'Documento';
    var tipo = state.tipo === 'cv' ? 'cv' : 'doc';
    var modelId = null;

    if (tipo === 'cv') {
      var cargo = state.respostas.cargoAtual || profile.cargo || '';
      modelId = AI && AI.suggestModel ? (AI.suggestModel(cargo) || {}).model || 'classico' : 'classico';
    }

    var docId = Storage.createDoc(tipo, nome, modelId);
    var docData = {};

    if (tipo === 'cv') {
      docData = {
        nome: state.respostas.nomeCompleto || profile.nome || '',
        cargo: state.respostas.cargoAtual || profile.cargo || '',
        email: profile.email || '',
        telefone: profile.telefone || '',
        morada: profile.morada || '',
        resumo: state.respostas.resumoProfissional || profile.resumo || '',
        social: profile.social || '',
        experiencias: profile.experiencias || [],
        formacoes: profile.formacoes || [],
        competencias: profile.competencias || [],
        idiomas: profile.idiomas || [],
        certificacoes: profile.certificacoes || []
      };
    } else {
      docData = {
        tipo: state.respostas.tipoDocumento || 'Declaração',
        assunto: state.respostas.assunto || '',
        destinatario: state.respostas.destinatario || '',
        conteudo: state.respostas.conteudo || state.descricao,
        nome: profile.nome || ''
      };
    }

    Storage.saveDocData(docId, docData);
    limparWizard();
    Router.go('editar-doc?id=' + docId);
  };

  window.cancelarWizard = function () {
    limparWizard();
    Router.go('cv-flow');
  };

  function gerarPerguntasWizard(tipo, descricao) {
    if (tipo === 'cv') {
      return [
        { campo: 'nomeCompleto', pergunta: 'Qual é o teu nome completo?', tipo: 'text', placeholder: 'Ex.: Adelino Graça', obrigatorio: true },
        { campo: 'cargoAtual', pergunta: 'Qual é o teu cargo ou profissão atual?', tipo: 'text', placeholder: 'Ex.: Desenvolvedor Web', obrigatorio: true },
        { campo: 'resumoProfissional', pergunta: 'Fala um pouco sobre ti profissionalmente (3-5 linhas).', tipo: 'textarea', placeholder: 'Ex.: Profissional com 5 anos de experiência em...', dica: 'Inclui anos de experiência, área de atuação e principais conquistas.', obrigatorio: true },
        { campo: 'objetivo', pergunta: 'Qual é o teu objetivo profissional para este CV?', tipo: 'text', placeholder: 'Ex.: Conseguir uma posição como Desenvolvedor Sénior', obrigatorio: false },
        { campo: 'diferenciais', pergunta: 'O que te diferencia dos outros candidatos?', tipo: 'textarea', placeholder: 'Ex.: Domínio de React, Node.js e metodologias ágeis...', dica: 'Destaca 2-3 competências únicas.', obrigatorio: false }
      ];
    }
    // Documento profissional
    return [
      { campo: 'tipoDocumento', pergunta: 'Que tipo de documento precisas?', tipo: 'text', placeholder: 'Ex.: Declaração, Carta, Contrato, Requerimento', obrigatorio: true },
      { campo: 'assunto', pergunta: 'Qual é o assunto do documento?', tipo: 'text', placeholder: 'Ex.: Declaração de Trabalho para Visto', obrigatorio: true },
      { campo: 'destinatario', pergunta: 'Para quem é o documento?', tipo: 'text', placeholder: 'Ex.: Exma. Senhora Diretora do Serviço de Migração', obrigatorio: true },
      { campo: 'conteudo', pergunta: 'Descreve o conteúdo principal do documento.', tipo: 'textarea', placeholder: 'Ex.: Venho por meio desta declarar que...', dica: 'Sê detalhado para a IA gerar um documento mais preciso.', obrigatorio: true },
      { campo: 'infoExtra', pergunta: 'Alguma informação extra que devemos incluir?', tipo: 'textarea', placeholder: 'Ex.: Data, local, referências...', obrigatorio: false }
    ];
  }

  /* ─── FLUXO CV: SOZINHO vs AJUDA ─── */

  Router.register('cv-flow', {
    title: 'Criar Currículo',
    render: function () {
      return '<div class="page">' +
        '<button class="btn-back" onclick="navegar(\'home\')">← Voltar</button>' +
        '<h1>Criar Currículo / CV</h1>' +
        '<p class="subtitle">Como queres criar o teu documento?</p>' +
        '<div class="choice-cards" style="margin-top:20px">' +
          '<div class="choice-card" onclick="Router.go(\'escolher-modelo-cv\')">' +
            '<div class="choice-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>' +
            '<div class="choice-text"><h3>QUERO FAZER SOZINHO</h3><p>Escolhes o modelo e escreves à tua maneira.</p></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }
  });

  /* ─── ESCOLHER MODELO (visual) ─── */

  Router.register('escolher-modelo-cv', {
    title: 'Escolher Modelo',
    render: function () {
      var modelos = ModelRegistry.list('cv');
      var profile = Storage.getProfile();
      var jaRespondido = sessionStorage.getItem('tf_usar_perfil') !== null;
      if (profile.nome && !jaRespondido) {
        return '<div class="page">' +
          '<button class="btn-back" onclick="Router.go(\'cv-flow\')">← Voltar</button>' +
          '<h1>Usar dados do perfil?</h1>' +
          '<p class="subtitle">Tens dados guardados no teu perfil. Queres usá-los neste currículo?</p>' +
          '<div class="choice-cards" style="margin-top:20px">' +
            '<div class="choice-card" onclick="prosseguirCriarCV(true)">' +
              '<div class="choice-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>' +
              '<div class="choice-text"><h3>SIM, usar meus dados</h3><p>Vou criar o currículo para mim mesmo.</p></div>' +
            '</div>' +
            '<div class="choice-card" onclick="prosseguirCriarCV(false)">' +
              '<div class="choice-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>' +
              '<div class="choice-text"><h3>NÃO, começar vazio</h3><p>Estou a criar para outra pessoa ou quero dados diferentes.</p></div>' +
            '</div>' +
          '</div>' +
        '</div>';
      }
      return renderModelosCV();
    }
  });

  function renderModelosCV() {
    var modelos = ModelRegistry.list('cv');
    var demoData = gerarDadosDemoCV();
    return '<div class="page">' +
      '<button class="btn-back" onclick="Router.go(\'cv-flow\')">← Voltar</button>' +
      '<h1>Escolher Modelo</h1>' +
      '<p class="subtitle">Vê os currículos preenchidos com dados de exemplo. O teu conteúdo substituirá estes.</p>' +
      '<div class="model-preview-grid">' +
        modelos.map(function (m) {
          var html = '';
          try {
            var modeloDef = ModelRegistry.get('cv', m.id);
            if (modeloDef && typeof modeloDef.render === 'function') {
              html = modeloDef.render(demoData);
            }
          } catch (e) {
            html = '<div style="padding:20px;text-align:center;color:var(--tf-text-muted)">Pré-visualização indisponível</div>';
          }
          return '<div class="model-preview-card" onclick="criarCVComModelo(\'' + m.id + '\')">' +
            '<div class="model-preview-thumb">' +
              '<div class="model-preview-cv" style="transform:scale(0.22)">' + html + '</div>' +
            '</div>' +
            '<div class="model-preview-label">' + esc(m.name) + '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  }

  function gerarDadosDemoCV() {
    return {
      nome: 'Maria das Graças',
      cargo: 'Designer Gráfica Sénior',
      email: 'maria.gracas@email.com',
      telefone: '+244 923 456 789',
      morada: 'Luanda, Angola',
      social: 'linkedin.com/in/mariagracas',
      resumo: 'Designer Gráfica com mais de 8 anos de experiência em branding, design editorial e identidade visual. Especialista em criar soluções visuais que comunicam a essência de cada marca.',
      experiencias: [
        { cargo: 'Designer Gráfica Sénior', empresa: 'Agência Criativa, Luanda', inicio: '2020', fim: 'Presente', descricao: 'Liderança de equipa criativa de 5 designers. Desenvolvimento de identidade visual para mais de 30 marcas. Gestão de projetos de branding e design editorial.' },
        { cargo: 'Designer Gráfica', empresa: 'Estúdio Visual, Luanda', inicio: '2017', fim: '2020', descricao: 'Criação de materiais gráficos para redes sociais, embalagens e campanhas publicitárias. Colaboração direta com clientes para desenvolvimento de conceitos criativos.' },
        { cargo: 'Designer Júnior', empresa: 'Gráfica Central, Luanda', inicio: '2015', fim: '2017', descricao: 'Produção de arte-final, tratamento de imagem e diagramação de materiais institucionais. Suporte à equipa de criação em campanhas de média dimensão.' }
      ],
      formacoes: [
        { curso: 'Licenciatura em Design de Comunicação', instituicao: 'Universidade Agostinho Neto', inicio: '2011', fim: '2015' },
        { curso: 'Curso Avançado de Branding', instituicao: 'Escola de Design de Lisboa', inicio: '2019', fim: '2020' }
      ],
      competencias: [
        { nome: 'Adobe Illustrator', nivel: '5' },
        { nome: 'Adobe Photoshop', nivel: '5' },
        { nome: 'Figma', nivel: '4' },
        { nome: 'Adobe InDesign', nivel: '4' },
        { nome: 'After Effects', nivel: '3' }
      ],
      idiomas: [
        { idioma: 'Português', nivel: 'Nativo' },
        { idioma: 'Inglês', nivel: 'Avançado' },
        { idioma: 'Francês', nivel: 'Intermediário' }
      ]
    };
  }

  window.prosseguirCriarCV = function (usarPerfil) {
    sessionStorage.setItem('tf_usar_perfil', usarPerfil ? 'true' : 'false');
    Router.go('escolher-modelo-cv');
  };

  window.criarCVComModelo = function (modelId) {
    var usarPerfil = sessionStorage.getItem('tf_usar_perfil') === 'true';
    var data = {};
    if (usarPerfil) {
      data = JSON.parse(JSON.stringify(Storage.getProfile()));
    }
    var nomeDoc = (data.cargo || 'Profissional');
    if (data.nome) nomeDoc = 'CV ' + data.nome.split(' ')[0];
    var docId = Storage.createDoc('cv', nomeDoc, modelId);
    Storage.saveDocData(docId, data);
    sessionStorage.removeItem('tf_usar_perfil');
    Router.go('editar-doc?id=' + docId);
  };

  /* ─── OUTROS DOCUMENTOS ─── */

  Router.register('outros-documentos', {
    title: 'Outros Documentos',
    render: function () {
      return '<div class="page">' +
        '<button class="btn-back" onclick="navegar(\'home\')">← Voltar</button>' +
        '<h1>Outros Documentos</h1>' +
        '<p class="subtitle">Que documento precisas de deixar feito?</p>' +
        '<div class="card-grid">' +
          DocTypes.tipos.map(function (t) {
            return '<div class="card" onclick="Router.go(\'wizard-doc?tipo=' + t.id + '\')" style="animation-delay:' + (0.1 + DocTypes.tipos.indexOf(t) * 0.05) + 's">' +
              '<div class="card-icon" style="font-size:28px">' + t.icon + '</div>' +
              '<h3>' + esc(t.name) + '</h3>' +
              '<p>' + esc(t.desc) + '</p>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
    }
  });

  /* ─── WIZARD CV: QUERO AJUDA ─── */

  Router.register('wizard-cv', {
    title: 'Assistente CV',
    render: function () {
      return '<div class="page">' +
        '<button class="btn-back" onclick="Router.go(\'cv-flow\')">← Voltar</button>' +
        '<h1>Assistente de Criação</h1>' +
        '<p class="subtitle">Responde às perguntas abaixo para gerarmos o teu CV.</p>' +
        '<div id="wizard-cv-container">' +
          renderWizardPerguntasCV() +
        '</div>' +
      '</div>';
    }
  });

  function renderWizardPerguntasCV() {
    var perguntas = [
      { campo: 'nome', label: 'Nome completo', tipo: 'text' },
      { campo: 'cargo', label: 'Qual é o teu cargo ou área de atuação?', tipo: 'text' },
      { campo: 'resumoProfissional', label: 'Fala um pouco sobre ti profissionalmente', tipo: 'textarea', melhoria: true },
      { campo: 'objetivo', label: 'Qual é o teu objetivo profissional?', tipo: 'text' },
      { campo: 'diferenciais', label: 'O que te diferencia dos outros candidatos?', tipo: 'textarea', melhoria: true }
    ];
    return '<div class="wizard-perguntas">' +
      perguntas.map(function (p, i) {
        var html = '<div class="form-group">' +
          '<label for="wcv-' + i + '">' + esc(p.label) + '</label>' +
          (p.tipo === 'textarea'
            ? '<textarea id="wcv-' + i + '" class="wizard-cv-input" rows="3" placeholder="Escreve aqui..."></textarea>'
            : '<input type="text" id="wcv-' + i + '" class="wizard-cv-input" placeholder="Escreve aqui...">');
        if (p.melhoria) {
          html += '<button class="btn-melhorar" onclick="melhorarTextoWizard(' + i + ')" type="button">✨ Melhorar com IA</button>' +
            '<div id="wcv-melhoria-' + i + '" class="melhoria-container"></div>';
        }
        html += '</div>';
        return html;
      }).join('') +
      '<button class="btn-primary" onclick="gerarCVdaWizard()" style="margin-top:16px">Gerar Currículo</button>' +
    '</div>';
  }

  window.melhorarTextoWizard = function (index) {
    var input = document.getElementById('wcv-' + index);
    var container = document.getElementById('wcv-melhoria-' + index);
    if (!input || !container) return;
    var text = input.value.trim();
    if (text.length < 3) {
      container.innerHTML = '<div class="melhoria-error">Escreve primeiro uma descrição para melhorar.</div>';
      return;
    }
    container.innerHTML = '<div class="melhoria-loading">A melhorar texto...</div>';
    AI.enhanceText(text, 'profissional').then(function (enhanced) {
      if (!enhanced || enhanced === text) {
        container.innerHTML = '<div class="melhoria-error">Não foi possível melhorar. Tenta reformular.</div>';
        return;
      }
      container.innerHTML =
        '<div class="melhoria-sugestao">' +
          '<div class="melhoria-original"><strong>Original:</strong><p>' + esc(text) + '</p></div>' +
          '<div class="melhoria-resultado"><strong>Sugestão:</strong><p>' + esc(enhanced) + '</p></div>' +
          '<div class="melhoria-acoes">' +
            '<button class="btn-sm btn-aceitar" onclick="aceitarMelhoria(' + index + ')">✓ Aceitar</button>' +
            '<button class="btn-sm btn-recusar" onclick="recusarMelhoria(' + index + ')">✗ Rejeitar</button>' +
            '<button class="btn-sm btn-editar" onclick="editarMelhoria(' + index + ')">✎ Editar</button>' +
          '</div>' +
        '</div>';
      container._enhancedText = enhanced;
    }).catch(function (err) {
      container.innerHTML = '<div class="melhoria-error">' + esc(err.message) + '</div>';
    });
  };

  window.aceitarMelhoria = function (index) {
    var container = document.getElementById('wcv-melhoria-' + index);
    var input = document.getElementById('wcv-' + index);
    if (container && container._enhancedText && input) {
      input.value = container._enhancedText;
      container.innerHTML = '<div class="melhoria-sucesso">Texto actualizado com a sugestão ✓</div>';
    }
  };

  window.recusarMelhoria = function (index) {
    var container = document.getElementById('wcv-melhoria-' + index);
    if (container) container.innerHTML = '';
  };

  window.editarMelhoria = function (index) {
    var container = document.getElementById('wcv-melhoria-' + index);
    var input = document.getElementById('wcv-' + index);
    if (container && container._enhancedText && input) {
      input.value = container._enhancedText;
      container.innerHTML = '<div class="melhoria-info">Texto copiado para edição. Revisa e faz ajustes.</div>';
      input.focus();
    }
  };

  window.gerarCVdaWizard = function () {
    var campos = ['nome', 'cargo', 'resumoProfissional', 'objetivo', 'diferenciais'];
    var data = {};
    campos.forEach(function (c, i) {
      var el = document.getElementById('wcv-' + i);
      if (el) data[c] = el.value;
    });
    if (!data.nome || !data.cargo) {
      alert('Preenche pelo menos o nome e o cargo.');
      return;
    }
    var modelId = 'classico';
    if (AI && AI.suggestModel) {
      var suggestion = AI.suggestModel(data.cargo);
      if (suggestion && suggestion.model) modelId = suggestion.model;
    }
    var docId = Storage.createDoc('cv', 'CV ' + data.nome.split(' ')[0], modelId);
    Storage.saveDocData(docId, data);
    Router.go('editar-doc?id=' + docId);
  };

  /* ─── WIZARD DOC: QUERO AJUDA (documentos) ─── */

  Router.register('wizard-doc', {
    title: 'Novo Documento',
    render: function () {
      var params = Router.getParams();
      var tipoId = params.tipo;
      if (!tipoId) return '<div class="page"><p>Tipo de documento não especificado.</p><button class="btn-back" onclick="Router.go(\'outros-documentos\')">← Voltar</button></div>';
      var info = DocTypes.get(tipoId);
      if (!info) return '<div class="page"><p>Documento não encontrado.</p><button class="btn-back" onclick="Router.go(\'outros-documentos\')">← Voltar</button></div>';
      return '<div class="page">' +
        '<button class="btn-back" onclick="Router.go(\'outros-documentos\')">← Voltar</button>' +
        '<h1>' + esc(info.name) + '</h1>' +
        '<p class="subtitle">Preenche os dados abaixo para gerar o documento.</p>' +
        '<div class="wizard-doc-form" id="wizard-doc-form">' +
          gerarFormDoc(tipoId) +
        '</div>' +
      '</div>';
    }
  });

  function gerarFormDoc(tipoId) {
    var fields = DocTypes.getFormFields(tipoId);
    if (!fields || !fields.length) return '<p>Não existem campos definidos para este documento.</p>';
    return fields.map(function (f) {
      return '<div class="form-group">' +
        '<label>' + esc(f.label) + '</label>' +
        (f.type === 'textarea'
          ? '<textarea id="wizdoc-' + f.key + '" class="wizard-doc-field" rows="4" placeholder="' + esc(f.placeholder || '') + '"></textarea>'
          : '<input type="' + (f.type === 'date' ? 'date' : 'text') + '" id="wizdoc-' + f.key + '" class="wizard-doc-field" placeholder="' + esc(f.placeholder || '') + '">') +
      '</div>';
    }).join('') +
    '<button class="btn-primary" onclick="gerarDocDaWizard(\'' + tipoId + '\')" style="margin-top:16px">Gerar Documento</button>';
  }

  window.gerarDocDaWizard = function (tipoId) {
    var fields = DocTypes.getFormFields(tipoId);
    if (!fields) return;
    var data = {};
    fields.forEach(function (f) {
      var el = document.getElementById('wizdoc-' + f.key);
      if (el) data[f.key] = el.value;
    });
    var info = DocTypes.get(tipoId);
    var docId = Storage.createDoc('doc', info ? info.name : 'Documento');
    Storage.updateDoc(docId, { docType: tipoId });
    Storage.saveDocData(docId, data);
    Router.go('editar-doc?id=' + docId + '&tipo=' + tipoId);
  };

  /* ─── EDITAR DOCUMENTO ─── */

  Router.register('editar-doc', {
    title: 'Editar',
    render: function () {
      var params = Router.getParams();
      var docId = params.id;
      if (!docId) return '<div class="page"><p>Documento não encontrado.</p><button class="btn-secondary" onclick="navegar(\'documentos\')">Voltar</button></div>';

      var docMeta = null;
      Storage.listDocs().forEach(function (d) { if (d.id === docId) docMeta = d; });
      if (!docMeta) return '<div class="page"><p>Documento não encontrado.</p><button class="btn-secondary" onclick="navegar(\'documentos\')">Voltar</button></div>';

      var tipo = params.tipo || docMeta.docType || '';
      var isCV = docMeta.type === 'cv';
      var data = Storage.getDocData(docId) || {};

      if (isCV) {
        // Render CV editor (prefilled with profile data)
        var fotoPreview = data.foto && data.foto.startsWith('data:')
          ? '<img src="' + esc(data.foto) + '" alt="" class="photo-preview">'
          : (data.foto ? '<img src="' + esc(data.foto) + '" alt="" class="photo-preview" onerror="this.parentElement.innerHTML=\'<span class=\\\'photo-preview-placeholder\\\'>📷</span>\'">' : '');

        var modelos = ModelRegistry.list('cv');
        var atual = docMeta.model || 'classico';

        return '<div class="page page-wide">' +
          '<div class="split-layout">' +
            '<div class="split-form">' +
              '<div class="page-header-row">' +
                '<h1>' + esc(docMeta.name) + '</h1>' +
                '<div class="model-selector-inline">' +
                  modelos.map(function (m) {
                    return '<span class="model-chip ' + (m.id === atual ? 'selected' : '') + '" onclick="trocarModeloDoc(\'' + docId + '\',\'' + m.id + '\')">' + esc(m.name) + '</span>';
                  }).join('') +
                '</div>' +
              '</div>' +

              // Personal Data section
              '<div class="form-section"><h2>Dados Pessoais</h2>' +
                '<div class="form-group"><label>Nome completo</label><input type="text" class="cv-field" data-doc="' + docId + '" data-key="nome" value="' + esc(data.nome || '') + '" placeholder="Ex.: Adelino Graça"></div>' +
                '<div class="form-row"><div class="form-group"><label>Cargo</label><input type="text" class="cv-field" data-doc="' + docId + '" data-key="cargo" value="' + esc(data.cargo || '') + '" placeholder="Ex.: Diretor"></div><div class="form-group"><label>Links</label><input type="text" class="cv-field" data-doc="' + docId + '" data-key="social" value="' + esc(data.social || '') + '" placeholder="linkedin.com/..."></div></div>' +
                '<div class="form-group"><label>Foto</label><div class="photo-upload"><div class="photo-preview-wrap" id="edit-photo-preview-wrap">' + (fotoPreview || '<span class="photo-preview-placeholder">📷</span>') + '</div><div class="photo-upload-fields"><button class="btn-secondary btn-small" onclick="document.getElementById(\'edit-file-foto\').click()">Escolher</button><input type="file" id="edit-file-foto" accept="image/*" style="display:none"><input type="url" id="edit-input-foto" class="cv-field" data-doc="' + docId + '" data-key="foto" value="' + esc(data.foto && !data.foto.startsWith('data:') ? data.foto : '') + '" placeholder="URL da foto..." style="margin-top:6px;font-size:13px"></div></div></div>' +
                '<div class="form-group"><label>Resumo</label><textarea class="cv-field" data-doc="' + docId + '" data-key="resumo" placeholder="Resumo profissional..." rows="3">' + esc(data.resumo || '') + '</textarea></div>' +
                '<div class="form-row"><div class="form-group"><label>Email</label><input type="email" class="cv-field" data-doc="' + docId + '" data-key="email" value="' + esc(data.email || '') + '" placeholder="email@exemplo.com"></div><div class="form-group"><label>Telefone</label><input type="tel" class="cv-field" data-doc="' + docId + '" data-key="telefone" value="' + esc(data.telefone || '') + '" placeholder="+244 900 000 000"></div></div>' +
                '<div class="form-group"><label>Morada</label><input type="text" class="cv-field" data-doc="' + docId + '" data-key="morada" value="' + esc(data.morada || '') + '" placeholder="Ex.: Luanda"></div>' +
              '</div>' +

              // Experience
              '<div class="form-section"><h2>Experiência</h2><div id="edit-exp-container">' +
                (data.experiencias || [{cargo:'',empresa:'',inicio:'',fim:'',descricao:''}]).map(function (e, i) {
                  return '<div class="exp-item"><div class="form-row"><div class="form-group"><label>Cargo</label><input type="text" class="cv-array-field" data-doc="' + docId + '" data-array="experiencias" data-index="' + i + '" data-key="cargo" value="' + esc(e.cargo) + '"></div><div class="form-group"><label>Empresa</label><input type="text" class="cv-array-field" data-doc="' + docId + '" data-array="experiencias" data-index="' + i + '" data-key="empresa" value="' + esc(e.empresa) + '"></div></div><div class="form-row"><div class="form-group"><label>Início</label><input type="text" class="cv-array-field" data-doc="' + docId + '" data-array="experiencias" data-index="' + i + '" data-key="inicio" value="' + esc(e.inicio) + '"></div><div class="form-group"><label>Fim</label><input type="text" class="cv-array-field" data-doc="' + docId + '" data-array="experiencias" data-index="' + i + '" data-key="fim" value="' + esc(e.fim) + '"></div></div><div class="form-group"><label>Descrição</label><textarea class="cv-array-field" data-doc="' + docId + '" data-array="experiencias" data-index="' + i + '" data-key="descricao" rows="2">' + esc(e.descricao) + '</textarea><div class="ai-actions"><button class="btn-ai" onclick="melhorarExpCampo(\'' + docId + '\',' + i + ',\'profissional\')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg> Melhorar</button><button class="btn-ai btn-ai-secondary" onclick="melhorarExpCampo(\'' + docId + '\',' + i + ',\'conciso\')">Conciso</button></div></div><button class="btn-remove" onclick="removerExpEditar(\'' + docId + '\',' + i + ')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Remover</button></div>';
                }).join('') + '</div>' +
                '<button class="btn-secondary add-btn" onclick="adicionarExpEditar(\'' + docId + '\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar</button>' +
              '</div>' +

              // Education
              '<div class="form-section"><h2>Formação</h2><div id="edit-formacao-container">' +
                (data.formacoes || [{curso:'',instituicao:'',inicio:'',fim:''}]).map(function (f, i) {
                  return '<div class="exp-item"><div class="form-row"><div class="form-group"><label>Curso</label><input type="text" class="cv-array-field" data-doc="' + docId + '" data-array="formacoes" data-index="' + i + '" data-key="curso" value="' + esc(f.curso) + '"></div><div class="form-group"><label>Instituição</label><input type="text" class="cv-array-field" data-doc="' + docId + '" data-array="formacoes" data-index="' + i + '" data-key="instituicao" value="' + esc(f.instituicao) + '"></div></div><div class="form-row"><div class="form-group"><label>Início</label><input type="text" class="cv-array-field" data-doc="' + docId + '" data-array="formacoes" data-index="' + i + '" data-key="inicio" value="' + esc(f.inicio) + '"></div><div class="form-group"><label>Fim</label><input type="text" class="cv-array-field" data-doc="' + docId + '" data-array="formacoes" data-index="' + i + '" data-key="fim" value="' + esc(f.fim) + '"></div></div><button class="btn-remove" onclick="removerFormEditar(\'' + docId + '\',' + i + ')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Remover</button></div>';
                }).join('') + '</div>' +
                '<button class="btn-secondary add-btn" onclick="adicionarFormEditar(\'' + docId + '\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar</button>' +
              '</div>' +

              // Skills
              '<div class="form-section"><h2>Competências</h2><div id="edit-skills-container">' +
                (data.competencias || [{nome:'',nivel:'3'}]).map(function (s, i) {
                  var nvs = ['', 'Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Expert'];
                  return '<div class="skill-row"><div class="form-group" style="flex:1;margin-bottom:0"><label>Competência</label><input type="text" class="cv-array-field" data-doc="' + docId + '" data-array="competencias" data-index="' + i + '" data-key="nome" value="' + esc(s.nome) + '"></div><div class="form-group" style="width:110px;margin-bottom:0"><label>Nível</label><select class="cv-array-field" data-doc="' + docId + '" data-array="competencias" data-index="' + i + '" data-key="nivel">' + nvs.map(function (n, ni) { return '<option value="' + ni + '" ' + ((s.nivel == ni) ? 'selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div><button class="btn-icon-sm" onclick="removerSkillEditar(\'' + docId + '\',' + i + ')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
                }).join('') + '</div>' +
                '<button class="btn-secondary add-btn" onclick="adicionarSkillEditar(\'' + docId + '\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar</button>' +
              '</div>' +

              // Languages
              '<div class="form-section"><h2>Idiomas</h2><div id="edit-idiomas-container">' +
                (data.idiomas || [{idioma:'',nivel:'Iniciante'}]).map(function (l, i) {
                  var nvs = ['Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo'];
                  return '<div class="skill-row"><div class="form-group" style="flex:1;margin-bottom:0"><label>Idioma</label><input type="text" class="cv-array-field" data-doc="' + docId + '" data-array="idiomas" data-index="' + i + '" data-key="idioma" value="' + esc(l.idioma) + '"></div><div class="form-group" style="width:130px;margin-bottom:0"><label>Nível</label><select class="cv-array-field" data-doc="' + docId + '" data-array="idiomas" data-index="' + i + '" data-key="nivel">' + nvs.map(function (n) { return '<option value="' + n + '" ' + (l.nivel === n ? 'selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div><button class="btn-icon-sm" onclick="removerIdiomaEditar(\'' + docId + '\',' + i + ')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
                }).join('') + '</div>' +
                '<button class="btn-secondary add-btn" onclick="adicionarIdiomaEditar(\'' + docId + '\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar</button>' +
              '</div>' +

              '<div class="form-actions">' +
                '<button class="btn-secondary" onclick="navegar(\'documentos\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> Voltar</button>' +
                '<button class="btn-primary" onclick="salvarEVerPreview(\'' + docId + '\')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Pré-visualizar</button>' +
              '</div>' +
            '</div>' +
            '<div class="split-preview" id="split-preview-area">' +
              '<div class="preview-header"><span>Pré-visualização</span><button class="btn-primary btn-small" onclick="salvarEVerPreview(\'' + docId + '\')">Ver completo</button></div>' +
              '<div class="preview-container"><div id="edit-preview-frame">' +
                '<div class="loading-model"><div class="spinner"></div><p>A carregar pré-visualização...</p></div>' +
              '</div></div>' +
            '</div>' +
          '</div>' +
        '</div>';
      } else {
        // Doc form
        var info = DocTypes.get(tipo);
        var fields = DocTypes.getFormFields(tipo);
        if (!info) return '<div class="page"><p>Tipo de documento não encontrado.</p><button class="btn-secondary" onclick="navegar(\'documentos\')">Voltar</button></div>';

        return '<div class="page page-wide">' +
          '<div class="split-layout">' +
            '<div class="split-form">' +
              '<h1>' + esc(info.name) + '</h1>' +
              '<div class="form-section">' +
                fields.map(function (f) {
                  var val = esc(data[f.key] || '');
                  if (f.type === 'textarea') {
                    return '<div class="form-group"><label>' + esc(f.label) + '</label><textarea class="doc-field" data-doc="' + docId + '" data-key="' + f.key + '" placeholder="' + esc(f.placeholder || '') + '" rows="5">' + val + '</textarea></div>';
                  }
                  return '<div class="form-group"><label>' + esc(f.label) + '</label><input type="' + (f.type === 'date' ? 'date' : 'text') + '" class="doc-field" data-doc="' + docId + '" data-key="' + f.key + '" value="' + val + '" placeholder="' + esc(f.placeholder || '') + '"></div>';
                }).join('') +
              '</div>' +
              '<div class="form-actions">' +
                '<button class="btn-secondary" onclick="navegar(\'documentos\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> Voltar</button>' +
                '<button class="btn-primary" onclick="salvarEVerPreview(\'' + docId + '\')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Pré-visualizar</button>' +
              '</div>' +
            '</div>' +
            '<div class="split-preview" id="split-preview-area">' +
              '<div class="preview-header"><span>Pré-visualização</span><button class="btn-primary btn-small" onclick="salvarEVerPreview(\'' + docId + '\')">Ver completo</button></div>' +
              '<div class="preview-container"><div id="edit-preview-frame">' +
                '<div class="loading-model"><div class="spinner"></div><p>A carregar pré-visualização...</p></div>' +
              '</div></div>' +
            '</div>' +
          '</div>' +
        '</div>';
      }
    },
    onRender: function () {
      var params = Router.getParams();
      if (params.id) {
        setupAutoSaveDoc(params.id);
        // Try to render preview for CV
        var docMeta = null;
        Storage.listDocs().forEach(function (d) { if (d.id === params.id) docMeta = d; });
        if (docMeta && docMeta.type === 'cv') {
          atualizarPreviewDoc(params.id);
        } else if (docMeta && docMeta.type === 'doc') {
          atualizarPreviewDoc(params.id);
        }
      }
    }
  });

  function setupAutoSaveDoc(docId) {
    var els = document.querySelectorAll('#app-content [data-doc="' + docId + '"]');
    els.forEach(function (el) {
      el.removeEventListener('input', function () { autosaveDoc(docId); });
      el.addEventListener('input', function () { autosaveDoc(docId); });
      el.removeEventListener('change', function () { autosaveDoc(docId); });
      el.addEventListener('change', function () { autosaveDoc(docId); });
    });
  }

  function recolherDadosDoc(docId) {
    var isCV = false;
    Storage.listDocs().forEach(function (d) { if (d.id === docId && d.type === 'cv') isCV = true; });
    var data = {};

    if (isCV) {
      // Collect simple fields
      document.querySelectorAll('.cv-field[data-doc="' + docId + '"]').forEach(function (el) {
        data[el.getAttribute('data-key')] = el.value;
      });
      // Override foto if file upload new one
      var fotoUrl = document.getElementById('edit-input-foto');
      if (fotoUrl) data.foto = window._editFotoDataUrl || fotoUrl.value;
      // Collect arrays
      ['experiencias', 'formacoes', 'competencias', 'idiomas'].forEach(function (arrName) {
        var items = [];
        var indices = {};
        document.querySelectorAll('.cv-array-field[data-doc="' + docId + '"][data-array="' + arrName + '"]').forEach(function (el) {
          var idx = parseInt(el.getAttribute('data-index'));
          var key = el.getAttribute('data-key');
          if (!indices[idx]) indices[idx] = {};
          indices[idx][key] = el.value;
        });
        Object.keys(indices).sort().forEach(function (k) { items.push(indices[k]); });
        data[arrName] = items;
      });
    } else {
      document.querySelectorAll('.doc-field[data-doc="' + docId + '"]').forEach(function (el) {
        data[el.getAttribute('data-key')] = el.value;
      });
    }
    return data;
  }

  function autosaveDoc(docId) {
    mostrarSaveStatus('Guardando...');
    var data = recolherDadosDoc(docId);
    Storage.saveDocData(docId, data);
    Storage.updateDoc(docId, {});
    setTimeout(function () { mostrarSaveStatus('✓ Guardado'); }, 400);
    // Debounced preview update
    if (window._previewTimer) clearTimeout(window._previewTimer);
    window._previewTimer = setTimeout(function () { atualizarPreviewDoc(docId); }, 800);
  }

  function atualizarPreviewDoc(docId) {
    var frame = document.getElementById('edit-preview-frame');
    if (!frame) return;
    var docMeta = null;
    Storage.listDocs().forEach(function (d) { if (d.id === docId) docMeta = d; });
    if (!docMeta) return;
    var data = Storage.getDocData(docId) || {};

    if (docMeta.type === 'cv') {
      data.modelo = docMeta.model || 'classico';
      var model = ModelRegistry.get('cv', data.modelo) || ModelRegistry.list('cv')[0];
      frame.innerHTML = model ? model.render(data) : '<p>Modelo não encontrado</p>';
      scalePreview('edit-preview-frame');
    } else if (docMeta.type === 'doc') {
      // Find the tipo - we need to get it from the docMeta or params
      var tipo = docMeta.docType || '';
      // Try to find a renderer
      var renderFn = DocTypes.getRenderFn(tipo);
      if (renderFn) {
        frame.innerHTML = renderFn(data);
        scalePreview('edit-preview-frame');
      } else {
        frame.innerHTML = '<p>Pré-visualização disponível na página de exportação.</p>';
      }
    }
  }

  window.salvarEVerPreview = function (docId) {
    autosaveDoc(docId);
    Router.go('preview-doc?id=' + docId);
  };

  /* ─── PREVIEW DOC ─── */

  Router.register('preview-doc', {
    title: 'Pré-visualizar',
    onRender: function () {
      scalePreview('preview-frame');
    },
    render: function () {
      var params = Router.getParams();
      var docId = params.id;
      if (!docId) return '<div class="page"><p>Documento não encontrado.</p><button class="btn-secondary" onclick="navegar(\'documentos\')">Voltar</button></div>';

      var docMeta = null;
      Storage.listDocs().forEach(function (d) { if (d.id === docId) docMeta = d; });
      if (!docMeta) return '<div class="page"><p>Documento não encontrado.</p><button class="btn-secondary" onclick="navegar(\'documentos\')">Voltar</button></div>';

      var data = Storage.getDocData(docId) || {};
      var isCV = docMeta.type === 'cv';

      if (isCV) {
        data.modelo = docMeta.model || 'classico';
        var model = ModelRegistry.get('cv', data.modelo) || ModelRegistry.list('cv')[0];
        var modelos = ModelRegistry.list('cv');
        var suggestion = AI && AI.suggestModel ? AI.suggestModel(data.cargo) : null;

        return '<div class="page">' +
          '<h1>' + esc(docMeta.name) + '</h1>' +
          (suggestion && suggestion.model !== docMeta.model ? '<div class="model-suggestion" onclick="trocarModeloPreview(\'' + docId + '\',\'' + suggestion.model + '\')"><strong>💡 Sugestão:</strong> ' + esc(suggestion.reason) + ' <span class="model-suggestion-link">Experimentar ' + suggestion.model + '</span></div>' : '') +
          '<div class="model-selector">' +
            modelos.map(function (m) {
              return '<div class="model-option ' + (m.id === docMeta.model ? 'selected' : '') + '" onclick="trocarModeloPreview(\'' + docId + '\',\'' + m.id + '\')"><span class="model-dot"></span> ' + esc(m.name) + '</div>';
            }).join('') +
          '</div>' +
          '<div class="preview-container"><div id="preview-frame">' + (model ? model.render(data) : '<div class="loading-model"><div class="spinner"></div></div>') + '</div></div>' +
          '<div class="export-bar">' +
            '<button class="btn-primary btn-exportar-pdf" onclick="exportarDocPDFPreview(\'' + docId + '\')" style="flex:1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> Exportar PDF</button>' +
            '<button class="btn-secondary" style="width:auto;padding:14px" onclick="partilharWhatsApp(\'' + docId + '\')" aria-label="Partilhar"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></button>' +
          '</div>' +
          '<button class="btn-secondary" onclick="navegar(\'editar-doc?id=' + docId + '\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Voltar e editar</button>' +
        '</div>';
      } else {
        // Doc preview
        var tipoDoc = docMeta.docType || '';
        var renderFn = DocTypes.getRenderFn(tipoDoc);
        return '<div class="page">' +
          '<h1>' + esc(docMeta.name) + '</h1>' +
          '<div class="preview-container"><div id="preview-frame">' + (renderFn ? renderFn(data) : '<p>Pré-visualização indisponível</p>') + '</div></div>' +
          '<div class="export-bar">' +
            '<button class="btn-primary btn-exportar-pdf" onclick="exportarDocPDFPreview(\'' + docId + '\')" style="flex:1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> Exportar PDF</button>' +
          '</div>' +
          '<button class="btn-secondary" onclick="navegar(\'editar-doc?id=' + docId + '&tipo=' + tipoDoc + '\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Voltar e editar</button>' +
        '</div>';
      }
    }
  });

  /* ─── AÇÕES DE DOCUMENTOS ─── */

  window.abrirDoc = function (docId) {
    var docMeta = null;
    Storage.listDocs().forEach(function (d) { if (d.id === docId) docMeta = d; });
    if (!docMeta) return;
    if (docMeta.type === 'cv') {
      Router.go('editar-doc?id=' + docId);
    } else {
      // Need the docType - check if we stored it
      var data = Storage.getDocData(docId);
      var tipo = docMeta.docType || '';
      // If we don't know the tipo, try to find it from the data
      Router.go('editar-doc?id=' + docId + '&tipo=' + tipo);
    }
  };

  window.duplicarDoc = function (docId) {
    var newId = Storage.duplicateDoc(docId);
    if (newId) {
      Router.go('editar-doc?id=' + newId);
    }
  };

  window.confirmarEliminarDoc = function (docId) {
    if (confirm('Tem a certeza que deseja eliminar este documento?')) {
      Storage.deleteDoc(docId);
      // If we're on documentos page, reload it
      if (Router.current === 'documentos') {
        Router.go('documentos');
      } else if (Router.current === 'home') {
        Router.go('home');
      } else {
        Router.go('documentos');
      }
    }
  };

  window.exportarDocPDFPreview = function (docId) {
    var docMeta = null;
    Storage.listDocs().forEach(function (d) { if (d.id === docId) docMeta = d; });
    var nome = docMeta ? docMeta.name : 'documento';
    PDFExport.exportPreview('preview-frame', nome.toLowerCase().replace(/\s+/g, '-') + '.pdf');
  };

  window.partilharWhatsApp = function (docId) {
    var docMeta = null;
    Storage.listDocs().forEach(function (d) { if (d.id === docId) docMeta = d; });
    var nome = docMeta ? docMeta.name : 'documento';
    var texto = encodeURIComponent(
      'Criei o meu ' + nome + ' com o Tá Feito! 🚀\n\nModelos premium, rápido e sem complicação.\n\n' +
      '👉 ' + window.location.href
    );
    window.open('https://wa.me/?text=' + texto, '_blank');
  };

  window.trocarModeloDoc = function (docId, modelId) {
    Storage.updateDoc(docId, { model: modelId });
    Router.go('editar-doc?id=' + docId);
  };

  window.trocarModeloPreview = function (docId, modelId) {
    Storage.updateDoc(docId, { model: modelId });
    Router.go('preview-doc?id=' + docId);
  };

  /* ─── AÇÕES DE PERFIL ─── */

  function guardarPerfil() {
    var p = {
      nome: document.getElementById('perfil-nome')?.value || '',
      cargo: document.getElementById('perfil-cargo')?.value || '',
      email: document.getElementById('perfil-email')?.value || '',
      telefone: document.getElementById('perfil-telefone')?.value || '',
      morada: document.getElementById('perfil-morada')?.value || '',
      social: document.getElementById('perfil-social')?.value || '',
      foto: window._perfilFotoDataUrl || document.getElementById('perfil-input-foto')?.value || '',
      resumo: document.getElementById('perfil-resumo')?.value || '',
      experiencias: [],
      formacoes: [],
      competencias: [],
      idiomas: [],
      certificacoes: []
    };

    document.querySelectorAll('[name^="perfil-exp-cargo-"]').forEach(function (el, i) {
      p.experiencias.push({
        cargo: el.value,
        empresa: document.querySelector('[name="perfil-exp-empresa-' + i + '"]')?.value || '',
        inicio: document.querySelector('[name="perfil-exp-inicio-' + i + '"]')?.value || '',
        fim: document.querySelector('[name="perfil-exp-fim-' + i + '"]')?.value || '',
        descricao: document.querySelector('[name="perfil-exp-descricao-' + i + '"]')?.value || ''
      });
    });

    document.querySelectorAll('[name^="perfil-form-curso-"]').forEach(function (el, i) {
      p.formacoes.push({
        curso: el.value,
        instituicao: document.querySelector('[name="perfil-form-instituicao-' + i + '"]')?.value || '',
        inicio: document.querySelector('[name="perfil-form-inicio-' + i + '"]')?.value || '',
        fim: document.querySelector('[name="perfil-form-fim-' + i + '"]')?.value || ''
      });
    });

    document.querySelectorAll('[name^="perfil-skill-nome-"]').forEach(function (el, i) {
      p.competencias.push({
        nome: el.value,
        nivel: document.querySelector('[name="perfil-skill-nivel-' + i + '"]')?.value || '3'
      });
    });

    document.querySelectorAll('[name^="perfil-idioma-nome-"]').forEach(function (el, i) {
      p.idiomas.push({
        idioma: el.value,
        nivel: document.querySelector('[name="perfil-idioma-nivel-' + i + '"]')?.value || 'Iniciante'
      });
    });

    document.querySelectorAll('[name^="perfil-cert-nome-"]').forEach(function (el, i) {
      p.certificacoes.push({
        nome: el.value,
        instituicao: document.querySelector('[name="perfil-cert-instituicao-' + i + '"]')?.value || '',
        data: document.querySelector('[name="perfil-cert-data-' + i + '"]')?.value || ''
      });
    });

    Storage.saveProfile(p);
    mostrarSaveStatus('✓ Perfil guardado');
    setTimeout(function () { Router.go('home'); }, 600);
  }

  window.guardarPerfil = guardarPerfil;

  window.adicionarExpPerfil = function () {
    var p = Storage.getProfile();
    p.experiencias = p.experiencias || [];
    p.experiencias.push({});
    Storage.saveProfile(p);
    Router.go('perfil');
  };

  window.removerExpPerfil = function (i) {
    var p = Storage.getProfile();
    p.experiencias.splice(i, 1);
    if (!p.experiencias.length) p.experiencias.push({});
    Storage.saveProfile(p);
    Router.go('perfil');
  };

  window.adicionarFormPerfil = function () {
    var p = Storage.getProfile();
    p.formacoes = p.formacoes || [];
    p.formacoes.push({});
    Storage.saveProfile(p);
    Router.go('perfil');
  };

  window.removerFormPerfil = function (i) {
    var p = Storage.getProfile();
    p.formacoes.splice(i, 1);
    if (!p.formacoes.length) p.formacoes.push({});
    Storage.saveProfile(p);
    Router.go('perfil');
  };

  window.adicionarSkillPerfil = function () {
    var p = Storage.getProfile();
    p.competencias = p.competencias || [];
    p.competencias.push({ nome: '', nivel: '3' });
    Storage.saveProfile(p);
    Router.go('perfil');
  };

  window.removerSkillPerfil = function (i) {
    var p = Storage.getProfile();
    p.competencias.splice(i, 1);
    if (!p.competencias.length) p.competencias.push({ nome: '', nivel: '3' });
    Storage.saveProfile(p);
    Router.go('perfil');
  };

  window.adicionarIdiomaPerfil = function () {
    var p = Storage.getProfile();
    p.idiomas = p.idiomas || [];
    p.idiomas.push({ idioma: '', nivel: 'Iniciante' });
    Storage.saveProfile(p);
    Router.go('perfil');
  };

  window.removerIdiomaPerfil = function (i) {
    var p = Storage.getProfile();
    p.idiomas.splice(i, 1);
    if (!p.idiomas.length) p.idiomas.push({ idioma: '', nivel: 'Iniciante' });
    Storage.saveProfile(p);
    Router.go('perfil');
  };

  window.adicionarCertPerfil = function () {
    var p = Storage.getProfile();
    p.certificacoes = p.certificacoes || [];
    p.certificacoes.push({});
    Storage.saveProfile(p);
    Router.go('perfil');
  };

  window.removerCertPerfil = function (i) {
    var p = Storage.getProfile();
    p.certificacoes.splice(i, 1);
    if (!p.certificacoes.length) p.certificacoes.push({});
    Storage.saveProfile(p);
    Router.go('perfil');
  };

  /* ─── AÇÕES DE EDIÇÃO CV ─── */

  window.adicionarExpEditar = function (docId) {
    var data = Storage.getDocData(docId) || {};
    data.experiencias = data.experiencias || [];
    data.experiencias.push({});
    Storage.saveDocData(docId, data);
    Router.go('editar-doc?id=' + docId);
  };

  window.removerExpEditar = function (docId, i) {
    var data = Storage.getDocData(docId) || {};
    data.experiencias.splice(i, 1);
    if (!data.experiencias.length) data.experiencias.push({});
    Storage.saveDocData(docId, data);
    Router.go('editar-doc?id=' + docId);
  };

  window.adicionarFormEditar = function (docId) {
    var data = Storage.getDocData(docId) || {};
    data.formacoes = data.formacoes || [];
    data.formacoes.push({});
    Storage.saveDocData(docId, data);
    Router.go('editar-doc?id=' + docId);
  };

  window.removerFormEditar = function (docId, i) {
    var data = Storage.getDocData(docId) || {};
    data.formacoes.splice(i, 1);
    if (!data.formacoes.length) data.formacoes.push({});
    Storage.saveDocData(docId, data);
    Router.go('editar-doc?id=' + docId);
  };

  window.adicionarSkillEditar = function (docId) {
    var data = Storage.getDocData(docId) || {};
    data.competencias = data.competencias || [];
    data.competencias.push({ nome: '', nivel: '3' });
    Storage.saveDocData(docId, data);
    Router.go('editar-doc?id=' + docId);
  };

  window.removerSkillEditar = function (docId, i) {
    var data = Storage.getDocData(docId) || {};
    data.competencias.splice(i, 1);
    if (!data.competencias.length) data.competencias.push({ nome: '', nivel: '3' });
    Storage.saveDocData(docId, data);
    Router.go('editar-doc?id=' + docId);
  };

  window.adicionarIdiomaEditar = function (docId) {
    var data = Storage.getDocData(docId) || {};
    data.idiomas = data.idiomas || [];
    data.idiomas.push({ idioma: '', nivel: 'Iniciante' });
    Storage.saveDocData(docId, data);
    Router.go('editar-doc?id=' + docId);
  };

  window.removerIdiomaEditar = function (docId, i) {
    var data = Storage.getDocData(docId) || {};
    data.idiomas.splice(i, 1);
    if (!data.idiomas.length) data.idiomas.push({ idioma: '', nivel: 'Iniciante' });
    Storage.saveDocData(docId, data);
    Router.go('editar-doc?id=' + docId);
  };

  window.melhorarExpCampo = async function (docId, i, style) {
    var data = Storage.getDocData(docId) || {};
    var exp = (data.experiencias || [])[i];
    if (!exp || !exp.descricao || exp.descricao.trim().length < 3) {
      alert('Escreve primeiro uma descrição.');
      return;
    }
    var textarea = document.querySelector('[data-doc="' + docId + '"][data-array="experiencias"][data-index="' + i + '"][data-key="descricao"]');
    if (!textarea) return;
    var container = textarea.parentElement;
    var existing = container.querySelector('.melhoria-sugestao');
    if (existing) existing.remove();
    textarea.disabled = true;
    var loading = document.createElement('div');
    loading.className = 'melhoria-loading';
    loading.textContent = 'A melhorar texto...';
    container.appendChild(loading);
    try {
      var melhorado = await AI.enhanceText(exp.descricao, style);
      loading.remove();
      textarea.disabled = false;
      if (!melhorado || melhorado === exp.descricao) {
        var err = document.createElement('div');
        err.className = 'melhoria-error';
        err.textContent = 'Não foi possível melhorar. Tenta reformular.';
        container.appendChild(err);
        return;
      }
      var sug = document.createElement('div');
      sug.className = 'melhoria-sugestao melhoria-inline';
      sug.innerHTML =
        '<div class="melhoria-original"><strong>Original:</strong><p>' + esc(exp.descricao) + '</p></div>' +
        '<div class="melhoria-resultado"><strong>Sugestão:</strong><p>' + esc(melhorado) + '</p></div>' +
        '<div class="melhoria-acoes">' +
          '<button class="btn-sm btn-aceitar" onclick="aceitarMelhoriaExp(\'' + docId + '\',' + i + ')">✓ Aceitar</button>' +
          '<button class="btn-sm btn-recusar" onclick="this.closest(\'.melhoria-sugestao\').remove()">✗ Rejeitar</button>' +
          '<button class="btn-sm btn-editar" onclick="editarMelhoriaExp(\'' + docId + '\',' + i + ')">✎ Editar</button>' +
        '</div>';
      sug._enhancedText = melhorado;
      container.appendChild(sug);
    } catch (err) {
      loading.remove();
      textarea.disabled = false;
      var errorEl = document.createElement('div');
      errorEl.className = 'melhoria-error';
      errorEl.textContent = err.message || 'Erro ao melhorar';
      container.appendChild(errorEl);
    }
  };

  window.aceitarMelhoriaExp = function (docId, i) {
    var data = Storage.getDocData(docId) || {};
    var exp = (data.experiencias || [])[i];
    if (!exp) return;
    var textarea = document.querySelector('[data-doc="' + docId + '"][data-array="experiencias"][data-index="' + i + '"][data-key="descricao"]');
    if (!textarea) return;
    var sug = textarea.parentElement.querySelector('.melhoria-sugestao');
    if (sug && sug._enhancedText) {
      exp.descricao = sug._enhancedText;
      textarea.value = sug._enhancedText;
      Storage.saveDocData(docId, data);
      sug.remove();
    }
  };

  window.editarMelhoriaExp = function (docId, i) {
    var data = Storage.getDocData(docId) || {};
    var exp = (data.experiencias || [])[i];
    if (!exp) return;
    var textarea = document.querySelector('[data-doc="' + docId + '"][data-array="experiencias"][data-index="' + i + '"][data-key="descricao"]');
    if (!textarea) return;
    var sug = textarea.parentElement.querySelector('.melhoria-sugestao');
    if (sug && sug._enhancedText) {
      textarea.value = sug._enhancedText;
      sug.remove();
      textarea.focus();
    }
  };

  /* ─── FOTO UPLOAD GERAL ─── */

  document.addEventListener('change', function (e) {
    var target = e.target;
    var prefix = '';
    var wrapId = '';

    if (target.id === 'file-foto') { prefix = ''; wrapId = 'photo-preview-wrap'; }
    else if (target.id === 'perfil-file-foto') { prefix = 'perfil-'; wrapId = 'perfil-photo-preview-wrap'; }
    else if (target.id === 'edit-file-foto') { prefix = 'edit-'; wrapId = 'edit-photo-preview-wrap'; }
    else return;

    var file = target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Imagem muito grande. Escolha uma com menos de 2MB.'); return; }
    var reader = new FileReader();
    reader.onload = function (ev) {
      var img = new Image();
      img.onload = function () {
        var w = img.width, h = img.height;
        if (w > 400 || h > 400) { var r = Math.min(400 / w, 400 / h); w = Math.round(w * r); h = Math.round(h * r); }
        var c = document.createElement('canvas'); c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        var dataUrl = c.toDataURL('image/jpeg', 0.85);
        window['_' + prefix + 'fotoDataUrl'] = dataUrl;
        var wrap = document.getElementById(wrapId);
        if (wrap) wrap.innerHTML = '<img src="' + esc(dataUrl) + '" alt="" class="photo-preview">';
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  /* ─── PLANOS ─── */

  Router.register('planos', {
    title: 'Planos',
    render: function () {
      var plans = CONFIG.plans;
      var banks = CONFIG.banks;
      var selectedKey = localStorage.getItem('tf_selected_plan') || '';

      var planCards = Object.keys(plans).map(function (key) {
        var p = plans[key];
        var isSelected = selectedKey === key;
        var price = p.price || 0;
        return '<div class="plan-card' + (isSelected ? ' selected' : '') + '" onclick="selecionarPlano(\'' + key + '\')" data-plan="' + key + '">' +
          '<div class="plan-card-header">' +
            '<h3>' + esc(p.name) + '</h3>' +
            '<span class="plan-price">' + price + ' Kz</span>' +
          '</div>' +
          '<div class="plan-docs">' + (p.docs >= 100 ? 'Documentos ilimitados' : 'Até ' + p.docs + ' documentos') + '</div>' +
          (p.desc ? '<div class="plan-desc">' + esc(p.desc) + '</div>' : '') +
          (isSelected ? '<span class="plan-badge">Selecionado</span>' : '') +
        '</div>';
      }).join('');

      var hasSelected = selectedKey ? '' : ' style="display:none"';

      var bankAccordion = banks.map(function (b, i) {
        var isMCX = b.id === 'multicaixa';
        return '<div class="bank-item' + (i === 0 ? ' open' : '') + '">' +
          '<div class="bank-item-header" onclick="toggleBank(this)">' +
            '<span class="bank-logo">' + (b.logo || '🏦') + '</span>' +
            '<span class="bank-name">' + esc(b.name) + '</span>' +
            (b.badge ? '<span class="bank-badge">' + b.badge + '</span>' : '') +
            '<span class="bank-chevron"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></span>' +
          '</div>' +
          '<div class="bank-item-body">' +
            (b.titular ? '<div class="bank-titular">Titular: <strong>' + esc(b.titular) + '</strong></div>' : '') +
            (b.iban ? '<div class="bank-iban-label">' + (isMCX ? 'Número' : 'IBAN') + '</div>' +
              '<div class="bank-iban-value">' +
                '<span>' + esc(b.iban) + '</span>' +
                '<button class="btn-copy" onclick="copiarIBAN(\'' + esc(b.iban) + '\', this)">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copiar' +
                '</button>' +
              '</div>' : '') +
            '<div class="bank-instructions"><ul>' +
              b.instructions.map(function (inst) { return '<li>' + esc(inst) + '</li>'; }).join('') +
            '</ul></div>' +
            (b.note ? '<div class="bank-note">' + esc(b.note) + '</div>' : '') +
            '<a href="' + whatsappURL() + '" target="_blank" class="btn-whatsapp">' +
              '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
              'Enviar comprovativo pelo WhatsApp' +
            '</a>' +
          '</div>' +
        '</div>';
      }).join('');

      return '<div class="page">' +
        '<h1>Planos</h1>' +
        '<p class="subtitle">Escolhe o plano ideal para ti. Sem fidelização.</p>' +
        '<div class="plans-grid">' + planCards + '</div>' +
        '<div class="payment-section" id="payment-section"' + hasSelected + '>' +
          '<div class="activation-area">' +
            '<h3>Já tens um código de ativação?</h3>' +
            '<p>Insere o código que recebeste no WhatsApp para ativar o teu plano.</p>' +
            '<div class="activation-row">' +
              '<input type="text" id="activation-code-input" placeholder="TF-XXXXXX" maxlength="11" style="text-transform:uppercase">' +
              '<button onclick="ativarCodigo()">Ativar</button>' +
            '</div>' +
            '<div id="activation-status" style="margin-top:8px;font-size:13px;color:var(--tf-text-secondary)"></div>' +
          '</div>' +
          '<h2 style="margin:30px 0 16px;font-family:var(--tf-font-serif);font-size:18px;">Transferência Bancária</h2>' +
          '<p class="subtitle">Após escolher o plano, faz o pagamento por transferência e envia-nos o comprovativo.</p>' +
          '<div class="bank-accordion">' + bankAccordion + '</div>' +
          '<div style="text-align:center;margin-top:20px;font-size:13px;color:var(--tf-text-muted)">Perguntas? Fala connosco pelo <a href="' + whatsappURL() + '" target="_blank" style="color:var(--tf-accent)">WhatsApp</a></div>' +
          '<div style="text-align:center;margin-top:16px"><button class="btn-secondary" onclick="navegar(\'home\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> Voltar ao início</button></div>' +
        '</div>' +
      '</div>';
    }
  });

  /* ─── ADMIN ─── */

  Router.register('admin', {
    title: 'Admin',
    render: function () {
      var autenticado = sessionStorage.getItem('tf_admin_auth') === 'true';
      if (!autenticado) {
        return '<div class="page"><div class="admin-login">' +
          '<h2>🔐 Área Administrativa</h2>' +
          '<p style="font-size:13px;color:var(--tf-text-secondary);margin-bottom:16px">Insere o PIN de administrador para acederes ao painel.</p>' +
          '<input type="password" id="admin-pin-input" placeholder="PIN" maxlength="20">' +
          '<button class="btn-primary" onclick="adminLogin()" style="width:100%">Entrar</button>' +
          '<div id="admin-login-error" style="margin-top:10px;font-size:13px;color:#e74c3c"></div>' +
        '</div></div>';
      }

      // Gather data
      var codes = JSON.parse(localStorage.getItem('tf_activation_codes') || '[]');
      var docCount = Storage.listDocs().length;
      var plans = CONFIG.plans;

      // Plans section
      var plansHTML = Object.keys(plans).map(function (key) {
        var p = plans[key];
        var codeCount = codes.filter(function (c) { return c.plan === key; }).length;
        return '<div class="admin-plan-item">' +
          '<div class="admin-plan-info">' +
            '<strong>' + esc(p.name) + '</strong>' +
            '<span class="admin-plan-price">' + p.price + ' Kz</span>' +
          '</div>' +
          '<div class="admin-plan-meta">' +
            '<span>' + (p.docs >= 100 ? 'Ilimitado' : p.docs + ' docs') + '</span>' +
            '<span>' + codeCount + ' códigos</span>' +
          '</div>' +
        '</div>';
      }).join('');

      // Codes section
      var codesHTML = codes.length === 0
        ? '<p style="color:var(--tf-text-muted);font-size:13px">Nenhum código gerado ainda.</p>'
        : '<div class="admin-codes">' + codes.slice().reverse().map(function (c) {
            var expirado = c.expiresAt && Date.now() > new Date(c.expiresAt).getTime();
            var statusLabel = c.status === 'active' ? (expirado ? 'Expirado' : 'Disponível') : c.status;
            var statusClass = c.status === 'used' ? 'used' : (expirado ? 'expired' : 'active');
            var criado = c.createdAt ? new Date(c.createdAt).toLocaleDateString('pt-PT') : '—';
            var expira = c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('pt-PT') : '—';
            return '<div class="admin-code-item">' +
              '<div class="admin-code-row">' +
                '<span class="code-value">' + esc(c.code) + '</span>' +
                '<button class="btn-copy-code" onclick="copiarTexto(\'' + esc(c.code) + '\', this)" title="Copiar código">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
                  '<span>Copiar</span>' +
                '</button>' +
              '</div>' +
              '<div class="admin-code-meta">' +
                '<span>Plano: <strong>' + esc(c.plan || '—') + '</strong></span>' +
                '<span>Criado: ' + criado + '</span>' +
                '<span>Expira: ' + expira + '</span>' +
              '</div>' +
              '<span class="code-status ' + statusClass + '">' + statusLabel + '</span>' +
            '</div>';
          }).join('') + '</div>';

      return '<div class="page"><div class="admin-panel">' +
        '<h2>🔐 Administração</h2>' +
        '<div class="admin-stats">' +
          '<div class="admin-stat"><div class="admin-stat-num">' + docCount + '</div><div class="admin-stat-label">Documentos</div></div>' +
          '<div class="admin-stat"><div class="admin-stat-num">' + codes.length + '</div><div class="admin-stat-label">Códigos</div></div>' +
        '</div>' +
        '<div class="admin-section">' +
          '<h3>Planos</h3>' +
          '<div class="admin-plans">' + plansHTML + '</div>' +
        '</div>' +
        '<div class="admin-section">' +
          '<h3>Códigos de Ativação</h3>' +
          '<button class="btn-primary" onclick="gerarCodigoAdmin()" style="margin-bottom:16px;width:100%"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Gerar novo código</button>' +
          codesHTML +
        '</div>' +
        '<button class="btn-secondary" onclick="adminLogout()" style="margin-top:20px;width:100%">Sair do Admin</button>' +
      '</div></div>';
    }
  });

  /* ─── DEFINIÇÕES ─── */

  Router.register('definicoes', {
    title: 'Definições',
    render: function () {
      var currentTheme = getTheme();
      var themeOpts = [
        { id: 'light', label: 'Claro' },
        { id: 'dark', label: 'Escuro' },
        { id: 'system', label: 'Sistema' }
      ];
      var themeHTML = themeOpts.map(function (t) {
        return '<label class="theme-option' + (currentTheme === t.id ? ' active' : '') + '" onclick="setTheme(\'' + t.id + '\');Router.go(\'definicoes\')">' +
          '<span class="theme-icon">' + themeIcon(t.id) + '</span>' +
          '<span>' + t.label + '</span>' +
        '</label>';
      }).join('');

      return '<div class="page">' +
        '<h1>Definições</h1>' +
        '<p class="subtitle">Personaliza a tua experiência no Tá Feito.</p>' +
        '<div class="settings-section"><h2>Aparência</h2>' +
          '<div class="settings-card"><h3>Tema</h3><p>Escolhe o esquema de cores que preferes.</p>' +
            '<div class="theme-options">' + themeHTML + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="settings-section"><h2>Sobre</h2>' +
           '<div class="settings-card"><h3>' + CONFIG.brand.name + ' — ' + CONFIG.brand.tagline + '</h3><p>' + CONFIG.brand.slogan + '<br>Versão ' + CONFIG.version + '<br>Feito em Angola, para Angola.<br>Criado pela <strong>' + CONFIG.brand.company + '</strong>.</p></div>' +
        '</div>' +
        '<div style="margin-top:20px"><button class="btn-secondary" onclick="navegar(\'home\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> Voltar ao início</button></div>' +
      '</div>';
    }
  });

  /* ─── HELPER: PLANOS, BANCOS, WHATSAPP ─── */

  window.selecionarPlano = function (key) {
    localStorage.setItem('tf_selected_plan', key);
    document.querySelectorAll('.plan-card').forEach(function (c) { c.classList.remove('selected');
      var badge = c.querySelector('.plan-badge');
      if (badge) badge.remove();
    });
    var cards = document.querySelectorAll('.plan-card');
    var idx = Object.keys(CONFIG.plans).indexOf(key);
    if (cards[idx]) {
      cards[idx].classList.add('selected');
      if (!cards[idx].querySelector('.plan-badge')) {
        var badge = document.createElement('span');
        badge.className = 'plan-badge';
        badge.textContent = 'Selecionado';
        cards[idx].appendChild(badge);
      }
    }
    var paymentSection = document.getElementById('payment-section');
    if (paymentSection) paymentSection.style.display = 'block';
    // Scroll to payment area on mobile
    setTimeout(function () {
      if (paymentSection) paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  window.toggleBank = function (headerEl) {
    var item = headerEl.parentElement;
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.bank-item.open').forEach(function (el) { el.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  };

  window.copiarIBAN = function (text, btnEl) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        btnEl.classList.add('copied');
        btnEl.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copiado';
        setTimeout(function () {
          btnEl.classList.remove('copied');
          btnEl.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copiar';
        }, 2000);
      }).catch(function () { fallbackCopy(text, btnEl); });
    } else {
      fallbackCopy(text, btnEl);
    }
  };

  function fallbackCopy(text, btnEl) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      btnEl.classList.add('copied');
      btnEl.textContent = 'Copiado!';
      setTimeout(function () { btnEl.classList.remove('copied'); btnEl.textContent = 'Copiar'; }, 2000);
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function whatsappURL() {
    var cfg = CONFIG.whatsapp;
    var plano = localStorage.getItem('tf_selected_plan') || '';
    var planoNome = '';
    if (plano && CONFIG.plans[plano]) planoNome = CONFIG.plans[plano].name;
    var msg;
    if (typeof cfg.messageTemplate === 'function') {
      msg = cfg.messageTemplate({
        plano: planoNome,
        nome: Storage.getNome() || '',
        valor: (plano && CONFIG.plans[plano]) ? CONFIG.plans[plano].price : '',
        metodo: 'Transferência Bancária'
      });
    } else {
      msg = 'Olá! Quero ativar o plano ' + planoNome + ' do Tá Feito.';
    }
    return 'https://wa.me/' + ('' + cfg.number).replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(msg);
  }

  window.ativarCodigo = function () {
    var input = document.getElementById('activation-code-input');
    var statusEl = document.getElementById('activation-status');
    if (!input || !statusEl) return;
    var code = input.value.trim().toUpperCase();
    if (!code) {
      statusEl.textContent = 'Insere um código de ativação.';
      statusEl.style.color = '#e74c3c';
      return;
    }
    var codes = JSON.parse(localStorage.getItem('tf_activation_codes') || '[]');
    var found = codes.find(function (c) { return c.code === code; });
    if (!found) {
      statusEl.textContent = 'Código inválido. Verifica e tenta novamente.';
      statusEl.style.color = '#e74c3c';
      return;
    }
    if (found.status === 'used') {
      statusEl.textContent = 'Este código já foi usado.';
      statusEl.style.color = '#e74c3c';
      return;
    }
    if (found.status === 'expired') {
      statusEl.textContent = 'Este código expirou. Pede um novo.';
      statusEl.style.color = '#e74c3c';
      return;
    }
    // Expiry check
    if (found.expiresAt && Date.now() > new Date(found.expiresAt).getTime()) {
      found.status = 'expired';
      localStorage.setItem('tf_activation_codes', JSON.stringify(codes));
      statusEl.textContent = 'Este código expirou. Pede um novo.';
      statusEl.style.color = '#e74c3c';
      return;
    }
    // Activate
    found.status = 'used';
    found.activatedAt = new Date().toISOString();
    found.activatedBy = Storage.getNome() || 'unknown';
    localStorage.setItem('tf_activation_codes', JSON.stringify(codes));
    localStorage.setItem('tf_plan', found.plan || 'basico');
    localStorage.setItem('tf_activated_at', new Date().toISOString());
    input.value = '';
    statusEl.textContent = '✅ Plano ativado com sucesso!';
    statusEl.style.color = '#2ecc71';
    setTimeout(function () { Router.go('planos'); }, 1500);
  };

  /* ─── 5-CLICK ADMIN ACCESS ─── */

  var _logoClickCount = 0;
  var _logoClickTimer = null;

  window.handleLogoClick = function (e) {
    _logoClickCount++;
    if (_logoClickTimer) clearTimeout(_logoClickTimer);
    if (_logoClickCount >= 5) {
      _logoClickCount = 0;
      Router.go('admin');
      return;
    }
    _logoClickTimer = setTimeout(function () { _logoClickCount = 0; }, 2000);
  };

  /* ─── ADMIN FUNCTIONS ─── */

  window.adminLogin = async function () {
    var pin = document.getElementById('admin-pin-input');
    var errorEl = document.getElementById('admin-login-error');
    var btn = document.querySelector('.admin-login .btn-primary');
    if (!pin || !errorEl) return;
    var pinVal = pin.value.trim();
    if (!pinVal) { errorEl.textContent = 'Insere o PIN.'; return; }
    btn.disabled = true;
    btn.textContent = 'A verificar...';
    try {
      var resp = await fetch('/api/admin-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinVal })
      });
      var data = await resp.json();
      if (data.ok) {
        sessionStorage.setItem('tf_admin_auth', 'true');
        Router.go('admin');
      } else {
        errorEl.textContent = data.message || 'PIN de administrador incorreto.';
      }
    } catch (e) {
      errorEl.textContent = 'Não foi possível validar o acesso. Tenta novamente.';
    }
    btn.disabled = false;
    btn.textContent = 'Entrar';
  };

  window.adminLogout = function () {
    sessionStorage.removeItem('tf_admin_auth');
    Router.go('admin');
  };

  window.gerarCodigoAdmin = function () {
    var planKeys = Object.keys(CONFIG.plans);
    var selectedPlan = prompt('Plano para o código? (' + planKeys.join(', ') + ')', 'avulso');
    if (!selectedPlan) return;
    if (!CONFIG.plans[selectedPlan]) {
      alert('Plano inválido. Usa: ' + planKeys.join(', '));
      return;
    }
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    function gerarGrupo(tamanho) {
      var g = '';
      for (var i = 0; i < tamanho; i++) {
        g += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return g;
    }
    // Formato: TF-7K4M-92QX-PL8R (14 caracteres alfanuméricos + separadores)
    var code = 'TF-' + gerarGrupo(4) + '-' + gerarGrupo(4) + '-' + gerarGrupo(4);
    var expiryHours = CONFIG.activation.expiryHours || 48;
    var expiresAt = new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString();
    var codes = JSON.parse(localStorage.getItem('tf_activation_codes') || '[]');
    // Verificar unicidade
    while (codes.some(function (c) { return c.code === code; })) {
      code = 'TF-' + gerarGrupo(4) + '-' + gerarGrupo(4) + '-' + gerarGrupo(4);
    }
    codes.push({
      code: code,
      plan: selectedPlan,
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt
    });
    localStorage.setItem('tf_activation_codes', JSON.stringify(codes));
    Router.go('admin');
  };

  window.copiarTexto = function (texto, btnEl) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(function () {
        btnEl.classList.add('copied');
        var span = btnEl.querySelector('span');
        if (span) span.textContent = 'Copiado';
        setTimeout(function () {
          btnEl.classList.remove('copied');
          if (span) span.textContent = 'Copiar';
        }, 2000);
      }).catch(function () { fallbackCopiarTexto(texto, btnEl); });
    } else {
      fallbackCopiarTexto(texto, btnEl);
    }
  };

  function fallbackCopiarTexto(texto, btnEl) {
    var ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      btnEl.classList.add('copied');
      var span = btnEl.querySelector('span');
      if (span) span.textContent = 'Copiado';
      setTimeout(function () {
        btnEl.classList.remove('copied');
        if (span) span.textContent = 'Copiar';
      }, 2000);
    } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ─── PREVIEW SCALING ─── */

  function scalePreview(frameId) {
    var frame = document.getElementById(frameId);
    if (!frame) return;
    var wrap = frame.parentElement;
    if (!wrap) return;
    var modelo = frame.querySelector('.cv-modelo') || frame.querySelector('.documento');
    if (!modelo) return;

    var wrapWidth = wrap.clientWidth - 32;
    if (wrapWidth <= 0) return;
    var modeloWidth = 210;
    var scale = Math.min(1, wrapWidth / modeloWidth);

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
    if (Router.current === 'preview-doc') {
      scalePreview('preview-frame');
    }
    if (Router.current === 'editar-doc') {
      scalePreview('edit-preview-frame');
    }
  });

  /* ─── GLOBAL MASCOT HELPER ─── */
  window.renderMascot = function (size, cls) {
    size = size || 48;
    cls = cls || '';
    return '<div class="tf-mascot tf-mascot-' + (size <= 32 ? 'sm' : size <= 48 ? 'md' : size <= 72 ? 'lg' : 'xl') + ' ' + cls + '">' +
      mascotSVG(size, 'smile') +
    '</div>';
  };

  /* ─── ROUTE HOOK: update document title ─── */
  var origGo = Router.go.bind(Router);
  Router.go = function (route) {
    origGo(route).then(function () {
      var cleanName = route.split('?')[0];
      var routeDef = Router.routes[cleanName];
      if (routeDef && routeDef.title) {
        document.title = routeDef.title + ' — ' + CONFIG.brand.name;
      }
    }).catch(function (err) {
      console.error('Router.go error:', err);
    });
  };

  /* ─── PWA INSTALL ─── */
  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    mostrarBotaoInstalar();
  });

  function mostrarBotaoInstalar() {
    var target = document.getElementById('save-status');
    if (!target || !deferredPrompt) return;
    target.innerHTML = '<button class="btn-install-pwa" onclick="instalarPWA()">📲 Instalar Tá Feito</button>';
  }

  window.instalarPWA = function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function (result) {
      deferredPrompt = null;
      var target = document.getElementById('save-status');
      if (target) target.innerHTML = '';
    });
  };

  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    var target = document.getElementById('save-status');
    if (target) target.innerHTML = '<span style="color:var(--tf-accent);font-size:12px">✓ Instalado</span>';
  });

  /* ─── START ─── */

  injectLogo();
  initTheme();
  startMascotBlink();

  Router.go('home');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }

})();
