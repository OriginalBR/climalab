import React from 'react';
import { Printer, Download, FileSpreadsheet, CheckCircle2, Globe2, Award } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useExperiment } from '../../context/ExperimentContext';
import { exportToCSV } from '../../utils/export';

export const PrintableReportModal: React.FC = () => {
  const { isReportOpen, setReportOpen, measurements, globalStats, members } = useExperiment();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isReportOpen}
      onClose={() => setReportOpen(false)}
      title="Relatório Científico Oficial — Padrão A4"
      subtitle="Visualização pronta para impressão e entrega à banca avaliadora"
      icon={<FileSpreadsheet className="w-5 h-5 text-emerald-400" />}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        
        {/* Print Toolbar */}
        <div className="no-print flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400">
            Você pode imprimir em papel A4 ou salvar como PDF no seu computador/celular.
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              icon={<Download className="w-3.5 h-3.5" />}
              onClick={() => exportToCSV(measurements)}
            >
              Exportar CSV
            </Button>
            <Button
              size="sm"
              variant="solar"
              icon={<Printer className="w-3.5 h-3.5" />}
              onClick={handlePrint}
            >
              Imprimir / Salvar PDF
            </Button>
          </div>
        </div>

        {/* Printable Paper View (A4 Styled Sheet) */}
        <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-200 font-sans space-y-6 text-xs select-text">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-700 block">
              FEIRA DE CIÊNCIAS • RELATÓRIO TÉCNICO DE EXPERIMENTO
            </span>
            <h1 className="text-xl font-extrabold text-slate-900">
              ODS 13: Investigação da Absorção de Radiação Solar em Superfícies
            </h1>
            <p className="text-xs italic text-slate-600">
              “A cor de uma superfície influencia seu aquecimento quando exposta à luz solar?”
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-4">
            <div>
              <strong className="text-slate-900 block mb-0.5">Integrantes do Grupo:</strong>
              <p className="text-slate-700">
                Diogo, Maria Vitória, Ana Carolina, Gabrielle Nazario, Kaio, Esther e Julia.
              </p>
            </div>
            <div>
              <strong className="text-slate-900 block mb-0.5">Metodologia:</strong>
              <p className="text-slate-700">
                Comparação entre Garrafa Preta (Superfície Escura) e Garrafa Transparente expostas ao Sol sob condições controladas de volume e tempo.
              </p>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Resumo Matemático dos Ensaios Reais (Baseado em ΔT)</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[11px]">
              <div className="p-2 bg-white rounded border">
                <span className="text-[10px] text-slate-500 block">Ensaios Válidos</span>
                <strong>{globalStats.totalTests}</strong>
              </div>
              <div className="p-2 bg-white rounded border">
                <span className="text-[10px] text-slate-500 block">Temp Inicial Média</span>
                <strong>{globalStats.avgInitialTemp.toFixed(1)}°C</strong>
              </div>
              <div className="p-2 bg-white rounded border">
                <span className="text-[10px] text-slate-500 block">ΔT Médio Preta</span>
                <strong className="text-rose-700">+{globalStats.avgDeltaTBlack.toFixed(1)}°C</strong>
              </div>
              <div className="p-2 bg-white rounded border">
                <span className="text-[10px] text-slate-500 block">ΔT Médio Transp.</span>
                <strong className="text-sky-700">+{globalStats.avgDeltaTClear.toFixed(1)}°C</strong>
              </div>
              <div className="p-2 bg-white rounded border">
                <span className="text-[10px] text-slate-500 block">Diferença Médias</span>
                <strong>{globalStats.avgDifference > 0 ? `+${globalStats.avgDifference.toFixed(1)}°C` : `${globalStats.avgDifference.toFixed(1)}°C`}</strong>
              </div>
              <div className="p-2 bg-white rounded border">
                <span className="text-[10px] text-slate-500 block">Diferença %</span>
                <strong>{globalStats.canCalculatePercentage && globalStats.avgPercentageDiff !== null ? `${globalStats.avgPercentageDiff > 0 ? '+' : ''}${globalStats.avgPercentageDiff}%` : 'N/A'}</strong>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 italic text-center">
              {globalStats.percentageReferenceNote}
            </p>
          </div>

          {/* Test by Test Delta T Breakdown Table */}
          {globalStats.testSummaries.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Variação Térmica (ΔT) por Ensaio</h3>
              <table className="w-full text-left border-collapse border border-slate-300 text-[11px]">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="border border-slate-300 p-1.5">Ensaio</th>
                    <th className="border border-slate-300 p-1.5">T_inicial (P / T)</th>
                    <th className="border border-slate-300 p-1.5">T_final (P / T)</th>
                    <th className="border border-slate-300 p-1.5 text-rose-700 font-bold">ΔT Preta</th>
                    <th className="border border-slate-300 p-1.5 text-sky-700 font-bold">ΔT Transparente</th>
                    <th className="border border-slate-300 p-1.5">Diferença</th>
                    <th className="border border-slate-300 p-1.5">Maior Variação</th>
                  </tr>
                </thead>
                <tbody>
                  {globalStats.testSummaries.map(s => (
                    <tr key={s.testNumber}>
                      <td className="border border-slate-300 p-1.5 font-bold">Teste {s.testNumber}</td>
                      <td className="border border-slate-300 p-1.5">{s.initialTempBlack.toFixed(1)}°C / {s.initialTempClear.toFixed(1)}°C</td>
                      <td className="border border-slate-300 p-1.5">{s.finalTempBlack.toFixed(1)}°C / {s.finalTempClear.toFixed(1)}°C</td>
                      <td className="border border-slate-300 p-1.5 font-bold text-rose-700">+{s.deltaTBlack.toFixed(1)}°C</td>
                      <td className="border border-slate-300 p-1.5 font-bold text-sky-700">+{s.deltaTClear.toFixed(1)}°C</td>
                      <td className="border border-slate-300 p-1.5">{s.differenceDeltaT > 0 ? `+${s.differenceDeltaT.toFixed(1)}°C` : `${s.differenceDeltaT.toFixed(1)}°C`}</td>
                      <td className="border border-slate-300 p-1.5 font-bold">{s.higherBottleLabel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Data Table */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Tabela de Medições Experimentais Completas</h3>
            <table className="w-full text-left border-collapse border border-slate-300 text-[11px]">
              <thead className="bg-slate-100 text-slate-800">
                <tr>
                  <th className="border border-slate-300 p-2">Ensaio</th>
                  <th className="border border-slate-300 p-2">Tempo (min)</th>
                  <th className="border border-slate-300 p-2">Temp Preta (°C)</th>
                  <th className="border border-slate-300 p-2">Temp Transparente (°C)</th>
                  <th className="border border-slate-300 p-2">Diferença Instantânea (°C)</th>
                  <th className="border border-slate-300 p-2">Observações</th>
                </tr>
              </thead>
              <tbody>
                {measurements.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="border border-slate-300 p-4 text-center text-slate-500 italic">
                      Nenhuma medição registrada ainda.
                    </td>
                  </tr>
                ) : (
                  measurements.map(m => (
                    <tr key={m.id}>
                      <td className="border border-slate-300 p-1.5 font-bold">Teste {m.testNumber}</td>
                      <td className="border border-slate-300 p-1.5">{m.timeMinutes} min</td>
                      <td className="border border-slate-300 p-1.5 font-bold text-rose-700">{m.tempBlack.toFixed(1)}°C</td>
                      <td className="border border-slate-300 p-1.5 font-bold text-sky-700">{m.tempClear.toFixed(1)}°C</td>
                      <td className="border border-slate-300 p-1.5">+{(m.tempBlack - m.tempClear).toFixed(1)}°C</td>
                      <td className="border border-slate-300 p-1.5 text-slate-600">{m.notes || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Scientific Conclusion & ODS 13 */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-900 text-sm">Conclusão Científica & Relação com a ODS 13</h3>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded space-y-1.5">
              <strong className="text-slate-900 block font-bold">{globalStats.conclusionTitle}</strong>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {globalStats.interpretationText}
              </p>
              <p className="text-[10px] text-slate-500 italic">
                "{globalStats.scientificCaveat}"
              </p>
            </div>

            <p className="text-slate-700 leading-relaxed text-[11px] pt-1">
              Esse princípio físico elucida a formação de <strong>ilhas de calor urbanas</strong> nas cidades pavimentadas com asfalto escuro. 
              Como estratégia de adaptação e mitigação alinhada à <strong>ODS 13 (Ação Contra a Mudança Global do Clima)</strong>, recomenda-se a implantação de superfícies reflexivas (alto albedo / telhados frios) e arborização urbana para atenuar as temperaturas extremas nos centros habitados.
            </p>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-[10px] text-slate-500">
            <div className="border-t border-slate-400 pt-1">
              Assinatura do Grupo de Estudantes
            </div>
            <div className="border-t border-slate-400 pt-1">
              Avaliação do Professor / Banca
            </div>
          </div>

        </div>

      </div>
    </Modal>
  );
};
