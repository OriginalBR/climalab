import React, { useState } from 'react';
import { Percent, ArrowRight, Sparkles, Info, AlertTriangle } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { calculatePercentageDifference } from '../../utils/math';
import { sound } from '../../utils/sound';

export const PercentageCalculator: React.FC = () => {
  const [blackDelta, setBlackDelta] = useState<string>('15.0');
  const [clearDelta, setClearDelta] = useState<string>('10.0');
  const [calcResult, setCalcResult] = useState<{ percentage: number | null; note: string; canCalculate: boolean }>(() => 
    calculatePercentageDifference(15.0, 10.0)
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const b = parseFloat(blackDelta.replace(',', '.'));
    const c = parseFloat(clearDelta.replace(',', '.'));
    if (!isNaN(b) && !isNaN(c)) {
      sound.playClick();
      setCalcResult(calculatePercentageDifference(b, c));
    }
  };

  return (
    <Card className="border-slate-800 bg-slate-950/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Percent className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-slate-100 font-display">
            Calculadora 3: Diferença Percentual de ΔT (%)
          </h3>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              ΔT Garrafa Preta:
            </label>
            <div className="relative">
              <input
                type="text"
                value={blackDelta}
                onChange={(e) => setBlackDelta(e.target.value)}
                placeholder="Ex: 15.0"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">°C</span>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              ΔT Transparente (Referência Base):
            </label>
            <div className="relative">
              <input
                type="text"
                value={clearDelta}
                onChange={(e) => setClearDelta(e.target.value)}
                placeholder="Ex: 10.0"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">°C</span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="solar"
          size="md"
          className="w-full"
        >
          Calcular Diferença Percentual
        </Button>
      </form>

      {/* Result demonstration */}
      {calcResult && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-wider text-amber-400">
              Fórmula Aplicada:
            </span>
            <span className="font-mono text-slate-300 font-bold">
              ((ΔT_preta − ΔT_transp) ÷ ΔT_transp) × 100
            </span>
          </div>

          {calcResult.canCalculate && calcResult.percentage !== null ? (
            <>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-0.5">
                  Diferença Percentual em Relação à Transparente:
                </span>
                <span className="text-2xl font-mono font-extrabold text-amber-400">
                  {calcResult.percentage > 0 ? `+${calcResult.percentage}%` : `${calcResult.percentage}%`}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <strong className="text-amber-300 font-bold block">Significado com Referência Explícita:</strong>
                <p>{calcResult.note}</p>
              </div>
            </>
          ) : (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{calcResult.note}</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
