import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sun, 
  Flame, 
  AlertTriangle, 
  Zap, 
  Clock, 
  Thermometer, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useExperiment } from '../../context/ExperimentContext';
import { sound } from '../../utils/sound';

export const InteractiveBottlesView: React.FC = () => {
  const { setActivePage } = useExperiment();

  // Interactive Demonstration State
  const [isRunning, setIsRunning] = useState(false);
  const [simTimeSeconds, setSimTimeSeconds] = useState(0); // 0 to 1800 (30 min virtual)
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(5); // 1x, 2x, 5x, 10x

  const initialTemp = 24.0;
  const maxSimSeconds = 1800; // 30 virtual minutes

  // Physical rates per virtual minute
  // Black bottle heats faster due to higher radiation absorptivity
  const virtualMinutes = simTimeSeconds / 60;
  const tempBlack = Number((initialTemp + (14.5 * (1 - Math.exp(-0.45 * (virtualMinutes / 10))))).toFixed(1));
  const tempClear = Number((initialTemp + (7.2 * (1 - Math.exp(-0.35 * (virtualMinutes / 10))))).toFixed(1));
  
  const deltaTBlack = Number((tempBlack - initialTemp).toFixed(1));
  const deltaTClear = Number((tempClear - initialTemp).toFixed(1));

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSimTimeSeconds(prev => {
          if (prev >= maxSimSeconds) {
            setIsRunning(false);
            sound.playSuccess();
            return maxSimSeconds;
          }
          return prev + 1 * speedMultiplier;
        });
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, speedMultiplier]);

  const handleTogglePlay = () => {
    if (!isRunning && simTimeSeconds >= maxSimSeconds) {
      setSimTimeSeconds(0);
    }
    sound.playClick();
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    sound.playClick();
    setIsRunning(false);
    setSimTimeSeconds(0);
  };

  // Format time mm:ss
  const formattedMinutes = Math.floor(simTimeSeconds / 60).toString().padStart(2, '0');
  const formattedSeconds = Math.floor(simTimeSeconds % 60).toString().padStart(2, '0');

  // Thermometer percentage heights (20°C to 45°C scale)
  const getThermoHeight = (t: number) => {
    const minScale = 20;
    const maxScale = 45;
    const pct = ((t - minScale) / (maxScale - minScale)) * 100;
    return Math.min(100, Math.max(10, pct));
  };

  return (
    <div className="space-y-6">
      
      {/* Simulation Rigour Warning Callout */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200 text-xs leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-bold block mb-0.5">
            ⚠️ AVISO DE RIGOR METODOLÓGICO: SIMULAÇÃO ILUSTRATIVA
          </strong>
          Esta animação visual serve para ilustrar didaticamente o processo físico de absorção de radiação e transferência de calor. 
          Os resultados científicos reais devem ser coletados com o termômetro do grupo e registrados na página de{' '}
          <button 
            onClick={() => setActivePage('data')} 
            className="underline font-bold text-amber-300 hover:text-white inline"
          >
            Dados Reais
          </button>.
        </div>
      </div>

      {/* Main Interactive Stage */}
      <Card className="border-slate-800 bg-slate-950/80 relative overflow-hidden p-6 sm:p-8">
        
        {/* Animated Sun in Center Top */}
        <div className="flex flex-col items-center justify-center text-center relative z-10 pb-4">
          <div className="relative group cursor-pointer">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.5)] transition-transform duration-500 ${isRunning ? 'animate-solar-glow scale-105' : ''}`}>
              <Sun className={`w-10 h-10 text-slate-950 ${isRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '20s' }} />
            </div>
            
            {/* Emitted Solar Radiation Rays */}
            {isRunning && (
              <div className="absolute -inset-10 pointer-events-none">
                <div className="w-full h-full border border-amber-400/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
              </div>
            )}
          </div>

          <div className="mt-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 justify-center">
              <Zap className="w-3.5 h-3.5" /> Radiação Solar Incidente
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Mesma intensidade de ondas eletromagnéticas atingindo ambas as garrafas
            </p>
          </div>
        </div>

        {/* Radiation Flow Beam Lines */}
        <div className="relative w-full h-12 hidden sm:block">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 20">
            {/* Left Beam to Black */}
            <path
              d="M 50 0 Q 30 15 25 20"
              fill="none"
              stroke={isRunning ? 'rgba(245, 158, 11, 0.6)' : 'rgba(255, 255, 255, 0.1)'}
              strokeWidth="2"
              strokeDasharray={isRunning ? '4 2' : 'none'}
              className={isRunning ? 'animate-ray-float' : ''}
            />
            {/* Right Beam to Clear */}
            <path
              d="M 50 0 Q 70 15 75 20"
              fill="none"
              stroke={isRunning ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.1)'}
              strokeWidth="2"
              strokeDasharray={isRunning ? '4 2' : 'none'}
              className={isRunning ? 'animate-ray-float' : ''}
            />
          </svg>
        </div>

        {/* Two Interactive Bottles Arena */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 pt-4 relative z-10">
          
          {/* 🖤 Garrafa Preta */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-zinc-950 to-black border border-zinc-700/60 shadow-2xl relative flex flex-col items-center text-center space-y-4 group">
            <div className="flex items-center justify-between w-full">
              <Badge variant="black" dot>🖤 Garrafa A</Badge>
              <span className="text-[11px] text-rose-400 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Alta Absorção
              </span>
            </div>

            {/* Bottle Graphic & Thermometer Row */}
            <div className="flex items-center justify-center gap-6 py-4 w-full">
              
              {/* Bottle Graphic */}
              <div className="relative w-28 h-56 flex flex-col items-center justify-end">
                {/* Bottle Neck */}
                <div className="w-8 h-8 bg-zinc-800 rounded-t-md border-t border-x border-zinc-600 relative">
                  <div className="w-10 h-3 bg-zinc-700 rounded -top-2 -left-1 absolute border border-zinc-500" />
                </div>
                {/* Bottle Body */}
                <div className="w-24 h-44 bg-zinc-950 rounded-b-3xl rounded-t-xl border-2 border-zinc-700 relative overflow-hidden shadow-2xl flex flex-col justify-end">
                  {/* Heat Shimmer Effect inside */}
                  {isRunning && (
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-amber-900/20 to-transparent animate-pulse" 
                      style={{ opacity: Math.min(1, (tempBlack - 24) / 15) }}
                    />
                  )}
                  {/* Water Level */}
                  <div className="w-full h-36 bg-gradient-to-t from-cyan-950/90 to-blue-900/60 border-t border-cyan-500/30 relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400/40 animate-pulse" />
                    <span className="text-[9px] font-mono text-cyan-300 font-bold block mt-2">Água (500ml)</span>
                  </div>
                  {/* Black Matte Texture */}
                  <div className="absolute inset-0 bg-black/60 pointer-events-none border border-white/5" />
                </div>
              </div>

              {/* Digital & Column Thermometer */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 h-40 bg-slate-900 rounded-full border border-slate-700 p-1 flex flex-col justify-end relative shadow-inner">
                  <div 
                    className="w-full rounded-full bg-gradient-to-t from-amber-500 via-rose-500 to-red-500 transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    style={{ height: `${getThermoHeight(tempBlack)}%` }}
                  />
                  <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-slate-700 -bottom-3 -left-1 absolute flex items-center justify-center text-[9px] font-bold text-white shadow-md">
                    °C
                  </div>
                </div>

                <div className="pt-3 text-center">
                  <span className="text-2xl font-mono font-extrabold text-amber-400 block tracking-tight">
                    {tempBlack.toFixed(1)}°C
                  </span>
                  <span className="text-[10px] text-rose-400 font-mono font-semibold">
                    ΔT: +{deltaTBlack.toFixed(1)}°C
                  </span>
                </div>
              </div>

            </div>

            <div className="w-full pt-3 border-t border-zinc-800 text-left space-y-1">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span>Superfície:</span>
                <span className="text-zinc-300 font-bold">Pintada de Preto</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Albedo estimado:</span>
                <span className="text-rose-400 font-mono">~0.05 (Muito Baixo)</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Comportamento:</span>
                <span className="text-slate-200">Absorve quase todo o espectro</span>
              </div>
            </div>
          </div>

          {/* 🫙 Garrafa Transparente */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-sky-950/20 border border-sky-800/40 shadow-2xl relative flex flex-col items-center text-center space-y-4 group">
            <div className="flex items-center justify-between w-full">
              <Badge variant="blue" dot>🫙 Garrafa B</Badge>
              <span className="text-[11px] text-sky-400 font-semibold flex items-center gap-1">
                <Sun className="w-3.5 h-3.5" /> Transmissão & Refração
              </span>
            </div>

            {/* Bottle Graphic & Thermometer Row */}
            <div className="flex items-center justify-center gap-6 py-4 w-full">
              
              {/* Bottle Graphic */}
              <div className="relative w-28 h-56 flex flex-col items-center justify-end">
                {/* Bottle Neck */}
                <div className="w-8 h-8 bg-sky-900/20 rounded-t-md border-t border-x border-sky-400/40 relative backdrop-blur-sm">
                  <div className="w-10 h-3 bg-sky-700/40 rounded -top-2 -left-1 absolute border border-sky-400/50" />
                </div>
                {/* Bottle Body */}
                <div className="w-24 h-44 bg-sky-950/10 rounded-b-3xl rounded-t-xl border-2 border-sky-400/50 relative overflow-hidden shadow-[0_0_20px_rgba(56,189,248,0.15)] flex flex-col justify-end backdrop-blur-[2px]">
                  {/* Glass Highlights */}
                  <div className="absolute top-2 left-2 w-1 h-36 bg-white/30 rounded-full blur-[0.5px]" />
                  <div className="absolute top-2 right-2 w-0.5 h-36 bg-sky-300/20 rounded-full" />
                  
                  {/* Water Level */}
                  <div className="w-full h-36 bg-gradient-to-t from-sky-500/20 to-cyan-400/10 border-t border-sky-300/40 relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-sky-300/40" />
                    <span className="text-[9px] font-mono text-sky-300 font-bold block mt-2">Água (500ml)</span>
                  </div>
                </div>
              </div>

              {/* Digital & Column Thermometer */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 h-40 bg-slate-900 rounded-full border border-slate-700 p-1 flex flex-col justify-end relative shadow-inner">
                  <div 
                    className="w-full rounded-full bg-gradient-to-t from-cyan-500 via-sky-500 to-blue-500 transition-all duration-300 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                    style={{ height: `${getThermoHeight(tempClear)}%` }}
                  />
                  <div className="w-8 h-8 rounded-full bg-sky-600 border-2 border-slate-700 -bottom-3 -left-1 absolute flex items-center justify-center text-[9px] font-bold text-white shadow-md">
                    °C
                  </div>
                </div>

                <div className="pt-3 text-center">
                  <span className="text-2xl font-mono font-extrabold text-sky-400 block tracking-tight">
                    {tempClear.toFixed(1)}°C
                  </span>
                  <span className="text-[10px] text-sky-300 font-mono font-semibold">
                    ΔT: +{deltaTClear.toFixed(1)}°C
                  </span>
                </div>
              </div>

            </div>

            <div className="w-full pt-3 border-t border-slate-800 text-left space-y-1">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span>Superfície:</span>
                <span className="text-sky-300 font-bold">Transparente</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Albedo / Transmissão:</span>
                <span className="text-sky-400 font-mono">Alta Transmissão</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Comportamento:</span>
                <span className="text-slate-200">Deixa a luz atravessar</span>
              </div>
            </div>
          </div>

        </div>

        {/* Simulation Control Deck */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Time and Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-400">Tempo de Exposição:</span>
              <span className="font-mono font-bold text-sm text-slate-100">{formattedMinutes}:{formattedSeconds}</span>
              <span className="text-[10px] text-slate-500">/ 30:00 min</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-xl p-1 text-xs">
              <span className="text-[10px] text-slate-400 px-1.5 font-medium">Velocidade:</span>
              {[1, 2, 5, 10].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeedMultiplier(s)}
                  className={`px-2 py-1 rounded-lg font-mono text-xs transition-colors ${
                    speedMultiplier === s ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              variant={isRunning ? 'secondary' : 'solar'}
              size="md"
              icon={isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              onClick={handleTogglePlay}
              className="flex-1 sm:flex-initial shadow-lg"
            >
              {isRunning ? 'Pausar Simulação' : simTimeSeconds > 0 ? 'Continuar Simulação' : 'Iniciar Simulação'}
            </Button>

            <Button
              variant="outline"
              size="md"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={handleReset}
              disabled={simTimeSeconds === 0}
            >
              Reiniciar
            </Button>
          </div>

        </div>

      </Card>
    </div>
  );
};
