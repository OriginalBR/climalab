import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Globe2, 
  Sun, 
  Thermometer, 
  Calculator, 
  CheckCircle2,
  Table2,
  LineChart,
  Award
} from 'lucide-react';
import { useExperiment } from '../../context/ExperimentContext';
import { TemperatureTimeChart } from '../charts/TemperatureTimeChart';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

export const SlideDeckViewer: React.FC = () => {
  const { measurements, globalStats, members } = useExperiment();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalSlides = 7;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      sound.playClick();
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      sound.playClick();
      setCurrentSlide(prev => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Top Deck Toolbar */}
      <div className="flex items-center justify-between bg-slate-900/80 px-5 py-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <Badge variant="amber" dot>Modo Apresentação</Badge>
          <span className="text-xs font-mono font-bold text-slate-300">
            Slide {currentSlide + 1} de {totalSlides}
          </span>
        </div>

        {/* Keyboard Hints & Fullscreen */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Use as setas <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">→</kbd> ou Espaço
          </span>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Alternar Tela Cheia"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide Canvas Area */}
      <div className="relative min-h-[520px] rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
        
        {/* Slide 1: Título & Abertura */}
        {currentSlide === 0 && (
          <div className="flex flex-col justify-center items-center text-center space-y-6 my-auto animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-widest">
              <span>☀️</span> Feira de Ciências • ODS 13
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight max-w-3xl">
              ODS 13 — Ação Contra a Mudança Global do Clima
            </h1>

            <p className="text-lg sm:text-2xl text-amber-400 font-display font-semibold max-w-2xl">
              “A cor de uma superfície influencia seu aquecimento quando exposta à luz solar?”
            </p>

            {/* Team Members List */}
            <div className="pt-6 border-t border-slate-800 max-w-2xl w-full">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                Equipe de Pesquisadores:
              </span>
              <div className="flex flex-wrap justify-center gap-2 text-xs font-medium text-slate-200">
                {members.map(m => (
                  <span key={m.id} className="px-3 py-1 bg-slate-900/90 rounded-full border border-slate-700">
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide 2: Nossa Pergunta & Hipótese */}
        {currentSlide === 1 && (
          <div className="space-y-8 my-auto animate-fadeIn max-w-4xl mx-auto w-full">
            <div className="text-center space-y-2">
              <Badge variant="blue">Problematização & Hipótese</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                Nossa Pergunta Científica
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
                <span className="text-2xl">❓</span>
                <h3 className="text-lg font-bold text-slate-100 font-display">A Pergunta de Pesquisa</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Será que duas garrafas idênticas, contendo a mesma quantidade de água e expostas ao mesmo Sol, aquecerão em taxas diferentes apenas pela cor de sua superfície?
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-xl shadow-emerald-950/20 space-y-3">
                <span className="text-2xl">💡</span>
                <h3 className="text-lg font-bold text-emerald-400 font-display">Nossa Hipótese</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  A garrafa <strong>preta</strong> apresentará maior elevação de temperatura (ΔT maior), pois superfícies escuras possuem menor albedo e tendem a absorver uma maior fração da radiação eletromagnética solar.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Slide 3: O Experimento & Variáveis */}
        {currentSlide === 2 && (
          <div className="space-y-6 my-auto animate-fadeIn max-w-4xl mx-auto w-full">
            <div className="text-center space-y-2">
              <Badge variant="emerald">Metodologia Rigorosa</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                O Experimento & Controle de Variáveis
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-700 text-center space-y-3">
                <div className="text-4xl">🖤</div>
                <h3 className="text-base font-bold text-white">Garrafa A — Preta</h3>
                <p className="text-xs text-slate-400">
                  Superfície escura com alta taxa de absorção de radiação solar incidente.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-sky-950/30 border border-sky-800 text-center space-y-3">
                <div className="text-4xl">🫙</div>
                <h3 className="text-base font-bold text-sky-200">Garrafa B — Transparente</h3>
                <p className="text-xs text-slate-400">
                  Superfície transparente que permite transmissão e refração de grande parte dos raios.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 text-center">
              <strong className="text-emerald-400">Variáveis Controladas com Rigor: </strong>
              Mesmo volume de água (500ml), mesmo recipiente, mesmo horário, mesma radiação solar e mesmo termômetro calibrado.
            </div>
          </div>
        )}

        {/* Slide 4: Resultados Reais (Gráfico) */}
        {currentSlide === 3 && (
          <div className="space-y-5 my-auto animate-fadeIn max-w-4xl mx-auto w-full">
            <div className="text-center space-y-2">
              <Badge variant="emerald" dot>Evidências Experimentais</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Resultados Obtidos nos Ensaios Reais
              </h2>
            </div>

            {globalStats.hasData ? (
              <div className="space-y-4">
                <TemperatureTimeChart title="Curva Experimental Real de Aquecimento" showFilter={false} />
              </div>
            ) : (
              <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <p className="text-slate-400 text-sm">
                  Nenhum dado real inserido ainda no aplicativo.
                </p>
                <p className="text-xs text-slate-500">
                  Cadastre as medições coletadas na aba "Dados Reais" para que o gráfico apareça aqui automaticamente!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Slide 5: Matemática do Experimento */}
        {currentSlide === 4 && (
          <div className="space-y-6 my-auto animate-fadeIn max-w-4xl mx-auto w-full">
            <div className="text-center space-y-2">
              <Badge variant="purple">Análise Quantitativa</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                A Matemática do Experimento
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 text-center space-y-2">
                <span className="text-xs text-purple-400 font-bold uppercase">1. Variação Térmica</span>
                <div className="font-mono text-base font-bold text-slate-100">ΔT = T_final − T_inicial</div>
                <p className="text-[11px] text-slate-400">Mede o ganho real de temperatura em °C</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 text-center space-y-2">
                <span className="text-xs text-emerald-400 font-bold uppercase">2. Média dos Ensaios</span>
                <div className="font-mono text-base font-bold text-slate-100">x̄ = Σx ÷ n</div>
                <p className="text-[11px] text-slate-400">Reduz ruídos e variabilidade externa</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 text-center space-y-2">
                <span className="text-xs text-amber-400 font-bold uppercase">3. Diferença %</span>
                <div className="font-mono text-base font-bold text-slate-100">% = (ΔT_maior − ΔT_menor) ÷ ΔT_menor × 100</div>
                <p className="text-[11px] text-slate-400">Compara o aquecimento relativo</p>
              </div>
            </div>

            {globalStats.hasValidTests && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-around text-center">
                <div>
                  <span className="text-[11px] text-slate-400 block">ΔT Médio Garrafa Preta:</span>
                  <span className="text-xl font-mono font-bold text-rose-400">+{globalStats.avgDeltaTBlack.toFixed(1)}°C</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">ΔT Médio Transparente:</span>
                  <span className="text-xl font-mono font-bold text-sky-400">+{globalStats.avgDeltaTClear.toFixed(1)}°C</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Diferença Percentual (Ref: Transp):</span>
                  <span className="text-xl font-mono font-bold text-emerald-400">
                    {globalStats.canCalculatePercentage && globalStats.avgPercentageDiff !== null
                      ? `${globalStats.avgPercentageDiff > 0 ? '+' : ''}${globalStats.avgPercentageDiff}%`
                      : 'N/A'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Slide 6: Conclusão Baseada em Evidências */}
        {currentSlide === 5 && (
          <div className="space-y-6 my-auto animate-fadeIn max-w-4xl mx-auto w-full">
            <div className="text-center space-y-2">
              <Badge variant={globalStats.conclusionStatus === 'confirmed' ? 'emerald' : globalStats.conclusionStatus === 'not_confirmed' ? 'amber' : 'blue'}>
                Conclusão Científica
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                O que os Dados Indicam?
              </h2>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div className="space-y-2 text-sm text-slate-200 leading-relaxed">
                  <h4 className="text-base font-bold text-emerald-400 font-display">
                    {globalStats.conclusionTitle}
                  </h4>
                  <p>
                    {globalStats.hasValidTests ? (
                      <span>{globalStats.interpretationText}</span>
                    ) : (
                      <span>{globalStats.conclusionDescription}</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-800">
                    "{globalStats.scientificCaveat}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 7: Conexão ODS 13 & Futuro Sustentável */}
        {currentSlide === 6 && (
          <div className="space-y-6 my-auto animate-fadeIn max-w-4xl mx-auto w-full">
            <div className="text-center space-y-2">
              <Badge variant="blue">Impacto no Mundo Real</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                Conexão com a ODS 13 da ONU
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-200 leading-relaxed">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">🏙️ Nas Cidades (Ilhas de Calor)</h4>
                <p>
                  Asfalto escuro e telhados convencionais comportam-se como a garrafa preta: absorvem calor intenso e superaquecem os centros urbanos.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-emerald-400 text-sm">🌱 Soluções de Adaptação</h4>
                <p>
                  Telhados frios (cool roofs), pavimentos claros e arborização urbana aumentam o albedo e reduzem o gasto de energia com refrigeração.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/40 border border-emerald-500/30 text-center text-xs text-emerald-300 font-medium">
              “Experimente. Meça. Calcule. Entenda.” — Muito obrigado pela atenção! 👏
            </div>
          </div>
        )}

        {/* Bottom Slide Navigation Controls */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4 relative z-10">
          <Button
            size="md"
            variant="outline"
            icon={<ChevronLeft className="w-4 h-4" />}
            onClick={handlePrev}
            disabled={currentSlide === 0}
          >
            Anterior
          </Button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setCurrentSlide(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Ir para Slide ${idx + 1}`}
              />
            ))}
          </div>

          <Button
            size="md"
            variant="solar"
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={handleNext}
            disabled={currentSlide === totalSlides - 1}
          >
            Próximo
          </Button>
        </div>

      </div>
    </div>
  );
};
