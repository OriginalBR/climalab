import React from 'react';
import { 
  Sun, 
  Thermometer, 
  Globe2, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  FileSpreadsheet, 
  HelpCircle,
  Sparkles,
  Presentation
} from 'lucide-react';
import { useExperiment } from '../../context/ExperimentContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const { 
    soundEnabled, 
    toggleSound, 
    setGlossaryOpen, 
    setReportOpen, 
    globalStats, 
    setActivePage,
    setWelcomeOpen 
  } = useExperiment();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => setActivePage('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-amber-500/20 border border-emerald-500/30 group-hover:border-emerald-400/60 shadow-lg shadow-emerald-950/50 transition-all duration-300">
            <div className="flex items-center text-lg gap-0.5 transform group-hover:scale-110 transition-transform">
              <span title="Sol">☀️</span>
              <span title="Termômetro" className="-ml-1">🌡️</span>
              <span title="ODS 13 / Terra" className="-ml-1">🌎</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                CLIMA LAB
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                ODS 13
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Experimente. Meça. Calcule. Entenda.
            </p>
          </div>
        </div>

        {/* Center / Status Pill */}
        <div className="hidden md:flex items-center gap-2">
          {globalStats.hasData ? (
            <Badge variant="emerald" dot>
              {globalStats.totalTests} {globalStats.totalTests === 1 ? 'ensaio registrado' : 'ensaios registrados'} ({globalStats.totalMeasurements} medições)
            </Badge>
          ) : (
            <Badge variant="slate" dot>
              Aguardando inserção de dados reais
            </Badge>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Quick Presentation Mode Button */}
          <Button
            size="sm"
            variant="solar"
            icon={<Presentation className="w-4 h-4" />}
            onClick={() => setActivePage('presentation')}
            className="hidden sm:inline-flex shadow-amber-900/30"
          >
            Apresentar
          </Button>

          {/* Report Button */}
          <button
            onClick={() => setReportOpen(true)}
            title="Gerar Relatório A4 para Impressão"
            className="p-2 text-slate-300 hover:text-emerald-400 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all flex items-center gap-1.5 text-xs font-medium"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span className="hidden lg:inline">Relatório A4</span>
          </button>

          {/* Scientific Glossary */}
          <button
            onClick={() => setGlossaryOpen(true)}
            title="Dicionário Científico (Termos e Conceitos)"
            className="p-2 text-slate-300 hover:text-sky-400 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all flex items-center gap-1.5 text-xs font-medium"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span className="hidden lg:inline">Glossário</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Silenciar efeitos sonoros' : 'Ativar efeitos sonoros'}
            className="p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Help / Welcome Tour */}
          <button
            onClick={() => setWelcomeOpen(true)}
            title="Guia do Projeto & Apresentação"
            className="p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
};
