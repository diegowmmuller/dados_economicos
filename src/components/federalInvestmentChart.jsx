import Chart from 'react-apexcharts';
import { useIndicators } from '../hooks/useIndicators';

export default function InvestimentoFederalChart() {
  const { indicators, loading, errors } = useIndicators();

  if (loading.investimentoFederal) {
    return <p>Carregando investimento federal...</p>;
  }
  if (errors.investimentoFederal) {
    return <p>{errors.investimentoFederal}</p>;
  }
  const dados = indicators.investimentoFederal ?? [];
  if (dados.length === 0) {
    return <p>Dados indisponíveis.</p>;
  }

  const options = {
    chart: {
      type: 'line',
      toolbar: { show: true },
    },
    colors: ['#2563eb', '#dc2626'],
    xaxis: {
      categories: dados.map((item) => item.ano),
      title: { text: 'Ano' },
    },
    yaxis: {
      title: { text: 'R$ bilhões' },
      labels: {
        formatter: (value) => value.toFixed(1),
      },
    },
    stroke: {
      curve: 'straight',
      width: 3,
    },
    markers: {
      size: 5,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (value) => `R$ ${value.toFixed(2).replace('.', ',')} bilhões`,
      },
    },
    legend: {
      position: 'top',
    },
  };

  const series = [
    {
      name: 'Bolsonaro',
      data: dados.map((item) => (item.ano <= 2022 ? item.real : null)),
    },
    {
      name: 'Lula',
      data: dados.map((item) => (item.ano >= 2022 ? item.real : null)),
    },
  ];

  return (
    <section>
      <h2>Investimento Federal</h2>
      <p>Investimento anual do Governo Federal, em valores nominais. 2026 contempla janeiro a agosto.</p>

      <Chart options={options} series={series} type="line" height={350} />
      <p>
        Fonte: <a href="https://series-temporais-externo-frontend.tesouro.gov.br/?">tesouro.gov</a>
      </p>
    </section>
  );
}
