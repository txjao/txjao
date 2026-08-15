# Domínio Icons

## Responsabilidade

O domínio Icons mantém o conjunto compartilhado de ícones próprios do portfolio como componentes React/SVG.

Ele fornece representação visual, não comportamento específico dos consumidores.

## Entradas Do Domínio

- `src/components/icons/index.ts`: API pública.
- `src/components/icons/types.ts`: contrato SVG compartilhado.
- arquivos `*-icon.tsx`: implementações individuais.

## Contrato Padrão

- cada ícone genérico aceita `IconProps`, baseado em `SVGProps<SVGSVGElement>`.
- SVG usa `currentColor` em `fill` ou `stroke`.
- SVG decorativo usa `aria-hidden="true"` e `focusable="false"`.
- dimensões padrão usam `1em`; o consumidor controla tamanho por `className`.
- cor e dark mode pertencem ao consumidor.
- ícones compartilhados são exportados por `index.ts`.

## Localização E Reutilização

- um ícone usado por domínios independentes permanece em `src/components/icons/`.
- uma ilustração ou símbolo exclusivo de um domínio deve permanecer nesse domínio.
- não promover automaticamente todo SVG específico para o conjunto global.
- assets de conteúdo remoto não se tornam componentes de ícone sem necessidade de comportamento vetorial controlado.

## Comportamento

Rotação, hover, loading e outras regras específicas pertencem ao consumidor.

`HamburgerIcon` é uma exceção atual porque recebe `isOpen` e representa dois estados visuais do mesmo controle. Não usar essa exceção como justificativa para acoplar comportamento a novos ícones genéricos.

## Novos Ícones

Ao adicionar um ícone compartilhado:

1. criar um componente específico em kebab-case.
2. reutilizar `IconProps` quando o contrato for SVG padrão.
3. usar `currentColor`.
4. manter `aria-hidden` e `focusable` seguros por padrão.
5. exportar pelo `index.ts`.
6. controlar tamanho, cor e comportamento no consumidor.
7. verificar light/dark sem criar arquivos duplicados.

## CMS E Conteúdo Remoto

- o CMS pode fornecer um identificador de ícone permitido.
- o código deve mapear esse identificador por um registry fechado e tipado.
- não aceitar SVG, JSX, URL ou nome de import arbitrário como componente executável.
- imagens editoriais e logos remotos seguem um contrato de asset, não a API de ícones genéricos.

## O Que Evitar

- bibliotecas externas de ícones para o conjunto atual.
- `next/image` para ícones de UI.
- referências a ícones por `/icons/name.svg` quando devem ser componentes.
- variantes duplicadas `*-dark.svg`.
- imports diretos de SVG de pastas antigas de assets.
- componentes utilitários que escolham arquivos SVG por string sem registry tipado.

## Invariantes

- preservar a API pública dos ícones consumidos.
- manter cor e tamanho controláveis externamente.
- não adicionar semântica interativa a um SVG decorativo.
- mudanças no `viewBox` ou path não devem alterar proporção sem revisar todos os consumidores.
