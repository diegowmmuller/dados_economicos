import Chart from 'react-apexcharts';
import { useIndicators } from '../hooks/useIndicators';

export default function UnemploymentChart() {
  const { indicators, loading, errors } = useIndicators();

  if (loading.indiceDesemprego) {
    return <p>Carregando taxa de desocupação...</p>;
  }

  if (errors.indiceDesemprego) {
    return <p role="alert">{errors.indiceDesemprego}</p>;
  }

  const dados = indicators.indiceDesemprego;

  const dadosBolsonaro = dados.map((item) => {
    const ano = Number(String(item.periodo).slice(0, 4));

    return ano <= 2022 ? item.taxa : null;
  });

  const ultimoBolsonaro = dados.findLast((item) => Number(String(item.periodo).slice(0, 4)) === 2022);

  const dadosLula = dados.map((item) => {
    const ano = Number(String(item.periodo).slice(0, 4));

    if (ano >= 2023) {
      return item.taxa;
    }

    if (item === ultimoBolsonaro) {
      return item.taxa;
    }

    return null;
  });

  const options = {
    chart: {
      type: 'line',
      toolbar: { show: true },
      zoom: { enabled: true },
    },

    title: {
      text: 'Taxa de desocupação no Brasil',
      align: 'center',
    },

    xaxis: {
      categories: dados.map((item) => item.trimestre),
      title: { text: 'Trimestre' },
      labels: { rotate: -45 },
    },

    yaxis: {
      min: 0,
      title: { text: 'Taxa de desocupação (%)' },
      labels: {
        formatter: (value) => `${value.toLocaleString('pt-BR')}%`,
      },
    },
    colors: ['#2563eb', '#dc2626'],
    tooltip: {
      y: {
        formatter: (value) => (value == null ? 'Sem dado' : `${value.toLocaleString('pt-BR')}%`),
      },
    },

    stroke: { curve: 'straight', width: 2 },
    markers: { size: 3 },
    dataLabels: { enabled: false },

    noData: { text: 'Nenhum dado disponível.' },
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

      <p>Fonte: IBGE — PNAD Contínua, tabela SIDRA 4099.</p>
    </section>
  );
}
