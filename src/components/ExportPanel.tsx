import { DadosCV } from '../types/cv'

interface Props { dados: DadosCV }

export default function ExportPanel({ dados }: Props) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dados, null, 2))
  const nomeArquivo = (dados.nome || 'curriculo').replace(/\s+/g, '_').toLowerCase()

  return (
    <div>
      <div className="card" style={{ textAlign: 'center', padding: 32 }}>
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎉</div>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Currículo Pronto!</h2>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20 }}>
          Seu currículo no modelo <strong>{dados.template}</strong> está completo.
        </p>
      </div>

      <div className="card">
        <h3 className="section-title">Exportar</h3>

        <button className="btn btn-primary" style={{ marginBottom: 12 }} onClick={() => window.print()}>
          🖨️ Imprimir / Salvar PDF
        </button>

        <a href={dataStr} download={`${nomeArquivo}.json`} style={{ textDecoration: 'none' }}>
          <button className="btn btn-outline" style={{ marginBottom: 12 }}>
            💾 Salvar dados (JSON)
          </button>
        </a>

        <button className="btn btn-secondary" onClick={() => {
          const text = `
Nome: ${dados.nome}
Cargo: ${dados.cargo}
Email: ${dados.email}
Telefone: ${dados.telefone}
${dados.resumo ? `\nResumo:\n${dados.resumo}` : ''}
${dados.experiencia.length ? `\n--- Experiência ---\n${dados.experiencia.map(e => `${e.cargo} na ${e.empresa} (${e.inicio} - ${e.atual ? 'Atual' : e.fim})\n${e.descricao}`).join('\n\n')}` : ''}
${dados.educacao.length ? `\n--- Formação ---\n${dados.educacao.map(e => `${e.curso} - ${e.instituicao} (${e.nivel}, ${e.fim})`).join('\n')}` : ''}
${dados.habilidades.length ? `\n--- Habilidades ---\n${dados.habilidades.join(', ')}` : ''}
${dados.idiomas.length ? `\n--- Idiomas ---\n${dados.idiomas.map(i => `${i.lingua} - ${i.nivel}`).join('\n')}` : ''}
          `.trim()
          navigator.clipboard.writeText(text)
            .then(() => alert('Texto copiado!'))
            .catch(() => prompt('Copie o texto abaixo:', text))
        }}>
          📋 Copiar como texto
        </button>
      </div>

      <div className="card">
        <h3 className="section-title">Dicas</h3>
        <ul style={{ fontSize: 13, color: '#475569', lineHeight: 1.8, paddingLeft: 16 }}>
          <li>Use <strong>Imprimir</strong> e selecione "Salvar como PDF" para obter um arquivo profissional</li>
          <li>Nas configurações de impressão, remova cabeçalhos e rodapés</li>
          <li>Mantenha o currículo em 1-2 páginas no máximo</li>
          <li>Personalize as cores e o modelo no separador "Modelos"</li>
        </ul>
      </div>
    </div>
  )
}
