export interface DadosCV {
  nome: string
  cargo: string
  email: string
  telefone: string
  endereco: string
  site: string
  resumo: string
  experiencia: Experiencia[]
  educacao: Educacao[]
  habilidades: string[]
  idiomas: Idioma[]
}

export interface Experiencia {
  empresa: string
  cargo: string
  inicio: string
  fim: string
  descricao: string
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
  nivel: 'Básico' | 'Intermediário' | 'Avançado' | 'Fluente'
}

export interface Template {
  id: string
  nome: string
  descricao: string
}
