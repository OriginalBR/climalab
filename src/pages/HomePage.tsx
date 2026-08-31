import React from 'react';
import { 
  Sun, 
  Thermometer, 
  Globe2, 
  Table2, 
  Presentation, 
  Mic, 
  Sparkles,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { QuickStatsCards } from '../components/dashboard/QuickStatsCards';
import { ScientificWorkflow } from '../components/dashboard/ScientificWorkflow';
import { GroupReadinessWidget } from '../components/dashboard/GroupReadinessWidget';
import { WelcomeModal } from '../components/dashboard/WelcomeModal';
import { useExperiment } from '../context/ExperimentContext';
import { Button } from '../components/common/Button';

export const HomePage: React.FC = () => {
  const { setActivePage, globalStats } = useExperiment();

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Banner with Modern Scientific Theme */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-amber-950/30 border border-slate-800 p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-widest inline-flex items-center gap-1.5">
              <span>🌎</span> ONU ODS 13 • Ação Climática
            </span>
            <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Feira de Ciências
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            A cor de uma superfície influencia seu aquecimento sob a luz solar?
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Uma plataforma educacional completa e interativa para investigar experimentalmente a absorção de radiação solar em garrafas, calcular variações térmicas com rigor matemático e entender as ilhas de calor urbanas.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="solar"
              size="md"
              icon={<Sun className="w-4 h-4" />}
              onClick={() => setActivePage('experiment')}
            >
              Ver Experimento Interativo
            </Button>

            <Button
              variant="primary"
              size="md"
              icon={<Table2 className="w-4 h-4" />}
              onClick={() => setActivePage('data')}
            >
              {globalStats.hasData ? 'Gerenciar Dados Reais' : 'Inserir Medições do Grupo'}
            </Button>

            <Button
              variant="secondary"
              size="md"
              icon={<Presentation className="w-4 h-4 text-amber-400" />}
              onClick={() => setActivePage('presentation')}
            >
              Modo Apresentação (Slides)
            </Button>
          </div>
        </div>

        {/* Decorative Background Aura */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 via-transparent to-transparent pointer-events-none hidden lg:block" />
      </div>

      {/* Quick Stats & Bottle Comparison */}
      <QuickStatsCards />

      {/* Scientific Step-by-Step Workflow */}
      <ScientificWorkflow />

      {/* Group Readiness Tracker */}
      <GroupReadinessWidget />

      {/* Welcome Tour Modal */}
      <WelcomeModal />

    </div>
  );
};
