import React, { useState } from 'react';
import { 
  Sliders, 
  Play, 
  Download, 
  AlertTriangle, 
  Sparkles, 
  RotateCcw,
  Sun,
  Wind,
  Clock,
  TrendingUp,
  Table as TableIcon
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useExperiment } from '../../context/ExperimentContext';
import { runParametricSimulation } from '../../utils/math';
import { SimulatedPoint } from '../../types';
import { sound } from '../../utils/sound';

export const ParametricControls: React.FC = () => {
  const { simulationParams, setSimulationParams } = useExperiment();
  const [results, setResults] = useState<SimulatedPoint[]>(() => runParametricSimulation(simulationParams));
  const [hasRun, setHasRun] = useState(true);

  const handleRun = () => {
    sound.playSolarPulse();
    const simulated = runParametricSimulation(simulationParams);
    setResults(simulated);
    setHasRun(true);
  };

  const handleResetDefaults = () => {
    sound.playClick();
    const defaults = {
      initialTemp: 24.0,
      exposureMinutes: 30,
      intervalMinutes: 5,
      blackHeatingRate: 14.5,
      clearHeatingRate: 7.2,
      solarIntensity: 'high' as const,
      windConvection: 'none' as const,
    };
    setSimulationParams(defaults);
    setResults(runParametricSimulation(defaults));
  };

  const handleExportCSV = () => {
    sound.playClick();
    const headers = ['Tempo (min)', 'Temp Garrafa Preta (°C)', 'Temp Garrafa Transparente (°C)', 'Diferenca (°C)'];
    const rows = results.map(r => [
      r.timeMinutes,
      r.tempBlack.toFixed(2),
      r.tempClear.toFixed(2),
      r.difference.toFixed(2)
    ]);
    const csv = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'simulacao_parametrica_ods13.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const finalPoint = results[results.length - 1] || { tempBlack: 0, tempClear: 0, difference: 0 };
  const initialPoint = results[0] || { tempBlack: 0, tempClear: 0 };
  const deltaTBlack = (finalPoint.tempBlack - initialPoint.tempBlack).toFixed(1);
  const deltaTClear = (finalPoint.tempClear - initialPoint.tempClear).toFixed(1);

  // SVG Chart Calculation for the Simulation
  const maxTemp = Math.max(...results.map(r => Math.max(r.tempBlack, r.tempClear)), 40);
  const minTemp = Math.min(...results.map(r => Math.min(r.tempBlack, r.tempClear)), 20) - 2;
  const maxTime = results[results.length - 1]?.timeMinutes || 30;

  const getSvgX = (time: number) => (time / maxTime) * 100;
  const getSvgY = (temp: number) => 100 - ((temp - minTemp) / (maxTemp - minTemp)) * 100;

  const blackPath = results.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getSvgX(p.timeMinutes)} ${getSvgY(p.tempBlack)}`).join(' ');
  const clearPath = results.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getSvgX(p.timeMinutes)} ${getSvgY(p.tempClear)}`).join(' ');

  return (
    <div className="space-y-6">
      
      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200 text-xs">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-bold block mb-0.5">
            ⚠️ SIMULADOR TEÓRICO DIDÁTICO
          </strong>
          Os valores desta página são calculados por modelos matemáticos e simulações físicas aproximadas. 
          Eles <strong>não devem ser apresentados como dados reais coletados pelo grupo</strong>, servindo apenas para testar cenários hipotéticos.
        </div>
      </div>

      {/* Grid: Parameters Form (Left) & Live Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form Controls (5 cols) */}
        <Card className="lg:col-span-5 border-slate-800 bg-slate-950/80 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-100 font-display">
                Parâmetros Físicos do Experimento
              </h3>
            </div>
            <button
              onClick={handleResetDefaults}
              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Padrão
            </button>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* Initial Temp */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Temperatura Inicial da Água:</span>
                <span className="font-mono font-bold text-emerald-400">{simulationParams.initialTemp}°C</span>
              </div>
              <input
                type="range"
                min={15}
                max={35}
                step={0.5}
                value={simulationParams.initialTemp}
                onChange={(e) => setSimulationParams(prev => ({ ...prev, initialTemp: parseFloat(e.target.value) }))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2"
              />
            </div>

            {/* Exposure Time */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Tempo Total de Exposição:</span>
                <span className="font-mono font-bold text-emerald-400">{simulationParams.exposureMinutes} minutos</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={simulationParams.exposureMinutes}
                onChange={(e) => setSimulationParams(prev => ({ ...prev, exposureMinutes: parseInt(e.target.value) }))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2"
              />
            </div>

            {/* Interval */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Intervalo entre Medições:</span>
                <span className="font-mono font-bold text-emerald-400">{simulationParams.intervalMinutes} min</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2, 5, 10, 15].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setSimulationParams(prev => ({ ...prev, intervalMinutes: val }))}
                    className={`py-1.5 rounded-lg border text-xs font-mono font-semibold transition-colors ${
                      simulationParams.intervalMinutes === val
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {val} min
                  </button>
                ))}
              </div>
            </div>

            {/* Heating Rate Black */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Ganho Base — Garrafa Preta (🖤):</span>
                <span className="font-mono font-bold text-rose-400">+{simulationParams.blackHeatingRate}°C</span>
              </div>
              <input
                type="range"
                min={5}
                max={25}
                step={0.5}
                value={simulationParams.blackHeatingRate}
                onChange={(e) => setSimulationParams(prev => ({ ...prev, blackHeatingRate: parseFloat(e.target.value) }))}
                className="w-full accent-rose-500 bg-slate-800 rounded-lg h-2"
              />
            </div>

            {/* Heating Rate Clear */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Ganho Base — Garrafa Transparente (🫙):</span>
                <span className="font-mono font-bold text-sky-400">+{simulationParams.clearHeatingRate}°C</span>
              </div>
              <input
                type="range"
                min={2}
                max={15}
                step={0.5}
                value={simulationParams.clearHeatingRate}
                onChange={(e) => setSimulationParams(prev => ({ ...prev, clearHeatingRate: parseFloat(e.target.value) }))}
                className="w-full accent-sky-500 bg-slate-800 rounded-lg h-2"
              />
            </div>

            {/* Solar Intensity */}
            <div>
              <label className="text-slate-300 block mb-1">Intensidade Solar:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'low', label: 'Nublado (Baixa)' },
                  { id: 'medium', label: 'Sol Moderado' },
                  { id: 'high', label: 'Sol Pleno (Forte)' }
                ].map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSimulationParams(prev => ({ ...prev, solarIntensity: s.id as any }))}
                    className={`p-2 rounded-xl border text-[11px] font-medium transition-colors ${
                      simulationParams.solarIntensity === s.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wind Convection */}
            <div>
              <label className="text-slate-300 block mb-1">Influência do Vento (Convecção):</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'Sem Vento' },
                  { id: 'breeze', label: 'Brisa Suave' },
                  { id: 'moderate', label: 'Vento Médio' }
                ].map(w => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setSimulationParams(prev => ({ ...prev, windConvection: w.id as any }))}
                    className={`p-2 rounded-xl border text-[11px] font-medium transition-colors ${
                      simulationParams.windConvection === w.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <Button
            variant="solar"
            size="lg"
            icon={<Play className="w-4 h-4" />}
            onClick={handleRun}
            className="w-full"
          >
            Executar Simulação
          </Button>
        </Card>

        {/* Live Simulation Results & Graph (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">ΔT Preta Simulada</span>
              <span className="text-xl font-mono font-bold text-rose-400">+{deltaTBlack}°C</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">ΔT Transp. Simulada</span>
              <span className="text-xl font-mono font-bold text-sky-400">+{deltaTClear}°C</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Diferença Final</span>
              <span className="text-xl font-mono font-bold text-amber-400">
                {(finalPoint.tempBlack - finalPoint.tempClear).toFixed(1)}°C
              </span>
            </div>
          </div>

          {/* Graphical Curve (SVG) */}
          <Card className="border-slate-800 bg-slate-950/90 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-slate-200">
                  Gráfico de Aquecimento Simulado (Temperatura × Tempo)
                </h4>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-rose-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Garrafa Preta
                </span>
                <span className="flex items-center gap-1 text-sky-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Transparente
                </span>
              </div>
            </div>

            {/* SVG Plot */}
            <div className="relative w-full h-52 bg-slate-900/60 rounded-xl p-4 border border-slate-800/80">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                {[0, 25, 50, 75, 100].map(y => (
                  <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                ))}
                {/* Curve Black */}
                <path d={blackPath} fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                {/* Curve Clear */}
                <path d={clearPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 1" />
                {/* Points */}
                {results.map((p, i) => (
                  <g key={i}>
                    <circle cx={getSvgX(p.timeMinutes)} cy={getSvgY(p.tempBlack)} r="2" fill="#f43f5e" />
                    <circle cx={getSvgX(p.timeMinutes)} cy={getSvgY(p.tempClear)} r="2" fill="#38bdf8" />
                  </g>
                ))}
              </svg>
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 min</span>
              <span>Tempo de Exposição ({maxTime} min)</span>
              <span>{maxTime} min</span>
            </div>
          </Card>

          {/* Generated Data Table */}
          <Card className="border-slate-800 bg-slate-950/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <TableIcon className="w-4 h-4 text-emerald-400" />
                <span>Tabela Gerada pelo Simulador</span>
              </div>
              <button
                onClick={handleExportCSV}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Exportar CSV
              </button>
            </div>

            <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 text-[11px] sticky top-0">
                  <tr>
                    <th className="p-2.5">Tempo</th>
                    <th className="p-2.5 text-rose-400">Garrafa Preta</th>
                    <th className="p-2.5 text-sky-400">Transparente</th>
                    <th className="p-2.5 text-amber-400">Diferença</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {results.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-900/40">
                      <td className="p-2.5 text-slate-300">{r.timeMinutes} min</td>
                      <td className="p-2.5 text-rose-300 font-semibold">{r.tempBlack.toFixed(1)}°C</td>
                      <td className="p-2.5 text-sky-300 font-semibold">{r.tempClear.toFixed(1)}°C</td>
                      <td className="p-2.5 text-amber-300">+{r.difference.toFixed(1)}°C</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
};
