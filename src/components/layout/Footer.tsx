import React from 'react';
import { Heart, Globe2, Sparkles, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-slate-400">CLIMA LAB — ODS 13</span>
          <span className="text-slate-600">•</span>
          <span>Projeto de Feira de Ciências</span>
        </div>

        {/* Center Team */}
        <div className="text-slate-400 flex items-center gap-1.5 flex-wrap justify-center">
          <Award className="w-3.5 h-3.5 text-amber-400 inline" />
          <span>Equipe:</span>
          <span className="text-slate-300 font-medium">
            Diogo, Maria Vitória, Ana Carolina, Gabrielle, Kaio, Julia & Esther
          </span>
        </div>

        {/* Right Rigour Tag */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Globe2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Alinhado às Metas da ONU (ODS 13)</span>
        </div>

      </div>
    </footer>
  );
};
