import Chart from 'react-apexcharts';
import { useIndicators } from '../hooks/useIndicators';

export default function IpcaChart() {
  const { indicators, loading, errors } = useIndicators();

  if (loading.ipca) {
    return <section>Carregando IPCA...</section>;
  }

  if (errors.ipca) {
    return <section role="alert">{errors.ipca}</section>;
  }

  const dados = indicators.ipca;

  const dadosIndice = dados.reduce((resultado, item, index) => {
    const anterior = resultado[index - 1];

    const indice = index === 0 ? 100 : anterior?.indice == null || item.inflacaoMensal == null ? null : anterior.indice * (1 + item.inflacaoMensal / 100);

    resultado.push({
      ...item,
      indice,
    });

    return resultado;
  }, []);

  const ultimoBolsonaro = dadosIndice.findLast((item) => Number(String(item.periodo).slice(0, 4)) === 2022);

  const dadosBolsonaro = dadosIndice.map((item) => {
    const ano = Number(String(item.periodo).slice(0, 4));

    return ano <= 2022 ? item.indice : null;
  });

  const dadosLula = dadosIndice.map((item) => {
    const ano = Number(String(item.periodo).slice(0, 4));

    if (ano >= 2023) {
      return item.indice;
    }

    if (item === ultimoBolsonaro) {
      return item.indice;
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
      text: 'Evolução do nível de preços (IPCA)',
      align: 'center',
    },

    subtitle: {
      text: 'Índice acumulado — base 100 no primeiro mês da série',
      align: 'center',
    },

    colors: ['#2563eb', '#dc2626'],

    legend: {
      show: true,
      position: 'top',
    },

    xaxis: {
      categories: dadosIndice.map((item) => item.mes),
      tickAmount: 12,
      labels: {
        rotate: -45,
        trim: true,
      },
      title: {
        text: 'Mês',
      },
    },

    yaxis: {
      title: {
        text: 'Índice de preços (base 100)',
      },
      labels: {
        formatter: (value) =>
          value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
    },

    tooltip: {
      y: {
        formatter: (value) =>
          value == null
            ? 'Sem dado'
            : value.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
      },
    },

    stroke: {
      curve: 'straight',
      width: 3,
    },

    markers: { size: 2 },
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

      <p>Fonte: IBGE — IPCA, tabela SIDRA 1737. Índice calculado a partir das variações mensais.</p>
    </section>
  );
}
