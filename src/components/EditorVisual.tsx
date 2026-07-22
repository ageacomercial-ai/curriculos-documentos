import { useState } from 'react'
import { DadosCV, Experiencia, Educacao, Idioma } from '../types/cv'

interface Props {
  dados: DadosCV
  onChange: (dados: DadosCV) => void
}

export default function EditorVisual({ dados, onChange }: Props) {
  const handleChange = (chave: keyof DadosCV, valor: string) => {
    onChange({ ...dados, [chave]: valor })
  }

  const adicionarExperiencia = () => {
    onChange({ ...dados, experiencia: [...dados.experiencia, { empresa: '', cargo: '', inicio: '', fim: '', descricao: '' }] })
  }
  const atualizarExp = (i: number, campo: keyof Experiencia, valor: string) => {
    const exp = [...dados.experiencia]; exp[i] = { ...exp[i], [campo]: valor }; onChange({ ...dados, experiencia: exp })
  }
  const removerExp = (i: number) => {
    onChange({ ...dados, experiencia: dados.experiencia.filter((_, idx) => idx !== i) })
  }

  const adicionarEducacao = () => {
    onChange({ ...dados, educacao: [...dados.educacao, { instituicao: '', curso: '', nivel: '', inicio: '', fim: '' }] })
  }
  const atualizarEdu = (i: number, campo: keyof Educacao, valor: string) => {
    const edu = [...dados.educacao]; edu[i] = { ...edu[i], [campo]: valor }; onChange({ ...dados, educacao: edu })
  }
  const removerEdu = (i: number) => {
    onChange({ ...dados, educacao: dados.educacao.filter((_, idx) => idx !== i) })
  }

  const adicionarIdioma = () => {
    onChange({ ...dados, idiomas: [...dados.idiomas, { lingua: '', nivel: 'Básico' }] })
  }
  const atualizarIdi = (i: number, campo: keyof Idioma, valor: string) => {
    const idi = [...dados.idiomas]; idi[i] = { ...idi[i], [campo]: valor as any }; onChange({ ...dados, idiomas: idi })
  }
  const removerIdi = (i: number) => {
    onChange({ ...dados, idiomas: dados.idiomas.filter((_, idx) => idx !== i) })
  }

  const [novaHab, setNovaHab] = useState('')

  return (
    <div>
      <h2 className="section-title">Editor Visual</h2>

      <div className="grid-2">
        <div className="form-group"><label>Nome</label><input value={dados.nome} onChange={e => handleChange('nome', e.target.value)} /></div>
        <div className="form-group"><label>Cargo</label><input value={dados.cargo} onChange={e => handleChange('cargo', e.target.value)} /></div>
        <div className="form-group"><label>Email</label><input value={dados.email} onChange={e => handleChange('email', e.target.value)} /></div>
        <div className="form-group"><label>Telefone</label><input value={dados.telefone} onChange={e => handleChange('telefone', e.target.value)} /></div>
        <div className="form-group"><label>Endereço</label><input value={dados.endereco} onChange={e => handleChange('endereco', e.target.value)} /></div>
        <div className="form-group"><label>Site/LinkedIn</label><input value={dados.site} onChange={e => handleChange('site', e.target.value)} /></div>
      </div>

      <div className="form-group"><label>Resumo</label><textarea value={dados.resumo} onChange={e => handleChange('resumo', e.target.value)} /></div>

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Experiência</h3>
      {dados.experiencia.map((exp, i) => (
        <div key={i} className="card">
          <div className="flex-between"><strong>Experiência {i + 1}</strong><button className="btn btn-danger" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => removerExp(i)}>Remover</button></div>
          <div className="grid-2">
            <div className="form-group"><label>Empresa</label><input value={exp.empresa} onChange={e => atualizarExp(i, 'empresa', e.target.value)} /></div>
            <div className="form-group"><label>Cargo</label><input value={exp.cargo} onChange={e => atualizarExp(i, 'cargo', e.target.value)} /></div>
            <div className="form-group"><label>Início</label><input type="month" value={exp.inicio} onChange={e => atualizarExp(i, 'inicio', e.target.value)} /></div>
            <div className="form-group"><label>Fim</label><input type="month" value={exp.fim} onChange={e => atualizarExp(i, 'fim', e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Descrição</label><textarea value={exp.descricao} onChange={e => atualizarExp(i, 'descricao', e.target.value)} /></div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={adicionarExperiencia}>+ Experiência</button>

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Formação</h3>
      {dados.educacao.map((edu, i) => (
        <div key={i} className="card">
          <div className="flex-between"><strong>Formação {i + 1}</strong><button className="btn btn-danger" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => removerEdu(i)}>Remover</button></div>
          <div className="grid-2">
            <div className="form-group"><label>Instituição</label><input value={edu.instituicao} onChange={e => atualizarEdu(i, 'instituicao', e.target.value)} /></div>
            <div className="form-group"><label>Curso</label><input value={edu.curso} onChange={e => atualizarEdu(i, 'curso', e.target.value)} /></div>
            <div className="form-group"><label>Nível</label><select value={edu.nivel} onChange={e => atualizarEdu(i, 'nivel', e.target.value)}><option value="">Selecione</option><option>Técnico</option><option>Graduação</option><option>Pós-graduação</option><option>Mestrado</option><option>Doutorado</option></select></div>
            <div className="form-group"><label>Término</label><input type="month" value={edu.fim} onChange={e => atualizarEdu(i, 'fim', e.target.value)} /></div>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={adicionarEducacao}>+ Formação</button>

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Habilidades</h3>
      <div className="flex" style={{ marginBottom: 12 }}>
        <input value={novaHab} onChange={e => setNovaHab(e.target.value)} placeholder="Nova habilidade" style={{ flex: 1, padding: 10, borderRadius: 8, border: '2px solid #e0e0e0' }} onKeyDown={e => { if (e.key === 'Enter' && novaHab.trim()) { handleChange('habilidades', [...dados.habilidades, novaHab.trim()] as any); setNovaHab('') } }} />
        <button className="btn btn-primary" onClick={() => { if (novaHab.trim()) { onChange({ ...dados, habilidades: [...dados.habilidades, novaHab.trim()] }); setNovaHab('') } }}>Add</button>
      </div>
      <div style={{ marginBottom: 16 }}>{dados.habilidades.map((h, i) => <span key={i} className="tag">{h}<span className="tag-remove" onClick={() => onChange({ ...dados, habilidades: dados.habilidades.filter((_, idx) => idx !== i) })}>✕</span></span>)}</div>

      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Idiomas</h3>
      {dados.idiomas.map((idi, i) => (
        <div key={i} className="card">
          <div className="flex" style={{ gap: 12, alignItems: 'center' }}>
            <input value={idi.lingua} onChange={e => atualizarIdi(i, 'lingua', e.target.value)} placeholder="Idioma" style={{ flex: 1, padding: 8, borderRadius: 6, border: '2px solid #e0e0e0' }} />
            <select value={idi.nivel} onChange={e => atualizarIdi(i, 'nivel', e.target.value)} style={{ padding: 8, borderRadius: 6, border: '2px solid #e0e0e0' }}><option>Básico</option><option>Intermediário</option><option>Avançado</option><option>Fluente</option></select>
            <button className="btn btn-danger" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => removerIdi(i)}>✕</button>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={adicionarIdioma}>+ Idioma</button>
    </div>
  )
}

