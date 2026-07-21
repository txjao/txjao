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

### Padrao De Logica JS/TS

Ao escrever logica em JavaScript/TypeScript, preferir condicionais declarativas nomeadas antes de blocos `if`.

Regras:

- evitar condicionais compostas diretamente no `if` quando a intencao de negocio nao estiver imediata.
- extrair condicoes para `consts` com nomes que expliquem a regra, como `hasScrolledUp`, `shouldHideHeader` ou `shouldSkipVisibilityUpdate`.
- preferir nomes que expressem a decisao ou estado real, nao apenas a comparacao tecnica.
- manter comparacoes triviais inline quando elas forem obvias e nao reduzirem legibilidade.
- early returns devem ser inline quando a unica acao for `return`, por exemplo `if (shouldSkipUpdate) return;`.
- condicionais com uma unica acao devem ser inline, mantendo a condicao declarativa nomeada antes do `if` quando a regra nao for trivial.
- em hooks, deixar `useEffect` focado em assinar/limpar efeitos quando possivel; regras de decisao podem ficar em funcoes nomeadas e consts declarativas.

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

Quando o estilo fica extenso ou envolve animacoes, pseudo-elementos, seletores relacionais, media queries ou estados por atributos `data-*`, usar CSS Modules com sintaxe CSS nativa.

Padrao para estilo especifico de um componente:

```txt
component-name/
  component-name.tsx
  styles/
    component-name.module.css
```

Padrao para estilo compartilhado por componentes em camadas diferentes do mesmo dominio:

```txt
component-name/
  component-name.tsx
  components/
  styles/
    shared-style.module.css
```

Regras atuais:

- estilos especificos de um componente ficam em `styles/` dentro da mesma camada do dominio do `.tsx` consumidor.
- estilos compartilhados por componentes de camadas diferentes ficam no `styles/` do ancestral comum mais proximo dentro do dominio.
- arquivos de CSS Module usam o sufixo `.module.css` e sao importados como objeto `styles` ou com um nome que identifique o dominio, como `navLinkStyles`.
- nomes de classes dos CSS Modules devem preferir `camelCase`, permitindo acessos como `styles.menuPanel`.
- usar CSS nativo nos modules e consumir tokens globais por CSS variables, como `var(--color-black)` e `var(--color-white-secondary)`.
- nao criar novos arquivos `.styles.ts` apenas para agrupar strings de classes Tailwind; arquivos legados desse tipo devem ser migrados quando o respectivo dominio for refatorado.
- utilities realmente globais ficam em `src/app/globals.css` dentro de `@layer utilities`.
- classes curtas e autoexplicativas podem continuar no JSX, por exemplo `mt-1`, `size-4`, `font-medium`.
- combinar CSS Modules com utilities globais ou classes Tailwind curtas no `className` quando isso mantiver a intencao clara, por exemplo `${styles.link} focus-ring text-center`.
- valores que representam tamanhos de tela ou breakpoints devem ser escritos em `px`, inclusive em media queries e variantes responsivas arbitrarias do Tailwind.
- evitar colocar estilos especificos de componente em `globals.css`.
- usar `focus-ring` para foco visual de elementos interativos.
- usar `hover-highlight` para hover com cor de destaque.

Exemplos atuais:

- `src/components/header/styles/header-client.module.css`: estilo especifico do `HeaderClient`, mantido no `styles/` da raiz do dominio.
- `src/components/header/styles/nav-link.module.css`: estilo compartilhado por varios componentes do Header.
- `src/components/header/components/mobile/styles/mobile-header.module.css`: estilo especifico do `MobileHeader`.
- `src/components/header/components/desktop/components/styles/desktop-dropdown.module.css`: estilo especifico do `DesktopDropdown`.

### Dark Mode

Foi escolhido `next-themes`, nao uma implementacao manual.

O provider esta em:

- `src/providers/theme-provider.tsx`

Ele usa:

- `attribute="class"`
- `defaultTheme="system"`
- `enableSystem`
- `disableTransitionOnChange`

O `src/app/[locale]/layout.tsx` envolve a aplicacao com esse provider.

### Rotas E Locale

A aplicacao usa rotas localizadas no App Router:

- `/en-US`
- `/pt-BR`

Arquivos principais:

- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx`

Regras:

- o `lang` do HTML deve ser definido no layout localizado com base no `locale` da rota.
- `generateStaticParams` deve usar `SUPPORTED_LOCALES`.
- `dynamicParams = false` deve impedir rotas de locale nao suportado.
- `isLocale` deve validar valores dinamicos antes de usa-los como `Locale`.
- `notFound()` deve ser usado quando o parametro de rota nao for um locale valido.
- novas linguagens devem ser adicionadas em `src/consts/language.consts.ts`.

### SEO E Metadados

O dominio canonico do portfolio fica centralizado em:

- `src/consts/site.consts.ts`

Metadados por locale ficam no layout localizado:

- `src/app/[locale]/layout.tsx`

Padroes atuais:

- `metadataBase` usa `https://www.txjao.dev`.
- `alternates.languages` gera `hreflang` para `/en-US`, `/pt-BR` e `x-default`.
- `alternates.canonical` deve apontar para a rota do locale atual.
- `robots.txt` e gerado por `src/app/robots.ts`.
- `sitemap.xml` e gerado por `src/app/sitemap.ts`.

Regras:

- nao escrever manualmente tags `<link rel="alternate">` no JSX.
- preferir Metadata API do Next para canonical, hreflang, robots e sitemap.
- novas rotas indexaveis devem ser adicionadas ao sitemap quando forem criadas.
- URLs absolutas devem usar `SITE_URL`, evitando string duplicada em varios arquivos.
- novas linguagens devem ser adicionadas em `SUPPORTED_LOCALES`; isso alimenta rotas estaticas, `hreflang` e sitemap.

Responsabilidades:

- `robots.ts`: gera `/robots.txt`, libera o rastreamento do site e aponta para `/sitemap.xml`.
- `sitemap.ts`: gera `/sitemap.xml` com as rotas publicas indexaveis.
- `generateMetadata` no layout localizado: gera title, description, canonical e alternates por locale.
- `site.consts.ts`: centraliza dominio, titulo e descricao base do portfolio.

Observacoes:

- `robots.txt` nao e mecanismo de seguranca; ele apenas orienta crawlers.
- `sitemap.xml` ajuda buscadores a descobrirem URLs importantes, mas nao garante indexacao.
- `lastModified: new Date()` e aceitavel nesta fase, mas pode ser trocado no futuro por uma data real de atualizacao do conteudo.
- `priority` e `changeFrequency` sao sugestoes para buscadores, nao garantias de ranking ou frequencia de crawl.

### Fontes

Foram mantidas as fontes do projeto antigo na branch `dev`:

- Poppins: pesos `400` e `500`
- Inter: peso `700`

Configuradas via `next/font/google` em `src/app/[locale]/layout.tsx`.

### Icone Do Site E Logo

Icone de aba/favicon:

- `src/app/icon.svg`

Logo usada na interface:

- `public/images/logo.svg`

Regras:

- favicon/icon do site deve ficar no App Router como `src/app/icon.svg`, para o Next gerar os metadados automaticamente.
- logo de UI deve ficar em `public/images/` e ser consumida pelos componentes com URL publica.
- manter dimensoes quadradas para evitar warning de proporcao no Lighthouse.
- se o asset for SVG, preferir SVG vetorial real; SVG com imagem base64 embutida funciona, mas tem menos beneficio que vetor puro.
- evitar manter favicon antigo duplicado em `public/favicon.ico` ou `public/images/favicon.png` quando ele nao for mais usado.

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

- `public/images/logo.svg`
- `public/documents/Joao_Teixeira_Mid-level_Fullstack_Developer.pdf`

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
- `src/consts/language.consts.ts`
- `src/consts/site.consts.ts`
- `src/consts/url.consts.ts`
- `src/utils/handle-lang.ts`
- `src/utils/is-locale.ts`
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
- `src/components/header/types/header.types.ts`

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

- `src/components/header/components/desktop/components/styles/desktop-dropdown.module.css`

Padroes atuais:

- o container do conteudo usa `clip-path`, `translate` e `opacity` para abrir/fechar.
- os itens internos usam transicao de `opacity`.
- o espacamento interno entre itens equivale a `gap-2.5` (`0.625rem`).
- o gatilho do dropdown usa `focus-ring`.
- a rotacao do `ChevronIcon` continua no consumidor, nao no icone generico.

## Arquivos Alterados/Criados

Arquivos principais alterados/criados ate agora:

- `package.json`
- `pnpm-lock.yaml`
- `src/app/globals.css`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/icon.svg`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/consts/url.consts.ts`
- `src/consts/language.consts.ts`
- `src/consts/site.consts.ts`
- `src/lang/en-us.lang.ts`
- `src/lang/pt-br.lang.ts`
- `src/types/language-types.ts`
- `src/utils/handle-lang.ts`
- `src/utils/is-locale.ts`
- `src/providers/theme-provider.tsx`

Dominios/pastas criados ou reorganizados:

- `src/app/[locale]/`
- `src/components/header/header.tsx`
- `src/components/header/header-client.tsx`
- `src/components/header/types/header.types.ts`
- `src/components/header/styles/header-client.module.css`
- `src/components/header/styles/nav-link.module.css`
- `src/components/header/components/desktop/desktop-header.tsx`
- `src/components/header/components/desktop/components/desktop-dropdown.tsx`
- `src/components/header/components/desktop/components/styles/desktop-dropdown.module.css`
- `src/components/header/components/mobile/mobile-header.tsx`
- `src/components/header/components/mobile/styles/mobile-header.module.css`
- `src/components/header/components/language-toggle.tsx`
- `src/components/header/components/theme-toggle.tsx`
- `src/components/discord-dialog/discord-dialog.tsx`
- `src/components/discord-dialog/styles/discord-dialog.module.css`
- `src/components/toast/unavailable-toast.tsx`
- `src/components/toast/styles/unavailable-toast.module.css`
- `src/components/toast/hooks/use-toast.ts`
- `public/documents/`
- `public/images/`
- `src/components/icons/`

Possivel arquivo utilitario existente/criado durante o processo:

- `src/utils/handle-age.ts`

Constantes de idioma reaproveitadas e reorganizadas:

- `src/consts/Languange.ts` foi dividido entre `src/lang/`, `src/types/language-types.ts`, `src/consts/language.consts.ts` e `src/utils/is-locale.ts`.

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
3. Adaptar textos para dicionarios server-side por locale.
4. Criar base para SDUI no server.
5. Adicionar carrossel de projetos pessoais.
6. Adicionar secao de artigos consumindo Medium inicialmente.
7. Avaliar no futuro ferramenta propria de escrita/artigos.

## Preferencias Do Usuario
- Explicar as mudancas antes de executa-las, após explicar o usuário irá avalia-las e explicar o que deve ser feito em sequencia
- Antes de propor ou implementar uma mudanca, validar se ela segue as regras deste `AGENTS.md`.
- A aprovacao do usuario autoriza somente o escopo combinado que tambem esteja de acordo com esta documentacao.
- Se uma solucao proposta e aprovada contrariar o `AGENTS.md`, avisar explicitamente qual regra seria desrespeitada antes de executar qualquer alteracao.
- Nao interpretar a aprovacao como autorizacao implicita para ignorar ou sobrescrever a documentacao.
- Responder em portugues.
- Ir por etapas.
- Nao fazer mudancas fora do escopo combinado.
- Manter visual atual do portfolio como referencia.
- Manter icones proprios como componentes React/SVG.
- Usar apenas Radix como UI primitive nova.
- Nao usar Sonner.
- Pensar em SDUI e i18n sem transformar a aplicacao inteira em client-side.
