import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Clock, 
  Sparkles, 
  Calculator, 
  Sliders, 
  Table2, 
  ArrowRight,
  ShieldCheck,
  Percent,
  TrendingUp,
  Info
} from 'lucide-react';
import { useExperiment } from '../../context/ExperimentContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { CalculationAuditModal } from './CalculationAuditModal';
import { LogicVerificationModal } from './LogicVerificationModal';
import { TestDeltaTable } from './TestDeltaTable';

export const ConclusionResultCard: React.FC = () => {
  const { 
    globalStats, 
    marginThreshold, 
    setMarginThreshold, 
    setActivePage,
    loadSampleData 
  } = useExperiment();

  const [isAuditModalOpen, setAuditModalOpen] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isMarginConfigOpen, setMarginConfigOpen] = useState(false);

  const status = globalStats.conclusionStatus;

  // Theme styling based on conclusion state
  const stateThemes = {
    confirmed: {
      borderColor: 'border-emerald-500/40',
      bgGradient: 'from-emerald-950/50 via-slate-950 to-teal-950/40',
      iconBg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
      badgeVariant: 'emerald' as const,
      badgeText: '🟢 HIPÓTESE CONFIRMADA PELOS DADOS',
      titleColor: 'text-emerald-400',
      icon: <CheckCircle2 className="w-7 h-7 text-emerald-400 animate-pulse" />,
    },
    not_confirmed: {
      borderColor: 'border-amber-500/50',
      bgGradient: 'from-amber-950/40 via-slate-950 to-orange-950/30',
      iconBg: 'bg-amber-500/20 border-amber-500/40 text-amber-400',
      badgeVariant: 'amber' as const,
      badgeText: '🟠 HIPÓTESE NÃO CONFIRMADA',
      titleColor: 'text-amber-400',
      icon: <AlertCircle className="w-7 h-7 text-amber-400 animate-pulse" />,
    },
    inconclusive: {
      borderColor: 'border-yellow-500/40',
      bgGradient: 'from-yellow-950/30 via-slate-950 to-amber-950/20',
      iconBg: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',
      badgeVariant: 'amber' as const,
      badgeText: '🟡 RESULTADO SEM DIFERENÇA CLARA',
      titleColor: 'text-yellow-400',
      icon: <HelpCircle className="w-7 h-7 text-yellow-400" />,
    },
    insufficient_data: {
      borderColor: 'border-sky-500/30',
      bgGradient: 'from-sky-950/30 via-slate-950 to-slate-950',
      iconBg: 'bg-sky-500/20 border-sky-500/40 text-sky-400',
      badgeVariant: 'blue' as const,
      badgeText: '🔵 AGUARDANDO DADOS',
      titleColor: 'text-sky-400',
      icon: <Clock className="w-7 h-7 text-sky-400" />,
    },
  };

  const currentTheme = stateThemes[status];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 🌟 Large Visual Result Card */}
      <Card className={`border-2 ${currentTheme.borderColor} bg-gradient-to-br ${currentTheme.bgGradient} p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden transition-all duration-500`}>
        
        {/* Top Header & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-inner shrink-0 ${currentTheme.iconBg}`}>
              {currentTheme.icon}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
                Veredito Experimental Automático
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                RESULTADO DO EXPERIMENTO
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={currentTheme.badgeVariant} dot size="md">
              {currentTheme.badgeText}
            </Badge>
            <Badge variant="black">
              🟢 DADOS REAIS DO GRUPO
            </Badge>
          </div>
        </div>

        {/* Core Scientific Result Statement */}
        <div className="space-y-2">
          <h3 className={`text-lg sm:text-xl font-extrabold font-display ${currentTheme.titleColor}`}>
            {globalStats.conclusionTitle}
          </h3>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-medium">
            “{globalStats.conclusionDescription}”
          </p>
        </div>

        {/* Key Metrics Grid (ΔT Médio Preta vs Transparente vs Diferença) */}
        {globalStats.hasValidTests && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            
            {/* ΔT Médio Preta */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                ΔT Médio — Preta (🖤)
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-black text-rose-400">
                +{globalStats.avgDeltaTBlack.toFixed(1)}°C
              </div>
              <span className="text-[10px] text-slate-500 block">
                x̄ de {globalStats.totalTests} ensaios
              </span>
            </div>

            {/* ΔT Médio Transparente */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                ΔT Médio — Transp. (🫙)
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-black text-sky-400">
                +{globalStats.avgDeltaTClear.toFixed(1)}°C
              </div>
              <span className="text-[10px] text-slate-500 block">
                x̄ de {globalStats.totalTests} ensaios
              </span>
            </div>

            {/* Diferença Média */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                Diferença Médica (Δ)
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-black text-amber-400">
                {globalStats.avgDifference > 0 ? `+${globalStats.avgDifference.toFixed(1)}°C` : `${globalStats.avgDifference.toFixed(1)}°C`}
              </div>
              <span className="text-[10px] text-slate-500 block">
                Preta − Transparente
              </span>
            </div>

            {/* Diferença Percentual */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                Diferença Percentual
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-400">
                {globalStats.canCalculatePercentage && globalStats.avgPercentageDiff !== null
                  ? `${globalStats.avgPercentageDiff > 0 ? '+' : ''}${globalStats.avgPercentageDiff}%`
                  : 'N/A'}
              </div>
              <span className="text-[10px] text-slate-500 block truncate" title="Base: Garrafa Transparente">
                Ref: Transparente
              </span>
            </div>

          </div>
        )}

        {/* Reference Note for Percentage */}
        {globalStats.hasValidTests && (
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>{globalStats.percentageReferenceNote}</span>
          </div>
        )}

        {/* 🔬 INTERPRETAÇÃO DOS RESULTADOS */}
        <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base">🔬</span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-display">
              INTERPRETAÇÃO DOS RESULTADOS
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            {globalStats.interpretationText}
          </p>
        </div>

        {/* Margin Threshold Configurator (Collapsible / Interactive) */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-slate-200">
                Margem para diferença mínima configurável:
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-700 text-purple-300">
                ±{marginThreshold.toFixed(1)}°C
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                (Padrão: 0,5°C)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400">Predefinições rápidas:</span>
            {[0.2, 0.5, 1.0].map((preset) => (
              <button
                key={preset}
                onClick={() => setMarginThreshold(preset)}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-semibold transition-colors ${
                  marginThreshold === preset
                    ? 'bg-purple-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {preset.toFixed(1)}°C
              </button>
            ))}

            <div className="flex items-center gap-1.5 ml-auto">
              <label htmlFor="custom-margin" className="text-[11px] text-slate-400">Personalizado:</label>
              <input
                id="custom-margin"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={marginThreshold}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) setMarginThreshold(val);
                }}
                className="w-16 px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white text-center focus:outline-none focus:border-purple-500"
              />
              <span className="text-xs font-mono text-slate-500">°C</span>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Calculator className="w-3.5 h-3.5 text-emerald-400" />}
              onClick={() => setAuditModalOpen(true)}
            >
              Ver como chegamos à conclusão (Passo a Passo)
            </Button>

            <Button
              variant="outline"
              size="sm"
              icon={<ShieldCheck className="w-3.5 h-3.5 text-purple-400" />}
              onClick={() => setVerificationModalOpen(true)}
            >
              Testes de Validação Lógica
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={<Table2 className="w-3.5 h-3.5" />}
              onClick={() => setActivePage('data')}
            >
              {globalStats.hasData ? 'Gerenciar Dados Reais' : 'Inserir Medições'}
            </Button>
          </div>
        </div>

        {/* Scientific Caveat / Ressalva Metodológica */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 text-center leading-relaxed">
          <strong className="text-slate-300">Critério Científico: </strong>
          {globalStats.scientificCaveat}
        </div>

      </Card>

      {/* Per-Test Breakdown Table */}
      {globalStats.hasValidTests && (
        <TestDeltaTable 
          testSummaries={globalStats.testSummaries} 
          marginThreshold={marginThreshold} 
        />
      )}

      {/* Audit Modal */}
      <CalculationAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />

      {/* Logic Verification Modal */}
      <LogicVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
      />

    </div>
  );
};
