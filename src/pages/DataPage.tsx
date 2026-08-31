import React from 'react';
import { Table2, PlusCircle, Sparkles, Database, CheckCircle2 } from 'lucide-react';
import { MeasurementInputForm } from '../components/data/MeasurementInputForm';
import { MeasurementsDataTable } from '../components/data/MeasurementsDataTable';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useExperiment } from '../context/ExperimentContext';

export const DataPage: React.FC = () => {
  const { measurements, globalStats } = useExperiment();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Coleta de Evidências Reais
            </span>
            <Badge variant="emerald" dot>Persistência Local Automática</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Registro dos Resultados Reais do Grupo
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Insira os dados medidos com o termômetro em cada intervalo para gerar gráficos e médias automáticas
          </p>
        </div>
      </div>

      {/* Input Form Card */}
      <Card className="border-emerald-500/30 bg-slate-950/90 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100 font-display">
              Adicionar Nova Medição Experimental
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            Tempo em minutos e temperaturas em °C
          </span>
        </div>

        <MeasurementInputForm />
      </Card>

      {/* Real Data Table Card */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
            <Database className="w-4 h-4 text-sky-400" />
            Tabela de Medições Registradas ({measurements.length})
          </h3>
          <span className="text-xs text-slate-400">
            🟢 Dados 100% reais cadastrados pelo grupo
          </span>
        </div>

        <MeasurementsDataTable />
      </div>
    </div>
  );
};
