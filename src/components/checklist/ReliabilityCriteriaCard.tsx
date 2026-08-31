import React from 'react';
import { ShieldCheck, CheckCircle2, Scale, Repeat, HelpCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const ReliabilityCriteriaCard: React.FC = () => {
  return (
    <Card className="border-slate-800 bg-slate-950/80 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Nosso Experimento é Confiável? Critérios de Rigor Científico
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            O rigor metrológico e o controle estrito de variáveis elevam a validade científica do projeto
          </p>
        </div>

        <Badge variant="emerald" dot>Metodologia Padrão</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        
        {/* 1. Variável Independente */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
            Variável Independente (Manipulada)
          </span>
          <h4 className="text-sm font-bold text-slate-100">Cor da Superfície da Garrafa</h4>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            É o único fator que o grupo alterou intencionalmente: uma garrafa pintada de preto fosco vs uma garrafa transparente.
          </p>
        </div>

        {/* 2. Variável Dependente */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block">
            Variável Dependente (Medida)
          </span>
          <h4 className="text-sm font-bold text-slate-100">Temperatura da Água (°C)</h4>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            O valor medido ao longo do tempo com o termômetro para observar o efeito da absorção de radiação.
          </p>
        </div>

        {/* 3. Variáveis Controladas */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
            Variáveis Controladas (Constantes)
          </span>
          <h4 className="text-sm font-bold text-slate-100">Condições Idênticas</h4>
          <ul className="list-disc list-inside text-slate-400 text-[11px] space-y-0.5">
            <li>Mesmo tamanho de garrafa (500ml)</li>
            <li>Mesmo volume exato de água</li>
            <li>Mesmo local e incidência de Sol</li>
            <li>Mesmo termômetro calibrado</li>
          </ul>
        </div>

        {/* 4. Hipótese */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
            Hipótese Científica
          </span>
          <h4 className="text-sm font-bold text-slate-100">Maior Absorção na Cor Preta</h4>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            A garrafa preta apresentará maior variação de temperatura devido à menor reflexão e maior absorção do espectro de luz.
          </p>
        </div>

        {/* 5. Repetição */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
            Repetição & Amostragem
          </span>
          <h4 className="text-sm font-bold text-slate-100">Múltiplos Ensaios</h4>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Repetir o experimento em diferentes dias/horários para calcular a média e diminuir a influência de fatores climáticos aleatórios.
          </p>
        </div>

        {/* 6. Indicador de Qualidade */}
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
            Indicador de Validade
          </span>
          <div className="space-y-1">
            <span className="text-xl font-bold text-emerald-300 font-mono">100% Controlado</span>
            <p className="text-[11px] text-slate-300">
              Controlar rigorosamente as variáveis garante que a diferença observada decorra da física da cor.
            </p>
          </div>
        </div>

      </div>
    </Card>
  );
};
