import { templates } from '../data/templates'

interface Props {
  current: string
  onSelect: (id: string) => void
}

export default function TemplateSelector({ current, onSelect }: Props) {
  return (
    <div>
      <h2 className="section-title">Escolha um Modelo</h2>
      <div className="grid-2">
        {templates.map(t => (
          <div
            key={t.id}
            className={`card ${current === t.id ? 'selected' : ''}`}
            onClick={() => onSelect(t.id)}
            style={{ cursor: 'pointer', textAlign: 'center', padding: 32 }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>
              {t.id === 'moderno' ? '🎨' : t.id === 'classico' ? '📜' : '✨'}
            </div>
            <h3>{t.nome}</h3>
            <p style={{ color: '#666', marginTop: 8 }}>{t.descricao}</p>
            {current === t.id && <div style={{ marginTop: 12, color: '#667eea', fontWeight: 700 }}>✓ Selecionado</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
