# Harness Local Do Projeto

Este diretório concentra contexto operacional para agentes que trabalham neste repositório.

O objetivo é reduzir redescobertas, erros de arquitetura e retrabalho sem transformar decisões atuais em regras imutáveis.

## Ordem De Autoridade

Quando houver divergência, seguir esta ordem:

1. pedido explícito mais recente do usuário;
2. regras globais do `AGENTS.md`;
3. regras transversais deste harness;
4. documento do domínio envolvido;
5. comportamento observado no código.

Se o código e a documentação divergirem, não assumir silenciosamente que um deles está correto. Verificar o histórico disponível, informar a divergência e alinhar a correção com o usuário.

## Leitura Progressiva

Carregar apenas o contexto necessário para a tarefa:

| Escopo da tarefa | Documentos obrigatórios |
| --- | --- |
| Criar ou reorganizar componentes | `COMPONENTS.md` |
| Alterar um domínio existente | `COMPONENTS.md` e o documento do domínio |
| Alterar conteúdo remoto, contratos ou cache | `SDUI-CMS.md` e os domínios afetados |
| Alterar vários domínios | `COMPONENTS.md` e cada documento envolvido |

## Documentos Disponíveis

- `COMPONENTS.md`: regras arquiteturais para componentes.
- `SDUI-CMS.md`: estratégia híbrida de conteúdo remoto e composição no server.
- `components/header/HEADER.md`: domínio do Header.
- `components/info/INFO.md`: domínio de informações pessoais e apresentação.
- `components/projects/PROJECTS.md`: domínio de projetos e Project Deck.
- `components/discord-dialog/DISCORD-DIALOG.md`: dialog compartilhado do Discord.
- `components/toast/TOAST.md`: toast compartilhado de indisponibilidade.
- `components/icons/ICONS.md`: sistema compartilhado de ícones.

## Manutenção

- os documentos descrevem contratos, responsabilidades e invariantes; não são changelogs.
- não registrar detalhes temporários que possam ser descobertos diretamente no Git.
- atualizar o documento do domínio quando uma mudança aprovada alterar sua arquitetura, contrato ou invariante.
- não atualizar documentação por mudanças puramente mecânicas que não alterem o entendimento do domínio.
- criar um novo documento somente quando surgir um novo domínio ou quando um subdomínio ganhar autonomia suficiente para precisar de contexto próprio.
- manter caminhos e nomes de arquivos verificáveis no repositório.
