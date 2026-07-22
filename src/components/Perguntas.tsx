import { useState } from 'react'
import { DadosCV, Experiencia, Educacao, Idioma } from '../types/cv'
import { perguntas } from '../data/questions'

interface Props {
  dados: DadosCV
  onChange: (dados: DadosCV) => void
  onNext: () => void
}

type Etapa = 'basico' | 'experiencia' | 'educacao' | 'habilidades' | 'idiomas' | 'fim'

export default function Perguntas({ dados, onChange, onNext }: Props) {
  const [etapa, setEtapa] = useState<Etapa>('basico')
  const [passo, setPasso] = useState(0)
  const [inputHabilidade, setInputHabilidade] = useState('')

  const handleChange = (chave: string, valor: string) => {
    onChange({ ...dados, [chave]: valor })
  }

  const adicionarExperiencia = () => {
    onChange({
      ...dados,
      experiencia: [...dados.experiencia, { empresa: '', cargo: '', inicio: '', fim: '', descricao: '' }]
    })
  }

  const atualizarExperiencia = (i: number, campo: keyof Experiencia, valor: string) => {
    const exp = [...dados.experiencia]
    exp[i] = { ...exp[i], [campo]: valor }
    onChange({ ...dados, experiencia: exp })
  }

  const removerExperiencia = (i: number) => {
    onChange({ ...dados, experiencia: dados.experiencia.filter((_, idx) => idx !== i) })
  }

  const adicionarEducacao = () => {
    onChange({
      ...dados,
      educacao: [...dados.educacao, { instituicao: '', curso: '', nivel: '', inicio: '', fim: '' }]
    })
  }

  const atualizarEducacao = (i: number, campo: keyof Educacao, valor: string) => {
    const edu = [...dados.educacao]
    edu[i] = { ...edu[i], [campo]: valor }
    onChange({ ...dados, educacao: edu })
  }

  const removerEducacao = (i: number) => {
    onChange({ ...dados, educacao: dados.educacao.filter((_, idx) => idx !== i) })
  }

  const adicionarIdioma = () => {
    onChange({
      ...dados,
      idiomas: [...dados.idiomas, { lingua: '', nivel: 'Básico' }]
    })
  }

  const atualizarIdioma = (i: number, campo: keyof Idioma, valor: string) => {
    const idi = [...dados.idiomas]
    idi[i] = { ...idi[i], [campo]: valor as any }
    onChange({ ...dados, idiomas: idi })
  }

  const removerIdioma = (i: number) => {
    onChange({ ...dados, idiomas: dados.idiomas.filter((_, idx) => idx !== i) })
  }

  const adicionarHabilidade = (hab: string) => {
    if (!hab.trim()) return
    onChange({ ...dados, habilidades: [...dados.habilidades, hab.trim()] })
  }

  const removerHabilidade = (i: number) => {
    onChange({ ...dados, habilidades: dados.habilidades.filter((_, idx) => idx !== i) })
  }

  const renderBasico = () => {
    const p = perguntas[passo]
    if (!p) return null

    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>
          {passo + 1} / {perguntas.length}
        </div>
        <h2 style={{ marginBottom: 20 }}>{p.pergunta}</h2>
        {p.chave === 'resumo' ? (
          <textarea
            value={(dados as any)[p.chave]}
            onChange={e => handleChange(p.chave, e.target.value)}
            placeholder={p.placeholder}
            style={{ width: '100%', maxWidth: 500, padding: 12, borderRadius: 8, border: '2px solid #e0e0e0', fontSize: '1rem', minHeight: 120, fontFamily: 'inherit' }}
          />
        ) : (
          <input
            value={(dados as any)[p.chave]}
            onChange={e => handleChange(p.chave, e.target.value)}
            placeholder={p.placeholder}
            style={{ width: '100%', maxWidth: 500, padding: 12, borderRadius: 8, border: '2px solid #e0e0e0', fontSize: '1rem' }}
            onKeyDown={e => e.key === 'Enter' && setPasso(passo + 1)}
          />
        )}
        <div className="flex" style={{ justifyContent: 'center', marginTop: 24 }}>
          {passo > 0 && <button className="btn btn-secondary" onClick={() => setPasso(passo - 1)}>Voltar</button>}
          <button className="btn btn-primary" onClick={() => {
            if (passo < perguntas.length - 1) setPasso(passo + 1)
            else setEtapa('experiencia')
          }}>
            {passo < perguntas.length - 1 ? 'Próximo' : 'Experiências →'}
          </button>
        </div>
      </div>
    )
  }

  const renderExperiencia = () => (
    <div>
      <h2 className="section-title">Experiência Profissional</h2>
      {dados.experiencia.map((exp, i) => (
        <div key={i} className="card">
          <div className="flex-between" style={{ marginBottom: 12 }}>
            <strong>Experiência {i + 1}</strong>
            <button className="btn btn-danger" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => removerExperiencia(i)}>Remover</button>
          </div>
          <div className="grid-2">
            <div className="form-group"><label>Empresa</label><input value={exp.empresa} onChange={e => atualizarExperiencia(i, 'empresa', e.target.value)} /></div>
            <div className="form-group"><label>Cargo</label><input value={exp.cargo} onChange={e => atualizarExperiencia(i, 'cargo', e.target.value)} /></div>
            <div className="form-group"><label>Início</label><input type="month" value={exp.inicio} onChange={e => atualizarExperiencia(i, 'inicio', e.target.value)} /></div>
            <div className="form-group"><label>Fim</label><input type="month" value={exp.fim} onChange={e => atualizarExperiencia(i, 'fim', e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Descrição</label><textarea value={exp.descricao} onChange={e => atualizarExperiencia(i, 'descricao', e.target.value)} /></div>
        </div>
      ))}
      <div className="flex">
        <button className="btn btn-secondary" onClick={adicionarExperiencia}>+ Adicionar Experiência</button>
        <button className="btn btn-primary" onClick={() => setEtapa('educacao')}>Educação →</button>
      </div>
    </div>
  )

  const renderEducacao = () => (
    <div>
      <h2 className="section-title">Formação Acadêmica</h2>
      {dados.educacao.map((edu, i) => (
        <div key={i} className="card">
          <div className="flex-between" style={{ marginBottom: 12 }}>
            <strong>Formação {i + 1}</strong>
            <button className="btn btn-danger" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => removerEducacao(i)}>Remover</button>
          </div>
          <div className="grid-2">
            <div className="form-group"><label>Instituição</label><input value={edu.instituicao} onChange={e => atualizarEducacao(i, 'instituicao', e.target.value)} /></div>
            <div className="form-group"><label>Curso</label><input value={edu.curso} onChange={e => atualizarEducacao(i, 'curso', e.target.value)} /></div>
            <div className="form-group"><label>Nível</label><select value={edu.nivel} onChange={e => atualizarEducacao(i, 'nivel', e.target.value)}><option value="">Selecione</option><option value="Técnico">Técnico</option><option value="Graduação">Graduação</option><option value="Pós-graduação">Pós-graduação</option><option value="Mestrado">Mestrado</option><option value="Doutorado">Doutorado</option></select></div>
            <div className="form-group"><label>Término</label><input type="month" value={edu.fim} onChange={e => atualizarEducacao(i, 'fim', e.target.value)} /></div>
          </div>
        </div>
      ))}
      <div className="flex">
        <button className="btn btn-secondary" onClick={adicionarEducacao}>+ Adicionar Formação</button>
        <button className="btn btn-primary" onClick={() => setEtapa('habilidades')}>Habilidades →</button>
      </div>
    </div>
  )

  const renderHabilidades = () => (
      <div>
        <h2 className="section-title">Habilidades</h2>
        <div className="flex" style={{ marginBottom: 16 }}>
          <input
            value={inputHabilidade}
            onChange={e => setInputHabilidade(e.target.value)}
            placeholder="Digite uma habilidade e pressione Enter"
            style={{ flex: 1, padding: 10, borderRadius: 8, border: '2px solid #e0e0e0', fontSize: '1rem' }}
            onKeyDown={e => { if (e.key === 'Enter') { adicionarHabilidade(inputHabilidade); setInputHabilidade('') } }}
          />
          <button className="btn btn-primary" onClick={() => { adicionarHabilidade(inputHabilidade); setInputHabilidade('') }}>Adicionar</button>
        </div>
        <div style={{ marginBottom: 24 }}>
          {dados.habilidades.map((hab, i) => (
            <span key={i} className="tag">
              {hab}
              <span className="tag-remove" onClick={() => removerHabilidade(i)}>✕</span>
            </span>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setEtapa('idiomas')}>Idiomas →</button>
      </div>
    )

  const renderIdiomas = () => (
    <div>
      <h2 className="section-title">Idiomas</h2>
      {dados.idiomas.map((idi, i) => (
        <div key={i} className="card">
          <div className="flex-between">
            <div className="flex" style={{ flex: 1, gap: 12, alignItems: 'center' }}>
              <input value={idi.lingua} onChange={e => atualizarIdioma(i, 'lingua', e.target.value)} placeholder="Idioma" style={{ padding: 8, borderRadius: 6, border: '2px solid #e0e0e0', flex: 1 }} />
              <select value={idi.nivel} onChange={e => atualizarIdioma(i, 'nivel', e.target.value)} style={{ padding: 8, borderRadius: 6, border: '2px solid #e0e0e0' }}>
                <option>Básico</option><option>Intermediário</option><option>Avançado</option><option>Fluente</option>
              </select>
            </div>
            <button className="btn btn-danger" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => removerIdioma(i)}>✕</button>
          </div>
        </div>
      ))}
      <div className="flex">
        <button className="btn btn-secondary" onClick={adicionarIdioma}>+ Adicionar Idioma</button>
        <button className="btn btn-success" onClick={() => { setEtapa('fim'); onNext() }}>Finalizar →</button>
      </div>
    </div>
  )

  switch (etapa) {
    case 'basico': return renderBasico()
    case 'experiencia': return renderExperiencia()
    case 'educacao': return renderEducacao()
    case 'habilidades': return renderHabilidades()
    case 'idiomas': return renderIdiomas()
    case 'fim': return <div style={{ textAlign: 'center', padding: 40 }}><h2>✅ Currículo gerado com sucesso!</h2><p>Vá para o Editor Visual ou Preview.</p></div>
  }
}
