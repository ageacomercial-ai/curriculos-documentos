import { DadosCV } from '../types/cv'
import { templates } from '../data/templates'

interface Props { dados: DadosCV }

function InfoLinha({ dados }: { dados: DadosCV }) {
  const parts = [dados.email, dados.telefone, dados.endereco, dados.linkedin, dados.site].filter(Boolean)
  if (parts.length === 0) return null
  return (
    <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.6 }}>
      {parts.join(' · ')}
    </div>
  )
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  if (!children || (Array.isArray(children) && children.length === 0)) return null
  return (
    <section style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, color: '#6366f1', marginBottom: 8, paddingBottom: 4, borderBottom: '2px solid #6366f1' }}>{titulo}</h2>
      {children}
    </section>
  )
}

function Moderno({ d }: { d: DadosCV }) {
  return (
    <div className="cv-page cv-moderno">
      <div className="cv-header">
        <h1>{d.nome || 'Seu Nome'}</h1>
        <div className="cargo">{d.cargo || 'Cargo'}</div>
        <InfoLinha dados={d} />
      </div>
      <div className="cv-body">
        {d.resumo && <Secao titulo="Resumo"><p style={{ fontSize: 13, color: '#475569' }}>{d.resumo}</p></Secao>}
        {d.experiencia.length > 0 && (
          <Secao titulo="Experiência">
            {d.experiencia.map((e, i) => (
              <div key={i} className="entry">
                <h3>{e.cargo}</h3>
                <div className="sub">{e.empresa}</div>
                <div className="date">{e.inicio} - {e.atual ? 'Atual' : e.fim}</div>
                {e.descricao && <p style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>{e.descricao}</p>}
              </div>
            ))}
          </Secao>
        )}
        {d.educacao.length > 0 && (
          <Secao titulo="Formação">
            {d.educacao.map((e, i) => (
              <div key={i} className="entry">
                <h3>{e.curso}</h3>
                <div className="sub">{e.instituicao}</div>
                <div className="date">{e.nivel} · {e.fim}</div>
              </div>
            ))}
          </Secao>
        )}
        <div style={{ display: 'flex', gap: 16 }}>
          {d.habilidades.length > 0 && (
            <Secao titulo="Habilidades">
              <div>{d.habilidades.map((h, i) => <span key={i} className="tag">{h}</span>)}</div>
            </Secao>
          )}
          {d.idiomas.length > 0 && (
            <Secao titulo="Idiomas">
              {d.idiomas.map((idi, i) => <div key={i} style={{ fontSize: 13, marginBottom: 2 }}>{idi.lingua} — {idi.nivel}</div>)}
            </Secao>
          )}
        </div>
      </div>
    </div>
  )
}

function Classico({ d }: { d: DadosCV }) {
  return (
    <div className="cv-page cv-classico">
      <div className="cv-header">
        <h1>{d.nome || 'Seu Nome'}</h1>
        <div style={{ fontSize: 14, marginTop: 4, fontStyle: 'italic', color: '#475569' }}>{d.cargo}</div>
        <InfoLinha dados={d} />
      </div>
      <div className="cv-body">
        {d.resumo && <Secao titulo="Resumo"><p style={{ fontSize: 13, color: '#475569' }}>{d.resumo}</p></Secao>}
        {d.experiencia.length > 0 && (
          <Secao titulo="Experiência">
            {d.experiencia.map((e, i) => (
              <div key={i} className="entry"><h3>{e.cargo}</h3><div className="sub">{e.empresa}</div><div className="date">{e.inicio} - {e.atual ? 'Atual' : e.fim}</div>{e.descricao && <p style={{ fontSize: 13, marginTop: 4, color: '#475569' }}>{e.descricao}</p>}</div>
            ))}
          </Secao>
        )}
        {d.educacao.length > 0 && (
          <Secao titulo="Formação">
            {d.educacao.map((e, i) => (<div key={i} className="entry"><h3>{e.curso}</h3><div className="sub">{e.instituicao}</div><div className="date">{e.nivel} · {e.fim}</div></div>))}
          </Secao>
        )}
        <div style={{ display: 'flex', gap: 16 }}>
          {d.habilidades.length > 0 && <Secao titulo="Habilidades"><div>{d.habilidades.map((h, i) => <span key={i} className="tag">{h}</span>)}</div></Secao>}
          {d.idiomas.length > 0 && <Secao titulo="Idiomas">{d.idiomas.map((idi, i) => <div key={i} style={{ fontSize: 13, marginBottom: 2 }}>{idi.lingua} — {idi.nivel}</div>)}</Secao>}
        </div>
      </div>
    </div>
  )
}

function Minimalista({ d }: { d: DadosCV }) {
  return (
    <div className="cv-page cv-minimalista">
      <div className="cv-header">
        <h1>{d.nome || 'Seu Nome'}</h1>
        <div style={{ color: '#64748b', fontSize: 14, marginTop: 2 }}>{d.cargo}</div>
        <InfoLinha dados={d} />
      </div>
      <div className="cv-body">
        {d.resumo && <Secao titulo="Resumo"><p style={{ fontSize: 13, color: '#475569' }}>{d.resumo}</p></Secao>}
        {d.experiencia.length > 0 && (
          <Secao titulo="Experiência">
            {d.experiencia.map((e, i) => (<div key={i} className="entry"><h3>{e.cargo}</h3><div className="sub">{e.empresa}</div><div className="date">{e.inicio} - {e.atual ? 'Atual' : e.fim}</div>{e.descricao && <p style={{ fontSize: 13, marginTop: 4, color: '#475569' }}>{e.descricao}</p>}</div>))}
          </Secao>
        )}
        {d.educacao.length > 0 && (
          <Secao titulo="Formação">
            {d.educacao.map((e, i) => (<div key={i} className="entry"><h3>{e.curso}</h3><div className="sub">{e.instituicao}</div><div className="date">{e.nivel} · {e.fim}</div></div>))}
          </Secao>
        )}
        <div style={{ display: 'flex', gap: 16 }}>
          {d.habilidades.length > 0 && <Secao titulo="Habilidades"><div>{d.habilidades.map((h, i) => <span key={i} className="tag">{h}</span>)}</div></Secao>}
          {d.idiomas.length > 0 && <Secao titulo="Idiomas">{d.idiomas.map((idi, i) => <div key={i} style={{ fontSize: 13, marginBottom: 2 }}>{idi.lingua} — {idi.nivel}</div>)}</Secao>}
        </div>
      </div>
    </div>
  )
}

function Profissional({ d }: { d: DadosCV }) {
  return (
    <div className="cv-page cv-profissional">
      <div className="cv-header">
        <h1>{d.nome || 'Seu Nome'}</h1>
        <div style={{ fontSize: 14, opacity: .9 }}>{d.cargo}</div>
        <InfoLinha dados={d} />
      </div>
      <div className="cv-body">
        {d.resumo && <Secao titulo="Resumo"><p style={{ fontSize: 13, color: '#475569' }}>{d.resumo}</p></Secao>}
        {d.experiencia.length > 0 && (
          <Secao titulo="Experiência">
            {d.experiencia.map((e, i) => (<div key={i} className="entry"><h3>{e.cargo}</h3><div className="sub">{e.empresa}</div><div className="date">{e.inicio} - {e.atual ? 'Atual' : e.fim}</div>{e.descricao && <p style={{ fontSize: 13, marginTop: 4, color: '#475569' }}>{e.descricao}</p>}</div>))}
          </Secao>
        )}
        {d.educacao.length > 0 && (
          <Secao titulo="Formação">
            {d.educacao.map((e, i) => (<div key={i} className="entry"><h3>{e.curso}</h3><div className="sub">{e.instituicao}</div><div className="date">{e.nivel} · {e.fim}</div></div>))}
          </Secao>
        )}
        <div style={{ display: 'flex', gap: 16 }}>
          {d.habilidades.length > 0 && <Secao titulo="Habilidades"><div>{d.habilidades.map((h, i) => <span key={i} className="tag">{h}</span>)}</div></Secao>}
          {d.idiomas.length > 0 && <Secao titulo="Idiomas">{d.idiomas.map((idi, i) => <div key={i} style={{ fontSize: 13, marginBottom: 2 }}>{idi.lingua} — {idi.nivel}</div>)}</Secao>}
        </div>
      </div>
    </div>
  )
}

function Criativo({ d }: { d: DadosCV }) {
  return (
    <div className="cv-page cv-criativo">
      <div className="cv-header">
        <h1>{d.nome || 'Seu Nome'}</h1>
        <div style={{ fontSize: 14, opacity: .9 }}>{d.cargo}</div>
        <InfoLinha dados={d} />
      </div>
      <div className="cv-body">
        {d.resumo && <Secao titulo="Resumo"><p style={{ fontSize: 13, color: '#475569' }}>{d.resumo}</p></Secao>}
        {d.experiencia.length > 0 && (
          <Secao titulo="Experiência">
            {d.experiencia.map((e, i) => (<div key={i} className="entry"><h3>{e.cargo}</h3><div className="sub">{e.empresa}</div><div className="date">{e.inicio} - {e.atual ? 'Atual' : e.fim}</div>{e.descricao && <p style={{ fontSize: 13, marginTop: 4, color: '#475569' }}>{e.descricao}</p>}</div>))}
          </Secao>
        )}
        {d.educacao.length > 0 && (
          <Secao titulo="Formação">
            {d.educacao.map((e, i) => (<div key={i} className="entry"><h3>{e.curso}</h3><div className="sub">{e.instituicao}</div><div className="date">{e.nivel} · {e.fim}</div></div>))}
          </Secao>
        )}
        <div style={{ display: 'flex', gap: 16 }}>
          {d.habilidades.length > 0 && <Secao titulo="Habilidades"><div>{d.habilidades.map((h, i) => <span key={i} className="tag">{h}</span>)}</div></Secao>}
          {d.idiomas.length > 0 && <Secao titulo="Idiomas">{d.idiomas.map((idi, i) => <div key={i} style={{ fontSize: 13, marginBottom: 2 }}>{idi.lingua} — {idi.nivel}</div>)}</Secao>}
        </div>
      </div>
    </div>
  )
}

export default function Preview({ dados }: Props) {
  const t = templates.find(t => t.id === dados.template)
  const Renderer = dados.template === 'classico' ? Classico : dados.template === 'minimalista' ? Minimalista : dados.template === 'profissional' ? Profissional : dados.template === 'criativo' ? Criativo : Moderno

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: t?.cor || '#6366f1' }} />
        <span style={{ fontSize: 14, fontWeight: 600 }}>{t?.nome || 'Moderno'}</span>
      </div>
      <Renderer d={dados} />
    </div>
  )
}
