import React from 'react';
import { CheckSquare, ShieldCheck, HelpCircle } from 'lucide-react';
import { ChecklistGroup } from '../components/checklist/ChecklistGroup';
import { ReliabilityCriteriaCard } from '../components/checklist/ReliabilityCriteriaCard';
import { ScientificRigorCallout } from '../components/ods13/ScientificRigorCallout';

export const ChecklistPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
          Preparação & Validação Metodológica
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
          Checklist da Feira & Critérios Científicos
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Verifique se todos os materiais, medições e falas foram conferidos antes da banca avaliadora
        </p>
      </div>

      {/* Main Checklist */}
      <ChecklistGroup />

      {/* Scientific Reliability Section */}
      <ReliabilityCriteriaCard />

      {/* Scientific Rigour Callout */}
      <ScientificRigorCallout />
    </div>
  );
};
