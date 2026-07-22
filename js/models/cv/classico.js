ModelRegistry.register('cv', 'classico', {
  name: 'Clássico Premium',
  description: 'Elegante e tradicional, duas colunas com sidebar navy e detalhes dourados',
  thumbnail: '🎩',
  cssFile: 'css/models/classico.css',
  render: function(d) {
    d = d || {};
    const nome = d.nome || 'Nome Completo';
    const cargo = d.cargo || 'Cargo / Profissão';
    const email = d.email || '';
    const telefone = d.telefone || '';
    const morada = d.morada || '';
    const social = d.social || '';
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

    const renderContacto = () => {
      let h = '';
      if (email) h += `<div class="contact-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span>${esc(email)}</span></div>`;
      if (telefone) h += `<div class="contact-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>${esc(telefone)}</span></div>`;
      if (morada) h += `<div class="contact-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>${esc(morada)}</span></div>`;
      if (social) h += `<div class="contact-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>${esc(social)}</span></div>`;
      return h;
    };

    const renderSkills = () => {
      const items = competencias.filter(s => s.nome);
      if (!items.length) return '<div class="cv-skill"><span class="cv-skill-name" style="opacity:0.4">Adiciona competências</span></div>';
      return items.map(s => {
        const nivel = parseInt(s.nivel) || 3;
        const dots = Array.from({ length: 5 }, (_, i) => `<span class="cv-skill-dot ${i < nivel ? 'filled' : ''}"></span>`).join('');
        return `<div class="cv-skill"><span class="cv-skill-name">${esc(s.nome)}</span><span class="cv-skill-dots">${dots}</span></div>`;
      }).join('');
    };

    const renderIdiomas = () => {
      const items = idiomas.filter(l => l.idioma && l.idioma.trim());
      if (!items.length) return '<div class="cv-language"><span class="cv-language-name" style="opacity:0.4">Adiciona idiomas</span></div>';
      return items.map(l => `<div class="cv-language"><span class="cv-language-name">${esc(l.idioma)}</span><span class="cv-language-level">${esc(l.nivel)}</span></div>`).join('');
    };

    const renderCursos = () => {
      const items = cursos.filter(c => c.nome);
      if (!items.length) return '';
      return `<div class="cv-sidebar-section"><h3>Cursos</h3>${items.map(c => `<div class="cv-skill"><span class="cv-skill-name">${esc(c.nome)}</span>${c.instituicao ? `<div style="font-size:9px;opacity:0.7">${esc(c.instituicao)}${c.ano ? ' — '+esc(c.ano) : ''}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderCertificacoes = () => {
      const items = certificacoes.filter(c => c.nome);
      if (!items.length) return '';
      return `<div class="cv-sidebar-section"><h3>Certificações</h3>${items.map(c => `<div class="cv-skill"><span class="cv-skill-name">${esc(c.nome)}</span>${c.instituicao ? `<div style="font-size:9px;opacity:0.7">${esc(c.instituicao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderProjetos = () => {
      const items = projetos.filter(p => p.nome);
      if (!items.length) return '';
      return `<div class="cv-main-section"><h3>Projetos</h3>${items.map(p => `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(p.nome)}</span></div>${p.descricao ? `<div class="cv-item-desc">${esc(p.descricao)}</div>` : ''}${p.papel ? `<div style="font-size:11px;opacity:0.7;margin-top:2px">Papel: ${esc(p.papel)}</div>` : ''}${p.tecnologias ? `<div style="font-size:10px;color:#c9a96e;margin-top:2px">${esc(p.tecnologias)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderExp = () => {
      const items = experiencias.filter(e => e.cargo);
      if (!items.length) return '';
      return `<div class="cv-main-section"><h3>Experiência Profissional</h3>${items.map(e => {
        const local = e.empresa ? [e.empresa] : [];
        return `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(e.cargo)}</span>${(e.inicio || e.fim) ? `<span class="cv-item-date">${esc(e.inicio||'')} — ${esc(e.fim||'')}</span>` : ''}</div>${local.length ? `<div class="cv-item-sub">${esc(local.join(', '))}</div>` : ''}${e.descricao ? `<div class="cv-item-desc">${esc(e.descricao)}</div>` : ''}${e.responsabilidades ? `<div class="cv-item-desc" style="margin-top:4px;font-style:italic">Responsabilidades: ${esc(e.responsabilidades)}</div>` : ''}${e.conquistas ? `<div class="cv-item-desc" style="margin-top:2px;color:#c9a96e">Conquistas: ${esc(e.conquistas)}</div>` : ''}</div>`;
      }).join('')}</div>`;
    };

    const renderForm = () => {
      const items = formacoes.filter(f => f.curso);
      if (!items.length) return '';
      return `<div class="cv-main-section"><h3>Formação Académica</h3>${items.map(f => `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(f.curso)}</span>${(f.inicio||f.fim) ? `<span class="cv-item-date">${esc(f.inicio||'')} — ${esc(f.fim||'')}</span>` : ''}</div>${f.instituicao ? `<div class="cv-item-sub">${esc(f.instituicao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const hasContent = experiencias.filter(e => e.cargo).length > 0 || formacoes.filter(f => f.curso).length > 0;

    return `<div class="cv-modelo classico"><div class="cv-sidebar"><div><div class="cv-photo">${renderFoto()}</div></div><div class="cv-sidebar-section"><h3>Contacto</h3>${renderContacto() || '<div style="opacity:0.4;font-size:10px">Sem dados de contacto</div>'}</div><div class="cv-sidebar-section"><h3>Competências</h3>${renderSkills()}</div><div class="cv-sidebar-section"><h3>Idiomas</h3>${renderIdiomas()}</div>${renderCursos()}${renderCertificacoes()}</div><div class="cv-main"><div class="cv-header-main"><div class="cv-name">${esc(nome)}</div><div class="cv-title">${esc(cargo)}</div></div>${resumo ? `<div class="cv-resumo">${esc(resumo)}</div>` : ''}${renderExp()}${renderForm()}${renderProjetos()}${!hasContent ? '<div style="padding:20px;text-align:center;color:#ccc;font-style:italic;margin-top:20px">Preenche o teu currículo para veres o resultado aqui</div>' : ''}</div></div>`;
  }
});
