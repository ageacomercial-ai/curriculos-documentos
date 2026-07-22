import { templates } from '../data/templates'

interface Props { current: string; onSelect: (id: string) => void }

export default function TemplateGallery({ current, onSelect }: Props) {
  return (
    <div>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>
        Escolha o modelo que melhor representa seu perfil profissional.
      </p>

      <div className="template-grid">
        {templates.map(t => (
          <div
            key={t.id}
            className={`template-card ${current === t.id ? 'selected' : ''}`}
            onClick={() => onSelect(t.id)}
          >
            <div className="icon">{t.preview}</div>
            <h3>{t.nome}</h3>
            <p>{t.descricao}</p>
            {current === t.id && (
              <div style={{ marginTop: 8, color: '#6366f1', fontWeight: 700, fontSize: 13 }}>
                ✓ Selecionado
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
