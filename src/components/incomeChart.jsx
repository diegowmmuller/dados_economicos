import Chart from 'react-apexcharts';
import { useIndicators } from '../hooks/useIndicators';

export default function IncomeChart() {
  const { indicators, loading, errors } = useIndicators();

  if (loading.rendimentoMedio) {
    return <section>Carregando rendimento médio...</section>;
  }

  if (errors.rendimentoMedio) {
    return <section role="alert">{errors.rendimentoMedio}</section>;
  }

  const dados = indicators.rendimentoMedio ?? [];

  // Encontra o último registro de 2022.
  const ultimoBolsonaro = dados.findLast((item) => Number(String(item.periodo).slice(0, 4)) === 2022);

  // Série do governo Bolsonaro: 2019–2022.
  const dadosBolsonaro = dados.map((item) => {
    const ano = Number(String(item.periodo).slice(0, 4));

    return ano <= 2022 ? item.rendimento : null;
  });

  // Série do governo Lula: 2023–atual.
  // O último ponto de 2022 é repetido para conectar visualmente as linhas.
  const dadosLula = dados.map((item) => {
    const ano = Number(String(item.periodo).slice(0, 4));

    if (ano >= 2023) {
      return item.rendimento;
    }

    if (item === ultimoBolsonaro) {
      return item.rendimento;
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
      text: 'Rendimento médio real do trabalho',
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
      labels: { rotate: -45 },
      title: { text: 'Trimestre' },
    },

    yaxis: {
      title: {
        text: 'Rendimento médio (R$)',
      },
      labels: {
        formatter: (value) =>
          value == null
            ? ''
            : value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0,
              }),
      },
    },

    tooltip: {
      y: {
        formatter: (value) =>
          value == null
            ? 'Sem dado'
            : value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 2,
              }),
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

      <p>Fonte: IBGE — PNAD Contínua, tabela SIDRA 5440.</p>
    </section>
  );
}
