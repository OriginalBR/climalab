import React, { useState } from 'react';
import { BookOpen, Search, Filter, Atom, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useExperiment } from '../../context/ExperimentContext';
import { SCIENTIFIC_GLOSSARY } from '../../constants/glossary';
import { Badge } from '../common/Badge';

export const GlossaryModal: React.FC = () => {
  const { isGlossaryOpen, setGlossaryOpen } = useExperiment();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = SCIENTIFIC_GLOSSARY.filter(item => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.exampleInProject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryLabels: Record<string, { label: string; variant: 'emerald' | 'amber' | 'blue' | 'purple' }> = {
    physics: { label: 'Física / Radiação', variant: 'amber' },
    math: { label: 'Matemática', variant: 'emerald' },
    climate: { label: 'Clima & ODS 13', variant: 'blue' },
    method: { label: 'Método Científico', variant: 'purple' },
  };

  return (
    <Modal
      isOpen={isGlossaryOpen}
      onClose={() => setGlossaryOpen(false)}
      title="Dicionário Científico do Projeto"
      subtitle="Conceitos fundamentais explicados de forma simples e didática"
      icon={<BookOpen className="w-5 h-5" />}
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar termo científico (ex: Radiação, Albedo, ΔT)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos
            </button>
            {Object.entries(categoryLabels).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === key
                    ? 'bg-slate-700 text-white border border-slate-600'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs bg-slate-950/50 rounded-2xl border border-slate-800">
              Nenhum termo científico encontrado para "{searchTerm}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const catConfig = categoryLabels[item.category];
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-slate-100">
                        {item.term}
                      </span>
                      {item.symbol && (
                        <span className="px-1.5 py-0.5 text-xs font-mono font-bold bg-slate-800 text-amber-400 rounded border border-slate-700">
                          {item.symbol}
                        </span>
                      )}
                    </div>
                    {catConfig && (
                      <Badge variant={catConfig.variant} size="sm">
                        {catConfig.label}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.definition}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px] text-emerald-300 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200">No nosso experimento: </strong>
                      {item.exampleInProject}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
};
