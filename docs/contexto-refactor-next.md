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

### Dark Mode

Foi escolhido `next-themes`, nao uma implementacao manual.

O provider esta em:

- `src/components/providers/theme-provider.tsx`

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

Decisao: manter os icones proprios do projeto.

Nao adicionar biblioteca externa de icones.

Assets copiados para `public`:

- `public/icons/Moon.svg`
- `public/icons/sun.svg`
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

## Header

O Header foi portado da branch `dev` para Next + Tailwind.

Arquivo principal:

- `src/components/header/header.tsx`

Status:

- Desktop implementado.
- Mobile implementado com botao hamburger acessivel.
- Dropdowns desktop usam Radix `NavigationMenu`.
- Modal Discord usa Radix `Dialog`.
- Toast de certificados usa Radix `Toast`.
- Toggle de tema usa `next-themes`.
- Curriculo aponta para asset publico estavel.

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

### Transicoes Do Dropdown

Valores consultados da branch `dev`:

- Label: `transition: color 0.2s ease-in`
- Icone: `transition: transform 0.2s`
- Conteudo: `transition: height 0.5s ease`
- Labels internas: `transition: top 0.5s`

No Header atual, o dropdown usa:

- `duration-500`
- `ease-[ease]`
- transicao de `height`, `opacity` e `transform`
- `gap-2.5` para reproduzir o espacamento de `10px` da branch antiga

Observacao: houve uma tentativa de trocar `gap-2.5` por `margin-bottom`, mas ela foi desfeita a pedido do usuario.

## Arquivos Alterados/Criados

Arquivos alterados:

- `package.json`
- `pnpm-lock.yaml`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`

Arquivos/pastas criados:

- `src/components/providers/theme-provider.tsx`
- `src/components/header/header.tsx`
- `public/documents/`
- `public/icons/`
- `public/images/`

Possivel arquivo utilitario existente/criado durante o processo:

- `src/utils/handle-age.ts`

Constantes de idioma reaproveitadas:

- `src/consts/Languange.ts`

Observacao: o nome do arquivo `Languange.ts` parece ter typo, mas nao foi renomeado nesta etapa para evitar escopo extra.

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
- Manter icones proprios.
- Usar apenas Radix como UI primitive nova.
- Nao usar Sonner.
- Pensar em SDUI e i18n sem transformar a aplicacao inteira em client-side.
