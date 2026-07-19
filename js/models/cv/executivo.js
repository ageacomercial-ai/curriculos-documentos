ModelRegistry.register('cv', 'executivo', {
  name: 'Executivo',
  description: 'Sóbrio e formal, verde escuro com detalhes champagne',
  thumbnail: '👔',
  cssFile: 'css/models/executivo.css',
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

    const iniciais = nome.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
    function esc(s) { if (!s) return ''; const el = document.createElement('div'); el.textContent = String(s); return el.innerHTML; }

    const renderFoto = () => foto ? `<img src="${esc(foto)}" alt="${esc(nome)}">` : `<span class="cv-photo-placeholder">${esc(iniciais)}</span>`;

    const renderSkills = () => {
      const items = competencias.filter(s => s.nome);
      if (!items.length) return '<div class="cv-skill"><span class="cv-skill-name" style="opacity:0.4">Adiciona competências</span></div>';
      return items.map(s => {
        const niveis = ['', 'Iniciante', 'Básico', 'Inter.', 'Avançado', 'Expert'];
        const nivel = parseInt(s.nivel) || 3;
        return `<div class="cv-skill"><span class="cv-skill-name">${esc(s.nome)}</span><span class="cv-skill-level">${niveis[nivel] || ''}</span></div>`;
      }).join('');
    };

    const renderIdiomas = () => {
      const items = idiomas.filter(l => l.idioma);
      if (!items.length) return '<div class="cv-idioma"><span class="cv-idioma-nome" style="opacity:0.4">Adiciona idiomas</span></div>';
      return items.map(l => `<div class="cv-idioma"><span class="cv-idioma-nome">${esc(l.idioma)}</span><span class="cv-idioma-nivel">${esc(l.nivel)}</span></div>`).join('');
    };

    const renderExp = () => {
      const items = experiencias.filter(e => e.cargo);
      if (!items.length) return '';
      return `<div class="cv-main-section"><h3>Experiência Profissional</h3>${items.map(e => `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(e.cargo)}</span>${(e.inicio||e.fim) ? `<span class="cv-item-date">${esc(e.inicio||'')} — ${esc(e.fim||'')}</span>` : ''}</div>${e.empresa ? `<div class="cv-item-sub">${esc(e.empresa)}</div>` : ''}${e.descricao ? `<div class="cv-item-desc">${esc(e.descricao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderForm = () => {
      const items = formacoes.filter(f => f.curso);
      if (!items.length) return '';
      return `<div class="cv-main-section"><h3>Formação Académica</h3>${items.map(f => `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(f.curso)}</span>${(f.inicio||f.fim) ? `<span class="cv-item-date">${esc(f.inicio||'')} — ${esc(f.fim||'')}</span>` : ''}</div>${f.instituicao ? `<div class="cv-item-sub">${esc(f.instituicao)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const contactItems = [];
    if (email) contactItems.push(email);
    if (telefone) contactItems.push(telefone);
    if (morada) contactItems.push(morada);
    if (social) contactItems.push(social);

    const hasContent = experiencias.filter(e => e.cargo).length > 0 || formacoes.filter(f => f.curso).length > 0;

    return `<div class="cv-modelo executivo"><div class="cv-sidebar"><div><div class="cv-photo">${renderFoto()}</div></div><div class="cv-sidebar-section"><h3>Contacto</h3>${contactItems.map(c => `<div class="contact-item"><span>${esc(c)}</span></div>`).join('') || '<div class="contact-item" style="opacity:0.4">Sem dados</div>'}</div><div class="cv-sidebar-section"><h3>Competências</h3>${renderSkills()}</div><div class="cv-sidebar-section"><h3>Idiomas</h3>${renderIdiomas()}</div></div><div class="cv-main"><div><div class="cv-name">${esc(nome)}</div><div class="cv-title">${esc(cargo)}</div></div>${resumo ? `<div class="cv-resumo">${esc(resumo)}</div>` : ''}${renderExp()}${renderForm()}${!hasContent ? '<div style="text-align:center;color:#ccc;padding:40px 0;font-style:italic">Preenche o teu currículo para veres o resultado aqui</div>' : ''}</div></div>`;
  }
});
