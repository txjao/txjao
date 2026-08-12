# Project Deck — Ideia de implementação

## Visão geral

Substituir o carousel tradicional de projetos por uma interface inspirada em um **Stream Deck**.

O objetivo não é reproduzir o hardware de forma realista, mas usar sua lógica visual e de interação como base para apresentar os projetos de forma mais consistente, interativa e alinhada à identidade do portfólio.

Hoje, cada projeto possui screenshots com estilos, cores e níveis de contraste diferentes. Isso faz com que os cards pareçam visualmente desconectados entre si.

A nova abordagem transforma cada projeto em uma **tecla de um Project Deck**, com uma identidade visual simplificada e consistente.

---

# Problema atual

O carousel atual apresenta projetos através de screenshots.

Isso cria alguns problemas:

- contraste inconsistente entre projetos;
- screenshots com fundos e composições muito diferentes;
- dificuldade de manter uma identidade visual única;
- os projetos parecem cards independentes em vez de partes de um mesmo sistema;
- novos projetos podem exigir tratamentos visuais específicos para funcionar bem no carousel.

Exemplo conceitual atual:

```text
←  [ screenshot ] [ screenshot ] [ screenshot ]  →
```

Cada screenshot precisa funcionar sozinho como peça visual.

---

# Proposta

Transformar a seção de projetos em um **Project Deck**.

Cada projeto passa a ser representado por uma tecla quadrada contendo:

- ícone;
- logo;
- símbolo;
- monograma;
- ou uma representação visual simplificada do projeto.

Exemplo:

```text
┌─────────────────────────────────────┐
│                                     │
│   ┌─────┐  ┌─────┐  ┌─────┐       │
│   │ X O │  │ TT  │  │ 💊  │       │
│   └─────┘  └─────┘  └─────┘       │
│                                     │
│   ┌─────┐  ┌─────┐  ┌─────┐       │
│   │ AI  │  │ AoM │  │ +   │       │
│   └─────┘  └─────┘  └─────┘       │
│                                     │
│ ──────────────────────────────────  │
│ TIC TAC TOE                         │
│ React · TypeScript · WebSocket      │
│                              ↗      │
└─────────────────────────────────────┘
```

O deck passa a ser o elemento visual principal da seção.

---

# Objetivos

## Objetivo principal

Criar uma seção de projetos que:

- tenha identidade própria;
- seja visualmente consistente;
- permita explorar os projetos de forma interativa;
- mantenha boa legibilidade;
- funcione bem tanto em desktop quanto mobile;
- seja simples de expandir quando novos projetos forem adicionados.

## Objetivos secundários

- reaproveitar o sistema de carousel/paginação já existente;
- evitar depender de screenshots como representação principal;
- criar uma interação memorável sem prejudicar a usabilidade;
- manter a linguagem minimalista atual do portfólio.

---

# Princípios de design

## 1. Stream Deck como inspiração, não reprodução

O componente não precisa parecer uma fotografia ou um modelo 3D de um Stream Deck.

Evitar:

- perspectiva exagerada;
- reflexos realistas;
- efeitos 3D pesados;
- excesso de detalhes físicos;
- elementos puramente decorativos sem função.

Preferir:

- formas simples;
- grid regular;
- teclas claramente clicáveis;
- animações curtas;
- contraste alto;
- hierarquia visual clara.

---

## 2. O deck é consistente; os projetos trazem personalidade

A estrutura externa permanece igual.

Cada projeto muda apenas:

- ícone;
- cor de destaque;
- nome;
- descrição;
- tecnologias;
- links.

Exemplo:

```text
Project Deck
├── Tic Tac Toe
├── Teixeira
├── No Pills
├── AI Project
├── Age of Mythology Project
└── ...
```

---

## 3. Não usar screenshots dentro das teclas

As teclas devem utilizar representações simplificadas.

Exemplos:

### Tic Tac Toe

```text
┌───────┐
│ X   O │
│   X   │
│ O   X │
└───────┘
```

### Portfolio

```text
┌───────┐
│       │
│   T   │
│       │
└───────┘
```

### No Pills

```text
┌───────┐
│       │
│  💊̸   │
│       │
└───────┘
```

A consistência vem do formato da tecla.

A personalidade vem do conteúdo interno.

---

# Estrutura visual

O componente pode ser dividido em três áreas.

```text
<ProjectDeck>

    <DeckGrid />

    <ProjectDisplay />

    <DeckNavigation />

</ProjectDeck>
```

Visualmente:

```text
┌───────────────────────────────────┐
│                                   │
│          PROJECT GRID             │
│                                   │
│  □   □   □   □                   │
│  □   □   □   □                   │
│                                   │
├───────────────────────────────────┤
│                                   │
│        PROJECT DISPLAY            │
│                                   │
├───────────────────────────────────┤
│         DECK NAVIGATION           │
└───────────────────────────────────┘
```

---

# Componentes

## ProjectDeck

Componente principal.

Responsabilidades:

- armazenar projeto selecionado;
- controlar página atual;
- organizar grid;
- renderizar detalhes;
- controlar navegação.

Exemplo:

```tsx
<ProjectDeck projects={projects} />
```

---

## DeckGrid

Responsável apenas pelo grid de teclas.

```tsx
<DeckGrid>
  {projects.map((project) => (
    <DeckKey />
  ))}
</DeckGrid>
```

Responsabilidades:

- layout;
- número de colunas;
- espaçamento;
- responsividade.

---

## DeckKey

Representa um projeto.

Props sugeridas:

```ts
type DeckKeyProps = {
  project: Project;
  active: boolean;
  onSelect: () => void;
};
```

Exemplo:

```tsx
<DeckKey
  project={project}
  active={selectedProject.id === project.id}
  onSelect={() => setSelectedProject(project)}
/>
```

---

# Estados da tecla

Cada tecla deve ter pelo menos quatro estados.

## Default

```text
┌─────────┐
│         │
│   XO    │
│         │
└─────────┘
```

Características:

- fundo escuro;
- contraste suficiente;
- sombra leve;
- borda discreta.

---

## Hover

Ao passar o mouse:

```css
transform: translateY(-3px);
```

Também pode ocorrer:

- aumento leve de brilho;
- sombra maior;
- borda mais evidente.

---

## Pressed

Durante o clique:

```css
transform: translateY(2px);
```

A ideia é simular fisicamente uma tecla sendo pressionada.

---

## Selected

Projeto atualmente ativo.

Pode utilizar:

- borda mais clara;
- glow discreto;
- cor de destaque do projeto;
- pequeno indicador.

Evitar efeitos muito fortes.

---

# ProjectDisplay

Área responsável por mostrar informações sobre o projeto selecionado.

Exemplo:

```text
TIC TAC TOE

Realtime multiplayer Tic-Tac-Toe game.

React · TypeScript · WebSocket

[View project]   [GitHub]
```

Conteúdo sugerido:

- nome;
- descrição curta;
- stack;
- status;
- link do projeto;
- link do GitHub.

---

# Modelo de dados

Sugestão:

```ts
type Project = {
  id: string;

  name: string;

  shortName?: string;

  description: string;

  icon: string;

  technologies: string[];

  accent?: string;

  website?: string;

  github?: string;

  category?: ProjectCategory;

  status?: "production" | "development" | "archived";
};
```

Categorias:

```ts
type ProjectCategory =
  | "frontend"
  | "fullstack"
  | "ai"
  | "game"
  | "experiment";
```

Exemplo:

```ts
const projects: Project[] = [
  {
    id: "tic-tac-toe",

    name: "Tic Tac Toe",

    shortName: "XO",

    description:
      "Realtime multiplayer Tic-Tac-Toe game.",

    icon: "/projects/tic-tac-toe.svg",

    technologies: [
      "React",
      "TypeScript",
      "WebSocket"
    ],

    accent: "#FFD600",

    github:
      "https://github.com/...",

    website:
      "https://..."
  }
];
```

---

# Gerenciamento de estado

MVP:

```tsx
const [selectedProjectId, setSelectedProjectId] =
  useState(projects[0].id);
```

Projeto selecionado:

```tsx
const selectedProject =
  projects.find(
    project =>
      project.id === selectedProjectId
  );
```

Não é necessário adicionar gerenciamento de estado externo inicialmente.

---

# Paginação

O carousel atual pode ser reaproveitado.

Mas ele deixa de navegar entre projetos individuais.

Passa a navegar entre **páginas do deck**.

Exemplo:

```text
PAGE 1

┌─────────────────────┐
│ P1  P2  P3  P4      │
│ P5  P6  P7  P8      │
└─────────────────────┘

               →
```

Página seguinte:

```text
PAGE 2

┌─────────────────────┐
│ P9   P10  P11  P12  │
│ P13  P14  P15  P16  │
└─────────────────────┘
```

Isso também é coerente com o conceito de profiles/pages de um Stream Deck.

---

# Número de projetos por página

Primeira sugestão:

Desktop:

```text
4 colunas
2 linhas

8 projetos
```

ou:

```text
3 colunas
2 linhas

6 projetos
```

A escolha deve depender do tamanho final do componente no Figma.

### Recomendação inicial

Começar com:

```text
3 x 2
```

6 projetos por página.

Isso permite teclas maiores e mais legíveis.

---

# Responsividade

## Desktop

```text
┌───────────────────────────────┐
│  □   □   □                   │
│  □   □   □                   │
│                               │
│  Project information          │
└───────────────────────────────┘
```

---

## Tablet

Possível grid:

```text
3 x 2
```

ou:

```text
2 x 3
```

dependendo da largura disponível.

---

## Mobile

Evitar simplesmente reduzir o deck inteiro.

Preferir:

```text
2 colunas
```

Exemplo:

```text
┌───────────────────┐
│   □       □       │
│                   │
│   □       □       │
│                   │
│   □       □       │
│                   │
│ Project details   │
└───────────────────┘
```

---

# Dimensões das teclas

Preferir:

```css
aspect-ratio: 1;
```

Exemplo:

```css
.deck-key {
  aspect-ratio: 1;
  width: 100%;
}
```

Isso mantém todas as teclas quadradas sem depender de valores fixos.

---

# Estrutura CSS sugerida

```css
.project-deck {
  display: flex;
  flex-direction: column;

  gap: 24px;

  padding: 24px;

  border-radius: 28px;

  background: #111;
}
```

Grid:

```css
.deck-grid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 16px;
}
```

Tecla:

```css
.deck-key {
  aspect-ratio: 1;

  border-radius: 12px;

  background: #222;

  border: 2px solid #333;

  cursor: pointer;

  transition:
    transform 150ms ease,
    box-shadow 150ms ease,
    border-color 150ms ease;
}
```

Hover:

```css
.deck-key:hover {
  transform: translateY(-3px);
}
```

Pressed:

```css
.deck-key:active {
  transform: translateY(2px);
}
```

---

# Animações

As animações devem ser curtas.

Sugestão:

```text
100ms — 200ms
```

Priorizar:

- transform;
- opacity;
- box-shadow;
- border-color.

Evitar:

- animações longas;
- perspective complexa;
- rotações exageradas;
- motion constante.

---

# Animação de seleção

Ao selecionar um projeto:

```text
click

↓    

key pressed

↓

selected state

↓

ProjectDisplay fade

↓

new content
```

Exemplo:

```css
.project-display {
  transition: opacity 150ms ease;
}
```

---

# Ícones dos projetos

Criar um pequeno sistema visual próprio.

Regras:

- SVG sempre que possível;
- formas simples;
- alto contraste;
- pouco texto;
- símbolos reconhecíveis;
- mesma área de segurança;
- mesma proporção visual.

Estrutura possível:

```text
/public/projects/icons/

tic-tac-toe.svg
teixeira.svg
no-pills.svg
aom.svg
ai-chat.svg
...
```

---

# Sistema visual dos ícones

Criar um canvas imaginário:

```text
64 x 64
```

Com safe area:

```text
48 x 48
```

Exemplo:

```text
┌────────────────────────┐
│                        │
│    ┌──────────────┐    │
│    │              │    │
│    │     ICON     │    │
│    │              │    │
│    └──────────────┘    │
│                        │
└────────────────────────┘
```

Isso evita que alguns ícones pareçam maiores que outros.

---

# Cores

O deck pode permanecer neutro.

Exemplo:

```text
background

#111
#181818
#202020
```

As cores dos projetos aparecem dentro das teclas.

Exemplo:

```ts
{
  accent: "#FFD600"
}
```

O `accent` pode ser utilizado em:

- borda da tecla selecionada;
- glow;
- ícone;
- pequenos detalhes do ProjectDisplay.

---

# Acessibilidade

Apesar do conceito visual, cada tecla deve continuar sendo um elemento de interface correto.

Preferir:

```tsx
<button>
```

em vez de:

```tsx
<div onClick={...}>
```

Exemplo:

```tsx
<button
  aria-label={`Open ${project.name}`}
  aria-pressed={active}
>
  <ProjectIcon />
</button>
```

---

# Navegação por teclado

O usuário deve conseguir utilizar:

```text
Tab
Enter
Space
```

Opcionalmente, no futuro:

```text
← ↑ ↓ →
```

para navegar pelo grid.

---

# Reduced motion

Respeitar:

```css
@media (
  prefers-reduced-motion:
  reduce
) {

  .deck-key {
    transition: none;
  }
}
```

---

# Foco

Não remover o outline sem substituição.

Exemplo:

```css
.deck-key:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 4px;
}
```

---

# Estrutura de arquivos sugerida

Exemplo:

```text
src/
└── components/
    └── projects/
        └── ProjectDeck/
            ├── ProjectDeck.tsx
            ├── ProjectDeck.module.css
            │
            ├── DeckGrid/
            │   └── DeckGrid.tsx
            │
            ├── DeckKey/
            │   ├── DeckKey.tsx
            │   └── DeckKey.module.css
            │
            ├── ProjectDisplay/
            │   └── ProjectDisplay.tsx
            │
            └── DeckNavigation/
                └── DeckNavigation.tsx
```

Dados:

```text
src/
└── data/
    └── projects.ts
```

Assets:

```text
public/
└── projects/
    └── icons/
```

---

# Possível API

```tsx
<ProjectDeck
  projects={projects}
  projectsPerPage={6}
/>
```

Internamente:

```tsx
const ProjectDeck = ({
  projects,
  projectsPerPage = 6
}) => {
  // selected project
  // current page
  // pagination
};
```

---

# MVP

O primeiro protótipo deve ser propositalmente simples.

## MVP 1

Implementar:

- corpo do deck;
- grid;
- 6 teclas;
- ícones;
- hover;
- pressed;
- selected;
- ProjectDisplay.

Não implementar inicialmente:

- knobs;
- filtros;
- perspectiva 3D;
- drag;
- animações complexas;
- múltiplos profiles;
- sons;
- customização pelo usuário.

---

# MVP 2

Adicionar:

- paginação;
- transição entre páginas;
- indicadores;
- reaproveitamento da lógica do carousel atual.

---

# MVP 3

Adicionar:

- categorias;
- filtros;
- animações mais refinadas;
- navegação com arrow keys;
- transições no ProjectDisplay.

---

# Possível evolução

No futuro o deck pode ter controles inspirados em knobs.

Exemplo:

```text
All      Web      AI      Games

 ○        ○        ○        ○
```

Cada controle poderia alterar a categoria exibida.

Mas esses controles só devem existir se tiverem função real.

Evitar elementos puramente decorativos.

---

# Outra possibilidade futura

Um botão pode não representar necessariamente um projeto.

Algumas teclas poderiam representar ações:

```text
GitHub

LinkedIn

Resume

Contact

All projects
```

Isso permitiria criar uma espécie de:

```text
João's Deck
```

em vez de apenas:

```text
Project Deck
```

Porém essa ideia deve ser avaliada depois do MVP.

---

# Critérios de sucesso

A implementação é considerada bem-sucedida se:

- todos os projetos forem visualmente coerentes dentro da seção;
- nenhum projeto depender de screenshot para ser reconhecido;
- a interação de tecla for imediatamente compreensível;
- o projeto selecionado estiver claramente identificado;
- o usuário conseguir acessar os detalhes do projeto em até um clique;
- o componente funcionar com teclado;
- o componente funcionar em mobile;
- adicionar um novo projeto exigir apenas adicionar dados + ícone.

---

# Critérios para evitar overengineering

Antes de adicionar qualquer feature perguntar:

> Essa feature ajuda o usuário a descobrir ou entender meus projetos?

Se a resposta for não, provavelmente não deve entrar.

Principalmente para:

- knobs;
- animações;
- luzes;
- sons;
- 3D;
- filtros;
- profiles;
- gestos.

---

# Ordem sugerida de implementação

## Etapa 1 — Figma

Criar:

```text
ProjectDeck
DeckKey
ProjectDisplay
```

Definir:

- tamanho;
- grid;
- espaçamento;
- border-radius;
- estados das teclas.

---

## Etapa 2 — Dados

Padronizar:

```ts
Project[]
```

Separar dados da UI.

---

## Etapa 3 — Grid

Implementar:

```tsx
DeckGrid
DeckKey
```

Sem animação inicialmente.

---

## Etapa 4 — Seleção

Implementar:

```tsx
selectedProjectId
```

e o estado visual da tecla.

---

## Etapa 5 — ProjectDisplay

Exibir informações do projeto ativo.

---

## Etapa 6 — Interações

Adicionar:

```text
hover
pressed
focus
selected
```

---

## Etapa 7 — Responsividade

Testar:

```text
desktop
tablet
mobile
```

---

## Etapa 8 — Paginação

Reaproveitar o carousel existente para navegar entre páginas do deck.

---

## Etapa 9 — Polish

Adicionar:

- transições;
- pequenos detalhes;
- accents;
- refinamentos visuais.

---

# Ideia central

O ponto principal da solução é mudar a responsabilidade visual.

Antes:

```text
Screenshot
   =
identidade visual do projeto
```

Depois:

```text
Deck
   =
identidade visual da seção

+

Icon
   =
identidade visual do projeto
```

Dessa forma, projetos completamente diferentes podem coexistir dentro da mesma interface sem gerar conflito visual.

---

# Resultado esperado

A seção deixa de parecer:

```text
"um carousel de projetos"
```

e passa a parecer:

```text
"uma interface criada especificamente
para explorar os projetos do João"
```

Essa diferença é o principal valor da ideia.
