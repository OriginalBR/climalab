import React from 'react';
import { AlertCircle, ShieldAlert, Sparkles, Scale } from 'lucide-react';
import { Card } from '../common/Card';

export const ScientificRigorCallout: React.FC = () => {
  return (
    <Card className="border-amber-500/30 bg-gradient-to-r from-slate-950 via-amber-950/20 to-slate-950 p-6 space-y-4">
      <div className="flex items-center gap-2.5 text-amber-400">
        <ShieldAlert className="w-5 h-5 shrink-0" />
        <h3 className="text-sm font-bold font-display uppercase tracking-wider">
          Declaração de Rigor Científico & Metodologia
        </h3>
      </div>

      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-3">
        <blockquote className="border-l-2 border-amber-400 pl-3 italic text-amber-200/90 font-medium">
          “Este experimento não reproduz o aquecimento global. Ele demonstra, em pequena escala, um fenômeno físico relacionado à absorção de radiação e ao aquecimento, que pode ser utilizado para discutir questões relacionadas ao clima e aos materiais das cidades.”
        </blockquote>

        <p className="text-slate-300">
          Superfícies escuras tendem a absorver uma maior proporção da radiação eletromagnética incidente, enquanto superfícies claras ou transparentes apresentam diferentes comportamentos de transmissão, reflexão e absorção. O experimento testa como essas diferenças se manifestam nas condições específicas utilizadas pelo grupo.
        </p>

        <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
          <div className="space-y-1">
            <strong className="text-amber-300 font-bold block">Fatores que Podem Influenciar os Resultados:</strong>
            <ul className="list-disc list-inside text-slate-400 space-y-0.5">
              <li>Intensidade da luz solar e ângulo solar</li>
              <li>Velocidade do vento e resfriamento por convecção</li>
              <li>Espessura e tipo da camada de tinta preta</li>
              <li>Temperatura ambiente inicial e formato da garrafa</li>
            </ul>
          </div>

          <div className="space-y-1">
            <strong className="text-emerald-300 font-bold block">Boas Práticas Adotadas pelo Grupo:</strong>
            <ul className="list-disc list-inside text-slate-400 space-y-0.5">
              <li>Mesmo volume de água em ambas as garrafas</li>
              <li>Mesmo local e mesmo tempo de exposição solar</li>
              <li>Mesmo termômetro calibrado para todas as leituras</li>
              <li>Repetição dos testes para obter médias aritméticas</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
