import Chart from 'react-apexcharts';
import { useIndicators } from '../hooks/useIndicators';

export default function InformalityChart() {
  const { indicators, loading, errors } = useIndicators();

  if (loading.informalidade) {
    return <section>Carregando taxa de informalidade...</section>;
  }

  if (errors.informalidade) {
    return <section role="alert">{errors.informalidade}</section>;
  }

  const dados = indicators.informalidade ?? [];

  const ultimoBolsonaro = dados.filter((item) => Number(String(item.periodo).slice(0, 4)) === 2022).at(-1);

  const dadosBolsonaro = dados.map((item) => {
    const ano = Number(String(item.periodo).slice(0, 4));
    return ano <= 2022 ? item.taxa : null;
  });

  const dadosLula = dados.map((item) => {
    const ano = Number(String(item.periodo).slice(0, 4));

    if (ano >= 2023) return item.taxa;

    if (item === ultimoBolsonaro) return item.taxa;

    return null;
  });

  const options = {
    chart: {
      type: 'line',
      toolbar: { show: true },
      zoom: { enabled: true },
    },

    title: {
      text: 'Taxa de informalidade do mercado de trabalho',
      align: 'center',
    },

    subtitle: {
      text: 'Brasil — pessoas ocupadas com 14 anos ou mais',
      align: 'center',
    },

    colors: ['#2563eb', '#dc2626'],

    legend: {
      show: true,
      position: 'top',
    },

    xaxis: {
      categories: dados.map((item) => item.trimestre),
      tickAmount: 12,
      labels: {
        rotate: -45,
        hideOverlappingLabels: true,
      },
      title: {
        text: 'Trimestre',
      },
    },

    yaxis: {
      min: 0,
      title: {
        text: 'Taxa de informalidade (%)',
      },
      labels: {
        formatter: (value) => `${value.toLocaleString('pt-BR')}%`,
      },
    },

    tooltip: {
      y: {
        formatter: (value) =>
          value == null
            ? 'Sem dado'
            : `${value.toLocaleString('pt-BR', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
              })}%`,
      },
    },

    stroke: {
      curve: 'straight',
      width: 2,
    },

    markers: { size: 3 },
    dataLabels: { enabled: false },

    noData: {
      text: 'Nenhum dado disponível.',
    },
  };

  const series = [
    {
      name: 'Governo Bolsonaro (2019–2022)',
      data: dadosBolsonaro,
    },
    {
      name: 'Governo Lula (2023–atual)',
      data: dadosLula,
    },
  ];

  return (
    <section>
      <Chart options={options} series={series} type="line" height={380} />

      <p>Fonte: IBGE — PNAD Contínua, tabela SIDRA 8529.</p>
    </section>
  );
}
