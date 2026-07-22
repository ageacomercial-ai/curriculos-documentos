ModelRegistry.register('cv', 'criativo', {
  name: 'Criativo',
  description: 'Colorido e moderno, duas colunas com gradiente roxo-rosa',
  thumbnail: '🎨',
  cssFile: 'css/models/criativo.css',
  render: function(d) {
    d = d || {};
    const nome = d.nome || 'Nome Completo';
    const cargo = d.cargo || 'Cargo / Profissão';
    const email = d.email || '';
    const telefone = d.telefone || '';
    const morada = d.morada || '';
    const resumo = d.resumo || '';
    const foto = d.foto || '';
    const experiencias = d.experiencias || [];
    const formacoes = d.formacoes || [];
    const competencias = d.competencias || [];
    const idiomas = d.idiomas || [];
    const cursos = d.cursos || [];
    const certificacoes = d.certificacoes || [];
    const projetos = d.projetos || [];

    const iniciais = nome.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
    function esc(s) { if (!s) return ''; const el = document.createElement('div'); el.textContent = String(s); return el.innerHTML; }

    const renderFoto = () => foto ? `<img src="${esc(foto)}" alt="${esc(nome)}">` : `<span class="cv-photo-placeholder">${esc(iniciais)}</span>`;

    const renderSkills = () => {
      const items = competencias.filter(s => s.nome);
      if (!items.length) return '<div style="color:#9ca3af;font-size:10px">Adiciona competências</div>';
      return `<div class="cv-tags">${items.map(s => {
        const nivel = parseInt(s.nivel) || 3;
        return `<span class="cv-tag level-${nivel}">${esc(s.nome)}</span>`;
      }).join('')}</div>`;
    };

    const renderIdiomas = () => {
      const items = idiomas.filter(l => l.idioma && l.idioma.trim());
      if (!items.length) return '<div style="color:#9ca3af;font-size:10px">Adiciona idiomas</div>';
      return items.map(l => `<div class="cv-idioma-item"><span class="nome">${esc(l.idioma)}</span><span class="nivel">${esc(l.nivel)}</span></div>`).join('');
    };

    const renderCursos = () => {
      if (!cursos.length) return '';
      return `<div class="cv-section"><h3><span class="sec-icon">📚</span> Cursos</h3>${cursos.map(c => `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(c.nome)}</span>${c.carga ? `<span class="cv-item-date">${esc(c.carga)}</span>` : ''}</div>${c.instituicao ? `<div class="cv-item-sub">${esc(c.instituicao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderCertificacoes = () => {
      if (!certificacoes.length) return '';
      return `<div class="cv-section"><h3><span class="sec-icon">🏅</span> Certificações</h3>${certificacoes.map(c => `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(c.nome)}</span>${c.data ? `<span class="cv-item-date">${esc(c.data)}</span>` : ''}</div>${c.entidade ? `<div class="cv-item-sub">${esc(c.entidade)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderProjetos = () => {
      if (!projetos.length) return '';
      return `<div class="cv-section"><h3><span class="sec-icon">🚀</span> Projetos</h3>${projetos.map(p => `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(p.nome)}</span>${(p.inicio||p.fim) ? `<span class="cv-item-date">${esc(p.inicio||'')} — ${esc(p.fim||'')}</span>` : ''}</div>${p.descricao ? `<div class="cv-item-desc">${esc(p.descricao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderExp = () => {
      const items = experiencias.filter(e => e.cargo);
      if (!items.length) return '';
      return `<div class="cv-section cv-full-width"><h3><span class="sec-icon">💼</span> Experiência Profissional</h3>${items.map(e => {
        const local = e.empresa ? [e.empresa] : [];
        return `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(e.cargo)}</span>${(e.inicio||e.fim) ? `<span class="cv-item-date">${esc(e.inicio||'')} — ${esc(e.fim||'')}</span>` : ''}</div>${local.length ? `<div class="cv-item-sub">${esc(local.join(', '))}</div>` : ''}${e.descricao ? `<div class="cv-item-desc">${esc(e.descricao)}</div>` : ''}${e.responsabilidades ? `<div style="font-size:11px;color:#a78bfa;margin-top:3px;font-style:italic">${esc(e.responsabilidades)}</div>` : ''}${e.conquistas ? `<div style="font-size:11px;color:#7c3aed;margin-top:2px">${esc(e.conquistas)}</div>` : ''}</div>`;
      }).join('')}</div>`;
    };

    const renderForm = () => {
      const items = formacoes.filter(f => f.curso);
      if (!items.length) return '';
      return `<div class="cv-section"><h3><span class="sec-icon">🎓</span> Formação</h3>${items.map(f => `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(f.curso)}</span>${(f.inicio||f.fim) ? `<span class="cv-item-date">${esc(f.inicio||'')} — ${esc(f.fim||'')}</span>` : ''}</div>${f.instituicao ? `<div class="cv-item-sub">${esc(f.instituicao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const contactParts = [];
    if (email) contactParts.push(email);
    if (telefone) contactParts.push(telefone);
    if (morada) contactParts.push(morada);

    const hasContent = experiencias.filter(e => e.cargo).length > 0 || formacoes.filter(f => f.curso).length > 0;

    return `<div class="cv-modelo criativo"><div class="cv-top-banner"><div class="cv-photo">${renderFoto()}</div><div class="cv-name-area"><div class="cv-name">${esc(nome)}</div><div class="cv-title">${esc(cargo)}</div>${contactParts.length ? `<div class="cv-contact-icons">${contactParts.map(c => `<span>${esc(c)}</span>`).join('')}</div>` : ''}</div></div><div class="cv-body">${resumo ? `<div class="cv-section cv-full-width"><h3><span class="sec-icon">📝</span> Sobre</h3><div class="cv-resumo">${esc(resumo)}</div></div>` : ''}${renderExp()}<div class="cv-section"><h3><span class="sec-icon">⚡</span> Competências</h3>${renderSkills()}</div><div class="cv-section"><h3><span class="sec-icon">🌍</span> Idiomas</h3>${renderIdiomas()}</div>${renderForm()}${renderCursos()}${renderCertificacoes()}${renderProjetos()}${!hasContent ? '<div class="cv-full-width" style="text-align:center;color:#9ca3af;padding:40px 0;font-style:italic">Preenche o teu currículo para veres o resultado aqui</div>' : ''}</div></div>`;
  }
});
