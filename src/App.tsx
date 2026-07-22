import { useState } from 'react'
import { DadosCV } from './types/cv'
import { dadosIniciais } from './data/questions'
import Perguntas from './components/Perguntas'
import EditorVisual from './components/EditorVisual'
import TemplateSelector from './components/TemplateSelector'
import CVPreview from './components/CVPreview'

type Pagina = 'perguntas' | 'editor' | 'modelos' | 'preview'

export default function App() {
  const [pagina, setPagina] = useState<Pagina>('perguntas')
  const [dados, setDados] = useState<DadosCV>(dadosIniciais)
  const [template, setTemplate] = useState('moderno')

  const menu = [
    { id: 'perguntas' as Pagina, label: 'Perguntas Simples' },
    { id: 'editor' as Pagina, label: 'Editor Visual' },
    { id: 'modelos' as Pagina, label: 'Trocar Modelo' },
    { id: 'preview' as Pagina, label: 'Exportar' },
  ]

  return (
    <div className="app">
      <header className="header">
        <h1>📝 Currículo Automático</h1>
        <nav className="nav">
          {menu.map(item => (
            <button
              key={item.id}
              className={`nav-btn ${pagina === item.id ? 'active' : ''}`}
              onClick={() => setPagina(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="main">
        {pagina === 'perguntas' && (
          <Perguntas dados={dados} onChange={setDados} onNext={() => setPagina('editor')} />
        )}
        {pagina === 'editor' && (
          <EditorVisual dados={dados} onChange={setDados} />
        )}
        {pagina === 'modelos' && (
          <TemplateSelector current={template} onSelect={t => { setTemplate(t); setPagina('preview') }} />
        )}
        {pagina === 'preview' && (
          <CVPreview dados={dados} template={template} onBack={() => setPagina('editor')} />
        )}
      </main>
    </div>
  )
}
