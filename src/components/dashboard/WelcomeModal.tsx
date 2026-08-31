import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Sun, Thermometer, Globe, CheckCircle2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useExperiment } from '../../context/ExperimentContext';
import { sound } from '../../utils/sound';

export const WelcomeModal: React.FC = () => {
  const { isWelcomeOpen, setWelcomeOpen, setActivePage } = useExperiment();

  const handleStart = () => {
    sound.playSolarPulse();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10b981', '#f59e0b', '#0ea5e9']
    });
    setWelcomeOpen(false);
  };

  return (
    <Modal
      isOpen={isWelcomeOpen}
      onClose={() => setWelcomeOpen(false)}
      maxWidth="lg"
    >
      <div className="text-center space-y-5 py-2">
        {/* Animated Badge Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-amber-500/20 to-sky-500/20 border border-emerald-500/40 shadow-xl shadow-emerald-950/60 mx-auto">
          <span className="text-3xl animate-bounce">☀️</span>
        </div>

        <div>
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-widest inline-block mb-2">
            Feira de Ciências • ODS 13
          </span>
          <h2 className="text-2xl font-extrabold font-display text-white tracking-tight">
            Bem-vindos ao laboratório da ODS 13!
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
            Vamos investigar como a radiação solar pode influenciar o aquecimento de diferentes superfícies e relacionar com o clima do planeta.
          </p>
        </div>

        {/* 3 Steps Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
              <Sun className="w-3.5 h-3.5" />
              <span>1. Experimento</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Garrafa Preta 🖤 vs Transparente 🫙 expostas ao Sol.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
              <Thermometer className="w-3.5 h-3.5" />
              <span>2. Dados & Fórmulas</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Cálculo de ΔT, médias e gráficos automáticos.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-sky-400 font-bold text-xs">
              <Globe className="w-3.5 h-3.5" />
              <span>3. Apresentação</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Treino das falas dos 7 membros e modo slides.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
          <Button
            size="lg"
            variant="solar"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={handleStart}
            className="w-full sm:w-auto"
          >
            Começar Exploração
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              setWelcomeOpen(false);
              setActivePage('speeches');
            }}
            className="w-full sm:w-auto"
          >
            Ver Falas do Grupo
          </Button>
        </div>
      </div>
    </Modal>
  );
};
