import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface ClearConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

export const ClearConfirmModal: React.FC<ClearConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  count,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Exclusão de Dados"
      subtitle="Esta ação não pode ser desfeita"
      icon={<AlertTriangle className="w-5 h-5 text-rose-400" />}
      maxWidth="md"
    >
      <div className="space-y-4 text-center sm:text-left">
        <p className="text-xs text-slate-300 leading-relaxed">
          Tem certeza de que deseja apagar todas as <strong>{count} medições</strong> cadastradas? 
          Caso precise guardar uma cópia antes de limpar, faça o download do backup em JSON ou CSV.
        </p>

        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-[11px] text-rose-300">
          ⚠️ Todos os gráficos reais e cálculos voltarão ao estado inicial vazio.
        </div>

        <div className="pt-3 flex flex-col sm:flex-row justify-end gap-2">
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="md"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Sim, Limpar Todos os Dados
          </Button>
        </div>
      </div>
    </Modal>
  );
};
