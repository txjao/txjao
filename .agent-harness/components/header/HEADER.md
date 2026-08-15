# Domínio Header

## Responsabilidade

O Header fornece navegação global, troca de idioma e tema, acesso a contato/currículo e feedback para ações indisponíveis.

Ele possui uma fronteira server/client explícita para manter locale e textos no server sem perder as interações necessárias no navegador.

## Entradas Do Domínio

- `src/components/header/header.tsx`: entrada server e resolução de textos por locale.
- `src/components/header/header-client.tsx`: orquestrador client de estado e componentes interativos.

## Estrutura De Responsabilidades

```text
Header (server)
└── HeaderClient (client)
    ├── DesktopHeader
    │   └── DesktopDropdown
    ├── MobileHeader
    ├── LanguageToggle
    ├── ThemeToggle
    ├── DiscordDialog
    └── UnavailableToast
```

- `utils/get-texts.ts` seleciona os dicionários do Header pelo locale.
- `hooks/use-hide-header.ts` controla visibilidade, scroll e estado fixado.
- `styles/header-client.module.css` controla posicionamento e transições do shell.
- `styles/nav-link.module.css` compartilha o contrato visual dos links.
- componentes internos mantêm estilos específicos em seus próprios domínios.

## Fronteira Server/Client

- `Header` permanece Server Component.
- `HeaderClient` é client porque coordena menu mobile, dialog, toast e visibilidade.
- componentes interativos internos podem declarar sua própria fronteira client quando necessário.
- locale e textos devem chegar resolvidos ao client.
- não introduzir contexto global client-side para idioma.

## Estado E Interações

- o menu mobile fixa o Header enquanto está aberto.
- fechar o menu devolve o controle de visibilidade ao comportamento de scroll.
- o dialog do Discord é controlado pelo `HeaderClient`.
- o toast de certificados é controlado pelo hook compartilhado de toast.
- o toggle de idioma navega para a rota do outro locale.
- o toggle de tema usa `next-themes`.
- dropdowns desktop usam Radix `NavigationMenu`.

## Conteúdo Atual E CMS

Atualmente, textos vêm dos dicionários locais e links vêm de `src/consts/url.consts.ts`.

São candidatos ao CMS:

- labels e itens de navegação;
- links externos e de contato;
- itens e ordem dos dropdowns;
- URL e label do currículo;
- mensagens do dialog e toast;
- visibilidade de itens permitidos.

A composição desktop/mobile, as ações, primitives e regras de segurança continuam no código. Conteúdo remoto deve ser resolvido e validado no server antes de chegar ao `HeaderClient`.

## Estilos

- Tailwind cobre layout e utilities curtas.
- CSS Modules cobrem transições, estados por atributos e animações.
- `ThemeToggle` mantém hover e `@keyframes` em módulo por legibilidade.
- `focus-ring` deve permanecer em todos os controles relevantes.
- o visual desktop e mobile deve continuar equivalente ao portfolio atual.

## Acessibilidade

- o botão mobile mantém `aria-expanded` e label localizado de abrir/fechar.
- conteúdo mobile inativo não pode permanecer navegável; preservar `inert` e `aria-hidden`.
- dropdowns devem continuar acessíveis por teclado e foco.
- logo precisa de texto alternativo localizado.
- ícones decorativos não recebem foco nem nome acessível próprio.

## Dependências De Outros Domínios

- `src/components/discord-dialog/`
- `src/components/toast/`
- `src/components/icons/`
- `src/providers/theme-provider.tsx`
- `src/lang/` e `src/types/language-types.ts`
- `src/consts/url.consts.ts`

## Invariantes

- preservar a fronteira `Header` server → `HeaderClient` client.
- não duplicar versões desktop/mobile de regras que possam ser compartilhadas.
- não mover comportamento específico para ícones genéricos.
- não ocultar o Header enquanto o menu mobile estiver aberto.
- não hardcodar um novo locale fora das constantes compartilhadas.
- manter dialog e toast como instâncias controladas, sem criar uma instância por item.

## Antes De Alterar

1. identificar se a mudança é conteúdo, estrutura ou interação.
2. ler também os documentos de Toast, DiscordDialog ou Icons quando afetados.
3. verificar desktop, mobile, teclado, scroll e dark mode.
4. manter textos e labels preparados para resolução server-side.
5. atualizar este documento somente se o contrato ou as responsabilidades mudarem.
