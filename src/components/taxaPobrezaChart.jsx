import Chart from 'react-apexcharts';
import { useIndicators } from '../hooks/useIndicators';

export default function TaxaPobrezaChart() {
  const { indicators, loading, errors } = useIndicators();

  const dados = indicators.taxaPobreza ?? [];

  if (loading.taxaPobreza) {
    return <p>Carregando taxa de pobreza...</p>;
  }

  if (errors.taxaPobreza) {
    return <p>{errors.taxaPobreza}</p>;
  }

  if (dados.length === 0) {
    return <p>Dados de pobreza indisponíveis.</p>;
  }

  const anos = [...new Set(dados.map((item) => item.ano))].sort((a, b) => a - b);

  const dadosBolsonaro = anos.map((ano) => {
    const item = dados.find((d) => d.ano === ano);

    return ano >= 2019 && ano <= 2022 ? (item?.taxa ?? null) : null;
  });

  const dadosLula = anos.map((ano) => {
    const item = dados.find((d) => d.ano === ano);

    // Inclui 2022 como ponto de transição para evitar o gap visual.
    return ano >= 2022 && ano <= 2026 ? (item?.taxa ?? null) : null;
  });

  const series = [
    {
      name: 'Governo Bolsonaro (2019–2022)',
      data: dadosBolsonaro,
    },
    {
      name: 'Governo Lula (2023–2026)',
      data: dadosLula,
    },
  ];

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ['#2563eb', '#dc2626'],
    stroke: {
      curve: 'straight',
      width: 3,
    },
    markers: {
      size: 5,
    },
    xaxis: {
      categories: anos,
      title: {
        text: 'Ano',
      },
      tickAmount: anos.length - 1,
    },
    yaxis: {
      min: 0,
      title: {
        text: 'População abaixo da linha de pobreza (%)',
      },
      labels: {
        formatter: (valor) => (valor == null ? '' : `${valor.toFixed(1)}%`),
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: (valor) => (valor == null ? 'Sem dados' : `${valor.toFixed(1)}%`),
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
    },
    noData: {
      text: 'Nenhum dado disponível',
    },
  };

  return (
    <div className="chart-container">
      <h2>Taxa de pobreza por governo</h2>

      <p>Proporção da população brasileira com rendimento domiciliar per capita abaixo da linha de pobreza.</p>

      <Chart options={options} series={series} type="line" height={350} width="100%" />

      <div className="chart-source">
        <small>
          <strong>Fonte:</strong> IBGE — Pesquisa Nacional por Amostra de Domicílios Contínua (PNAD Contínua), Síntese de Indicadores Sociais 2025.
        </small>

        <small>
          <strong>Metodologia:</strong> Linha de pobreza de US$ 6,85 por dia, em paridade de poder de compra (PPC) de 2017.
        </small>

        <small>
          <strong>Período:</strong> 2019–2024.
        </small>

        <small>
          <strong>Consulta da fonte oficial:</strong>{' '}
          <a href="https://www.ibge.gov.br/estatisticas/sociais/populacao/9221-sintese-de-indicadores-sociais.html" target="_blank" rel="noopener noreferrer">
            Síntese de Indicadores Sociais — IBGE
          </a>
        </small>

        <small>Os dados de 2025 e 2026 não estão incluídos por indisponibilidade de valores confirmados nesta série.</small>
      </div>
    </div>
  );
}
