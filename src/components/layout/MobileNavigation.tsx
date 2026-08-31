import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Table2, 
  Mic, 
  Menu, 
  X,
  Sliders, 
  LineChart, 
  Calculator, 
  Globe, 
  Presentation, 
  CheckSquare,
  FileSpreadsheet,
  BookOpen
} from 'lucide-react';
import { useExperiment } from '../../context/ExperimentContext';
import { ActivePage } from '../../types';

export const MobileNavigation: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    measurements, 
    checklist, 
    members,
    setReportOpen,
    setGlossaryOpen 
  } = useExperiment();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const completedChecks = checklist.filter(c => c.completed).length;

  const handleSelect = (page: ActivePage) => {
    setActivePage(page);
    setDrawerOpen(false);
  };

  const primaryMobileNav: { id: ActivePage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'experiment', label: 'Experimento', icon: FlaskConical },
    { id: 'data', label: 'Dados', icon: Table2 },
    { id: 'speeches', label: 'Falas', icon: Mic },
  ];

  const allDrawerItems: { id: ActivePage; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Início (Dashboard)', icon: LayoutDashboard },
    { id: 'experiment', label: 'Experimento Interativo', icon: FlaskConical },
    { id: 'simulation', label: 'Simulação Paramétrica', icon: Sliders },
    { id: 'data', label: 'Dados Reais', icon: Table2, badge: measurements.length || undefined },
    { id: 'charts', label: 'Gráficos Comparativos', icon: LineChart },
    { id: 'math', label: 'Matemática e Fórmulas', icon: Calculator },
    { id: 'ods13', label: 'ODS 13 & Clima', icon: Globe },
    { id: 'speeches', label: 'Treinar Falas (7 Alunos)', icon: Mic },
    { id: 'presentation', label: 'Modo Apresentação (Slides)', icon: Presentation },
    { id: 'checklist', label: 'Checklist Científico', icon: CheckSquare, badge: `${completedChecks}/${checklist.length}` },
  ];

  return (
    <>
      {/* Bottom Floating Bar on Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 px-3 py-2 flex items-center justify-around">
        {primaryMobileNav.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-emerald-400' : ''}`} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}

        {/* More Menu Trigger */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-slate-400 hover:text-slate-200"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px]">Menu</span>
        </button>
      </nav>

      {/* Drawer Overlay for All Pages */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-slate-900 border-r border-slate-800 h-full p-5 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">☀️🌡️🌎</span>
                  <span className="font-display font-bold text-slate-100 text-sm">CLIMA LAB</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {allDrawerItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left transition-all ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                          : 'text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-emerald-400" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Quick Tools */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  setReportOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 border border-slate-800"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Gerar Relatório A4</span>
              </button>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  setGlossaryOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 border border-slate-800"
              >
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Dicionário Científico</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
