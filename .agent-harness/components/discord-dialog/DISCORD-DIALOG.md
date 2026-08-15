# Domínio DiscordDialog

## Responsabilidade

DiscordDialog é um componente compartilhado e controlado para apresentar o usuário do Discord, copiar esse identificador e abrir o Discord.

Ele é consumido por domínios independentes, atualmente Header e Info, portanto permanece na superfície de `src/components/`.

## Entrada Do Domínio

- `src/components/discord-dialog/discord-dialog.tsx`

## Contrato

O consumidor controla:

- `isOpen`;
- `onOpenChange`;
- textos localizados por `modalTexts`.

O domínio não deve assumir onde o gatilho visual está localizado.

## Fronteira Client

O componente é client porque usa:

- Radix Dialog;
- `navigator.clipboard`;
- `window.open`;
- callbacks de interação.

## Comportamento

- fechar cancela a interação sem efeitos adicionais.
- confirmar copia `DISCORD_USER`, fecha o dialog e abre `DISCORD_URL` em nova aba.
- URL e usuário atuais vêm de `src/consts/url.consts.ts`.

## Direção CMS

Usuário, URL e textos são candidatos a conteúdo remoto. Antes da migração:

- validar a URL no server;
- normalizar o identificador exibido/copiado;
- manter fallback local;
- preservar o contrato controlado do dialog.

Browser APIs continuam no componente client, mesmo que os dados venham do CMS.

## Estilos E Acessibilidade

- Radix fornece semântica, foco e portal.
- título e descrição devem permanecer localizados.
- botões usam `focus-ring` e `hover-highlight`.
- animações, overlay, dark mode e movimento reduzido ficam no CSS Module do domínio.
- o gatilho pertence ao consumidor e deve possuir nome acessível próprio.

## Invariantes

- manter o dialog controlado pelo consumidor.
- não duplicar o componente dentro de Header ou Info.
- não mover `window` ou Clipboard API para um Server Component.
- não abrir URL sem os parâmetros de segurança adequados.
- não substituir Radix ou introduzir Sonner para essa responsabilidade.

## Antes De Alterar

1. identificar todos os consumidores.
2. verificar abertura, fechamento, teclado e retorno de foco.
3. testar falhas ou indisponibilidade da Clipboard API quando o comportamento mudar.
4. ler `SDUI-CMS.md` se usuário ou URL passarem a ser remotos.
