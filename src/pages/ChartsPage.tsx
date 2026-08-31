import React from 'react';
import { LineChart, BarChart3, Zap, ArrowRight, Table2 } from 'lucide-react';
import { TemperatureTimeChart } from '../components/charts/TemperatureTimeChart';
import { DeltaTComparisonChart } from '../components/charts/DeltaTComparisonChart';
import { HeatingRateChart } from '../components/charts/HeatingRateChart';
import { useExperiment } from '../context/ExperimentContext';
import { Button } from '../components/common/Button';

export const ChartsPage: React.FC = () => {
  const { measurements, globalStats, setActivePage, loadSampleData } = useExperiment();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Visualização Gráfica Dinâmica
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Análise Gráfica dos Resultados
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gráficos gerados automaticamente a partir dos dados experimentais cadastrados
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            icon={<Table2 className="w-4 h-4" />}
            onClick={() => setActivePage('data')}
          >
            {globalStats.hasData ? 'Ver Tabela de Dados' : 'Inserir Medições'}
          </Button>
        </div>
      </div>

      {!globalStats.hasData ? (
        <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
          <LineChart className="w-12 h-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-200">
              Nenhum gráfico real disponível ainda
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Assim que você inserir os dados na aba "Dados Reais", os gráficos de Temperatura × Tempo, Variação Total e Taxas aparecerão aqui instantaneamente.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="primary" size="md" onClick={() => setActivePage('data')}>
              Inserir Dados Agora
            </Button>
            <Button variant="outline" size="md" onClick={loadSampleData}>
              Carregar Dados de Exemplo
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Main Temperature vs Time Chart */}
          <TemperatureTimeChart />

          {/* Delta T Comparison Chart */}
          <DeltaTComparisonChart />

          {/* Heating Rate per Interval */}
          <HeatingRateChart />
        </div>
      )}
    </div>
  );
};
