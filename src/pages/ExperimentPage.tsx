import React from 'react';
import { FlaskConical, Sun, Thermometer, ShieldAlert, ArrowRight } from 'lucide-react';
import { InteractiveBottlesView } from '../components/experiment/InteractiveBottlesView';
import { ScientificRigorCallout } from '../components/ods13/ScientificRigorCallout';
import { Button } from '../components/common/Button';
import { useExperiment } from '../context/ExperimentContext';

export const ExperimentPage: React.FC = () => {
  const { setActivePage } = useExperiment();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
            Laboratório Visual • Modelo Didático
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Experimento Interativo das Garrafas
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Demonstração física em tempo real da absorção de radiação solar e aquecimento da água
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setActivePage('simulation')}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          iconPosition="right"
        >
          Simulador Paramétrico
        </Button>
      </div>

      {/* Main Interactive Bottles Stage */}
      <InteractiveBottlesView />

      {/* Scientific Rigour Callout */}
      <ScientificRigorCallout />
    </div>
  );
};
