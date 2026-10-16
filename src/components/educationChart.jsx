import Chart from 'react-apexcharts';
import { useIndicators } from '../hooks/useIndicators';

export default function EducationChart() {
  const { indicators, loading, errors } = useIndicators();

  if (loading.educacao) {
    return <section>Carregando dados sobre educação...</section>;
  }

  if (errors.educacao) {
    return <section>{String(errors.educacao)}</section>;
  }

  const dados = indicators.educacao;

  const options = {
    chart: {
      id: 'education-chart',
      toolbar: { show: true },
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
      categories: dados.map((item) => item.ano),
      title: { text: 'Ano' },
    },
    yaxis: {
      title: { text: 'R$ bilhões' },
      labels: {
        formatter: (valor) => valor.toFixed(1),
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (valor) => (valor == null ? '' : valor.toFixed(2)),
      },
    },
    legend: {
      position: 'top',
    },
    annotations: {
      xaxis: [
        {
          x: 2022,
          borderColor: '#9ca3af',
          label: {
            text: 'Transição de governo',
          },
        },
      ],
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
      <h2>Despesas empenhadas em educação</h2>
      <p>Governo Federal — valores nominais em R$ bilhões</p>

      <Chart options={options} series={series} type="line" height={350} width="100%" />
      <p>
        Fonte: <a href="https://cofrepublico.com.br/orcamento/educacao">cofre público</a>
      </p>
    </section>
  );
}
