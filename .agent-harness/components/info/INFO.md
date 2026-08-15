# Domínio Info

## Responsabilidade

O domínio Info apresenta identidade, imagem, descrição, lettering animado e links sociais do portfolio.

## Entrada Do Domínio

- `src/components/info/info.tsx`: composição server do domínio.

## Estrutura De Responsabilidades

```text
Info (server)
├── Bio
├── Lettering
│   └── AnimatedText (client)
│       └── useTypedText
└── IconList
    └── DiscordDialogIcon (client)
        └── DiscordDialog
```

- `Bio` renderiza o texto biográfico.
- `Lettering` compõe título, emoji e frases.
- `AnimatedText` isola a fronteira client exigida pela animação.
- `useTypedText` carrega `typed.js` dinamicamente e respeita preferência de movimento reduzido.
- `IconList` renderiza links sociais e delega a interação do Discord ao filho client.

## Fronteira Server/Client

- `Info`, `Bio`, `Lettering` e `IconList` permanecem server sempre que não precisarem de browser APIs.
- `AnimatedText` é client por usar o hook de animação.
- `DiscordDialogIcon` é client porque controla abertura do dialog.
- manter as fronteiras client nos descendentes específicos, evitando converter todo o domínio.

## Dados E Conteúdo Atual

`Info` recebe da rota:

- biografia localizada;
- texto alternativo da imagem;
- título e frases do lettering;
- textos localizados do dialog do Discord.

A imagem de perfil e os links sociais ainda são definidos localmente.

## Direção CMS

São candidatos ao CMS:

- biografia por locale;
- título e frases do lettering;
- imagem de perfil e metadados;
- links sociais, labels e ordem;
- disponibilidade de cada perfil.

A animação, o layout, os ícones permitidos e o dialog continuam no código. Um identificador vindo do CMS deve ser mapeado para um registry fechado de ícones, nunca para JSX ou imports arbitrários.

## Estilos

- o layout geral usa Tailwind.
- `lettering.module.css` concentra gradientes, animações e estilos coordenados do Lettering.
- estilos específicos de novos subcomponentes devem ficar dentro de seus domínios.
- preservar a responsividade da imagem e a leitura do texto em telas pequenas.

## Acessibilidade

- a imagem precisa de `alt` localizado.
- o texto animado visual permanece `aria-hidden` e possui conteúdo equivalente em `sr-only`.
- movimento reduzido deve mostrar uma frase estática e não iniciar `typed.js`.
- links sociais precisam de nomes acessíveis e foco visível.
- o controle do Discord deve continuar sendo um botão, não um link sem destino.

## Dependências De Outros Domínios

- `src/components/icons/`
- `src/components/discord-dialog/`
- `src/types/language-types.ts`
- `src/consts/url.consts.ts`
- `typed.js`

## Invariantes

- não transformar `Info` inteiro em Client Component por causa de dois descendentes interativos.
- não carregar `typed.js` no bundle server nem iniciar animação com movimento reduzido.
- não remover o texto acessível equivalente às frases animadas.
- manter links e conteúdo separados da estrutura visual para facilitar a migração ao CMS.
- não aceitar um componente de ícone arbitrário vindo do CMS.

## Antes De Alterar

1. identificar se a mudança afeta conteúdo, animação, imagem ou links.
2. ler os documentos de Icons ou DiscordDialog quando necessário.
3. verificar locale, server/client e movimento reduzido.
4. preservar a hierarquia semântica do título e da biografia.
5. atualizar este documento somente quando responsabilidades ou invariantes mudarem.
