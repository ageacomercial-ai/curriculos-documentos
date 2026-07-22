import { useState, useEffect } from 'react'
import { DadosCV, Pagina } from './types/cv'
import { useLocalStorage } from './hooks/useLocalStorage'
import Home from './components/Home'
import CVForm from './components/CVForm'
import TemplateGallery from './components/TemplateGallery'
import Preview from './components/Preview'
import ExportPanel from './components/ExportPanel'

function novoId(): string { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6) }

function cvVazio(): DadosCV {
  const now = new Date().toISOString()
  return {
    id: novoId(), nome: '', cargo: '', email: '', telefone: '', endereco: '', site: '', linkedin: '',
    foto: '', resumo: '', experiencia: [], educacao: [], habilidades: [], idiomas: [],
    cor_primaria: '#6366f1', template: 'moderno', criadoEm: now, atualizadoEm: now,
  }
}

const icones: Record<Pagina, string> = { home: '🏠', form: '📝', modelos: '🎨', preview: '👁️', exportar: '📤' }
const rotulos: Record<Pagina, string> = { home: 'Início', form: 'Dados', modelos: 'Modelos', preview: 'Visualizar', exportar: 'Exportar' }

export default function App() {
  const [cvs, setCvs] = useLocalStorage<DadosCV[]>('meus-cvs', [])
  const [pagina, setPagina] = useState<Pagina>('home')
  const [cvAtivo, setCvAtivo] = useState<DadosCV | null>(null)

  const salvarCV = (dados: DadosCV) => {
    const atualizado = { ...dados, atualizadoEm: new Date().toISOString() }
    setCvs(prev => {
      const idx = prev.findIndex(c => c.id === dados.id)
      if (idx >= 0) {
        const copy = [...prev]; copy[idx] = atualizado; return copy
      }
      return [...prev, atualizado]
    })
    setCvAtivo(atualizado)
  }

  const criarCV = () => {
    const cv = cvVazio()
    setCvAtivo(cv)
    setPagina('form')
  }

  const editarCV = (cv: DadosCV) => {
    setCvAtivo(cv)
    setPagina('form')
  }

  const duplicarCV = (cv: DadosCV) => {
    const nova = { ...cv, id: novoId(), nome: cv.nome + ' (cópia)', criadoEm: new Date().toISOString(), atualizadoEm: new Date().toISOString() }
    setCvs(prev => [...prev, nova])
  }

  const excluirCV = (id: string) => {
    setCvs(prev => prev.filter(c => c.id !== id))
    if (cvAtivo?.id === id) setCvAtivo(null)
  }

  useEffect(() => {
    const handler = (e: Event) => {
      const page = (e as CustomEvent).detail as Pagina
      if (page) setPagina(page)
    }
    window.addEventListener('navigate', handler)
    return () => window.removeEventListener('navigate', handler)
  }, [])

  const navItems: Pagina[] = ['home', 'form', 'modelos', 'preview', 'exportar']

  return (
    <div className="app">
      <header className="header">
        <div className="header-logo">CV</div>
        <div style={{ flex: 1 }}>
          <h1>Gerador de CV</h1>
          {cvAtivo && <div className="header-sub">{cvAtivo.nome || 'Novo Currículo'}</div>}
        </div>
        {pagina !== 'home' && (
          <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,.2)', color: 'white', width: 'auto', padding: '6px 12px', fontSize: '12px' }} onClick={() => setPagina('home')}>
            ✕
          </button>
        )}
      </header>

      <main className="main">
        {pagina === 'home' && <Home cvs={cvs} onCriar={criarCV} onEditar={editarCV} onDuplicar={duplicarCV} onExcluir={excluirCV} />}
        {pagina === 'form' && cvAtivo && <CVForm dados={cvAtivo} onChange={salvarCV} />}
        {pagina === 'modelos' && cvAtivo && (
          <TemplateGallery current={cvAtivo.template} onSelect={t => salvarCV({ ...cvAtivo, template: t })} />
        )}
        {pagina === 'preview' && cvAtivo && <Preview dados={cvAtivo} />}
        {pagina === 'exportar' && cvAtivo && <ExportPanel dados={cvAtivo} />}
      </main>

      <nav className="bottom-nav">
        {navItems.map(p => (
          <button key={p} className={`nav-item ${pagina === p ? 'active' : ''}`} onClick={() => setPagina(p)} disabled={p !== 'home' && !cvAtivo}>
            <span style={{ fontSize: '18px' }}>{icones[p]}</span>
            <span>{rotulos[p]}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
