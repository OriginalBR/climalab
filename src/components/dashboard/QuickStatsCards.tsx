import React from 'react';
import { 
  Flame, 
  Droplets, 
  TrendingUp, 
  Scale, 
  Percent, 
  Sparkles, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Table
} from 'lucide-react';
import { useExperiment } from '../../context/ExperimentContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ConclusionResultCard } from './ConclusionResultCard';

export const QuickStatsCards: React.FC = () => {
  const { globalStats, setActivePage, loadSampleData } = useExperiment();

  return (
    <div className="space-y-6">
      
      {/* 🌟 Veredito e Conclusão Automática Baseada em ΔT */}
      <ConclusionResultCard />

      {/* 2 Main Subject Cards: Garrafa Preta vs Garrafa Transparente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        
        {/* 🖤 Garrafa Preta */}
        <Card className="border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-zinc-950 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-8xl">🖤</span>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xl shadow-inner">
                  🖤
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 font-display">Garrafa Preta</h3>
                  <p className="text-xs text-slate-400">Superfície escura (Alta absorção solar)</p>
                </div>
              </div>
              <Badge variant="black">Superfície Escura</Badge>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-[11px] text-slate-400 font-medium block">Temp. Final Média</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-amber-400">
                  {globalStats.hasData && globalStats.avgFinalTempBlack > 0 
                    ? `${globalStats.avgFinalTempBlack.toFixed(1)}°C` 
                    : '-- °C'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-[11px] text-slate-400 font-medium block">Variação Média (ΔT)</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-rose-400">
                  {globalStats.hasValidTests && globalStats.avgDeltaTBlack > 0 
                    ? `+${globalStats.avgDeltaTBlack.toFixed(1)}°C` 
                    : '-- °C'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Superfícies escuras tendem a absorver uma maior fração da radiação visível e infravermelha incidente, transformando energia eletromagnética em calor sensível e promovendo elevação na temperatura da água.
            </p>
          </div>
        </Card>

        {/* 🫙 Garrafa Transparente */}
        <Card className="border-sky-900/30 bg-gradient-to-b from-slate-900 via-slate-950 to-sky-950/20 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-8xl">🫙</span>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-800/50 flex items-center justify-center text-xl shadow-inner">
                  🫙
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 font-display">Garrafa Transparente</h3>
                  <p className="text-xs text-slate-400">Superfície transparente (Transmissão de luz)</p>
                </div>
              </div>
              <Badge variant="blue">Superfície Clara</Badge>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-sky-900/40">
                <span className="text-[11px] text-slate-400 font-medium block">Temp. Final Média</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-sky-400">
                  {globalStats.hasData && globalStats.avgFinalTempClear > 0 
                    ? `${globalStats.avgFinalTempClear.toFixed(1)}°C` 
                    : '-- °C'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-sky-900/40">
                <span className="text-[11px] text-slate-400 font-medium block">Variação Média (ΔT)</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-sky-300">
                  {globalStats.hasValidTests && globalStats.avgDeltaTClear > 0 
                    ? `+${globalStats.avgDeltaTClear.toFixed(1)}°C` 
                    : '-- °C'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Materiais transparentes permitem que parte expressiva da luz atravesse o frasco (transmissão) e sofra refração/reflexão sem absorção térmica direta nas paredes do recipiente.
            </p>
          </div>
        </Card>

      </div>

    </div>
  );
};
