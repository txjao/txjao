# Domínio Toast

## Responsabilidade

O domínio Toast fornece feedback compartilhado para ações temporariamente indisponíveis.

Ele é composto por um componente visual controlado e por um hook que permite reabrir a notificação mesmo quando acionada repetidamente.

## Entradas Do Domínio

- `src/components/toast/unavailable-toast.tsx`
- `src/components/toast/hooks/use-toast.ts`

## Contrato Do Componente

O consumidor fornece:

- `isOpen`;
- `onOpenChange`;
- textos localizados por `toastTexts`.

O consumidor também é responsável por montar `Toast.Provider` e um único `Toast.Viewport` no nível apropriado.

## Contrato Do Hook

`useUnavailableToast` retorna:

- estado de abertura;
- setter controlado;
- `showUnavailableToast` para disparar ou reiniciar a notificação.

O atraso curto entre fechar e reabrir permite que ações repetidas sejam anunciadas novamente. O timer precisa ser cancelado no cleanup.

## Fronteira Client

Componente e hook são client porque usam Radix Toast, estado, timers e eventos do navegador.

## Direção CMS

Título, descrição e label de fechamento podem vir do CMS como conteúdo localizado. Duração, direção de swipe, provider e comportamento permanecem no código.

## Estilos E Acessibilidade

- o componente usa Radix Toast para semântica e interação.
- o botão de fechar precisa de label localizada.
- ícone de fechar é decorativo.
- estados, animações e posicionamento visual complexo permanecem no CSS Module ou no viewport consumidor.
- preservar `focus-ring` e `hover-highlight`.

## Invariantes

- não montar um provider ou viewport para cada toast.
- não duplicar o hook dentro dos consumidores.
- limpar timers ao desmontar.
- manter o componente controlado.
- não usar Sonner.
- não transformar mensagens remotas em configuração arbitrária de comportamento.

## Antes De Alterar

1. localizar provider e viewport do consumidor.
2. verificar ações repetidas, fechamento e cleanup.
3. preservar textos e labels localizados.
4. revisar todos os consumidores antes de mudar o retorno do hook.
