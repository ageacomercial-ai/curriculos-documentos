import { DadosCV } from '../types/cv'

interface Props {
  dados: DadosCV
  template: string
  onBack: () => void
}

function TemplateModerno({ dados }: { dados: DadosCV }) {
  return (
    <div className="cv-page cv-moderno">
      <div className="cv-header">
        <h1>{dados.nome || 'Seu Nome'}</h1>
        <div className="cargo">{dados.cargo || 'Cargo Desejado'}</div>
        <div style={{ marginTop: 12, opacity: 0.85, fontSize: '0.9rem' }}>
          {dados.email && <span>{dados.email}  |  </span>}
          {dados.telefone && <span>{dados.telefone}  |  </span>}
          {dados.endereco && <span>{dados.endereco}</span>}
          {dados.site && <span>  |  {dados.site}</span>}
        </div>
      </div>
      <div className="cv-body">
        {dados.resumo && (
          <section style={{ marginBottom: 24 }}>
            <h2 className="section-title">Resumo</h2>
            <p>{dados.resumo}</p>
          </section>
        )}
        {dados.experiencia.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2 className="section-title">Experiência</h2>
            {dados.experiencia.map((exp, i) => (
              <div key={i} className="entry">
                <h3>{exp.cargo}</h3>
                <div className="sub">{exp.empresa}</div>
                <div className="date">{exp.inicio} - {exp.fim || 'Atual'}</div>
                {exp.descricao && <p>{exp.descricao}</p>}
              </div>
            ))}
          </section>
        )}
        {dados.educacao.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2 className="section-title">Formação</h2>
            {dados.educacao.map((edu, i) => (
              <div key={i} className="entry">
                <h3>{edu.curso}</h3>
                <div className="sub">{edu.instituicao}</div>
                <div className="date">{edu.nivel} - {edu.fim}</div>
              </div>
            ))}
          </section>
        )}
        <div style={{ display: 'flex', gap: 40 }}>
          {dados.habilidades.length > 0 && (
            <section style={{ flex: 1 }}>
              <h2 className="section-title">Habilidades</h2>
              {dados.habilidades.map((h, i) => <span key={i} className="tag">{h}</span>)}
            </section>
          )}
          {dados.idiomas.length > 0 && (
            <section style={{ flex: 1 }}>
              <h2 className="section-title">Idiomas</h2>
              {dados.idiomas.map((idi, i) => (
                <div key={i} style={{ marginBottom: 4 }}>{idi.lingua} - {idi.nivel}</div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

function TemplateClassico({ dados }: { dados: DadosCV }) {
  return (
    <div className="cv-page cv-classico">
      <div className="cv-header">
        <h1>{dados.nome || 'Seu Nome'}</h1>
        <div style={{ fontSize: '1.1rem', marginTop: 8, fontStyle: 'italic' }}>{dados.cargo}</div>
        <div style={{ marginTop: 12, fontSize: '0.85rem', color: '#666' }}>
          {[dados.email, dados.telefone, dados.endereco, dados.site].filter(Boolean).join('  |  ')}
        </div>
      </div>
      <div className="cv-body">
        {dados.resumo && (
          <section style={{ marginBottom: 24 }}>
            <h2 className="section-title">Resumo</h2>
            <p>{dados.resumo}</p>
          </section>
        )}
        {dados.experiencia.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2 className="section-title">Experiência</h2>
            {dados.experiencia.map((exp, i) => (
              <div key={i} className="entry">
                <h3>{exp.cargo}</h3>
                <div className="sub">{exp.empresa}</div>
                <div className="date">{exp.inicio} - {exp.fim || 'Atual'}</div>
                {exp.descricao && <p>{exp.descricao}</p>}
              </div>
            ))}
          </section>
        )}
        {dados.educacao.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2 className="section-title">Formação</h2>
            {dados.educacao.map((edu, i) => (
              <div key={i} className="entry">
                <h3>{edu.curso}</h3>
                <div className="sub">{edu.instituicao}</div>
                <div className="date">{edu.nivel} - {edu.fim}</div>
              </div>
            ))}
          </section>
        )}
        <div style={{ display: 'flex', gap: 40 }}>
          {dados.habilidades.length > 0 && (
            <section style={{ flex: 1 }}>
              <h2 className="section-title">Habilidades</h2>
              {dados.habilidades.map((h, i) => <span key={i} className="tag">{h}</span>)}
            </section>
          )}
          {dados.idiomas.length > 0 && (
            <section style={{ flex: 1 }}>
              <h2 className="section-title">Idiomas</h2>
              {dados.idiomas.map((idi, i) => (
                <div key={i} style={{ marginBottom: 4 }}>{idi.lingua} - {idi.nivel}</div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

function TemplateMinimalista({ dados }: { dados: DadosCV }) {
  return (
    <div className="cv-page cv-minimalista">
      <div className="cv-header">
        <h1>{dados.nome || 'Seu Nome'}</h1>
        <div style={{ marginTop: 4, color: '#666' }}>{dados.cargo}</div>
        <div style={{ marginTop: 8, fontSize: '0.85rem', color: '#888' }}>
          {[dados.email, dados.telefone, dados.endereco, dados.site].filter(Boolean).join('  ·  ')}
        </div>
      </div>
      <div className="cv-body">
        {dados.resumo && (
          <section style={{ marginBottom: 24 }}>
            <h2 className="section-title">Resumo</h2>
            <p>{dados.resumo}</p>
          </section>
        )}
        {dados.experiencia.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2 className="section-title">Experiência</h2>
            {dados.experiencia.map((exp, i) => (
              <div key={i} className="entry">
                <h3>{exp.cargo}</h3>
                <div className="sub">{exp.empresa}</div>
                <div className="date">{exp.inicio} - {exp.fim || 'Atual'}</div>
                {exp.descricao && <p>{exp.descricao}</p>}
              </div>
            ))}
          </section>
        )}
        {dados.educacao.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2 className="section-title">Formação</h2>
            {dados.educacao.map((edu, i) => (
              <div key={i} className="entry">
                <h3>{edu.curso}</h3>
                <div className="sub">{edu.instituicao}</div>
                <div className="date">{edu.nivel} - {edu.fim}</div>
              </div>
            ))}
          </section>
        )}
        <div style={{ display: 'flex', gap: 40 }}>
          {dados.habilidades.length > 0 && (
            <section style={{ flex: 1 }}>
              <h2 className="section-title">Habilidades</h2>
              {dados.habilidades.map((h, i) => <span key={i} className="tag">{h}</span>)}
            </section>
          )}
          {dados.idiomas.length > 0 && (
            <section style={{ flex: 1 }}>
              <h2 className="section-title">Idiomas</h2>
              {dados.idiomas.map((idi, i) => (
                <div key={i} style={{ marginBottom: 4 }}>{idi.lingua} - {idi.nivel}</div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CVPreview({ dados, template, onBack }: Props) {
  const renderTemplate = () => {
    switch (template) {
      case 'classico': return <TemplateClassico dados={dados} />
      case 'minimalista': return <TemplateMinimalista dados={dados} />
      default: return <TemplateModerno dados={dados} />
    }
  }

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: 16 }}>
        <button className="btn btn-secondary" onClick={onBack}>← Voltar ao Editor</button>
        <button className="btn btn-success" onClick={() => window.print()}>🖨️ Exportar / Imprimir</button>
      </div>
      {renderTemplate()}
    </div>
  )
}
