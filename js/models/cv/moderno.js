ModelRegistry.register('cv', 'moderno', {
  name: 'Moderno',
  description: 'Limpado e fresco, com cabeçalho em teal e uma coluna única',
  thumbnail: '🌿',
  cssFile: 'css/models/moderno.css',
  render: function(d) {
    d = d || {};
    const nome = d.nome || 'Nome Completo';
    const cargo = d.cargo || 'Cargo / Profissão';
    const email = d.email || '';
    const telefone = d.telefone || '';
    const morada = d.morada || '';
    const resumo = d.resumo || '';
    const experiencias = d.experiencias || [];
    const formacoes = d.formacoes || [];
    const competencias = d.competencias || [];
    const idiomas = d.idiomas || [];
    const cursos = d.cursos || [];
    const certificacoes = d.certificacoes || [];
    const projetos = d.projetos || [];

    function esc(s) { if (!s) return ''; const el = document.createElement('div'); el.textContent = String(s); return el.innerHTML; }

    const renderSkills = () => {
      const items = competencias.filter(s => s.nome);
      if (!items.length) return '<div style="color:#94a3b8;font-size:10px">Adiciona competências</div>';
      return `<div class="cv-skills-progress">${items.map(s => {
        const nivel = parseInt(s.nivel) || 3;
        const pct = (nivel / 5) * 100;
        return `<div class="cv-skill-prog-row"><span class="cv-skill-prog-name">${esc(s.nome)}</span><div class="cv-skill-prog-track"><div class="cv-skill-prog-fill" style="width:${pct}%"></div></div></div>`;
      }).join('')}</div>`;
    };

    const renderIdiomas = () => {
      const items = idiomas.filter(l => l.idioma && l.idioma.trim());
      if (!items.length) return '<div style="color:#94a3b8;font-size:10px">Adiciona idiomas</div>';
      return items.map(l => `<div class="cv-idioma-row"><span class="cv-idioma-nome">${esc(l.idioma)}</span><span class="cv-idioma-nivel">${esc(l.nivel)}</span></div>`).join('');
    };

    const renderExp = () => {
      const items = experiencias.filter(e => e.cargo);
      if (!items.length) return '';
      return `<div class="cv-section"><h3>Experiência Profissional</h3>${items.map(e => {
        const local = e.empresa ? [e.empresa] : [];
        return `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(e.cargo)}</span>${(e.inicio||e.fim) ? `<span class="cv-item-date">${esc(e.inicio||'')} — ${esc(e.fim||'')}</span>` : ''}</div>${local.length ? `<div class="cv-item-sub">${esc(local.join(', '))}</div>` : ''}${e.descricao ? `<div class="cv-item-desc">${esc(e.descricao)}</div>` : ''}${e.responsabilidades ? `<div style="font-size:11px;color:#475569;margin-top:4px;font-style:italic">${esc(e.responsabilidades)}</div>` : ''}${e.conquistas ? `<div style="font-size:11px;color:#059669;margin-top:2px">${esc(e.conquistas)}</div>` : ''}</div>`;
      }).join('')}</div>`;
    };

    const renderCursos = () => {
      const items = cursos.filter(c => c.nome);
      if (!items.length) return '';
      return `<div class="cv-section"><h3>Cursos</h3>${items.map(c => `<div style="margin-bottom:6px"><div style="font-weight:600;font-size:12px">${esc(c.nome)}</div>${c.instituicao ? `<div style="font-size:11px;color:#64748b">${esc(c.instituicao)}${c.ano ? ' — '+esc(c.ano) : ''}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderCertificacoes = () => {
      const items = certificacoes.filter(c => c.nome);
      if (!items.length) return '';
      return `<div class="cv-section"><h3>Certificações</h3>${items.map(c => `<div style="margin-bottom:6px"><div style="font-weight:600;font-size:12px">${esc(c.nome)}</div>${c.instituicao ? `<div style="font-size:11px;color:#64748b">${esc(c.instituicao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderProjetos = () => {
      const items = projetos.filter(p => p.nome);
      if (!items.length) return '';
      return `<div class="cv-section"><h3>Projetos</h3>${items.map(p => `<div style="margin-bottom:8px"><div style="font-weight:600;font-size:12px">${esc(p.nome)}</div>${p.descricao ? `<div style="font-size:11px;color:#475569;margin-top:2px">${esc(p.descricao)}</div>` : ''}${p.tecnologias ? `<div style="font-size:10px;color:#3b82f6;margin-top:2px">${esc(p.tecnologias)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderForm = () => {
      const items = formacoes.filter(f => f.curso);
      if (!items.length) return '';
      return `<div class="cv-section"><h3>Formação Académica</h3>${items.map(f => `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(f.curso)}</span>${(f.inicio||f.fim) ? `<span class="cv-item-date">${esc(f.inicio||'')} — ${esc(f.fim||'')}</span>` : ''}</div>${f.instituicao ? `<div class="cv-item-sub">${esc(f.instituicao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const contactParts = [];
    if (email) contactParts.push(email);
    if (telefone) contactParts.push(telefone);
    if (morada) contactParts.push(morada);

    const hasContent = experiencias.filter(e => e.cargo).length > 0 || formacoes.filter(f => f.curso).length > 0;

    return `<div class="cv-modelo moderno"><div class="cv-header-bar"><div class="cv-name">${esc(nome)}</div><div class="cv-title">${esc(cargo)}</div>${contactParts.length ? `<div class="cv-contacto-top">${contactParts.map(c => `<span>${esc(c)}</span>`).join('')}</div>` : ''}</div><div class="cv-body">${resumo ? `<div class="cv-section"><h3>Sobre</h3><div class="cv-resumo">${esc(resumo)}</div></div>` : ''}${renderExp()}${renderForm()}<div class="cv-section"><h3>Competências</h3>${renderSkills()}</div><div class="cv-section"><h3>Idiomas</h3>${renderIdiomas()}</div>${renderCursos()}${renderCertificacoes()}${renderProjetos()}${!hasContent ? '<div style="text-align:center;color:#94a3b8;padding:40px 0;font-style:italic">Preenche o teu currículo para veres o resultado aqui</div>' : ''}</div></div>`;
  }
});
