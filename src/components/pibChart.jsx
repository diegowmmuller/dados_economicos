import Chart from 'react-apexcharts';
import { useIndicators } from '../hooks/useIndicators';

export default function PibChart() {
  const { indicators, loading, errors } = useIndicators();

  if (loading.pibReal) {
    return <section>Carregando PIB...</section>;
  }

  if (errors.pibReal) {
    return <section role="alert">{errors.pibReal}</section>;
  }

  const dados = indicators.pibReal;

  const dadosBolsonaro = dados.map((item) => {
    const ano = Number(String(item.periodo).slice(0, 4));

    return ano <= 2022 ? item.indiceVolume : null;
  });

  const ultimoBolsonaro = dados.findLast((item) => Number(String(item.periodo).slice(0, 4)) === 2022);

  const dadosLula = dados.map((item) => {
    const ano = Number(String(item.periodo).slice(0, 4));

    if (ano >= 2023) {
      return item.indiceVolume;
    }

    if (item === ultimoBolsonaro) {
      return item.indiceVolume;
    }

    return null;
  });

  const options = {
    chart: {
      type: 'line',
      toolbar: { show: true },
    },
    xaxis: {
      categories: dados.map((item) => item.trimestre),
    },
    yaxis: {
      title: { text: 'Índice de volume' },
    },
    colors: ['#2563eb', '#dc2626'],
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
      <h2>Evolução do PIB real</h2>
      <Chart options={options} series={series} type="line" height={380} />
    </section>
  );
}
