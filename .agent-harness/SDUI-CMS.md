# Arquitetura Híbrida De SDUI E CMS

O projeto não pretende implementar um SDUI integral. A estratégia é híbrida: a estrutura da interface permanece no código, enquanto um CMS controla conteúdo volátil que deve poder mudar sem um novo deploy.

## Objetivos

- reduzir deploys causados por alterações pequenas de conteúdo;
- manter layout, comportamento, acessibilidade e segurança sob controle do código;
- resolver conteúdo e locale no server;
- permitir evolução gradual a partir dos dicionários e constantes locais atuais;
- oferecer fallback previsível quando o CMS estiver indisponível.

## Divisão De Responsabilidades

| Responsabilidade | Proprietário principal |
| --- | --- |
| Estrutura dos componentes e composição visual | Código |
| Estado, interações e browser APIs | Código |
| Tokens, responsividade e animações | Código |
| Validação, normalização e allowlists | Código no server |
| Textos e traduções | CMS, com fallback local |
| Links e itens de navegação | CMS, após validação |
| Projetos e metadados do Project Deck | CMS, após normalização |
| Ordem e visibilidade de conteúdo permitido | CMS |
| Novos tipos de componente ou novas interações | Código e deploy |

## Conteúdo Candidato Ao CMS

- textos gerais por locale;
- links e itens dos dropdowns do Header;
- links sociais, currículo, contato e perfis externos;
- projetos, descrições, tecnologias, imagens, ordem e visibilidade do Project Deck;
- artigos e conteúdos editoriais futuros;
- mensagens de indisponibilidade e labels acessíveis que façam parte do conteúdo.

## Conteúdo Que Permanece No Código

- árvore de componentes e componentes permitidos;
- regras de layout e design tokens;
- comportamento de menus, dialogs, toasts, player e navegação;
- componentes de ícone e assets estruturais;
- schemas, defaults, fallbacks e validações;
- allowlists de protocolos, origens e capacidades de iframe;
- decisões de segurança e acessibilidade.

## Fluxo No Server

```text
locale da rota
  → leitura do CMS
  → validação do schema
  → normalização e allowlists
  → fallback local quando necessário
  → mapeamento para props serializáveis
  → composição dos componentes no server
```

- componentes client não devem consultar o CMS diretamente quando o server puder resolver os dados.
- respostas do CMS não devem ser espalhadas no JSX em formato bruto.
- criar uma camada de normalização entre o contrato externo e os tipos usados pela UI.
- falhas parciais devem preferir fallback local ou ocultação segura do item afetado.
- dados ausentes não devem quebrar a renderização da página inteira.

## Locale

- o locale vem da rota, atualmente `/pt-BR` ou `/en-US`.
- o server seleciona conteúdo do CMS e fallback local usando esse locale.
- não criar `LanguageContext` global client-side para resolver conteúdo.
- labels acessíveis e fallbacks também precisam ser localizados.
- o contrato do CMS deve definir explicitamente o comportamento quando uma tradução estiver ausente.

## Links E Conteúdo Incorporado

- validar protocolos e formatos antes de enviar URLs ao client.
- links externos devem usar os atributos de segurança adequados.
- URLs de iframe exigem allowlist de origem no server.
- uma CSP futura deve refletir as origens permitidas em `frame-src`.
- o projeto incorporado precisa permitir o portfolio em `frame-ancestors`.
- `sandbox` e `allow` devem liberar somente as capacidades necessárias.
- todo iframe precisa de título localizado e link externo de fallback.

## Cache E Publicação

- a política de cache precisa equilibrar atualização editorial e custo de leitura do CMS.
- usar revalidação server-side ou invalidação sob demanda quando o CMS for integrado.
- documentar por domínio quais conteúdos aceitam atraso de atualização.
- preview editorial e publicação são preocupações do CMS; não devem transformar toda a aplicação em client-side.
- alterações de schema incompatíveis exigem coordenação com o código e podem exigir deploy.

## Contratos E Evolução

- schemas externos devem ser versionáveis e validados no server.
- o código trabalha com modelos normalizados próprios, não diretamente com tipos do fornecedor do CMS.
- campos desconhecidos devem ser ignorados com segurança.
- componentes renderizáveis por configuração devem vir de um registry fechado e tipado.
- não permitir que o CMS injete JSX, classes Tailwind arbitrárias, scripts ou estilos livres.
- introduzir a integração por domínio, mantendo os dados locais como fallback durante a migração.

## Checklist Para Alterações De Conteúdo Remoto

1. identificar o domínio e ler sua documentação.
2. definir quais campos são editoriais e quais permanecem no código.
3. criar ou atualizar schema e normalização server-side.
4. validar URLs, locale e campos opcionais.
5. garantir props serializáveis na fronteira client.
6. definir fallback e comportamento de erro.
7. revisar cache e revalidação.
8. testar acessibilidade e segurança do conteúdo resultante.
