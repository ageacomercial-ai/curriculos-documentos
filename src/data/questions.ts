import { DadosCV } from '../types/cv'

export const perguntas = [
  { chave: 'nome', pergunta: 'Qual é o seu nome completo?', placeholder: 'João Silva' },
  { chave: 'cargo', pergunta: 'Qual é o seu cargo desejado?', placeholder: 'Desenvolvedor Front-end' },
  { chave: 'email', pergunta: 'Qual é o seu e-mail?', placeholder: 'joao@email.com' },
  { chave: 'telefone', pergunta: 'Qual é o seu telefone?', placeholder: '(11) 99999-9999' },
  { chave: 'endereco', pergunta: 'Qual é o seu endereço?', placeholder: 'São Paulo, SP' },
  { chave: 'site', pergunta: 'Qual é o seu site ou LinkedIn?', placeholder: 'linkedin.com/in/joao' },
  { chave: 'resumo', pergunta: 'Faça um breve resumo profissional:', placeholder: 'Profissional com X anos de experiência em...' },
] as const

export const dadosIniciais: DadosCV = {
  nome: '',
  cargo: '',
  email: '',
  telefone: '',
  endereco: '',
  site: '',
  resumo: '',
  experiencia: [],
  educacao: [],
  habilidades: [],
  idiomas: [],
}
