import React from 'react';
import { Presentation, Sparkles, Monitor, ArrowLeft } from 'lucide-react';
import { SlideDeckViewer } from '../components/presentation/SlideDeckViewer';
import { useExperiment } from '../context/ExperimentContext';
import { Button } from '../components/common/Button';

export const PresentationPage: React.FC = () => {
  const { setActivePage } = useExperiment();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
            Exibição para a Banca Avaliadora
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Modo Apresentação (Slides)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Slides em alta visibilidade e resolução para projetar no estande durante a Feira de Ciências
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setActivePage('dashboard')}
          icon={<ArrowLeft className="w-3.5 h-3.5" />}
        >
          Voltar ao Início
        </Button>
      </div>

      {/* Main Slide Deck Component */}
      <SlideDeckViewer />
    </div>
  );
};
