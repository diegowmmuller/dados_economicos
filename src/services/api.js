import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apisidra.ibge.gov.br/values',
});

const urls = {
  pibReal: '/t/1620/n1/1/v/583/p/201901-202604/c11255/90707',
  desemprego: '/t/4099/n1/1/v/4099/p/201901-202602',
  ipca: '/t/1737/n1/1/v/63/p/201901-202609',
  rendimentoMedio: '/t/5440/n1/1/p/201901-202602',
  informalidade: '/t/8529/n1/1/v/12466/p/201901-202602',
  dividaPublica: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.13762',
};

function converterValor(valor) {
  if (valor == null || ['..', '...', '-', 'x', ''].includes(valor)) {
    return null;
  }

  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

function extrairRegistros(resposta) {
  if (!Array.isArray(resposta)) {
    throw new Error('A API do SIDRA não retornou um array JSON.');
  }

  return resposta.slice(1);
}

export async function buscarPibReal(signal) {
  const response = await api.get(urls.pibReal, { signal });

  return extrairRegistros(response.data).map((item) => ({
    periodo: item.D3C,
    trimestre: item.D3N,
    indiceVolume: converterValor(item.V),
  }));
}

export async function buscarDesemprego(signal) {
  const response = await api.get(urls.desemprego, { signal });

  return extrairRegistros(response.data).map((item) => ({
    periodo: item.D3C,
    trimestre: item.D3N,
    taxa: converterValor(item.V),
  }));
}

export async function buscarIpca(signal) {
  const response = await api.get(urls.ipca, { signal });

  return extrairRegistros(response.data).map((item) => ({
    periodo: item.D3C,
    mes: item.D3N,
    inflacaoMensal: converterValor(item.V),
  }));
}

export async function buscarRendimentoMedio(signal) {
  const response = await api.get(urls.rendimentoMedio, { signal });

  const registros = extrairRegistros(response.data);

  return registros
    .filter((item) => item.D3C === '5932' && item.D4C === '96165')
    .map((item) => ({
      periodo: item.D2C,
      trimestre: item.D2N,
      rendimento: converterValor(item.V),
    }));
}

export async function buscarInformalidade(signal) {
  const resposta = await api.get(urls.informalidade, { signal });

  return extrairRegistros(resposta.data)
    .map((item) => ({
      periodo: item.D3C,
      trimestre: item.D3N,
      taxa: converterValor(item.V),
    }))
    .filter((item) => item.taxa !== null);
}

export function buscarDespesasEducacao() {
  return [
    { ano: 2019, real: 114.1 },
    { ano: 2020, real: 105.4 },
    { ano: 2021, real: 112.5 },
    { ano: 2022, real: 128.2 },
    { ano: 2023, real: 151.1 },
    { ano: 2024, real: 163.4 },
    { ano: 2025, real: 189.5 },
    { ano: 2026, real: 199.9 },
  ];
}

export function buscarInvestimentoPublico() {
  return [
    { ano: 2019, real: 56.59 },
    { ano: 2020, real: 104.9 },
    { ano: 2021, real: 56.83 },
    { ano: 2022, real: 45.05 },
    { ano: 2023, real: 81.37 },
    { ano: 2024, real: 86.1 },
    { ano: 2025, real: 83.41 },
  ];
}
