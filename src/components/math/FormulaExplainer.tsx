import React from 'react';
import { Calculator, Sparkles, BookOpen, Sigma, Percent, Variable } from 'lucide-react';
import { Card } from '../common/Card';

export const FormulaExplainer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* Formula 1: Delta T */}
      <Card className="border-slate-800 bg-slate-950/80 space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Variable className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 font-display">1. Variação Térmica</h4>
            <span className="text-[10px] text-slate-400">Diferença de Temperatura</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-center">
          <span className="text-base font-bold text-purple-300">
            ΔT = T<sub className="text-xs font-sans">final</sub> − T<sub className="text-xs font-sans">inicial</sub>
          </span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          Mede exatamente quanto a água aqueceu durante a exposição, eliminando qualquer pequena diferença que pudesse existir na temperatura inicial.
        </p>
      </Card>

      {/* Formula 2: Média Aritmética */}
      <Card className="border-slate-800 bg-slate-950/80 space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Sigma className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 font-display">2. Média Aritmética</h4>
            <span className="text-[10px] text-slate-400">Consolidação dos Ensaios</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-center">
          <span className="text-base font-bold text-emerald-300">
            x̄ = (T₁ + T₂ + ... + Tₙ) ÷ n
          </span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          Representa os resultados de vários testes em um único valor confiável, reduzindo a influência de fatores externos aleatórios (vento, nuvens passageiras).
        </p>
      </Card>

      {/* Formula 3: Diferença Percentual */}
      <Card className="border-slate-800 bg-slate-950/80 space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Percent className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 font-display">3. Diferença Percentual</h4>
            <span className="text-[10px] text-slate-400">Comparação Proporcional</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-center">
          <span className="text-sm font-bold text-amber-300">
            % = [(ΔT<sub className="text-[10px] font-sans">maior</sub> − ΔT<sub className="text-[10px] font-sans">menor</sub>) ÷ ΔT<sub className="text-[10px] font-sans">menor</sub>] × 100
          </span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          Expressa em porcentagem quanto a garrafa que mais aqueceu superou a garrafa de referência menor.
        </p>
      </Card>

    </div>
  );
};
