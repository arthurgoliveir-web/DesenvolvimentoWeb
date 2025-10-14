# ConectaPro

Marketplace de serviços (protótipo web) focado em conectar clientes a prestadores em diversas categorias (programação, jardinagem, marcenaria, design gráfico, tradução). Este repositório contém a estrutura inicial do frontend estático e diretórios para backend, banco de dados, documentação e testes.

> Status: protótipo em desenvolvimento (frontend estático). Back-end e banco de dados ainda não implementados.

## Sumário

- Visão geral
- Funcionalidades principais
- Stack e requisitos
- Estrutura do projeto
- Como rodar
- Scripts úteis
- Testes
- Roadmap
- Contribuindo
- Licença

## Visão geral

O ConectaPro (também referenciado nos arquivos como "ConnectPro") é uma vitrine de serviços com navegação por categorias, página inicial, serviços, sobre, ajuda e página de login. O objetivo é oferecer uma experiência simples para descoberta de serviços e, futuramente, fluxo de autenticação, carrinho e checkout.

## Funcionalidades principais

- Landing page com destaque e call-to-action para explorar serviços
- Navegação por categorias com destaque visual e seleção ativa
- Páginas de: Início, Serviços, Sobre, Ajuda e Login
- Layout responsivo básico com barra de navegação e rodapé
- Estrutura inicial para futura integração de busca, carrinho e pagamento

> TODO: detalhar requisitos funcionais e não funcionais quando o backend for definido (auth, catálogo, pedidos, pagamentos, SLA de suporte).

## Stack e requisitos

- Frontend: HTML5, CSS3, JavaScript vanilla
- Tipografia: Google Fonts (Open Sans, Roboto)
- Assets: imagens locais para logotipo, ícones e ilustrações
- Backend: a definir (placeholder em `backend/`)
- Banco de dados: a definir (placeholder em `database/`)

Pré-requisitos sugeridos para desenvolvimento local:

- Navegador moderno (Chrome, Edge, Firefox)
- Extensão/servidor estático simples para servir HTML (opcional)

## Estrutura do projeto

```
./
├─ backend/           # Placeholder para APIs/serviços do servidor
├─ database/          # Placeholder para scripts/esquemas de banco
├─ docs/              # Documentação adicional
├─ frontend/          # Placeholder para futura app/SPA
├─ PI - Web/          # Protótipo estático (HTML, CSS, JS)
│  ├─ PI - Pagina Inicial.html
│  ├─ PI - Serviços.html
│  ├─ PI - Sobre.html
│  ├─ PI - Ajuda.html
│  ├─ PI - Login.html
│  ├─ CSS/
│  ├─ JS/
│  └─ IMG/
└─ tests/             # Placeholder para testes automatizados
```

> Observação: há divergência entre "ConectaPro" e "ConnectPro" em títulos/arquivos. Padronizar para "ConectaPro" (pt-BR) é recomendado. TODO: renomear títulos e assets conforme necessário.

## Como rodar

Como o projeto é estático neste estágio, você pode abrir os HTMLs diretamente no navegador ou servir a pasta "PI - Web" com um servidor estático local para evitar problemas de caminho relativos.

Opção A — Abrir arquivos diretamente:

1. Abra `PI - Web/PI - Pagina Inicial.html` no navegador.

Opção B — Servir localmente (recomendado):

- Use sua ferramenta favorita (Live Server, http-server, serve, etc.).
- Aponte o root para a pasta `PI - Web` e acesse a página inicial.

> TODO: adicionar scripts de desenvolvimento (ex.: Node + http-server) se for padrão do time.

## Scripts úteis

Placeholder — ainda não há `package.json` nem scripts. Sugestões futuras:

- dev: servidor estático para `PI - Web`
- lint/format: configuração de lint/format para CSS/JS

## Testes

No momento não há testes automatizados. Pasta `tests/` reservada para:

- Testes E2E de navegação (ex.: Playwright)
- Testes de UI e acessibilidade
- Smoke tests de links e assets

> TODO: definir framework de testes ao escolher a stack do frontend (SPA vs. estático) e backend.

## Roadmap

- Padronizar branding: ConectaPro vs. ConnectPro
- Definir arquitetura do backend (ex.: Node/Express, Python/FastAPI, etc.)
- Modelagem de dados e integração com banco (ex.: Postgres)
- Implementar autenticação e sessão
- Catálogo de serviços: CRUD e pesquisa
- Fluxo de carrinho/checkout e pagamentos
- Painel do prestador (gestão de anúncios)
- Painel do cliente (pedidos, mensagens)
- Testes automatizados (unitários/E2E)
- Deploy (frontend e backend)

## Contribuindo

1. Abra uma issue descrevendo a proposta/bug
2. Faça um fork e crie uma branch: `feat/nome-da-feature` ou `fix/descricao`
3. Envie um PR relacionando a issue e descrevendo mudanças, screenshots e passos de teste
4. Aguarde revisão e ajuste conforme feedback

> TODO: adicionar templates de issue/PR e guia de estilo (commit message, lint, formatação).

## Licença

Definir licença do projeto.

> TODO: adicionar arquivo LICENSE (ex.: MIT) e referenciá-lo aqui.
