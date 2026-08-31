import React, { useState } from 'react';
import { LineChart, Sparkles, Filter, Info } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { useExperiment } from '../../context/ExperimentContext';
import { Measurement } from '../../types';

interface TemperatureTimeChartProps {
  customMeasurements?: Measurement[];
  title?: string;
  showFilter?: boolean;
}

export const TemperatureTimeChart: React.FC<TemperatureTimeChartProps> = ({
  customMeasurements,
  title = 'Temperatura × Tempo de Exposição Solar',
  showFilter = true,
}) => {
  const { measurements } = useExperiment();
  const data = customMeasurements || measurements;

  const [selectedTest, setSelectedTest] = useState<number | 'all'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<{
    time: number;
    black: number;
    clear: number;
    x: number;
    y: number;
  } | null>(null);

  const testNumbers = Array.from(new Set(data.map(m => m.testNumber))).sort((a, b) => a - b);

  // Group and sort data points
  const activePoints = data
    .filter(m => selectedTest === 'all' || m.testNumber === selectedTest)
    .sort((a, b) => a.timeMinutes - b.timeMinutes);

  // If "all" is selected and there are multiple tests, calculate mean at each unique time step
  const uniqueTimes = Array.from(new Set(activePoints.map(p => p.timeMinutes))).sort((a, b) => a - b);
  
  const chartSeries = uniqueTimes.map(t => {
    const matching = activePoints.filter(p => p.timeMinutes === t);
    const avgBlack = Number((matching.reduce((acc, c) => acc + c.tempBlack, 0) / matching.length).toFixed(1));
    const avgClear = Number((matching.reduce((acc, c) => acc + c.tempClear, 0) / matching.length).toFixed(1));
    return {
      timeMinutes: t,
      tempBlack: avgBlack,
      tempClear: avgClear,
    };
  });

  if (chartSeries.length < 2) {
    return (
      <Card className="border-slate-800 bg-slate-950/70 p-8 text-center space-y-3">
        <LineChart className="w-10 h-10 text-slate-600 mx-auto" />
        <h4 className="text-sm font-bold text-slate-300 font-display">
          Aguardando medições para gerar a curva
        </h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          São necessárias pelo menos 2 medições de tempo para traçar o gráfico de Temperatura × Tempo.
        </p>
      </Card>
    );
  }

  // Calculate scales
  const allTemps = chartSeries.flatMap(s => [s.tempBlack, s.tempClear]);
  const minTemp = Math.floor(Math.min(...allTemps) - 1);
  const maxTemp = Math.ceil(Math.max(...allTemps) + 1);
  const maxTime = Math.max(...chartSeries.map(s => s.timeMinutes), 10);

  const getSvgX = (t: number) => {
    const padding = 10;
    return padding + (t / maxTime) * (100 - 2 * padding);
  };

  const getSvgY = (temp: number) => {
    const padding = 12;
    const range = maxTemp - minTemp || 1;
    return 100 - padding - ((temp - minTemp) / range) * (100 - 2 * padding);
  };

  const blackPath = chartSeries.map((s, i) => `${i === 0 ? 'M' : 'L'} ${getSvgX(s.timeMinutes)} ${getSvgY(s.tempBlack)}`).join(' ');
  const clearPath = chartSeries.map((s, i) => `${i === 0 ? 'M' : 'L'} ${getSvgX(s.timeMinutes)} ${getSvgY(s.tempClear)}`).join(' ');

  // Y-axis grid ticks (4 steps)
  const yTicks = [0, 0.33, 0.66, 1].map(pct => {
    const val = minTemp + pct * (maxTemp - minTemp);
    return { val: Number(val.toFixed(1)), y: getSvgY(val) };
  });

  return (
    <Card className="border-slate-800 bg-slate-950/90 space-y-4 relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <LineChart className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100 font-display">
              {title}
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Eixo X: Tempo (minutos) • Eixo Y: Temperatura da água (°C)
          </p>
        </div>

        {/* Legend and Filter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <span className="w-3 h-1.5 rounded-full bg-rose-500" /> Garrafa Preta (🖤)
            </span>
            <span className="flex items-center gap-1.5 text-sky-400 font-bold">
              <span className="w-3 h-1.5 rounded-full bg-sky-500" /> Transparente (🫙)
            </span>
          </div>

          {showFilter && testNumbers.length > 1 && (
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 text-[11px]">
              <button
                onClick={() => setSelectedTest('all')}
                className={`px-2 py-0.5 rounded-lg font-semibold transition-colors ${
                  selectedTest === 'all' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Média
              </button>
              {testNumbers.map(n => (
                <button
                  key={n}
                  onClick={() => setSelectedTest(n)}
                  className={`px-2 py-0.5 rounded-lg font-semibold transition-colors ${
                    selectedTest === n ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400'
                  }`}
                >
                  T{n}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-64 sm:h-72 bg-slate-900/40 rounded-2xl p-4 border border-slate-800/80">
        
        {/* Y Axis Values Labels */}
        <div className="absolute left-2 top-3 bottom-8 flex flex-col justify-between text-[10px] font-mono text-slate-500 pointer-events-none select-none">
          <span>{maxTemp}°C</span>
          <span>{Number(((maxTemp + minTemp) / 2).toFixed(1))}°C</span>
          <span>{minTemp}°C</span>
        </div>

        {/* SVG Plot */}
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Horizontal Grid lines */}
          {yTicks.map((t, idx) => (
            <line
              key={idx}
              x1="6"
              y1={t.y}
              x2="95"
              y2={t.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          ))}

          {/* Lines */}
          <path
            d={blackPath}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_0_8px_rgba(244,63,94,0.3)] transition-all duration-300"
          />
          <path
            d={clearPath}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 2"
            className="filter drop-shadow-[0_0_8px_rgba(56,189,248,0.3)] transition-all duration-300"
          />

          {/* Interactive Data Points */}
          {chartSeries.map((s, idx) => {
            const x = getSvgX(s.timeMinutes);
            const yBlack = getSvgY(s.tempBlack);
            const yClear = getSvgY(s.tempClear);

            return (
              <g key={idx}>
                {/* Black point */}
                <circle
                  cx={x}
                  cy={yBlack}
                  r="3.5"
                  fill="#f43f5e"
                  stroke="#0f172a"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:r-5 transition-all"
                  onMouseEnter={() => setHoveredPoint({ time: s.timeMinutes, black: s.tempBlack, clear: s.tempClear, x, y: yBlack })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Clear point */}
                <circle
                  cx={x}
                  cy={yClear}
                  r="3.5"
                  fill="#38bdf8"
                  stroke="#0f172a"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:r-5 transition-all"
                  onMouseEnter={() => setHoveredPoint({ time: s.timeMinutes, black: s.tempBlack, clear: s.tempClear, x, y: yClear })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 bg-slate-950 border border-slate-700 rounded-xl p-2.5 shadow-2xl shadow-black text-xs font-mono"
            style={{
              left: `${hoveredPoint.x}%`,
              top: `${hoveredPoint.y}%`,
            }}
          >
            <div className="font-sans font-bold text-slate-200 text-[11px] mb-1">
              Tempo: {hoveredPoint.time} min
            </div>
            <div className="text-rose-400 font-bold">🖤 Preta: {hoveredPoint.black}°C</div>
            <div className="text-sky-400 font-bold">🫙 Transp: {hoveredPoint.clear}°C</div>
            <div className="text-amber-400 font-bold pt-1 border-t border-slate-800 mt-1">
              Δ Diferença: +{(hoveredPoint.black - hoveredPoint.clear).toFixed(1)}°C
            </div>
          </div>
        )}
      </div>

      {/* X Axis Time Labels */}
      <div className="flex justify-between items-center px-4 text-[11px] font-mono text-slate-500">
        <span>0 min</span>
        <span>Tempo de Exposição Solar</span>
        <span>{maxTime} min</span>
      </div>

    </Card>
  );
};
