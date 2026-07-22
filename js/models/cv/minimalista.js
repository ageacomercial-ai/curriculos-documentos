ModelRegistry.register('cv', 'minimalista', {
  name: 'Minimalista',
  description: 'Limpo e arejado, tipografia leve e muito espaço branco',
  thumbnail: '◇',
  cssFile: 'css/models/minimalista.css',
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
      if (!items.length) return '<div style="color:#d1d5db;font-size:9px">Adiciona competências</div>';
      return `<div class="cv-mskills">${items.map(s => `<span class="cv-mskill">${esc(s.nome)}</span>`).join('')}</div>`;
    };

    const renderIdiomas = () => {
      const items = idiomas.filter(l => l.idioma && l.idioma.trim());
      if (!items.length) return '<div style="color:#d1d5db;font-size:9px">Adiciona idiomas</div>';
      return `<div class="cv-midiomas">${items.map(l => `<span class="cv-midioma"><strong>${esc(l.idioma)}</strong> — ${esc(l.nivel)}</span>`).join('')}</div>`;
    };

    const renderCursos = () => {
      if (!cursos.length) return '';
      return `<div class="cv-msection"><h3>Cursos</h3>${cursos.map(c => `<div class="cv-mitem"><div class="cv-mitem-header"><span class="cv-mitem-title">${esc(c.nome)}</span>${c.carga ? `<span class="cv-mitem-date">${esc(c.carga)}</span>` : ''}</div>${c.instituicao ? `<div class="cv-mitem-sub">${esc(c.instituicao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderCertificacoes = () => {
      if (!certificacoes.length) return '';
      return `<div class="cv-msection"><h3>Certificações</h3>${certificacoes.map(c => `<div class="cv-mitem"><div class="cv-mitem-header"><span class="cv-mitem-title">${esc(c.nome)}</span>${c.data ? `<span class="cv-mitem-date">${esc(c.data)}</span>` : ''}</div>${c.entidade ? `<div class="cv-mitem-sub">${esc(c.entidade)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderProjetos = () => {
      if (!projetos.length) return '';
      return `<div class="cv-msection"><h3>Projetos</h3>${projetos.map(p => `<div class="cv-mitem"><div class="cv-mitem-header"><span class="cv-mitem-title">${esc(p.nome)}</span>${(p.inicio||p.fim) ? `<span class="cv-mitem-date">${esc(p.inicio||'')} — ${esc(p.fim||'')}</span>` : ''}</div>${p.descricao ? `<div class="cv-mitem-desc">${esc(p.descricao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderExp = () => {
      const items = experiencias.filter(e => e.cargo);
      if (!items.length) return '';
      return `<div class="cv-msection"><h3>Experiência</h3>${items.map(e => {
        const local = e.empresa ? [e.empresa] : [];
        return `<div class="cv-mitem"><div class="cv-mitem-header"><span class="cv-mitem-title">${esc(e.cargo)}</span>${(e.inicio||e.fim) ? `<span class="cv-mitem-date">${esc(e.inicio||'')} — ${esc(e.fim||'')}</span>` : ''}</div>${local.length ? `<div class="cv-mitem-sub">${esc(local.join(', '))}</div>` : ''}${e.descricao ? `<div class="cv-mitem-desc">${esc(e.descricao)}</div>` : ''}${e.responsabilidades ? `<div style="font-size:11px;color:#9ca3af;margin-top:3px;font-style:italic">${esc(e.responsabilidades)}</div>` : ''}${e.conquistas ? `<div style="font-size:11px;color:#6b7280;margin-top:2px">${esc(e.conquistas)}</div>` : ''}</div>`;
      }).join('')}</div>`;
    };

    const renderForm = () => {
      const items = formacoes.filter(f => f.curso);
      if (!items.length) return '';
      return `<div class="cv-msection"><h3>Formação</h3>${items.map(f => `<div class="cv-mitem"><div class="cv-mitem-header"><span class="cv-mitem-title">${esc(f.curso)}</span>${(f.inicio||f.fim) ? `<span class="cv-mitem-date">${esc(f.inicio||'')} — ${esc(f.fim||'')}</span>` : ''}</div>${f.instituicao ? `<div class="cv-mitem-sub">${esc(f.instituicao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const contactParts = [];
    if (email) contactParts.push(`<span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> ${esc(email)}</span>`);
    if (telefone) contactParts.push(`<span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> ${esc(telefone)}</span>`);
    if (morada) contactParts.push(`<span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${esc(morada)}</span>`);

    const hasContent = experiencias.filter(e => e.cargo).length > 0 || formacoes.filter(f => f.curso).length > 0;

    return `<div class="cv-modelo minimalista"><div class="cv-mheader"><div class="cv-name">${esc(nome)}</div><div class="cv-title">${esc(cargo)}</div>${contactParts.length ? `<div class="cv-mcontacto">${contactParts.join('')}</div>` : ''}</div>${resumo ? `<div class="cv-msection"><h3>Sobre</h3><div class="cv-resumo">${esc(resumo)}</div></div>` : ''}${renderExp()}${renderForm()}<div class="cv-msection"><h3>Competências</h3>${renderSkills()}</div><div class="cv-msection"><h3>Idiomas</h3>${renderIdiomas()}</div>${renderCursos()}${renderCertificacoes()}${renderProjetos()}${!hasContent ? '<div style="text-align:center;color:#d1d5db;padding:40px 0;font-style:italic">Preenche o teu currículo para veres o resultado aqui</div>' : ''}</div>`;
  }
});
