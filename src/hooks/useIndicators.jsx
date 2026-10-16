import { useContext } from 'react';
import { IndicatorsContext } from '../contexts/indicatorsContext';

export function useIndicators() {
  const context = useContext(IndicatorsContext);

  if (context === null) {
    throw new Error('useIndicators deve ser utilizado dentro de IndicatorsProvider.');
  }

  return context;
}
