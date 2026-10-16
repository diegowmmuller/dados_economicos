import { useEffect, useState } from 'react';
import {
  buscarPibReal,
  buscarDesemprego,
  buscarIpca,
  buscarRendimentoMedio,
  buscarInformalidade,
  buscarDespesasEducacao,
  buscarInvestimentoPublico,
} from '../services/api';
import { IndicatorsContext } from './indicatorsContext';

export function IndicatorsProvider({ children }) {
  const [indicators, setIndicators] = useState({
    pibReal: [],
    indiceDesemprego: [],
    ipca: [],
    rendimentoMedio: [],
    informalidade: [],
    educacao: [],
    investimentoFederal: [],
  });

  const [loading, setLoading] = useState({
    pibReal: true,
    indiceDesemprego: true,
    ipca: true,
    rendimentoMedio: true,
    informalidade: true,
    educacao: true,
    investimentoFederal: true,
  });

  const [errors, setErrors] = useState({
    pibReal: null,
    indiceDesemprego: null,
    ipca: null,
    rendimentoMedio: null,
    informalidade: null,
    educacao: null,
    investimentoFederal: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function carregarPib() {
      try {
        const dados = await buscarPibReal(controller.signal);

        setIndicators((current) => ({
          ...current,
          pibReal: dados,
        }));
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error('Erro ao carregar o PIB real:', error);

        setErrors((current) => ({
          ...current,
          pibReal: 'Não foi possível carregar o PIB real.',
        }));
      } finally {
        if (!controller.signal.aborted) {
          setLoading((current) => ({
            ...current,
            pibReal: false,
          }));
        }
      }
    }

    async function carregarDesemprego() {
      try {
        const dados = await buscarDesemprego(controller.signal);

        setIndicators((current) => ({
          ...current,
          indiceDesemprego: dados,
        }));
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error('Erro ao carregar o desemprego:', error);

        setErrors((current) => ({
          ...current,
          indiceDesemprego: 'Não foi possível carregar a taxa de desocupação.',
        }));
      } finally {
        if (!controller.signal.aborted) {
          setLoading((current) => ({
            ...current,
            indiceDesemprego: false,
          }));
        }
      }
    }

    async function carregarIpca() {
      try {
        const dados = await buscarIpca(controller.signal);

        setIndicators((current) => ({
          ...current,
          ipca: dados,
        }));
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error('Erro ao carregar o IPCA:', error);

        setErrors((current) => ({
          ...current,
          ipca: 'Não foi possível carregar o IPCA.',
        }));
      } finally {
        if (!controller.signal.aborted) {
          setLoading((current) => ({
            ...current,
            ipca: false,
          }));
        }
      }
    }

    async function carregarRendimentoMedio() {
      try {
        const dados = await buscarRendimentoMedio(controller.signal);
        setIndicators((current) => ({
          ...current,
          rendimentoMedio: dados,
        }));
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Erro ao carregar o rendimento medio:', error);
        setErrors((current) => ({
          ...current,
          ipca: 'Não foi possível carregar o rendimento medio.',
        }));
      } finally {
        if (!controller.signal.aborted) {
          setLoading((current) => ({
            ...current,
            rendimentoMedio: false,
          }));
        }
      }
    }

    async function carregarInformalidade() {
      try {
        const dados = await buscarInformalidade(controller.signal);

        setIndicators((prev) => ({
          ...prev,
          informalidade: dados,
        }));
      } catch (error) {
        if (controller.signal.aborted || error.code === 'ERR_CANCELED') {
          return;
        }

        console.error('Erro ao carregar informalidade:', error);
        console.error('Resposta da API:', error.response?.data);

        setErrors((prev) => ({
          ...prev,
          informalidade: error.response?.data || 'Erro ao carregar a taxa de informalidade.',
        }));
      } finally {
        if (!controller.signal.aborted) {
          setLoading((prev) => ({
            ...prev,
            informalidade: false,
          }));
        }
      }
    }

    function carregarEducacao() {
      try {
        const dados = buscarDespesasEducacao();

        setIndicators((prev) => ({
          ...prev,
          educacao: dados,
        }));
      } catch (error) {
        console.error('Erro ao carregar dados sobre educação:', error);

        setErrors((prev) => ({
          ...prev,
          educacao: 'Erro ao carregar os dados de educação.',
        }));
      } finally {
        setLoading((prev) => ({
          ...prev,
          educacao: false,
        }));
      }
    }

    function carregarInvestimentoFederal() {
      try {
        const dados = buscarInvestimentoPublico();
        setIndicators((prev) => ({
          ...prev,
          investimentoFederal: dados,
        }));
      } catch (error) {
        console.error('Erro ao carregar dados sobre investimento federal:', error);
        setErrors((prev) => ({
          ...prev,
          investimentoFederal: 'Erro ao carregar os dados de investimento federal.',
        }));
      } finally {
        setLoading((prev) => ({
          ...prev,
          investimentoFederal: false,
        }));
      }
    }

    carregarPib();
    carregarDesemprego();
    carregarIpca();
    carregarRendimentoMedio();
    carregarInformalidade();
    carregarEducacao();
    carregarInvestimentoFederal();

    return () => controller.abort();
  }, []);

  const value = {
    indicators,
    loading,
    errors,
  };

  return <IndicatorsContext.Provider value={value}>{children}</IndicatorsContext.Provider>;
}
