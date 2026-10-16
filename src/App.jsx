import './App.css';
import UnemploymentChart from './components/unemploymentChart';
import IpcaChart from './components/ipcaChart';
import PibChart from './components/pibChart';
import IncomeChart from './components/incomeChart';
import InformalityChart from './components/informalityChart';
import EducationChart from './components/educationChart';
import InvestimentoFederalChart from './components/federalInvestmentChart';

export default function App() {
  return (
    <main className="dashboard">
      <header>
        <h1>Indicadores econômicos do Brasil</h1>
      </header>

      <div className="charts-grid">
        <PibChart />
        <UnemploymentChart />
        <IpcaChart />
        <IncomeChart />
        <InformalityChart />
        <EducationChart />
        <InvestimentoFederalChart />
      </div>
    </main>
  );
}
