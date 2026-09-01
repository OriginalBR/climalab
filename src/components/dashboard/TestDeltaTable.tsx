import React from 'react';
import { Table2, ArrowUpRight, Scale, Sparkles, CheckCircle } from 'lucide-react';
import { TestSummary } from '../../types';
import { Badge } from '../common/Badge';

interface TestDeltaTableProps {
  testSummaries: TestSummary[];
  marginThreshold: number;
}

export const TestDeltaTable: React.FC<TestDeltaTableProps> = ({
  testSummaries,
  marginThreshold,
}) => {
  if (!testSummaries || testSummaries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <Table2 className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Detalhamento de ΔT por Ensaio Real
          </h4>
        </div>
        <span className="text-[11px] text-slate-400">
          ΔT = T_final − T_inicial (Margem de decisão: ±{marginThreshold.toFixed(1)}°C)
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-lg">
        <table className="w-full text-left text-xs border-collapse font-sans">
          <thead className="bg-slate-900/90 text-slate-400 text-[11px] uppercase font-bold border-b border-slate-800">
            <tr>
              <th className="p-3">Ensaio</th>
              <th className="p-3">T_inicial (P / T)</th>
              <th className="p-3">T_final (P / T)</th>
              <th className="p-3 text-rose-400 font-mono">ΔT Preta</th>
              <th className="p-3 text-sky-400 font-mono">ΔT Transparente</th>
              <th className="p-3 text-amber-400 font-mono">Diferença</th>
              <th className="p-3 text-center">Maior Variação no Teste</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
            {testSummaries.map((s) => {
              const isBlackWinner = s.higherBottle === 'black';
              const isClearWinner = s.higherBottle === 'clear';

              return (
                <tr key={s.testNumber} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-3 font-sans font-bold text-slate-200">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[11px]">
                      Teste {s.testNumber}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">
                    <span className="text-rose-400">{s.initialTempBlack.toFixed(1)}°C</span>
                    <span className="text-slate-600 mx-1">/</span>
                    <span className="text-sky-400">{s.initialTempClear.toFixed(1)}°C</span>
                  </td>
                  <td className="p-3 text-slate-300">
                    <span className="text-rose-400">{s.finalTempBlack.toFixed(1)}°C</span>
                    <span className="text-slate-600 mx-1">/</span>
                    <span className="text-sky-400">{s.finalTempClear.toFixed(1)}°C</span>
                    <span className="text-[10px] text-slate-500 font-sans ml-1">({s.maxTimeMinutes}m)</span>
                  </td>
                  <td className="p-3 font-bold text-rose-400 text-sm">
                    +{s.deltaTBlack.toFixed(1)}°C
                  </td>
                  <td className="p-3 font-bold text-sky-400 text-sm">
                    +{s.deltaTClear.toFixed(1)}°C
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      s.differenceDeltaT > 0 
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20' 
                        : s.differenceDeltaT < 0 
                        ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20' 
                        : 'text-slate-400'
                    }`}>
                      {s.differenceDeltaT > 0 ? `+${s.differenceDeltaT.toFixed(1)}°C` : `${s.differenceDeltaT.toFixed(1)}°C`}
                    </span>
                  </td>
                  <td className="p-3 text-center font-sans">
                    {isBlackWinner ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30 shadow-sm">
                        🖤 Garrafa Preta
                      </span>
                    ) : isClearWinner ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-300 border border-sky-500/30 shadow-sm">
                        🫙 Transparente
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                        ⚖️ Sem diferença clara
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
