import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { calculateDeltaT } from '../../utils/math';
import { sound } from '../../utils/sound';

export const DeltaTCalculator: React.FC = () => {
  const [initialT, setInitialT] = useState<string>('24.5');
  const [finalT, setFinalT] = useState<string>('38.0');
  const [result, setResult] = useState<number | null>(13.5);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const init = parseFloat(initialT.replace(',', '.'));
    const fin = parseFloat(finalT.replace(',', '.'));
    if (!isNaN(init) && !isNaN(fin)) {
      sound.playClick();
      setResult(calculateDeltaT(fin, init));
    }
  };

  return (
    <Card className="border-slate-800 bg-slate-950/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-slate-100 font-display">
            Calculadora 1: Variação de Temperatura (ΔT)
          </h3>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Temperatura Inicial (T<sub className="font-sans">inicial</sub>):
            </label>
            <div className="relative">
              <input
                type="text"
                value={initialT}
                onChange={(e) => setInitialT(e.target.value)}
                placeholder="Ex: 24.5"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">°C</span>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Temperatura Final (T<sub className="font-sans">final</sub>):
            </label>
            <div className="relative">
              <input
                type="text"
                value={finalT}
                onChange={(e) => setFinalT(e.target.value)}
                placeholder="Ex: 38.0"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">°C</span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
        >
          Calcular ΔT
        </Button>
      </form>

      {/* Step by Step Demonstration */}
      {result !== null && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              Demonstração Passo a Passo:
            </span>
            <span className="text-xs font-mono font-bold text-slate-200">
              ΔT = {finalT}°C − {initialT}°C
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block mb-0.5">Variação de Temperatura (ΔT):</span>
            <span className="text-2xl font-mono font-extrabold text-purple-300">
              +{result}°C
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};
