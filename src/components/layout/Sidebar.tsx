import React from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Sliders, 
  Table2, 
  LineChart, 
  Calculator, 
  Globe, 
  Mic, 
  Presentation, 
  CheckSquare 
} from 'lucide-react';
import { useExperiment } from '../../context/ExperimentContext';
import { ActivePage } from '../../types';

interface NavItem {
  id: ActivePage;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  highlight?: boolean;
}

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage, measurements, checklist, members } = useExperiment();

  const completedChecks = checklist.filter(c => c.completed).length;
  const totalChecks = checklist.length;
  const masteredSpeeches = members.filter(m => m.masteryLevel === 'mastered').length;

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Início',
      sublabel: 'Visão Geral do Laboratório',
      icon: LayoutDashboard,
    },
    {
      id: 'experiment',
      label: 'Experimento',
      sublabel: 'Visualização das Garrafas',
      icon: FlaskConical,
    },
    {
      id: 'simulation',
      label: 'Simulação',
      sublabel: 'Laboratório Paramétrico',
      icon: Sliders,
    },
    {
      id: 'data',
      label: 'Dados Reais',
      sublabel: 'Registros do Grupo',
      icon: Table2,
      badge: measurements.length > 0 ? measurements.length : undefined,
    },
    {
      id: 'charts',
      label: 'Gráficos',
      sublabel: 'Temperatura × Tempo',
      icon: LineChart,
    },
    {
      id: 'math',
      label: 'Matemática',
      sublabel: 'Calculadora de ΔT e Médias',
      icon: Calculator,
    },
    {
      id: 'ods13',
      label: 'ODS 13',
      sublabel: 'Conexão com o Clima',
      icon: Globe,
    },
    {
      id: 'speeches',
      label: 'Treinar Falas',
      sublabel: '7 Integrantes & Quiz',
      icon: Mic,
      badge: `${masteredSpeeches}/${members.length}`,
    },
    {
      id: 'presentation',
      label: 'Modo Apresentação',
      sublabel: 'Slides para a Banca',
      icon: Presentation,
      highlight: true,
    },
    {
      id: 'checklist',
      label: 'Checklist',
      sublabel: 'Critérios Científicos',
      icon: CheckSquare,
      badge: `${completedChecks}/${totalChecks}`,
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block border-r border-slate-800/80 bg-slate-950/50 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-1.5 sticky top-20">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navegação Científica
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 group relative ${
                isActive
                  ? item.highlight
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-300 font-semibold border border-amber-500/30 shadow-lg shadow-amber-950/20'
                    : 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30 shadow-lg shadow-emerald-950/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? item.highlight
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold leading-tight">{item.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{item.sublabel}</div>
                </div>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-emerald-400 text-slate-950'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
