import React, { useState } from 'react';
import { Download, Upload, FileJson, Check, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useExperiment } from '../../context/ExperimentContext';
import { exportCompleteBackup, parseBackupFile } from '../../utils/export';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { measurements, checklist, members, restoreBackup } = useExperiment();
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleExport = () => {
    exportCompleteBackup(measurements, checklist, members);
    setSuccessMsg('Arquivo de backup exportado com sucesso!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = parseBackupFile(text);
        restoreBackup(parsed);
        setSuccessMsg('Backup restaurado com sucesso! Dados sincronizados.');
        setTimeout(() => {
          setSuccessMsg('');
          onClose();
        }, 1500);
      } catch (err) {
        setErrorMsg((err as Error).message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Backup e Sincronização de Dados"
      subtitle="Exporte ou importe seus dados para trocar entre os membros do grupo"
      icon={<FileJson className="w-5 h-5 text-emerald-400" />}
      maxWidth="lg"
    >
      <div className="space-y-5">
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Export Section */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-400" /> Exportar Backup (Salvar Arquivo)
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Gera um arquivo JSON contendo todas as medições registradas, o status do checklist e o progresso das falas.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExport}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Baixar Backup .JSON
          </Button>
        </div>

        {/* Import Section */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Upload className="w-4 h-4 text-sky-400" /> Importar Backup (Restaurar Arquivo)
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Selecione um arquivo de backup previamente exportado para carregar os dados no seu navegador.
          </p>
          <label className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer gap-2 transition-colors">
            <Upload className="w-3.5 h-3.5 text-sky-400" />
            <span>Selecionar Arquivo .JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </Modal>
  );
};
