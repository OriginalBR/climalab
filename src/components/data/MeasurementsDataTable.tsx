import React, { useState } from 'react';
import { 
  Table2, 
  Trash2, 
  Edit2, 
  Download, 
  FileJson, 
  Plus, 
  RotateCcw, 
  Sparkles,
  Check,
  X,
  Clock,
  Filter
} from 'lucide-react';
import { useExperiment } from '../../context/ExperimentContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ClearConfirmModal } from './ClearConfirmModal';
import { BackupRestoreModal } from './BackupRestoreModal';
import { exportToCSV } from '../../utils/export';
import { Measurement } from '../../types';
import { sound } from '../../utils/sound';

export const MeasurementsDataTable: React.FC = () => {
  const { 
    measurements, 
    updateMeasurement, 
    deleteMeasurement, 
    clearAllMeasurements, 
    loadSampleData 
  } = useExperiment();

  const [selectedTestFilter, setSelectedTestFilter] = useState<number | 'all'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ time: string; black: string; clear: string; notes: string }>({
    time: '',
    black: '',
    clear: '',
    notes: '',
  });

  const [isClearModalOpen, setClearModalOpen] = useState(false);
  const [isBackupModalOpen, setBackupModalOpen] = useState(false);

  const testNumbers = Array.from(new Set(measurements.map(m => m.testNumber))).sort((a, b) => a - b);

  const filteredMeasurements = measurements.filter(m => {
    if (selectedTestFilter === 'all') return true;
    return m.testNumber === selectedTestFilter;
  });

  const handleStartEdit = (m: Measurement) => {
    sound.playClick();
    setEditingId(m.id);
    setEditData({
      time: String(m.timeMinutes),
      black: String(m.tempBlack),
      clear: String(m.tempClear),
      notes: m.notes || '',
    });
  };

  const handleSaveEdit = (id: string) => {
    const time = parseFloat(editData.time);
    const black = parseFloat(editData.black.replace(',', '.'));
    const clear = parseFloat(editData.clear.replace(',', '.'));

    if (isNaN(time) || isNaN(black) || isNaN(clear)) return;

    updateMeasurement(id, {
      timeMinutes: time,
      tempBlack: black,
      tempClear: clear,
      notes: editData.notes.trim() || undefined,
    });
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    sound.playClick();
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {/* Table Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        
        {/* Test Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-emerald-400" /> Filtrar:
          </span>
          <button
            onClick={() => setSelectedTestFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTestFilter === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos ({measurements.length})
          </button>
          {testNumbers.map(tNum => {
            const count = measurements.filter(m => m.testNumber === tNum).length;
            return (
              <button
                key={tNum}
                onClick={() => setSelectedTestFilter(tNum)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedTestFilter === tNum
                    ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Teste {tNum} ({count})
              </button>
            );
          })}
        </div>

        {/* Global Toolbar Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            size="sm"
            variant="outline"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={() => exportToCSV(measurements)}
            disabled={measurements.length === 0}
          >
            CSV
          </Button>

          <Button
            size="sm"
            variant="outline"
            icon={<FileJson className="w-3.5 h-3.5" />}
            onClick={() => setBackupModalOpen(true)}
          >
            Backup / JSON
          </Button>

          {measurements.length > 0 && (
            <Button
              size="sm"
              variant="danger"
              icon={<Trash2 className="w-3.5 h-3.5" />}
              onClick={() => setClearModalOpen(true)}
            >
              Limpar
            </Button>
          )}
        </div>
      </div>

      {/* Main Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-900/90 text-slate-400 text-[11px] uppercase font-bold border-b border-slate-800 sticky top-0">
            <tr>
              <th className="p-3.5">Ensaio</th>
              <th className="p-3.5">Tempo</th>
              <th className="p-3.5 text-rose-400">Garrafa Preta (🖤)</th>
              <th className="p-3.5 text-sky-400">Transparente (🫙)</th>
              <th className="p-3.5 text-amber-400">Diferença (Δ)</th>
              <th className="p-3.5">Observações</th>
              <th className="p-3.5 text-right">Ações</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredMeasurements.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-10 text-center text-slate-400 text-xs font-sans">
                  <div className="space-y-3">
                    <p>Nenhuma medição cadastrada neste filtro.</p>
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline" onClick={loadSampleData}>
                        Carregar Dados de Exemplo
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredMeasurements.map((m) => {
                const isEditing = editingId === m.id;
                const diff = Number((m.tempBlack - m.tempClear).toFixed(1));

                if (isEditing) {
                  return (
                    <tr key={m.id} className="bg-emerald-950/20 border-emerald-500/30">
                      <td className="p-3 text-slate-300 font-sans font-bold">Teste {m.testNumber}</td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={editData.time}
                          onChange={(e) => setEditData(prev => ({ ...prev, time: e.target.value }))}
                          className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editData.black}
                          onChange={(e) => setEditData(prev => ({ ...prev, black: e.target.value }))}
                          className="w-20 px-2 py-1 bg-slate-900 border border-rose-500/50 rounded text-xs text-rose-300 font-bold"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editData.clear}
                          onChange={(e) => setEditData(prev => ({ ...prev, clear: e.target.value }))}
                          className="w-20 px-2 py-1 bg-slate-900 border border-sky-500/50 rounded text-xs text-sky-300 font-bold"
                        />
                      </td>
                      <td className="p-3 text-amber-400 font-bold">--</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editData.notes}
                          onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
                          className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-slate-300"
                        />
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleSaveEdit(m.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                            title="Salvar"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700"
                            title="Cancelar"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={m.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5 font-sans font-semibold text-slate-300">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700 text-[11px]">
                        Teste {m.testNumber}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-200 font-semibold">
                      {m.timeMinutes} min
                    </td>
                    <td className="p-3.5 text-rose-400 font-bold text-sm">
                      {m.tempBlack.toFixed(1)}°C
                    </td>
                    <td className="p-3.5 text-sky-400 font-bold text-sm">
                      {m.tempClear.toFixed(1)}°C
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        diff > 0 
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20' 
                          : diff < 0 
                          ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20' 
                          : 'text-slate-400'
                      }`}>
                        {diff > 0 ? `+${diff}°C` : `${diff}°C`}
                      </span>
                    </td>
                    <td className="p-3.5 font-sans text-slate-400 text-xs truncate max-w-[200px]">
                      {m.notes || <span className="text-slate-600 italic">—</span>}
                    </td>
                    <td className="p-3.5 text-right font-sans">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleStartEdit(m)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
                          title="Editar linha"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteMeasurement(m.id)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                          title="Excluir medição"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation & Backup Modals */}
      <ClearConfirmModal
        isOpen={isClearModalOpen}
        onClose={() => setClearModalOpen(false)}
        onConfirm={clearAllMeasurements}
        count={measurements.length}
      />

      <BackupRestoreModal
        isOpen={isBackupModalOpen}
        onClose={() => setBackupModalOpen(false)}
      />
    </div>
  );
};
