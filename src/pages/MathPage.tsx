import React from 'react';
import { Calculator, Sparkles, BookOpen, Sigma, Percent } from 'lucide-react';
import { FormulaExplainer } from '../components/math/FormulaExplainer';
import { DeltaTCalculator } from '../components/math/DeltaTCalculator';
import { AverageCalculator } from '../components/math/AverageCalculator';
import { PercentageCalculator } from '../components/math/PercentageCalculator';
import { RealDataSyncBanner } from '../components/math/RealDataSyncBanner';

export const MathPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
          Fundamentação Quantitativa
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
          A Matemática do Experimento
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Compreenda como as fórmulas de ΔT, médias e taxas transformam observações em evidências comprovadas
        </p>
      </div>

      {/* Sync with Real Data */}
      <RealDataSyncBanner />

      {/* Didactic Formula Explainer Cards */}
      <FormulaExplainer />

      {/* 3 Interactive Calculators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DeltaTCalculator />
        <AverageCalculator />
        <PercentageCalculator />
      </div>
    </div>
  );
};
