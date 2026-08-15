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
- `DeckMusicPlayer` é client por controlar áudio e estado de reprodução.
- `ProjectDialog` é client por usar Radix Dialog e eventos do iframe.

## Comportamento Atual

- cada página possui até oito posições.
- foco ou pointer enter atualiza o projeto apresentado.
- clique em uma tecla abre o dialog do projeto.
- paginação aparece apenas quando existe mais de uma página.
- mudar de página seleciona o primeiro projeto daquela página.
- existe uma única instância de `ProjectDialog` para todo o domínio.
- o iframe é montado somente quando o dialog possui um projeto aberto.
- o player possui contrato próprio; a coleção de músicas local pode estar vazia.

## Dados Atuais

As definições locais fornecem:

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

## Estilos

- layout simples da seção permanece em Tailwind.
- estrutura física do deck, gradientes e pseudo-elementos ficam no módulo do `ProjectDeck`.
- Grid, Key, Symbol, player, navegação e display possuem módulos próprios.
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
