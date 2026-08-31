import { Measurement, ChecklistItem, SpeechMember } from '../types';

/**
 * Exports measurements array to CSV format
 */
export function exportToCSV(measurements: Measurement[], filename = 'dados_experimento_ods13.csv') {
  if (!measurements || measurements.length === 0) return;

  const headers = ['ID', 'Teste', 'Tempo (min)', 'Temp Preta (°C)', 'Temp Transparente (°C)', 'Diferenca (°C)', 'Observacoes'];
  const rows = measurements.map(m => [
    m.id,
    m.testNumber,
    m.timeMinutes,
    m.tempBlack.toFixed(1),
    m.tempClear.toFixed(1),
    (m.tempBlack - m.tempClear).toFixed(1),
    `"${(m.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports complete workspace state as JSON backup
 */
export function exportCompleteBackup(
  measurements: Measurement[],
  checklist: ChecklistItem[],
  members: SpeechMember[],
  filename = 'backup_clima_lab_ods13.json'
) {
  const data = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    project: 'CLIMA LAB — ODS 13',
    measurements,
    checklist,
    members,
  };

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Imports and validates JSON backup data
 */
export function parseBackupFile(jsonString: string): {
  measurements?: Measurement[];
  checklist?: ChecklistItem[];
  members?: SpeechMember[];
} {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Arquivo JSON inválido.');
    }
    return {
      measurements: Array.isArray(parsed.measurements) ? parsed.measurements : undefined,
      checklist: Array.isArray(parsed.checklist) ? parsed.checklist : undefined,
      members: Array.isArray(parsed.members) ? parsed.members : undefined,
    };
  } catch (err) {
    throw new Error('Falha ao processar arquivo de backup: ' + (err as Error).message);
  }
}
