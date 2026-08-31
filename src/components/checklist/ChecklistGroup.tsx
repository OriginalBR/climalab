import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckSquare, 
  Square, 
  FlaskConical, 
  Table2, 
  Mic, 
  Package, 
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { useExperiment } from '../../context/ExperimentContext';

export const ChecklistGroup: React.FC = () => {
  const { checklist, toggleChecklistItem, resetChecklist } = useExperiment();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    { id: 'all', label: 'Todos os Itens', icon: CheckSquare, color: 'text-slate-300' },
    { id: 'experiment', label: '🔬 Experimento', icon: FlaskConical, color: 'text-amber-400' },
    { id: 'data', label: '📊 Dados & Gráficos', icon: Table2, color: 'text-sky-400' },
    { id: 'presentation', label: '🎤 Apresentação', icon: Mic, color: 'text-purple-400' },
    { id: 'materials', label: '🧰 Materiais', icon: Package, color: 'text-emerald-400' },
  ];

  const filteredItems = checklist.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const completedCount = checklist.filter(c => c.completed).length;
  const totalCount = checklist.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleToggle = (id: string) => {
    toggleChecklistItem(id);
    const item = checklist.find(c => c.id === id);
    if (item && !item.completed && completedCount + 1 === totalCount) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <Card className="border-slate-800 bg-slate-950/80 space-y-6">
      
      {/* Header & Overall Progress Bar */}
      <div className="space-y-3 border-b border-slate-800 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              Lista de Checagem Geral do Grupo
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Garanta que nada seja esquecido antes da avaliação oficial
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400">
              {completedCount} de {totalCount} concluídos
            </span>
            <button
              onClick={resetChecklist}
              className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 ml-2"
              title="Reiniciar itens do checklist"
            >
              <RotateCcw className="w-3 h-3" /> Zerar
            </button>
          </div>
        </div>

        <ProgressBar value={progressPercent} color="solar" height="md" showLabel label="Progresso Geral da Equipe" />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(cat => {
          const count = cat.id === 'all' 
            ? checklist.length 
            : checklist.filter(c => c.category === cat.id).length;
          const completedInCat = cat.id === 'all'
            ? completedCount
            : checklist.filter(c => c.category === cat.id && c.completed).length;

          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-slate-800 text-white border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                completedInCat === count ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-950 text-slate-500'
              }`}>
                {completedInCat}/{count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Checklist Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3 cursor-pointer select-none group ${
              item.completed
                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {item.completed ? (
                <div className="w-5 h-5 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                  <CheckSquare className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-lg border-2 border-slate-700 group-hover:border-slate-500 flex items-center justify-center" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <span className={`text-xs font-medium leading-relaxed block ${
                item.completed ? 'line-through text-slate-400' : 'text-slate-200'
              }`}>
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

    </Card>
  );
};
