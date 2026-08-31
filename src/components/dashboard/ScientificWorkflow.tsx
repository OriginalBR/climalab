import React, { useState } from 'react';
import { 
  Sun, 
  Flame, 
  Droplets, 
  BarChart3, 
  Calculator, 
  Globe2, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Card } from '../common/Card';
import { useExperiment } from '../../context/ExperimentContext';

interface WorkflowStep {
  icon: React.ComponentType<{ className?: string }>;
  emoji: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  targetPage?: 'experiment' | 'data' | 'math' | 'ods13';
}

export const ScientificWorkflow: React.FC = () => {
  const { setActivePage } = useExperiment();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: WorkflowStep[] = [
    {
      icon: Sun,
      emoji: '☀️',
      title: 'Luz Solar',
      shortDesc: 'Emissão de ondas eletromagnéticas',
      fullDesc: 'O Sol emite radiação eletromagnética contendo luz visível e raios infravermelhos (portadores de energia térmica) que viajam pelo espaço e atingem as duas garrafas com a mesma intensidade.',
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      targetPage: 'experiment',
    },
    {
      icon: Flame,
      emoji: '🌡️',
      title: 'Absorção de Radiação',
      shortDesc: 'Interação com os pigmentos',
      fullDesc: 'A superfície escura absorve grande parte do espectro eletromagnético incidente, excitando moléculas. A garrafa transparente transmite e reflete a maior parcela da luz sem retê-la integralmente na parede plástica.',
      color: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
      targetPage: 'experiment',
    },
    {
      icon: Droplets,
      emoji: '💧',
      title: 'Aquecimento da Água',
      shortDesc: 'Condução e convecção',
      fullDesc: 'O calor gerado nas paredes do recipiente é transferido por condução térmica para o volume interno de água, aumentando gradativamente sua energia cinética média (temperatura).',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      targetPage: 'experiment',
    },
    {
      icon: BarChart3,
      emoji: '📊',
      title: 'Medição Científica',
      shortDesc: 'Coleta de dados padronizada',
      fullDesc: 'O grupo registra a temperatura em intervalos regulares de tempo (0 min, 10 min, 20 min, 30 min) com termômetro calibrado e anota em tabelas organizadas.',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      targetPage: 'data',
    },
    {
      icon: Calculator,
      emoji: '🧮',
      title: 'Matemática Aplicada',
      shortDesc: 'ΔT, médias e taxas',
      fullDesc: 'Aplicação da fórmula ΔT = T_final − T_inicial, média de múltiplos testes e comparação percentual rigorosa para fundamentar as conclusões em números concretos.',
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      targetPage: 'math',
    },
    {
      icon: Globe2,
      emoji: '🌎',
      title: 'Conexão ODS 13',
      shortDesc: 'Soluções climáticas urbanas',
      fullDesc: 'Transposição didática para as cidades: materiais escuros (como asfalto) geram ilhas de calor. Telhados claros, vegetação e planejamento urbano ajudam na mitigação e adaptação climática da ODS 13.',
      color: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
      targetPage: 'ods13',
    },
  ];

  const current = steps[activeStep];

  return (
    <Card className="border-slate-800 bg-slate-950/60 space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔬</span>
            <h3 className="text-base font-bold text-slate-100 font-display">
              Como Funciona o Experimento Científico?
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Do fenômeno físico da luz até o impacto na ação climática global da ONU
          </p>
        </div>

        <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Clique em cada etapa para explorar
        </span>
      </div>

      {/* Interactive Step Track */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((step, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{step.emoji}</span>
                <span className="text-[10px] font-mono font-bold text-slate-500">0{idx + 1}</span>
              </div>
              <div>
                <div className={`text-xs font-bold ${isSelected ? 'text-emerald-300' : 'text-slate-200'}`}>
                  {step.title}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight line-clamp-1 mt-0.5">
                  {step.shortDesc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Active Step Detail Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xl">{current.emoji}</span>
            <h4 className="text-sm font-bold text-slate-100 font-display">
              Etapa {activeStep + 1}: {current.title}
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {current.fullDesc}
          </p>
        </div>

        {current.targetPage && (
          <button
            onClick={() => setActivePage(current.targetPage!)}
            className="shrink-0 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white border border-slate-700 flex items-center gap-2 transition-colors self-end sm:self-auto"
          >
            <span>Ver módulo</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        )}
      </div>
    </Card>
  );
};
