# Dashboard de Indicadores Econômicos do Brasil

Dashboard interativo desenvolvido em React para visualizar e acompanhar indicadores econômicos e fiscais do Brasil ao longo do tempo, por meio de gráficos e séries históricas.

O projeto busca facilitar a análise da evolução dos indicadores e a comparação entre diferentes períodos.

## Funcionalidades

- Visualização de indicadores econômicos por meio de gráficos.
- Consulta de séries históricas de dados públicos.
- Análise da evolução de indicadores ao longo dos anos.
- Organização e compartilhamento dos dados entre componentes utilizando Context API.
- Exibição de indicadores relacionados à atividade econômica, ao mercado de trabalho, à inflação, à dívida pública e aos investimentos governamentais.

## Indicadores

Entre os indicadores contemplados pelo projeto estão:

- **PIB real:** evolução da atividade econômica.
- **Desemprego:** acompanhamento do mercado de trabalho.
- **IPCA:** variação do índice oficial de inflação.
- **Rendimento médio:** evolução dos rendimentos do trabalho.
- **Informalidade:** acompanhamento da informalidade no mercado de trabalho.
- **Dívida pública:** evolução da série utilizada para representar o endividamento público.
- **Investimentos do governo federal:** evolução anual dos investimentos governamentais.
- **Despesas com educação:** acompanhamento das despesas públicas relacionadas à educação.

A disponibilidade e o período de cada série dependem dos dados fornecidos pelas respectivas fontes.

## Tecnologias utilizadas

- [React](https://react.dev/) — construção da interface.
- [Vite](https://vite.dev/) — ambiente de desenvolvimento e build.
- [ApexCharts](https://apexcharts.com/) — biblioteca de gráficos.
- [React ApexCharts](https://apexcharts.com/docs/react-charts/) — integração dos gráficos com React.
- [Axios](https://axios-http.com/) — realização de requisições HTTP.
- **Context API** — compartilhamento do estado dos indicadores entre componentes.

## Fontes de dados

O projeto utiliza dados públicos disponibilizados por instituições brasileiras, incluindo:

- [IBGE — Instituto Brasileiro de Geografia e Estatística](https://www.ibge.gov.br/), para séries estatísticas econômicas e sociais.
- [Banco Central do Brasil](https://www.bcb.gov.br/), para séries econômicas e financeiras.
- [Tesouro Nacional](https://www.tesourotransparente.gov.br/), para dados relacionados às contas públicas e aos investimentos governamentais.

Os dados podem apresentar períodos de atualização diferentes. Séries parciais devem ser interpretadas considerando o intervalo efetivamente disponível.

## Como executar localmente

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Git instalado para clonar o repositório.

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Acesse a pasta do projeto

```bash
cd react-dadosIbge
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação.

### 5. Gere a versão de produção

```bash
npm run build
```

Os arquivos otimizados para publicação serão gerados no diretório `dist/`.

Para testar a versão de produção localmente:

```bash
npm run preview
```

## Estrutura do projeto

A organização segue uma separação por responsabilidades. Os diretórios abaixo representam a estrutura conceitual da aplicação; ajuste os nomes conforme a estrutura definitiva do repositório.

```text
src/
├── components/    # Componentes reutilizáveis e gráficos
├── contexts/      # Contexto para compartilhamento dos indicadores
├── hooks/         # Hooks personalizados
├── services/      # Requisições e acesso às fontes de dados
├── App.jsx        # Componente principal
└── main.jsx       # Ponto de entrada da aplicação
```

## Tratamento dos dados

Os dados são obtidos ou organizados na camada de serviços e disponibilizados aos componentes da interface. O contexto de indicadores centraliza o estado compartilhado, incluindo dados, carregamento e erros.

Os componentes de gráficos utilizam essas informações para construir as visualizações.

## Publicação

A aplicação pode ser publicada na [Vercel](https://vercel.com/).

Configuração padrão para um projeto React com Vite:

| Configuração     | Valor           |
| ---------------- | --------------- |
| Framework Preset | Vite            |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |
| Install Command  | `npm install`   |

A publicação pode ser realizada conectando o repositório Git à Vercel. Novos commits na branch configurada podem disparar novas implantações automaticamente.

## Observações

- Os indicadores podem ter frequências, unidades e períodos de referência distintos.
- Valores anuais e mensais não devem ser comparados sem considerar a metodologia de cada série.
- Valores monetários nominais não representam necessariamente valores corrigidos pela inflação.
- A interpretação dos gráficos deve considerar a fonte e a metodologia dos dados utilizados.

## Licença

Nenhuma licença foi especificada até o momento. Caso o projeto seja disponibilizado publicamente, defina uma licença de uso conforme seus objetivos.
