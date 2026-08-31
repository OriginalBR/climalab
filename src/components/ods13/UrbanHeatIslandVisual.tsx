import React, { useState } from 'react';
import { Building2, Trees, Sun, Flame, Sparkles, ShieldCheck } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const UrbanHeatIslandVisual: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'dark' | 'cool'>('dark');

  return (
    <Card className="border-slate-800 bg-slate-950/80 space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-400" />
            Ilhas de Calor Urbanas & O Fenômeno do Albedo
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare o impacto das superfícies escuras versus superfícies refletivas nas cidades
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setSelectedScenario('dark')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedScenario === 'dark'
                ? 'bg-zinc-800 text-rose-400 font-bold border border-zinc-700 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🖤 Cidade Convencional (Asfalto Escuro)
          </button>
          <button
            onClick={() => setSelectedScenario('cool')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedScenario === 'cool'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🌿 Cidade Sustentável (Telhados Frios)
          </button>
        </div>
      </div>

      {/* Visual Simulation Display */}
      {selectedScenario === 'dark' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-2xl bg-gradient-to-r from-zinc-950 via-slate-900 to-rose-950/30 border border-rose-500/30 animate-fadeIn">
          <div className="space-y-2">
            <Badge variant="rose">Cenário: Baixo Albedo (Cores Escuras)</Badge>
            <h4 className="text-base font-bold text-slate-100">
              Asfalto e Telhados Escuros Retêm Calor
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Assim como a <strong>garrafa preta</strong> do nosso experimento absorveu mais radiação e aqueceu rapidamente a água, as ruas asfaltadas e coberturas escuras retêm calor durante todo o dia, emitindo radiação térmica à noite e elevando a temperatura da cidade em até 4°C a 8°C.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-rose-300 space-y-1">
              <div className="flex justify-between font-mono">
                <span>Albedo médio do asfalto:</span>
                <span className="font-bold">0.05 a 0.10 (Muito Baixo)</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Consequência:</span>
                <span className="font-bold text-rose-400">Superaquecimento urbano e maior gasto de energia</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800 text-center space-y-2">
            <div className="text-4xl">🏙️☀️🔥</div>
            <span className="text-xs font-mono font-bold text-rose-400 block">
              Temperatura de Superfície: ~55°C a 65°C
            </span>
            <p className="text-[11px] text-slate-400">
              Alta retenção de calor sensível por absorção eletromagnética
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/30 border border-emerald-500/30 animate-fadeIn">
          <div className="space-y-2">
            <Badge variant="emerald">Cenário: Alto Albedo & Soluções Baseadas na Natureza</Badge>
            <h4 className="text-base font-bold text-slate-100">
              Telhados Claros e Vegetação Refletem Radiação
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Superfícies claras (com alto albedo) refletem até 80% da luz solar incidente, reduzindo drasticamente o aquecimento superficial. O plantio de árvores gera sombra e resfriamento por evapotranspiração, combatendo as ilhas de calor.
            </p>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-emerald-300 space-y-1">
              <div className="flex justify-between font-mono">
                <span>Albedo de tintas reflexivas:</span>
                <span className="font-bold">0.70 a 0.85 (Alto)</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Consequência:</span>
                <span className="font-bold text-emerald-400">Cidades mais frescas, menos ar-condicionado e menor emissão de carbono</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-center space-y-2">
            <div className="text-4xl">🌳🏙️🌿</div>
            <span className="text-xs font-mono font-bold text-emerald-400 block">
              Temperatura de Superfície: ~28°C a 34°C
            </span>
            <p className="text-[11px] text-slate-400">
              Reflexão de radiação e evapotranspiração ativa
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
