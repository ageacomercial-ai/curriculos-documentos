# PROJECTO: Currículos & Documentos

## Estado Actual do Projecto

### Stack Técnico
- **Frontend:** PWA 100% client-side (vanilla JS, sem frameworks)
- **Armazenamento:** localStorage (dados do utilizador)
- **Deploy:** GitHub Pages → https://ageacomercial-ai.github.io/curriculos-documentos/
- **Código-fonte:** https://github.com/ageacomercial-ai/curriculos-documentos

### Estrutura de Ficheiros

```
├── index.html                          ← Entry point do PWA
├── manifest.json                       ← Manifest PWA
├── sw.js                               ← Service Worker (cache offline)
├── .github/workflows/deploy.yml        ← Deploy automático GitHub Pages
│
├── css/
│   ├── app.css                         ← Shell da app + responsivo (762 linhas)
│   └── models/
│       ├── classico.css                ← CV Clássico Premium (navy + gold, 2 colunas)
│       ├── moderno.css                 ← CV Moderno (teal gradient, 1 coluna)
│       ├── executivo.css               ← CV Executivo (verde escuro + champagne)
│       ├── criativo.css                ← CV Criativo (roxo/rosa gradient)
│       ├── minimalista.css             ← CV Minimalista (clean, tipografia leve)
│       └── doc/documentos.css          ← Estilos partilhados de documentos (A4)
│
└── js/
    ├── router.js                       ← SPA Router (29 linhas)
    ├── app.js                          ← Lógica principal + formulários (313 linhas)
    └── models/
        ├── registry.js                 ← Sistema de registo de modelos (114 linhas)
        ├── cv/
        │   ├── classico.js             ← Renderer CV Clássico
        │   ├── moderno.js              ← Renderer CV Moderno
        │   ├── executivo.js            ← Renderer CV Executivo
        │   ├── criativo.js             ← Renderer CV Criativo
        │   └── minimalista.js          ← Renderer CV Minimalista
        └── doc/renderers.js            ← Renderers de 6 tipos de documento
```

### Funcionalidades Implementadas

**5 Modelos de Currículo:**
- Clássico Premium, Moderno, Executivo, Criativo, Minimalista
- Cada um com esquema de cores, layout, tipografia e estilo únicos
- Todos optimizados para impressão A4 (210mm × 297mm)

**6 Tipos de Documento:**
- Declaração de Residência
- Declaração de Trabalho
- Carta de Apresentação
- Carta de Recomendação
- Contrato de Prestação de Serviços
- Requerimento

**Funcionalidades de UX:**
- Upload de foto com redimensionamento (max 400px, JPEG 85%)
- Ditado por voz (Web Speech API, Chrome/Edge Android)
- Auto-save com localStorage
- Ambiente visual com animações suaves
- Botão "Continuar rascunho anterior"
- PWA instalável com cache offline

### Público-Alvo
- Angola (mercado primário)
- Acesso maioritariamente via smartphone Android
- Dados móveis limitados
- Pagamento em Kwanzas (Multicaixa Express)

### Arquivo do Projecto
```
projecto cvs/
├── assets/icons/
│   ├── icon-192.svg
│   └── icon-512.svg
├── css/
│   └── app.css
│   └── models/
│       ├── classico.css
│       ├── moderno.css
│       ├── executivo.css
│       ├── criativo.css
│       ├── minimalista.css
│       └── doc/documentos.css
├── js/
│   ├── router.js
│   ├── app.js
│   └── models/
│       ├── registry.js
│       ├── cv/classico.js
│       ├── cv/moderno.js
│       ├── cv/executivo.js
│       ├── cv/criativo.js
│       ├── cv/minimalista.js
│       └── doc/renderers.js
├── .github/workflows/deploy.yml
├── index.html
├── manifest.json
├── sw.js
├── PROJETO_COMPLETO.md
└── README.md (não existe ainda)
```

### Limitações Conhecidas
1. **Sem identidade visual forte** — nome "Currículos & Documentos" é genérico, sem logo, sem personalidade
2. **Sem backend** — toda a lógica é client-side, sem persistência na nuvem
3. **Sem autenticação de utilizador** — dados só no dispositivo
4. **Sem IA** — sem sugestões de texto, sem melhoria automática de conteúdo
5. **Exportação apenas via Print** — sem download direto de PDF com um clique
6. **Sem pagamento integrado** — o fluxo de monetização não existe
7. **Modelos de CV ainda básicos** — faltam refinamentos visuais profissionais
8. **Documentos sem modelos visuais diferenciados** — partilham CSS genérico
9. **Sem onboarding** — o utilizador é atirado para a página inicial sem orientação
10. **Sem multi-idioma** — apenas português
11. **Acessibilidade melhorável** — falta suporte completo a leitores de ecrã
12. **Performance** — bundle não optimizado, Google Fonts carregado externamente
13. **Sem testes** — nenhum teste automatizado
14. **Código monolítico** — app.js tem toda a lógica misturada

---

## PEDIDO DE ENGENHARIA — PARA CLAUDE CODE / AGENTE DE IA

A seguir está o pedido completo para uma IA rever este projecto e sugerir melhorias brutais. Copia e cola isto no Claude Code ou noutro agente de IA:

---

### INÍCIO DO PROMPT

```
REVISÃO COMPLETA DE PROJECTO: "Currículos & Documentos" — PWA de Geração de Documentos Profissionais

## CONTEXTO

Este é um PWA 100% client-side (vanilla JS) para criar currículos e documentos profissionais, focado no mercado angolano (acesso mobile, dados limitados, pagamento em Kz). O código está em https://github.com/ageacomercial-ai/curriculos-documentos e o deploy em https://ageacomercial-ai.github.io/curriculos-documentos/

## OBJECTIVO

Quero que esta plataforma se torne REFERÊNCIA em Angola para criação de documentos profissionais. Preciso de sugestões BRUTAIS, sem filtro, sobre como transformar isto numa plataforma com IDENTIDADE, VIDA e que seja tão fácil de usar que qualquer pessoa consiga criar um documento impecável em menos de 5 minutos.

## ÁREAS PARA ANALISAR E MELHORAR

### 1. IDENTIDADE E MARCA
- A plataforma não tem nome próprio — "Currículos & Documentos" é genérico
- Sugere um naming forte para o mercado angolano
- Cria conceito de logo, paleta de cores, tom de voz, personalidade da marca
- A experiência deve fazer o utilizador sentir-se orgulhoso do que criou

### 2. EXPERIÊNCIA DO UTILIZADOR (ZERO Burocracia)
- Como reduzir o número de cliques/tap's para criar um documento ao mínimo absoluto?
- Como tornar o formulário de CV "mágico" — o utilizador preenche o mínimo e a plataforma faz o resto?
- Sugere um onboarding de 3 segundos para novos utilizadores
- Como usar IA para transformar input simples (ex.: "sou vendedor há 5 anos") em descrições profissionais completas?
- Como implementar preenchimento por voz como método PRIMÁRIO, não secundário?
- Progressão visual: o utilizador deve sentir que está a construir algo bonito a cada passo

### 3. INTELIGÊNCIA ARTIFICIAL
- Como integrar IA (OpenAI / DeepSeek / Claude) sem backend?
- Sugestão automática de descrições de experiência com base no cargo
- Melhoria de texto com um clique: "tornar mais profissional", "mais conciso", "mais persuasivo"
- Tradução automática do CV (PT → EN/FR)
- Gerar currículo completo a partir de uma conversa guiada por voz
- Recomendação inteligente de modelo com base na profissão/indústria do utilizador

### 4. MODELOS VISUAIS
- Como elevar os 5 modelos actuais a nível "agência de design"?
- Sugere micro-refinamentos tipográficos, de spacing, de cor para cada modelo
- Os documentos actuais são genéricos — como dar-lhes personalidade visual?
- Como implementar variações de modelo (ex.: Clássico Azul, Clássico Verde)?
- Preview em tempo real com transição suave ao trocar de modelo

### 5. ENGENHARIA E ARQUITECTURA
- O código actual é vanilla JS monolítico — vale a pena migrar para Vite/React/Svelte?
- Como implementar um sistema de "temas" que permita a utilizadores criar os próprios modelos?
- Como preparar a arquitectura para suportar backend no futuro (Supabase)?
- Service worker: como melhorar a estratégia de cache para verdadeiro offline-first?
- Como implementar download directo de PDF sem depender do Print do browser?
- Performance: como conseguir Lighthouse 100 em todas as categorias?

### 6. MONETIZAÇÃO (FASE 2)
- Fluxo de pagamento Multicaixa Express
- Modelo freemium: modelos grátis vs premium
- Como implementar "experimentar antes de comprar" (pré-visualização com marca d'água)?
- Pagamento por documento vs subscrição mensal
- Integração com operadoras de mobile money angolanas

### 7. FUNCIONALIDADES AUSENTES
- Múltiplos currículos por utilizador
- Histórico de versões
- Partilha por link/whatsapp
- Exportação em Word/Google Docs além de PDF
- Modo escuro
- Acessibilidade (WCAG 2.1)
- Detecção de dispositivo e sugestão automática
- "Modo entrevista" — plataforma faz perguntas por voz e preenche o CV
- Integração com LinkedIn para importar dados

### 8. DADOS DO MERCADO ANGOLANO A CONSIDERAR
- Maioria dos acessos: Android, Chrome, dados 3G/4G limitados
- Faixa etária: 18-35 anos
- Classe média emergente, primeira experiência com ferramentas digitais
- Valor percebido: documento bonito = profissional = mais oportunidades
- Concorrência: templates Word partilhados no WhatsApp, Canva (pesado para o telemóvel)
- Diferenciação chave: rapidez no telemóvel + preço em Kz + contexto local

## FORMATAÇÃO DA RESPOSTA

Para cada área:
1. CRÍTICA DIRETA — o que está mal ou pode ser muito melhor
2. SOLUÇÃO PROPOSTA — o que fazer, concretamente
3. PRIORIDADE — crítica/alta/média/futuro
4. ESFORÇO ESTIMADO — horas/dias para implementar
5. IMPACTO — qual a diferença que faz na experiência do utilizador

No final, dá-me um RANKING das 10 acções com maior impacto imediato, ordenadas por prioridade.

Sê implacável. Não poupes críticas. Quero que esta plataforma seja tão boa que as pessoas em Angola digam "isto mudou a forma como procuro emprego".
```

### FIM DO PROMPT

---
