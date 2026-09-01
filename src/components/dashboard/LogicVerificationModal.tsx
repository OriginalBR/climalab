import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  RotateCcw,
  Check
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { runLogicTests, LogicTestResult } from '../../utils/math';
import { sound } from '../../utils/sound';

interface LogicVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogicVerificationModal: React.FC<LogicVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [testResults, setTestResults] = useState<LogicTestResult[]>(() => runLogicTests());
  const [hasRun, setHasRun] = useState(true);

  const handleRunAll = () => {
    sound.playSuccess();
    setTestResults(runLogicTests());
    setHasRun(true);
  };

  const allPassed = testResults.every(t => t.passed);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Verificação Automática da Lógica Científica"
      subtitle="Bateria de testes internos para validar a classificação e evitar viés prévio"
      icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
      maxWidth="4xl"
    >
      <div className="space-y-5">
        
        {/* Verification Status Banner */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          allPassed 
            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
            : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
        }`}>
          <div className="flex items-center gap-2.5">
            {allPassed ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
            )}
            <div>
              <h4 className="text-sm font-bold text-slate-100 font-display">
                {allPassed ? 'Todos os 5 Testes de Lógica Aprovados com Rigor 100%' : 'Falha em Teste de Lógica'}
              </h4>
              <p className="text-xs text-slate-300">
                A lógica não depende de suposições — ela responde puramente aos dados medidos e calculados.
              </p>
            </div>
          </div>

          <Button
            size="sm"
            variant="solar"
            icon={<Play className="w-3.5 h-3.5" />}
            onClick={handleRunAll}
          >
            Reexecutar Testes
          </Button>
        </div>

        {/* Test Cases List */}
        <div className="space-y-3">
          {testResults.map((t) => {
            return (
              <div 
                key={t.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 transition-all hover:border-slate-700"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {t.passed ? (
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs">
                        ✓
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center text-xs">
                        ✕
                      </span>
                    )}
                    <h5 className="text-xs font-bold text-slate-100 font-display">
                      {t.name}
                    </h5>
                  </div>

                  <Badge variant={t.passed ? 'emerald' : 'rose'} size="sm">
                    {t.passed ? 'APROVADO' : 'REPROVADO'}
                  </Badge>
                </div>

                <p className="text-[11px] text-slate-400 font-mono bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
                  {t.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1 font-mono">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase font-sans">ΔT Preta:</span>
                    <span className="font-bold text-rose-400">+{t.details.avgDeltaTBlack.toFixed(1)}°C</span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase font-sans">ΔT Transp:</span>
                    <span className="font-bold text-sky-400">+{t.details.avgDeltaTClear.toFixed(1)}°C</span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase font-sans">Diferença:</span>
                    <span className="font-bold text-amber-400">
                      {t.details.difference > 0 ? `+${t.details.difference.toFixed(1)}°C` : `${t.details.difference.toFixed(1)}°C`}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase font-sans">Conclusão:</span>
                    <span className="font-bold text-emerald-300 truncate block">{t.details.conclusionTitle}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Explanation Note */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
          <strong className="text-slate-200">Nota de Isolamento: </strong>
          Estes testes executam em memória e servem apenas para auditar a lógica. Eles <strong>não afetam nem substituem</strong> os dados reais registrados pelo grupo no aplicativo.
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" size="md" onClick={onClose}>
            Fechar
          </Button>
        </div>

      </div>
    </Modal>
  );
};
