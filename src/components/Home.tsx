import { DadosCV } from '../types/cv'

interface Props {
  cvs: DadosCV[]
  onCriar: () => void
  onEditar: (cv: DadosCV) => void
  onDuplicar: (cv: DadosCV) => void
  onExcluir: (id: string) => void
}

export default function Home({ cvs, onCriar, onEditar, onDuplicar, onExcluir }: Props) {
  const ultimo = cvs[cvs.length - 1]

  return (
    <div>
      {cvs.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📄</div>
          <h2>Criar Currículo</h2>
          <p>Responda a algumas perguntas e gere um currículo profissional em segundos.</p>
          <button className="btn btn-primary" onClick={onCriar}>
            + Criar Novo Currículo
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <button className="btn btn-primary" onClick={onCriar}>+ Novo</button>
            {ultimo && <button className="btn btn-outline" onClick={() => onEditar(ultimo)}>Continuar Último</button>}
          </div>

          <h2 className="section-title">Meus Currículos</h2>

          {[...cvs].reverse().map(cv => (
            <div key={cv.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="card-icon" style={{ background: '#eef2ff' }}>📄</div>
                <div style={{ flex: 1, minWidth: 0 }} onClick={() => onEditar(cv)}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{cv.nome || 'Sem nome'}</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>
                    {cv.cargo || 'Sem cargo'} · {new Date(cv.atualizadoEm).toLocaleDateString('pt-PT')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn btn-sm btn-secondary" onClick={() => onDuplicar(cv)} style={{ fontSize: 16, padding: '6px 8px' }} title="Duplicar">📋</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onExcluir(cv.id)} style={{ fontSize: 16, padding: '6px 8px' }} title="Excluir">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
