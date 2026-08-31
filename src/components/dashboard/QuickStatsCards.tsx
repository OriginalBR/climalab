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

export const QuickStatsCards: React.FC = () => {
  const { globalStats, setActivePage, loadSampleData } = useExperiment();

  return (
    <div className="space-y-6">
      
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
                  {globalStats.hasData && globalStats.avgDeltaTBlack > 0 
                    ? `+${globalStats.avgDeltaTBlack.toFixed(1)}°C` 
                    : '-- °C'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Superfícies escuras tendem a absorver uma maior fração da radiação visível e infravermelha incidente, transformando energia eletromagnética em calor sensível.
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
                  {globalStats.hasData && globalStats.avgDeltaTClear > 0 
                    ? `+${globalStats.avgDeltaTClear.toFixed(1)}°C` 
                    : '-- °C'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Materiais transparentes permitem que parte expressiva da luz atravesse a garrafa (transmissão) e sofra refração/reflexão sem absorção térmica total nas paredes.
            </p>
          </div>
        </Card>

      </div>

      {/* Global Real Data Summary Strip / Alert */}
      {globalStats.hasData ? (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-emerald-900/50 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-slate-100 font-display">
                Resumo Matemático dos Dados Reais Cadastrados
              </h4>
            </div>
            <Badge variant="emerald" dot>
              🟢 DADOS REAIS DO GRUPO
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Testes Registrados</span>
              <div className="text-lg font-mono font-bold text-slate-100">{globalStats.totalTests}</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Temp. Inicial Média</span>
              <div className="text-lg font-mono font-bold text-slate-200">{globalStats.avgInitialTemp.toFixed(1)}°C</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">ΔT Médio (Preta)</span>
              <div className="text-lg font-mono font-bold text-rose-400">+{globalStats.avgDeltaTBlack.toFixed(1)}°C</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">ΔT Médio (Transp.)</span>
              <div className="text-lg font-mono font-bold text-sky-400">+{globalStats.avgDeltaTClear.toFixed(1)}°C</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Diferença Média</span>
              <div className="text-lg font-mono font-bold text-amber-400">
                {Math.abs(globalStats.avgDifference).toFixed(1)}°C
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Diferença %</span>
              <div className="text-lg font-mono font-bold text-emerald-400">
                {globalStats.avgPercentageDiff > 0 ? `+${globalStats.avgPercentageDiff}%` : '0%'}
              </div>
            </div>
          </div>

          {/* Scientific Verdict supported by real data */}
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <strong className="text-emerald-400">Resultado Evidenciado pelos Dados: </strong>
              {globalStats.winningBottle === 'black' ? (
                <span>
                  A <strong>Garrafa Preta</strong> apresentou maior variação de temperatura média (+{globalStats.avgDeltaTBlack.toFixed(1)}°C vs +{globalStats.avgDeltaTClear.toFixed(1)}°C), confirmando a hipótese inicial sob as condições experimentais testadas.
                </span>
              ) : globalStats.winningBottle === 'clear' ? (
                <span>
                  A <strong>Garrafa Transparente</strong> apresentou maior variação média nos testes registrados (+{globalStats.avgDeltaTClear.toFixed(1)}°C vs +{globalStats.avgDeltaTBlack.toFixed(1)}°C). Analise possíveis fatores ambientais ou incertezas de medição.
                </span>
              ) : (
                <span>
                  Ambas as garrafas apresentaram variações equivalentes nos testes até o momento.
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-100 font-display">
              Nenhum resultado real foi inserido ainda
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Os gráficos reais e conclusões científicas aparecerão automaticamente assim que seu grupo cadastrar as medições coletadas com o termômetro.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Button
              variant="primary"
              size="md"
              icon={<Table className="w-4 h-4" />}
              onClick={() => setActivePage('data')}
            >
              Inserir Medições Reais do Grupo
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={loadSampleData}
            >
              Carregar Dados de Exemplo Didático
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
