import React from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  TrendingUp, 
  Scale, 
  Sliders,
  Award,
  ArrowRight
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useExperiment } from '../../context/ExperimentContext';
import { getCalculationAudit } from '../../utils/math';

interface CalculationAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculationAuditModal: React.FC<CalculationAuditModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { measurements, marginThreshold, globalStats } = useExperiment();
  const auditSteps = getCalculationAudit(measurements, marginThreshold);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Auditoria Científica do Cálculo da Conclusão"
      subtitle="Passo a passo transparente de como os dados reais geraram a conclusão final"
      icon={<Calculator className="w-5 h-5 text-emerald-400" />}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        
        {/* Top Info Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-slate-100">
              Metodologia de Dedução Quantitativa dos Estudantes
            </p>
            <p className="text-slate-400 leading-relaxed">
              O aplicativo não assume previamente quem aquece mais. Ele aplica esta cadeia de 7 etapas baseada em <strong>ΔT (Variação de Temperatura)</strong>, médias e critérios de significância com margem configurável.
            </p>
          </div>
        </div>

        {/* 7 Steps List */}
        <div className="space-y-4">
          {auditSteps.map((step) => {
            return (
              <div 
                key={step.stepNumber}
                className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3 relative overflow-hidden transition-all hover:border-slate-700"
              >
                {/* Step Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center text-xs font-mono font-extrabold shrink-0">
                      {step.stepNumber}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 font-display">
                        {step.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 block sm:hidden">
                        {step.description}
                      </span>
                    </div>
                  </div>

                  {step.formula && (
                    <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 font-mono text-[11px] text-purple-300 text-right shrink-0">
                      {step.formula}
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400 hidden sm:block">
                  {step.description}
                </p>

                {/* Calculation Details List */}
                <div className="space-y-1.5 pt-1">
                  {step.calculationDetails.map((detail, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60 font-mono text-xs text-slate-200 leading-relaxed"
                    >
                      {detail}
                    </div>
                  ))}
                </div>

                {/* Summary & Significance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 text-[11px]">
                  <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                    <span className="font-bold block uppercase text-[10px] text-emerald-400">Resultado da Etapa:</span>
                    <span className="font-semibold font-mono">{step.summaryResult}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800 text-slate-300">
                    <span className="font-bold block uppercase text-[10px] text-slate-400">Significado Científico:</span>
                    <span>{step.scientificSignificance}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Scientific Caveat Footer */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 text-center">
          <strong className="text-slate-300">Observação Científica: </strong>
          {globalStats.scientificCaveat}
        </div>

        {/* Modal Close Button */}
        <div className="flex justify-end pt-2">
          <Button variant="primary" size="md" onClick={onClose}>
            Entendi a Dedução
          </Button>
        </div>

      </div>
    </Modal>
  );
};
