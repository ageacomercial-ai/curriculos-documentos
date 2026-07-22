export interface DadosCV {
  id: string
  nome: string
  cargo: string
  email: string
  telefone: string
  endereco: string
  site: string
  linkedin: string
  foto: string
  resumo: string
  experiencia: Experiencia[]
  educacao: Educacao[]
  habilidades: string[]
  idiomas: Idioma[]
  cor_primaria: string
  template: string
  criadoEm: string
  atualizadoEm: string
}

export interface Experiencia {
  empresa: string
  cargo: string
  inicio: string
  fim: string
  descricao: string
  atual: boolean
}

export interface Educacao {
  instituicao: string
  curso: string
  nivel: string
  inicio: string
  fim: string
}

export interface Idioma {
  lingua: string
  nivel: 'Básico' | 'Intermediário' | 'Avançado' | 'Fluente' | 'Nativo'
}

export interface Template {
  id: string
  nome: string
  descricao: string
  cor: string
  preview: string
}

export type Pagina = 'home' | 'form' | 'modelos' | 'preview' | 'exportar'
