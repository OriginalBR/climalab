import React from 'react';
import { Gauge, Zap, TrendingUp } from 'lucide-react';
import { Card } from '../common/Card';
import { useExperiment } from '../../context/ExperimentContext';
import { calculateHeatingRate } from '../../utils/math';

export const HeatingRateChart: React.FC = () => {
  const { measurements, globalStats } = useExperiment();

  if (!globalStats.hasData || measurements.length < 2) {
    return null;
  }

  // Calculate rate between successive measurements for the most recent test
  const activeTest = Math.max(...measurements.map(m => m.testNumber));
  const points = measurements
    .filter(m => m.testNumber === activeTest)
    .sort((a, b) => a.timeMinutes - b.timeMinutes);

  const intervals: {
    label: string;
    rateBlack: number;
    rateClear: number;
  }[] = [];

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dt = curr.timeMinutes - prev.timeMinutes;
    if (dt > 0) {
      intervals.push({
        label: `${prev.timeMinutes}–${curr.timeMinutes} min`,
        rateBlack: calculateHeatingRate(curr.tempBlack - prev.tempBlack, dt),
        rateClear: calculateHeatingRate(curr.tempClear - prev.tempClear, dt),
      });
    }
  }

  if (intervals.length === 0) return null;

  return (
    <Card className="border-slate-800 bg-slate-950/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-display">
              Taxa Instantânea de Aquecimento (°C/min) — Teste {activeTest}
            </h3>
            <p className="text-[11px] text-slate-400">
              Velocidade em que a temperatura subiu a cada intervalo de medição
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {intervals.map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 block">{item.label}</span>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-rose-400 font-medium">🖤 Garrafa Preta:</span>
              <span className="font-mono font-bold text-rose-300">+{item.rateBlack.toFixed(2)} °C/min</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-sky-400 font-medium">🫙 Transparente:</span>
              <span className="font-mono font-bold text-sky-300">+{item.rateClear.toFixed(2)} °C/min</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
