import React from 'react';
import { Sliders, HelpCircle, ArrowRight } from 'lucide-react';
import { ParametricControls } from '../components/simulation/ParametricControls';
import { useExperiment } from '../context/ExperimentContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const SimulationPage: React.FC = () => {
  const { setActivePage } = useExperiment();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Simulador Físico • Modelagem Teórica
            </span>
            <Badge variant="amber" dot>🟡 Dados simulados</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Simulação Paramétrica Teórica
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ajuste coeficientes de absorção, intensidade do Sol e convecção para comparar cenários teóricos (não interfere na conclusão dos dados reais).
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={() => setActivePage('data')}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          iconPosition="right"
        >
          Ir para Dados Reais
        </Button>
      </div>

      {/* Parametric Simulation Component */}
      <ParametricControls />
    </div>
  );
};
