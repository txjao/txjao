# Contexto Do Refactor Para Next

## Objetivo Geral

Este portfolio esta sendo refatorado para Next.js na branch `feat/refactor`.

A ideia maior do projeto e migrar a arquitetura para permitir SDUI no futuro, evitando deploys para alteracoes volateis como curriculo, links, textos, projetos pessoais e artigos.

O refactor esta sendo feito por etapas. Nesta fase, o foco foi a infraestrutura visual e o Header.

## Direcoes De Arquitetura

- O projeto deve seguir Next.js App Router.
- Componentes devem ser Server Components por padrao.
- Componentes devem virar Client Components apenas quando precisarem de interacao, estado, browser APIs ou primitives client-side.
- O Header e Client Component porque usa tema, menu, dialog e toast.
- A estrategia futura de idioma deve ser por rota, por exemplo `/pt-BR` e `/en-US`.
- O SDUI futuro deve ser resolvido no server a partir do `locale`, nao por um `LanguageContext` global client-side.
- Textos devem caminhar para props/dicionarios por rota quando a estrutura i18n for criada.

## Decisoes Tomadas

### Tailwind

O projeto usa Tailwind 4 com `@theme` em `src/app/globals.css`.

Tokens definidos:

- `blue`: `#009FE8`
- `yellow`: `#FFF000`
- `white`: `#FFFFFF`
- `white-secondary`: `#FAFAFA`
- `black`: `#050505`
- `black-secondary`: `#060606`

Classes esperadas:

- `bg-blue`
- `text-yellow`
- `bg-white-secondary`
- `dark:bg-black-secondary`

Utilities globais em `src/app/globals.css`:

- `focus-ring`: padrao acessivel de foco para elementos interativos.
- `hover-highlight`: padrao de hover com destaque visual do projeto.

Essas utilities seguem as cores de destaque atuais:

- tema claro: `blue`
- tema dark: `yellow`

### Padrao De Estilizacao

O projeto usa Tailwind no JSX para classes pequenas e obvias.

Quando uma classe fica extensa, ou quando a mesma composicao aparece mais de uma vez no mesmo componente, ela deve ser extraida para um arquivo `.styles.ts` no mesmo dominio do componente.

Padrao para componente simples:

```txt
component-name/
  component-name.tsx
  component-name.styles.ts
```

Padrao para dominio com subcomponentes:

```txt
component-name/
  component-name.tsx
  components/
  styles/
    shared-style.styles.ts
```

Regras atuais:

- estilos especificos de um componente ficam ao lado do `.tsx` que os consome.
- estilos compartilhados por varios subcomponentes do mesmo dominio ficam em `styles/` dentro do dominio.
- utilities realmente globais ficam em `src/app/globals.css` dentro de `@layer utilities`.
- classes curtas e autoexplicativas podem continuar no JSX, por exemplo `mt-1`, `size-4`, `font-medium`.
- evitar criar uma pasta `styles/` quando ela teria apenas um arquivo de estilo especifico.
- evitar colocar estilos especificos de componente em `globals.css`.
- usar `focus-ring` para foco visual de elementos interativos.
- usar `hover-highlight` para hover com cor de destaque.

Exemplos atuais:

- `src/components/header/styles/nav-link.styles.ts`: estilo compartilhado no dominio do Header.
- `src/components/header/components/desktop/components/desktop-dropdown.styles.ts`: estilo especifico do `DesktopDropdown`.
- `src/components/header/components/desktop/desktop-header.styles.ts`: estilo especifico do `DesktopHeader`.
- `src/components/header/components/mobile/mobile-header.styles.ts`: estilo especifico do `MobileHeader`.
- `src/components/discord-dialog/discord-dialog.styles.ts`: estilo especifico do `DiscordDialog`.
- `src/components/toast/unavailable-toast.styles.ts`: estilo especifico do `UnavailableToast`.

### Dark Mode

Foi escolhido `next-themes`, nao uma implementacao manual.

O provider esta em:

- `src/providers/theme-provider.tsx`

Ele usa:

- `attribute="class"`
- `defaultTheme="system"`
- `enableSystem`
- `disableTransitionOnChange`

O `layout.tsx` envolve a aplicacao com esse provider.

### Fontes

Foram mantidas as fontes do projeto antigo na branch `dev`:

- Poppins: pesos `400` e `500`
- Inter: peso `700`

Configuradas via `next/font/google` em `src/app/layout.tsx`.

### Icones

Decisao: manter os icones proprios do projeto como componentes React/SVG.

Nao adicionar biblioteca externa de icones.

Todos os icones de UI ficam em:

- `src/components/icons/`

Export central:

- `src/components/icons/index.ts`

Componentes existentes:

- `ArrowIcon`
- `ChevronIcon`
- `CloseIcon`
- `DiscordIcon`
- `FigmaIcon`
- `GithubIcon`
- `HamburgerIcon`
- `InstagramIcon`
- `LinkedinIcon`
- `MoonIcon`
- `SpotifyIcon`
- `SunIcon`
- `TwitterIcon`

Regras de implementacao:

- cada icone deve ser um componente especifico
- cada componente deve aceitar props de SVG via `IconProps`
- cada SVG deve usar `currentColor` em `fill` ou `stroke`
- cada SVG deve usar `aria-hidden="true"` e `focusable="false"` por padrao
- o tamanho deve ser controlado pelo consumidor com classes como `size-4`, `size-5` ou `size-8`
- a cor e o Dark Mode devem ser controlados pelo container com classes de texto, por exemplo `text-black dark:text-white`
- comportamento especifico do lugar de uso deve ficar no consumidor, nao dentro do icone generico
- exemplo: a rotacao do `ChevronIcon` do dropdown fica em `DesktopDropdown`, nao em `ChevronIcon`
- o `HamburgerIcon` e excecao parcial porque representa estado visual e recebe `isOpen`

Exemplo de uso:

```tsx
<button className="focus-ring hover-highlight text-black dark:text-white">
  <CloseIcon className="size-4" />
</button>
```

O que evitar:

- nao usar `next/image` para icones de UI
- nao referenciar icones de UI por URL publica como `/icons/name.svg`
- nao recriar variantes `*-dark.svg`
- nao importar SVG diretamente de `src/assets`
- nao recriar utilitarios antigos como `SocialMediaIcons` baseado em arquivo SVG
- nao adicionar biblioteca externa de icones para o set atual

Assets estaticos copiados para `public`:

- `public/images/favicon.png`

### UI Primitives

Decisao: usar Radix como unica lib nova de UI primitive.

Nao usar Sonner.

Uso atual:

- `NavigationMenu` para dropdowns desktop com hover/focus
- `Dialog` para modal Discord
- `Toast` para aviso de certificados indisponiveis

Dependencias adicionadas:

- `next-themes`
- `radix-ui`

### Pastas Compartilhadas

As regras genericas ficam fora dos dominios de componentes. Os dominios consomem essas camadas, mas nao devem ser donos delas.

- `src/lang/`: dicionarios/textos por idioma.
- `src/types/`: tipos compartilhados, incluindo `Locale` e tipos de textos.
- `src/consts/`: constantes compartilhadas, como URLs, e-mail, logo e usuario Discord.
- `src/utils/`: utilitarios compartilhados, como resolucao de locale.
- `src/providers/`: providers globais da aplicacao.

Arquivos atuais:

- `src/lang/en-us.lang.ts`
- `src/lang/pt-br.lang.ts`
- `src/types/language-types.ts`
- `src/consts/url.consts.ts`
- `src/utils/handle-lang.ts`
- `src/providers/theme-provider.tsx`

## Header

O Header foi portado da branch `dev` para Next + Tailwind.

Arquivo principal:

- `src/components/header/header.tsx`

Status:

- Desktop implementado.
- Mobile implementado com botao hamburger acessivel.
- Dropdowns desktop usam Radix `NavigationMenu`.
- Modal Discord usa Radix `Dialog`.
- Toast de certificados usa Radix `Toast`, mas o componente e o hook ficam fora do dominio `header`.
- Toggle de tema usa `next-themes`.
- Curriculo aponta para asset publico estavel.

Componentes externos compostos pelo Header:

- `src/components/discord-dialog/discord-dialog.tsx`
- `src/components/toast/unavailable-toast.tsx`
- `src/components/toast/hooks/use-toast.ts`

Asset do curriculo:

- `public/documents/Joao_Teixeira_Mid-level_Fullstack_Developer.pdf`

### Visual Do Header

O objetivo visual e manter o Header equivalente ao site em producao:

- Logo central
- Links Linkedin e Github
- Toggle de tema
- Dropdown `Contact Me`
- Dropdown `Me`
- Toggle de idioma `PT`/`EN`

Site de referencia:

- `https://www.txjao.dev/`

### Estilos Do Dropdown

Os estilos especificos do dropdown desktop ficam em:

- `src/components/header/components/desktop/components/desktop-dropdown.styles.ts`

Padroes atuais:

- o container do conteudo usa `clip-path`, `transform` e `opacity` para abrir/fechar.
- os itens internos usam transicao de `opacity`.
- o espacamento interno entre itens usa `gap-2.5`.
- o gatilho do dropdown usa `focus-ring`.
- a rotacao do `ChevronIcon` continua no consumidor, nao no icone generico.

## Arquivos Alterados/Criados

Arquivos alterados:

- `package.json`
- `pnpm-lock.yaml`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`

Arquivos/pastas criados:

- `src/providers/theme-provider.tsx`
- `src/components/header/header.tsx`
- `src/components/header/header-client.tsx`
- `src/components/header/styles/nav-link.styles.ts`
- `src/components/header/components/desktop/desktop-header.tsx`
- `src/components/header/components/desktop/desktop-header.styles.ts`
- `src/components/header/components/desktop/components/desktop-dropdown.tsx`
- `src/components/header/components/desktop/components/desktop-dropdown.styles.ts`
- `src/components/header/components/mobile/mobile-header.tsx`
- `src/components/header/components/mobile/mobile-header.styles.ts`
- `src/components/header/components/language-toggle.tsx`
- `src/components/header/components/theme-toggle.tsx`
- `src/components/discord-dialog/discord-dialog.tsx`
- `src/components/discord-dialog/discord-dialog.styles.ts`
- `src/components/toast/unavailable-toast.tsx`
- `src/components/toast/unavailable-toast.styles.ts`
- `src/components/toast/hooks/use-toast.ts`
- `src/consts/url.consts.ts`
- `src/lang/en-us.lang.ts`
- `src/lang/pt-br.lang.ts`
- `src/types/language-types.ts`
- `src/utils/handle-lang.ts`
- `public/documents/`
- `public/images/`
- `src/components/icons/`

Possivel arquivo utilitario existente/criado durante o processo:

- `src/utils/handle-age.ts`

Constantes de idioma reaproveitadas e reorganizadas:

- `src/consts/Languange.ts` foi dividido entre `src/lang/` e `src/types/language-types.ts`.

## Pontos Importantes Para O Proximo Chat

- O usuario prefere executar `pnpm lint` e `pnpm build` manualmente.
- Evitar rodar lint/build sem necessidade.
- O projeto esta no WSL, mas o Codex app acessa por UNC no Windows.
- `apply_patch` pode falhar nesse workspace por causa do caminho UNC.
- Quando isso acontecer, usar uma edicao pontual e cuidadosa via PowerShell/.NET ou WSL, mantendo UTF-8 sem BOM.
- Houve um erro anterior do Turbopack lendo `package.json` como JSON invalido. O arquivo foi validado depois:
  - JSON valido
  - sem BOM
  - sem byte nulo
  - `radix-ui` e `next-themes` instalados no lockfile e em `node_modules`
- Se o erro voltar, recomendar parar o dev server, remover `.next` e iniciar novamente.

## Comandos Uteis

Validar JSON do `package.json`:

```bash
python3 -m json.tool package.json >/dev/null
```

Rodar o projeto:

```bash
pnpm dev
```

Caso Turbopack mantenha cache antigo:

```bash
rm -rf .next
pnpm dev
```

Testes que o usuario pretende rodar manualmente:

```bash
pnpm lint
pnpm build
```

## Proximas Etapas Provaveis

1. Refinar o Header ate ficar 1:1 com producao.
2. Portar Hero/Info/Lettering/social links da branch `dev`.
3. Estruturar rotas de idioma `/pt-BR` e `/en-US`.
4. Adaptar textos para dicionarios server-side por locale.
5. Criar base para SDUI no server.
6. Adicionar carrossel de projetos pessoais.
7. Adicionar secao de artigos consumindo Medium inicialmente.
8. Avaliar no futuro ferramenta propria de escrita/artigos.

## Preferencias Do Usuario

- Responder em portugues.
- Ir por etapas.
- Nao fazer mudancas fora do escopo combinado.
- Manter visual atual do portfolio como referencia.
- Manter icones proprios como componentes React/SVG.
- Usar apenas Radix como UI primitive nova.
- Nao usar Sonner.
- Pensar em SDUI e i18n sem transformar a aplicacao inteira em client-side.
