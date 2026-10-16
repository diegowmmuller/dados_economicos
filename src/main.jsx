import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { IndicatorsProvider } from './contexts/indicatorsProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IndicatorsProvider>
      <App />
    </IndicatorsProvider>
  </StrictMode>,
);
