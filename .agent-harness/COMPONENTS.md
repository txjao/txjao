# Criação E Organização De Componentes

Este documento é a referência transversal para criar, refatorar ou mover componentes no projeto.

## Princípio Central

O projeto organiza componentes por domínio e responsabilidade:

- quanto mais específico for um artefato, mais próximo e profundo ele deve ficar do consumidor;
- quanto mais genérico ou reutilizado, mais próximo da superfície e do ancestral comum ele deve ficar;
- elevar um artefato somente quando existir reutilização real, não por antecipação;
- evitar pastas globais para regras que pertencem a um único domínio.

Essa organização é uma arquitetura por domínio em camadas. A hierarquia da pasta deve tornar visível quem é responsável por cada componente, estilo, tipo ou regra.

## Estrutura De Referência

```text
component-name/
├── component-name.tsx
├── component-name-client.tsx
├── components/
│   └── child-component/
│       ├── child-component.tsx
│       └── styles/
│           └── child-component.module.css
├── hooks/
├── consts/
├── styles/
├── types/
└── utils/
```

Criar apenas as pastas necessárias. Uma pasta vazia ou criada para uma abstração futura não agrega arquitetura.

## Componentes E Subdomínios

- um componente usado apenas por outro deve ficar dentro do domínio do consumidor.
- componentes irmãos compartilhados ficam no ancestral comum mais próximo.
- componentes reutilizados por domínios independentes podem subir para `src/components/`.
- cada subdomínio deve expor um ponto de entrada claro, normalmente o arquivo com o mesmo nome da pasta.
- não criar arquivos `index.ts` em todos os níveis apenas para encurtar imports; usar barrel quando ele representar uma API pública real.
- preservar a direção das dependências: filhos podem consumir contratos da superfície, mas detalhes privados de um filho não devem vazar para domínios irmãos.

## Server E Client Components

- componentes são Server Components por padrão.
- adicionar `"use client"` somente quando houver estado, eventos, browser APIs, hooks client-side ou primitives que exijam o client.
- manter a fronteira client o mais profunda possível quando a interatividade for localizada.
- quando o domínio inteiro precisar coordenar estados e componentes interativos, usar um orquestrador `*-client.tsx` e manter a preparação de dados no componente server.
- resolver locale, CMS, validação e normalização no server sempre que possível.
- enviar ao client apenas props serializáveis e já seguras para consumo.
- não introduzir contexto client global para idioma ou conteúdo que pode ser resolvido por rota.

## Props E Types

- props exclusivas de um componente permanecem no mesmo arquivo quando tiverem até 10 propriedades.
- props com mais de 10 propriedades devem ir para `types/` dentro do domínio daquele componente.
- props reutilizadas por mais de um componente devem subir para o `types/` do ancestral comum mais próximo, independentemente da quantidade de campos.
- modelos de domínio compartilhados seguem a mesma regra de ancestral comum.
- tipos globais em `src/types/` devem ser realmente transversais à aplicação.
- tipos auxiliares simples e exclusivos, como unions de estado ou extensões de `CSSProperties`, permanecem junto do consumidor.
- não criar `types/` apenas para mover uma interface curta para longe do componente.

## Utils, Hooks E Constantes

- uma função simples usada por um único arquivo permanece nesse arquivo.
- extrair para `utils/` quando a lógica for complexa, tiver responsabilidade própria ou for reutilizada no domínio.
- utils compartilhados sobem somente até o ancestral comum mais próximo.
- hooks seguem a mesma regra e ficam em `hooks/` no domínio que possui o estado ou efeito.
- deixar `useEffect` concentrado em assinar, sincronizar e limpar efeitos; regras de decisão devem usar funções e condições nomeadas quando isso melhorar a leitura.
- constantes exclusivas permanecem no componente quando forem pequenas.
- coleções, configurações ou contratos estáticos com responsabilidade própria ficam em `consts/` dentro do domínio consumidor.
- constantes globais em `src/consts/` precisam ser usadas por domínios independentes.

## Tailwind E CSS Modules

Tailwind é a primeira escolha para estilos pequenos, diretos e legíveis no JSX.

Usar CSS Modules quando o equivalente em Tailwind ficar verboso, difícil de entender ou exigir recursos do CSS nativo, incluindo:

- `@keyframes` e animações;
- pseudo-elementos;
- seletores relacionais ou descendentes;
- estados coordenados por `data-*`;
- media queries e container queries complexas;
- gradientes extensos, filtros, máscaras e múltiplas sombras;
- regras que dependem de vários elementos internos do mesmo componente.

Um módulo não precisa ser grande para ser justificável. O `ThemeToggle`, por exemplo, mantém apenas o hover e o `@keyframes` no módulo porque representar essa animação em Tailwind reduziria a legibilidade.

Regras de localização:

- CSS específico fica em `styles/` dentro do domínio do componente consumidor.
- CSS compartilhado por descendentes fica no `styles/` do ancestral comum mais próximo.
- estilos simples podem continuar em Tailwind mesmo quando o componente também usa um módulo.
- CSS Modules usam classes em `camelCase` e são importados como `styles` ou por um nome que identifique o contrato compartilhado.
- consumir tokens globais por variáveis CSS, como `var(--color-black)`.
- estilos específicos de componentes não devem ir para `globals.css`.
- utilities globais ficam em `src/app/globals.css` dentro de `@layer utilities`.
- usar `focus-ring` para foco interativo e `hover-highlight` quando o destaque global for adequado.
- breakpoints explícitos e valores que representam tela devem ser escritos em `px`.
- não criar arquivos `.styles.ts` para armazenar strings de Tailwind.

## Lógica E Legibilidade

- preferir condições declarativas com nomes que expressem a decisão de negócio.
- manter comparações triviais inline quando forem imediatamente compreensíveis.
- early returns com apenas `return` devem permanecer inline.
- funções de evento devem ter nomes que expressem a ação, como `handleProjectOpen`.
- não extrair funções ou componentes que apenas escondam código sem criar uma responsabilidade clara.
- evitar comentários que repitam o código; documentar somente restrições ou decisões não evidentes.

## Acessibilidade E Interação

- preservar semântica nativa de links, botões, títulos, listas e regiões.
- controles somente visuais precisam de nome acessível localizado quando aplicável.
- ícones decorativos devem permanecer ocultos da árvore de acessibilidade.
- componentes interativos devem manter foco visível e navegação por teclado.
- animações devem respeitar `prefers-reduced-motion` quando forem contínuas ou relevantes.
- dialogs, menus e toasts devem preferir primitives Radix já adotadas no projeto.
- não usar Sonner.

## Ícones

- usar os componentes SVG próprios de `src/components/icons/`.
- não adicionar biblioteca externa para o conjunto atual.
- ícones genéricos usam `currentColor`; tamanho e cor pertencem ao consumidor.
- comportamento específico, como rotação ou estado visual, pertence ao consumidor sempre que o ícone puder continuar genérico.
- novos ícones compartilhados devem ser exportados pela API pública do domínio de ícones.

## Checklist Para Criar Ou Refatorar

1. identificar o domínio responsável e os consumidores reais.
2. definir a fronteira Server/Client antes de criar arquivos.
3. colocar cada artefato no nível mais específico possível.
4. manter props locais ou extrair conforme as regras de complexidade e reutilização.
5. começar os estilos em Tailwind e promover apenas a parte complexa para CSS Module.
6. verificar acessibilidade, locale e serialização de props.
7. evitar dependências ou abstrações antecipadas.
8. preservar contratos e comportamento fora do escopo aprovado.
9. ler o documento do domínio antes da alteração.
10. atualizar o harness apenas se a mudança alterar contratos, responsabilidades ou invariantes.
