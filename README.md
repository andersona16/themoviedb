# MovieDB Angular Project

Este é um projeto Angular que consome a API do [The Movie DB (TMDb)](https://www.themoviedb.org/) para exibir informações sobre filmes. O projeto inclui uma listagem de filmes com diversas categorias, busca de filmes, paginação e uma página de detalhes com informações completas sobre cada filme.

## Funcionalidades

- **Listagem de Filmes**:
  - Filmes Populares
  - Filmes em Exibição
  - Filmes Mais Bem Avaliados
  - Próximos Lançamentos
- **Busca de Filmes**: Pesquise filmes por título.
- **Paginação**: Navegue entre as páginas de resultados.
- **Detalhes do Filme**:
  - Informações do filme (título, sinopse, data de lançamento, etc.)
  - Elenco principal
  - Trailer do filme (reprodução embutida)
  - Palavras-chave relacionadas
  - Avaliações dos usuários
  - Recomendações de filmes semelhantes

## Tecnologias Utilizadas

- **Angular**: Framework principal utilizado para o desenvolvimento do frontend.
- **Bootstrap**: Biblioteca para estilização e layout responsivo.
- **TheMovieDB API**: API externa utilizada para fornecer informações sobre filmes.
- **RxJS**: Biblioteca para programação reativa.
- **TypeScript**: Linguagem utilizada para o desenvolvimento no Angular.

## Pré-requisitos
Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Angular CLI](https://angular.io/cli) (para rodar o projeto Angular)
- Uma chave de API do [The Movie DB](https://www.themoviedb.org/settings/api)

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. Clone o repositório:
   git clone https://github.com/andersona16/themoviedb.git

2. Navegue até a pasta do projeto:
    cd themoviedb

3. Instale as dependências:
    yarn install

## Estrutura do Projeto  
1. src/app: Contém a maior parte do código da aplicação, incluindo componentes, serviços e modelos.
2. components: Componentes para listagem e exibição de detalhes de filmes.
3. services: Serviço que se comunica com a API TheMovieDB.
4. models: Modelos de dados para filmes e detalhes.
5. src/environments: Contém os arquivos de configuração de ambiente (desenvolvimento e produção).
6. public: Contém arquivos estáticos como imagens e fontes.
