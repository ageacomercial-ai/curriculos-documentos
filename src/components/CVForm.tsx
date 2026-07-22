import { useState } from 'react'
import { DadosCV, Experiencia, Educacao, Idioma } from '../types/cv'

type Etapa = 'basico' | 'resumo' | 'experiencia' | 'educacao' | 'habilidades' | 'idiomas'
const etapas: Etapa[] = ['basico', 'resumo', 'experiencia', 'educacao', 'habilidades', 'idiomas']
const rotulosEtapa: Record<Etapa, string> = {
  basico: 'Informações', resumo: 'Resumo', experiencia: 'Experiência',
  educacao: 'Formação', habilidades: 'Habilidades', idiomas: 'Idiomas',
}

interface Props { dados: DadosCV; onChange: (d: DadosCV) => void }

export default function CVForm({ dados, onChange }: Props) {
  const [etapa, setEtapa] = useState<Etapa>('basico')
  const [inputHab, setInputHab] = useState('')

  const upd = (campo: Partial<DadosCV>) => onChange({ ...dados, ...campo })

  const etapaIdx = etapas.indexOf(etapa)

  return (
    <div>
      <div className="progress">
        {etapas.map(e => (
          <div key={e} className={`progress-step ${e === etapa ? 'active' : ''} ${etapas.indexOf(e) < etapaIdx ? 'done' : ''}`} />
        ))}
      </div>

      <h2 className="section-title">{rotulosEtapa[etapa]}</h2>

      {etapa === 'basico' && (
        <>
          <div className="form-group">
            <label>Nome completo *</label>
            <input value={dados.nome} onChange={e => upd({ nome: e.target.value })} placeholder="João Silva" />
          </div>
          <div className="form-group">
            <label>Cargo desejado *</label>
            <input value={dados.cargo} onChange={e => upd({ cargo: e.target.value })} placeholder="Desenvolvedor Front-end" />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={dados.email} onChange={e => upd({ email: e.target.value })} placeholder="joao@email.com" />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input type="tel" value={dados.telefone} onChange={e => upd({ telefone: e.target.value })} placeholder="+351 900 000 000" />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Localização</label>
              <input value={dados.endereco} onChange={e => upd({ endereco: e.target.value })} placeholder="Lisboa, Portugal" />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input value={dados.linkedin} onChange={e => upd({ linkedin: e.target.value })} placeholder="linkedin.com/in/joao" />
            </div>
          </div>
          <div className="form-group">
            <label>Site / Portfólio</label>
            <input value={dados.site} onChange={e => upd({ site: e.target.value })} placeholder="joaosilva.dev" />
          </div>
        </>
      )}

      {etapa === 'resumo' && (
        <div className="form-group">
          <label>Resumo profissional</label>
          <textarea value={dados.resumo} onChange={e => upd({ resumo: e.target.value })} placeholder="Descreva sua trajetória profissional, principais conquistas e objetivos..." style={{ minHeight: 140 }} />
        </div>
      )}

      {etapa === 'experiencia' && (
        <>
          {dados.experiencia.map((exp, i) => (
            <div key={i} className="card">
              <div className="flex-between" style={{ marginBottom: 8 }}>
                <strong style={{ fontSize: 14 }}>{exp.empresa || `Experiência ${i + 1}`}</strong>
                <button className="btn btn-sm btn-danger" onClick={() => upd({ experiencia: dados.experiencia.filter((_, idx) => idx !== i) })}>✕</button>
              </div>
              <div className="grid-2">
                <div className="form-group"><label>Empresa</label><input value={exp.empresa} onChange={e => { const x = [...dados.experiencia]; x[i] = { ...x[i], empresa: e.target.value }; upd({ experiencia: x }) }} /></div>
                <div className="form-group"><label>Cargo</label><input value={exp.cargo} onChange={e => { const x = [...dados.experiencia]; x[i] = { ...x[i], cargo: e.target.value }; upd({ experiencia: x }) }} /></div>
                <div className="form-group"><label>Início</label><input type="month" value={exp.inicio} onChange={e => { const x = [...dados.experiencia]; x[i] = { ...x[i], inicio: e.target.value }; upd({ experiencia: x }) }} /></div>
                <div className="form-group"><label>Fim</label><input type="month" value={exp.fim} disabled={exp.atual} onChange={e => { const x = [...dados.experiencia]; x[i] = { ...x[i], fim: e.target.value }; upd({ experiencia: x }) }} /></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <input type="checkbox" id={`atual-${i}`} checked={exp.atual} onChange={e => { const x = [...dados.experiencia]; x[i] = { ...x[i], atual: e.target.checked, fim: e.target.checked ? '' : x[i].fim }; upd({ experiencia: x }) }} />
                <label htmlFor={`atual-${i}`} style={{ fontSize: 13 }}>Trabalho atual</label>
              </div>
              <div className="form-group"><label>Descrição</label><textarea value={exp.descricao} onChange={e => { const x = [...dados.experiencia]; x[i] = { ...x[i], descricao: e.target.value }; upd({ experiencia: x }) }} /></div>
            </div>
          ))}
          <button className="btn btn-secondary" onClick={() => upd({ experiencia: [...dados.experiencia, { empresa: '', cargo: '', inicio: '', fim: '', descricao: '', atual: false }] })}>+ Adicionar Experiência</button>
        </>
      )}

      {etapa === 'educacao' && (
        <>
          {dados.educacao.map((edu, i) => (
            <div key={i} className="card">
              <div className="flex-between" style={{ marginBottom: 8 }}>
                <strong style={{ fontSize: 14 }}>{edu.curso || `Formação ${i + 1}`}</strong>
                <button className="btn btn-sm btn-danger" onClick={() => upd({ educacao: dados.educacao.filter((_, idx) => idx !== i) })}>✕</button>
              </div>
              <div className="grid-2">
                <div className="form-group"><label>Instituição</label><input value={edu.instituicao} onChange={e => { const x = [...dados.educacao]; x[i] = { ...x[i], instituicao: e.target.value }; upd({ educacao: x }) }} /></div>
                <div className="form-group"><label>Curso</label><input value={edu.curso} onChange={e => { const x = [...dados.educacao]; x[i] = { ...x[i], curso: e.target.value }; upd({ educacao: x }) }} /></div>
                <div className="form-group"><label>Nível</label><select value={edu.nivel} onChange={e => { const x = [...dados.educacao]; x[i] = { ...x[i], nivel: e.target.value }; upd({ educacao: x }) }}><option value="">Selecione</option><option>Técnico</option><option>Graduação</option><option>Pós-graduação</option><option>Mestrado</option><option>Doutorado</option></select></div>
                <div className="form-group"><label>Conclusão</label><input type="month" value={edu.fim} onChange={e => { const x = [...dados.educacao]; x[i] = { ...x[i], fim: e.target.value }; upd({ educacao: x }) }} /></div>
              </div>
            </div>
          ))}
          <button className="btn btn-secondary" onClick={() => upd({ educacao: [...dados.educacao, { instituicao: '', curso: '', nivel: '', inicio: '', fim: '' }] })}>+ Adicionar Formação</button>
        </>
      )}

      {etapa === 'habilidades' && (
        <>
          <div className="flex" style={{ marginBottom: 12 }}>
            <input value={inputHab} onChange={e => setInputHab(e.target.value)} placeholder="Ex: JavaScript, React, Python" style={{ flex: 1, padding: 12, borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 15 }}
              onKeyDown={e => { if (e.key === 'Enter' && inputHab.trim()) { upd({ habilidades: [...dados.habilidades, inputHab.trim()] }); setInputHab('') } }} />
            <button className="btn btn-primary btn-sm" onClick={() => { if (inputHab.trim()) { upd({ habilidades: [...dados.habilidades, inputHab.trim()] }); setInputHab('') } }}>Add</button>
          </div>
          {dados.habilidades.length === 0 && <p style={{ color: '#64748b', fontSize: 14, textAlign: 'center', padding: 20 }}>Adicione suas habilidades técnicas e comportamentais</p>}
          <div>{dados.habilidades.map((h, i) => <span key={i} className="tag">{h}<span className="tag-remove" onClick={() => upd({ habilidades: dados.habilidades.filter((_, idx) => idx !== i) })}>✕</span></span>)}</div>
        </>
      )}

      {etapa === 'idiomas' && (
        <>
          {dados.idiomas.map((idi, i) => (
            <div key={i} className="card" style={{ padding: 12 }}>
              <div className="flex" style={{ gap: 8, alignItems: 'center' }}>
                <input value={idi.lingua} onChange={e => { const x = [...dados.idiomas]; x[i] = { ...x[i], lingua: e.target.value }; upd({ idiomas: x }) }} placeholder="Idioma" style={{ flex: 1, padding: 8, borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 14 }} />
                <select value={idi.nivel} onChange={e => { const x = [...dados.idiomas]; x[i] = { ...x[i], nivel: e.target.value as any }; upd({ idiomas: x }) }} style={{ padding: 8, borderRadius: 6, border: '1.5px solid #e2e8f0', fontSize: 14 }}>
                  <option>Básico</option><option>Intermediário</option><option>Avançado</option><option>Fluente</option><option>Nativo</option>
                </select>
                <button className="btn btn-sm btn-danger" onClick={() => upd({ idiomas: dados.idiomas.filter((_, idx) => idx !== i) })}>✕</button>
              </div>
            </div>
          ))}
          <button className="btn btn-secondary" onClick={() => upd({ idiomas: [...dados.idiomas, { lingua: '', nivel: 'Básico' }] })}>+ Adicionar Idioma</button>
        </>
      )}

      <div className="btn-group">
        {etapaIdx > 0 && <button className="btn btn-secondary" onClick={() => setEtapa(etapas[etapaIdx - 1])}>← Anterior</button>}
        {etapaIdx < etapas.length - 1
          ? <button className="btn btn-primary" onClick={() => setEtapa(etapas[etapaIdx + 1])}>Próximo →</button>
          : <button className="btn btn-accent" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'modelos' }))}>Escolher Modelo →</button>
        }
      </div>
    </div>
  )
}
