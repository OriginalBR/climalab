import React from 'react';
import { Database, Sparkles, ArrowRight, Table2 } from 'lucide-react';
import { useExperiment } from '../../context/ExperimentContext';
import { Badge } from '../common/Badge';

export const RealDataSyncBanner: React.FC = () => {
  const { globalStats, setActivePage } = useExperiment();

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-100 font-display">
              Integração Automática com os Dados do Grupo
            </h4>
            {globalStats.hasData && (
              <Badge variant="emerald" size="sm" dot>Sincronizado</Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {globalStats.hasData ? (
              <span>
                As médias e valores de ΔT estão sendo calculados em tempo real com base nos <strong>{globalStats.totalTests} testes</strong> cadastrados!
              </span>
            ) : (
              <span>
                Cadastre suas medições para ver os cálculos matemáticos automáticos dos seus ensaios reais.
              </span>
            )}
          </p>
        </div>
      </div>

      <button
        onClick={() => setActivePage('data')}
        className="shrink-0 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/50 self-end sm:self-auto"
      >
        <Table2 className="w-4 h-4" />
        <span>{globalStats.hasData ? 'Ver / Editar Dados' : 'Inserir Medições'}</span>
      </button>
    </div>
  );
};
