# Domínio Projects

## Responsabilidade

O domínio Projects prepara, apresenta e permite abrir projetos pessoais por meio da interface Project Deck.

## Entradas Do Domínio

- `src/components/projects/projects.tsx`: entrada server e preparação dos projetos localizados.
- `src/components/projects/projects-client.tsx`: orquestrador client de seleção, paginação e dialog.

## Estrutura De Responsabilidades

```text
Projects (server)
└── ProjectsClient (client)
    ├── ProjectDeck
    │   ├── DeckGrid
    │   │   └── DeckKey
    │   │       └── ProjectSymbol
    │   ├── DeckMusicPlayer
    │   ├── DeckNavigation
    │   └── ProjectDisplay
    └── ProjectDialog
```

- `consts/project.consts.ts` contém as definições locais atuais.
- `types/project.types.ts` contém os modelos compartilhados do domínio.
- cada subdomínio possui seus estilos e contratos no nível mais específico possível.
- `ProjectDeckProps`, por ter mais de 10 campos, fica em `project-deck/types/`.

## Fronteira Server/Client

- `Projects` permanece server e combina definições estruturais com textos localizados.
- `ProjectsClient` controla o projeto ativo, página, projeto do dialog e carregamento do iframe.
- componentes descendentes sem hooks não precisam declarar uma nova fronteira client.
- `DeckMusicPlayer` é client por carregar a iFrame API, observar a visibilidade do painel e sincronizar o estado compartilhado entre o deck e o player flutuante.
- `ProjectDialog` é client por usar Radix Dialog e eventos do iframe.

## Comportamento Atual

- cada página possui até oito posições.
- foco ou pointer enter atualiza o projeto apresentado.
- clique em uma tecla abre o dialog do projeto.
- paginação aparece apenas quando existe mais de uma página.
- mudar de página seleciona o primeiro projeto daquela página.
- existe uma única instância de `ProjectDialog` para todo o domínio.
- o iframe é montado somente quando o dialog possui um projeto aberto.
- o player seleciona no cliente uma faixa aleatória do snapshot local da playlist e exibe nome e artista.
- play e pause controlam um único Spotify Embed montado fora da área visível por meio da iFrame API; próxima escolhe uma faixa aleatória diferente da atual e anterior percorre o histórico real de reprodução.
- durante uma troca, os controles ficam bloqueados e os metadados atuais permanecem visíveis até o Spotify confirmar a faixa solicitada; eventos atrasados de outra faixa são ignorados.
- o botão principal exibe loading durante buffering e possui timeout de segurança para liberar uma nova tentativa.
- posição e duração são derivadas de `playback_update` e atualizadas visualmente somente quando o segundo muda.
- o nome da faixa mantém um link externo para a playlist.
- título e artista possuem largura limitada, deslizam mais rapidamente no hover ou foco quando excedem o espaço e preservam o texto completo como fallback.
- quando a faixa confirmada muda, todo o bloco de metadados desliza da direita para a esquerda ao avançar e no sentido oposto ao voltar; movimento reduzido remove o deslocamento.
- depois que o visitante visualiza o painel do deck, um player flutuante aparece quando o painel deixa de estar significativamente visível.
- o player flutuante é renderizado em `document.body` por portal, entra e sai pela esquerda e fica recolhido como um círculo minimalista sem sombra, com borda e hover que acompanham o tema da aplicação.
- ativar o círculo expande o painel com uma transição mais legível; o ícone de minimizar, isolado no canto superior direito, retorna ao círculo.
- o painel do deck e o flutuante compartilham faixa, loading, erro e estado de reprodução.
- não há áudio hospedado pelo portfolio.

## Dados Atuais

As definições locais do player fornecem um snapshot de 100 faixas públicas com `spotifyId`, nome e artista. URI e URL são derivados do identificador quando necessário.

As definições locais dos projetos fornecem:

- `id` estável;
- chave de conteúdo localizado;
- URL da aplicação;
- tecnologias;
- cor de destaque;
- representação visual.

Os dicionários de idioma fornecem título, descrição e labels de interface.

## Direção CMS

O catálogo de projetos é candidato prioritário ao CMS. Campos esperados incluem:

- identificador estável;
- título e descrição por locale;
- URL da aplicação;
- tecnologias;
- cor e visual permitidos;
- ordem, visibilidade e destaque;
- metadados necessários para acessibilidade.

O server deve validar e normalizar os dados antes de criar `Project`. O CMS não controla JSX, classes arbitrárias, layout do deck ou permissões livres de iframe.

## Segurança Do Dialog

- validar URLs de aplicação no server.
- manter allowlist de origens incorporáveis.
- refletir origens permitidas em uma futura CSP `frame-src`.
- definir `sandbox` e `allow` somente com capacidades necessárias.
- preservar título localizado e link para abrir em nova aba.
- considerar fallback quando a aplicação não puder ser incorporada.

## Segurança Do Player

- carregar somente a iFrame API e a playlist de `https://open.spotify.com` por meio de constantes locais.
- manter título localizado no iframe gerado e link externo visível para a playlist.
- não expor tokens, credenciais ou uma sessão Spotify do proprietário aos visitantes.

## Limitações Do MVP Do Player

- o Spotify Embed fica visualmente oculto, embora permaneça montado e ativo.
- o snapshot local não acompanha automaticamente mudanças feitas na playlist; atualizá-lo exige alteração e novo deploy.
- essa solução valida a interação do player, mas ainda precisa ser adaptada às regras finais de atribuição e exibição do Spotify.
- navegadores podem limitar a reprodução do embed oculto; o clique explícito em play reduz, mas não elimina, essa variação.

## Estilos

- layout simples da seção permanece em Tailwind.
- estrutura física do deck, gradientes e pseudo-elementos ficam no módulo do `ProjectDeck`.
- Grid, Key, Symbol, player, navegação e display possuem módulos próprios; o player flutuante reutiliza o módulo do player do deck e usa `clip-path` para comunicar a expansão do círculo.
- `--project-accent` e `--key-accent` conectam conteúdo e apresentação sem criar classes dinâmicas do CMS.
- preservar container queries, movimento reduzido e dark mode.

## Dependências De Outros Domínios

- `src/components/icons/`
- `src/types/language-types.ts`
- `src/consts/url.consts.ts`
- Radix `Dialog`

## Invariantes

- preservar a fronteira server → client e props serializáveis.
- manter uma única instância do dialog.
- não renderizar todos os iframes antecipadamente.
- manter o visual do Project Deck controlado pelo código.
- não elevar estilos, tipos ou constantes específicos para a superfície global.
- não confiar diretamente em URLs ou cores recebidas do CMS sem normalização.

## Antes De Alterar

1. identificar se a mudança afeta catálogo, seleção, paginação, player ou dialog.
2. ler `SDUI-CMS.md` para alterações de dados remotos.
3. ler o documento de Icons quando novos símbolos ou controles forem necessários.
4. verificar teclado, foco, loading, dark mode e movimento reduzido.
5. revisar segurança quando houver mudança no iframe ou nas URLs.
6. atualizar este documento somente quando contratos ou invariantes mudarem.
