import React from 'react';
import { Sun, Flame, Building2, Globe2, Target, ArrowDown } from 'lucide-react';
import { Card } from '../common/Card';

export const ClimateConnectionDiagram: React.FC = () => {
  const flowNodes = [
    {
      emoji: '☀️',
      title: 'Radiação Solar',
      desc: 'Ondas eletromagnéticas incidem diariamente sobre a atmosfera e a superfície terrestre.',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    },
    {
      emoji: '🌡️',
      title: 'Aquecimento de Superfícies',
      desc: 'Superfícies com diferentes cores e texturas absorvem ou refletem a luz em proporções distintas.',
      color: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
    },
    {
      emoji: '🏙️',
      title: 'Materiais Urbanos nas Cidades',
      desc: 'Asfalto escuro e concreto concentram calor, gerando as conhecidas "ilhas de calor urbanas".',
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    },
    {
      emoji: '🌎',
      title: 'Adaptação & Resiliência Climática',
      desc: 'Planejamento de cidades com telhados claros (cool roofs) e árvores para amenizar temperaturas extremas.',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    },
    {
      emoji: '🎯',
      title: 'ODS 13 — Ação Climática',
      desc: 'Objetivo global da ONU que incentiva educação, ciência e medidas urgentes de combate às mudanças climáticas.',
      color: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
    },
  ];

  return (
    <Card className="border-slate-800 bg-slate-950/80 space-y-6">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-emerald-400" />
          A Conexão Lógica: Do Experimento de Laboratório à ODS 13
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Como a física da absorção de radiação se conecta com os desafios das cidades modernas
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-between gap-3 relative">
        {flowNodes.map((node, idx) => (
          <React.Fragment key={idx}>
            <div className={`flex-1 p-4 rounded-2xl border ${node.color} flex flex-col justify-between space-y-2 text-center md:text-left transition-all hover:scale-[1.02]`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{node.emoji}</span>
                <span className="text-[10px] font-mono font-bold opacity-60">0{idx + 1}</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100 font-display">{node.title}</h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{node.desc}</p>
              </div>
            </div>

            {idx < flowNodes.length - 1 && (
              <div className="flex md:hidden items-center justify-center py-1 text-slate-600">
                <ArrowDown className="w-4 h-4" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};
