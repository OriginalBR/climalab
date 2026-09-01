import React from 'react';
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';
import { useExperiment } from '../../context/ExperimentContext';
import { summarizeTest } from '../../utils/math';

export const DeltaTComparisonChart: React.FC = () => {
  const { measurements, globalStats } = useExperiment();

  if (!globalStats.hasData) {
    return null;
  }

  const testNumbers = Array.from(new Set(measurements.map(m => m.testNumber))).sort((a, b) => a - b);
  const testSummaries = testNumbers
    .map(tNum => summarizeTest(measurements, tNum))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  if (testSummaries.length === 0) return null;

  // Max Delta T for bar scaling
  const maxDelta = Math.max(...testSummaries.flatMap(s => [s.deltaTBlack, s.deltaTClear]), 10);

  return (
    <Card className="border-slate-800 bg-slate-950/80 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100 font-display">
              Comparativo de Variação Total (ΔT) por Teste
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            ΔT = Temperatura Final − Temperatura Inicial (°C)
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-rose-400 font-bold">
            <span className="w-3 h-3 rounded bg-rose-500" /> Garrafa Preta
          </span>
          <span className="flex items-center gap-1.5 text-sky-400 font-bold">
            <span className="w-3 h-3 rounded bg-sky-500" /> Garrafa Transparente
          </span>
        </div>
      </div>

      {/* Bar Columns Grid */}
      <div className="space-y-4 pt-2">
        {testSummaries.map((test) => {
          const blackPct = (test.deltaTBlack / maxDelta) * 100;
          const clearPct = (test.deltaTClear / maxDelta) * 100;

          return (
            <div key={test.testNumber} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200">Ensaio Experimental {test.testNumber}</span>
                <span className="text-[11px] font-mono text-amber-400 font-semibold">
                  Diferença: {test.differenceDeltaT > 0 ? `+${test.differenceDeltaT.toFixed(1)}°C` : `${test.differenceDeltaT.toFixed(1)}°C`} {test.percentageDifference !== null ? `(${test.percentageDifference > 0 ? '+' : ''}${test.percentageDifference}%)` : ''}
                </span>
              </div>

              {/* Bars Row */}
              <div className="space-y-2">
                {/* Black bottle bar */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Garrafa Preta (🖤)</span>
                    <span className="font-mono font-bold text-rose-400">+{test.deltaTBlack.toFixed(1)}°C</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, blackPct))}%` }}
                    />
                  </div>
                </div>

                {/* Clear bottle bar */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Garrafa Transparente (🫙)</span>
                    <span className="font-mono font-bold text-sky-400">+{test.deltaTClear.toFixed(1)}°C</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-600 to-sky-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, clearPct))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
