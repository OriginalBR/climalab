import React, { useState } from 'react';
import { Percent, ArrowRight, Sparkles, Info } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { calculatePercentageDifference } from '../../utils/math';
import { sound } from '../../utils/sound';

export const PercentageCalculator: React.FC = () => {
  const [higherVal, setHigherVal] = useState<string>('14.0');
  const [lowerVal, setLowerVal] = useState<string>('7.0');
  const [result, setResult] = useState<number | null>(100.0);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(higherVal.replace(',', '.'));
    const l = parseFloat(lowerVal.replace(',', '.'));
    if (!isNaN(h) && !isNaN(l) && l > 0) {
      sound.playClick();
      setResult(calculatePercentageDifference(h, l));
    }
  };

  return (
    <Card className="border-slate-800 bg-slate-950/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Percent className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-slate-100 font-display">
            Calculadora 3: Diferença Percentual (%)
          </h3>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              ΔT Maior (Garrafa mais aquecida):
            </label>
            <div className="relative">
              <input
                type="text"
                value={higherVal}
                onChange={(e) => setHigherVal(e.target.value)}
                placeholder="Ex: 14.0"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">°C</span>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              ΔT Menor (Valor de Referência Base):
            </label>
            <div className="relative">
              <input
                type="text"
                value={lowerVal}
                onChange={(e) => setLowerVal(e.target.value)}
                placeholder="Ex: 7.0"
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
      {result !== null && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-wider text-amber-400">
              Passo a Passo da Fórmula:
            </span>
            <span className="font-mono text-slate-300 font-bold">
              (({higherVal} − {lowerVal}) ÷ {lowerVal}) × 100
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block mb-0.5">Diferença Percentual Calculada:</span>
            <span className="text-2xl font-mono font-extrabold text-amber-400">
              +{result}%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <strong className="text-amber-300 font-bold block">Significado Científico:</strong>
            <p>
              A garrafa de maior aquecimento (ΔT = {higherVal}°C) teve uma elevação de temperatura <strong>{result}% maior</strong> em relação à variação da garrafa de referência (ΔT = {lowerVal}°C).
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
