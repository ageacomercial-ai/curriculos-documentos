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
    const cursos = d.cursos || [];
    const certificacoes = d.certificacoes || [];
    const projetos = d.projetos || [];

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
      const items = idiomas.filter(l => l.idioma && l.idioma.trim());
      if (!items.length) return '<div class="cv-idioma"><span class="cv-idioma-nome" style="opacity:0.4">Adiciona idiomas</span></div>';
      return items.map(l => `<div class="cv-idioma"><span class="cv-idioma-nome">${esc(l.idioma)}</span><span class="cv-idioma-nivel">${esc(l.nivel)}</span></div>`).join('');
    };

    const renderCursos = () => {
      const items = cursos.filter(c => c.nome);
      if (!items.length) return '';
      return `<div class="cv-sidebar-section"><h3>Cursos</h3>${items.map(c => `<div class="contact-item"><span style="font-size:10px">${esc(c.nome)}${c.instituicao ? ' — '+esc(c.instituicao) : ''}</span></div>`).join('')}</div>`;
    };

    const renderCertificacoes = () => {
      const items = certificacoes.filter(c => c.nome);
      if (!items.length) return '';
      return `<div class="cv-sidebar-section"><h3>Certificações</h3>${items.map(c => `<div class="contact-item"><span style="font-size:10px">${esc(c.nome)}${c.instituicao ? ' — '+esc(c.instituicao) : ''}</span></div>`).join('')}</div>`;
    };

    const renderProjetos = () => {
      const items = projetos.filter(p => p.nome);
      if (!items.length) return '';
      return `<div class="cv-item" style="margin-top:12px"><h3>Projetos</h3>${items.map(p => `<div style="margin-top:8px"><div style="font-weight:600;font-size:12px">${esc(p.nome)}</div>${p.descricao ? `<div style="font-size:11px;color:#555;margin-top:2px">${esc(p.descricao)}</div>` : ''}${p.tecnologias ? `<div style="font-size:10px;color:#666;margin-top:2px">${esc(p.tecnologias)}</div>` : ''}</div>`).join('')}</div>`;
    };

    const renderExp = () => {
      const items = experiencias.filter(e => e.cargo);
      if (!items.length) return '';
      return `<div class="cv-main-section"><h3>Experiência Profissional</h3>${items.map(e => `<div class="cv-item"><div class="cv-item-header"><span class="cv-item-title">${esc(e.cargo)}</span>${(e.inicio||e.fim) ? `<span class="cv-item-date">${esc(e.inicio||'')} — ${esc(e.fim||'')}</span>` : ''}</div>${e.empresa ? `<div class="cv-item-sub">${esc(e.empresa)}</div>` : ''}${e.descricao ? `<div class="cv-item-desc">${esc(e.descricao)}</div>` : ''}${e.responsabilidades ? `<div style="font-size:11px;color:#555;margin-top:3px;font-style:italic">${esc(e.responsabilidades)}</div>` : ''}${e.conquistas ? `<div style="font-size:11px;color:#8b7355;margin-top:2px">${esc(e.conquistas)}</div>` : ''}</div>`).join('')}</div>`;
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

    return `<div class="cv-modelo executivo"><div class="cv-sidebar"><div><div class="cv-photo">${renderFoto()}</div></div><div class="cv-sidebar-section"><h3>Contacto</h3>${contactItems.map(c => `<div class="contact-item"><span>${esc(c)}</span></div>`).join('') || '<div class="contact-item" style="opacity:0.4">Sem dados</div>'}</div><div class="cv-sidebar-section"><h3>Competências</h3>${renderSkills()}</div><div class="cv-sidebar-section"><h3>Idiomas</h3>${renderIdiomas()}</div>${renderCursos()}${renderCertificacoes()}</div><div class="cv-main"><div><div class="cv-name">${esc(nome)}</div><div class="cv-title">${esc(cargo)}</div></div>${resumo ? `<div class="cv-resumo">${esc(resumo)}</div>` : ''}${renderExp()}${renderForm()}${renderProjetos()}${!hasContent ? '<div style="text-align:center;color:#ccc;padding:40px 0;font-style:italic">Preenche o teu currículo para veres o resultado aqui</div>' : ''}</div></div>`;
  }
});
