import React from 'react';
import { 
  Users, 
  CheckSquare, 
  Table2, 
  Award, 
  ArrowRight, 
  Mic,
  Sparkles
} from 'lucide-react';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { useExperiment } from '../../context/ExperimentContext';
import { Button } from '../common/Button';

export const GroupReadinessWidget: React.FC = () => {
  const { checklist, members, measurements, setActivePage } = useExperiment();

  // 1. Checklist progress
  const completedChecks = checklist.filter(c => c.completed).length;
  const checklistPercent = Math.round((completedChecks / checklist.length) * 100);

  // 2. Speeches mastery
  const totalMemberScore = members.reduce((acc, m) => {
    if (m.masteryLevel === 'mastered') return acc + 100;
    if (m.masteryLevel === 'good') return acc + 70;
    if (m.masteryLevel === 'practicing') return acc + 35;
    return acc;
  }, 0);
  const speechMasteryPercent = Math.round(totalMemberScore / members.length);

  // 3. Data completeness
  const dataPercent = measurements.length >= 4 ? 100 : Math.round((measurements.length / 4) * 100);

  // Combined score
  const overallReadiness = Math.round(
    (checklistPercent * 0.4) + (speechMasteryPercent * 0.4) + (dataPercent * 0.2)
  );

  return (
    <Card className="border-slate-800 bg-slate-950/60 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-display">
              Prontidão do Grupo para a Feira
            </h3>
            <p className="text-[11px] text-slate-400">Acompanhamento do preparo dos 7 integrantes</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-lg font-mono font-extrabold text-emerald-400">
            {overallReadiness}%
          </span>
          <span className="text-[10px] text-slate-400 block">Prontidão Geral</span>
        </div>
      </div>

      {/* 3 Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Checklist */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              Checklist & Materiais
            </span>
            <span className="text-slate-400 text-[10px]">{completedChecks}/{checklist.length}</span>
          </div>
          <ProgressBar value={checklistPercent} color="emerald" height="sm" />
        </div>

        {/* Falas */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-purple-400" />
              Domínio das Falas (7 alunos)
            </span>
            <span className="text-slate-400 text-[10px]">{speechMasteryPercent}%</span>
          </div>
          <ProgressBar value={speechMasteryPercent} color="purple" height="sm" />
        </div>

        {/* Dados Reais */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Table2 className="w-3.5 h-3.5 text-sky-400" />
              Coleta de Dados Reais
            </span>
            <span className="text-slate-400 text-[10px]">{measurements.length} medições</span>
          </div>
          <ProgressBar value={dataPercent} color="blue" height="sm" />
        </div>

      </div>

      {/* Action shortcuts */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
        <span className="text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {overallReadiness >= 80 
            ? '🏆 Excelente preparo! O grupo está quase pronto para a apresentação.' 
            : '💡 Continue treinando as falas e conferindo os itens do checklist.'}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('speeches')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium transition-colors"
          >
            Treinar Falas
          </button>
          <button
            onClick={() => setActivePage('checklist')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium transition-colors"
          >
            Ver Checklist
          </button>
        </div>
      </div>
    </Card>
  );
};
