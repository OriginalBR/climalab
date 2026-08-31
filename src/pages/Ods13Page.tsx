import React from 'react';
import { Globe2, Sun, Building2, Trees, ShieldAlert, Sparkles } from 'lucide-react';
import { ClimateConnectionDiagram } from '../components/ods13/ClimateConnectionDiagram';
import { UrbanHeatIslandVisual } from '../components/ods13/UrbanHeatIslandVisual';
import { ScientificRigorCallout } from '../components/ods13/ScientificRigorCallout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const Ods13Page: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="blue">Objetivos de Desenvolvimento Sustentável da ONU</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
          ODS 13 — Ação Contra a Mudança Global do Clima
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Compreenda a relação direta entre o experimento de física térmica e as soluções climáticas urbanas
        </p>
      </div>

      {/* Main Connection Flow Diagram */}
      <ClimateConnectionDiagram />

      {/* Urban Heat Islands Visualizer */}
      <UrbanHeatIslandVisual />

      {/* ODS 13 Targets & Real World Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <Card className="border-slate-800 bg-slate-950/80 space-y-2">
          <span className="text-2xl">🌱</span>
          <h4 className="text-sm font-bold text-slate-100 font-display">Meta 13.1 — Resiliência</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fortalecer a resiliência e a capacidade de adaptação a riscos relacionados ao clima em todos os países.
          </p>
        </Card>

        <Card className="border-slate-800 bg-slate-950/80 space-y-2">
          <span className="text-2xl">🏛️</span>
          <h4 className="text-sm font-bold text-slate-100 font-display">Meta 13.2 — Políticas Públicas</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Integrar medidas da mudança do clima nas políticas, estratégias e planejamentos urbanos nacionais.
          </p>
        </Card>

        <Card className="border-slate-800 bg-slate-950/80 space-y-2">
          <span className="text-2xl">🎓</span>
          <h4 className="text-sm font-bold text-slate-100 font-display">Meta 13.3 — Educação & Ciência</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Melhorar a educação, conscientização e a capacidade humana sobre mitigação e adaptação climática.
          </p>
        </Card>

      </div>

      {/* Scientific Rigour Callout */}
      <ScientificRigorCallout />
    </div>
  );
};
