import { ChecklistItem } from '../types';

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  // 🔬 Experimento
  { id: 'exp-1', category: 'experiment', label: 'Garrafas de mesmo tamanho e formato', completed: false },
  { id: 'exp-2', category: 'experiment', label: 'Garrafa preta pintada uniformemente', completed: false },
  { id: 'exp-3', category: 'experiment', label: 'Garrafa transparente limpa e desobstruída', completed: false },
  { id: 'exp-4', category: 'experiment', label: 'Mesmo volume exato de água medido em ambas', completed: false },
  { id: 'exp-5', category: 'experiment', label: 'Termômetro digital calibrado e funcionando', completed: false },
  { id: 'exp-6', category: 'experiment', label: 'Local plano e com incidência solar direta sem sombras', completed: false },
  { id: 'exp-7', category: 'experiment', label: 'Cronômetro preparado para marcar intervalos fixos', completed: false },
  { id: 'exp-8', category: 'experiment', label: 'Prancheta ou caderno para anotação imediata', completed: false },
  { id: 'exp-9', category: 'experiment', label: 'Experimento repetido para validação de dados', completed: false },

  // 📊 Dados
  { id: 'dat-1', category: 'data', label: 'Todas as medições de tempo e temperatura anotadas', completed: false },
  { id: 'dat-2', category: 'data', label: 'Temperatura inicial e final de cada garrafa registradas', completed: false },
  { id: 'dat-3', category: 'data', label: 'Variação de temperatura (ΔT) calculada para ambas', completed: false },
  { id: 'dat-4', category: 'data', label: 'Médias aritméticas dos testes calculadas', completed: false },
  { id: 'dat-5', category: 'data', label: 'Gráfico de Temperatura × Tempo gerado e verificado', completed: false },
  { id: 'dat-6', category: 'data', label: 'Cálculos matemáticos conferidos por pelo menos 2 membros', completed: false },

  // 🎤 Apresentação
  { id: 'apr-1', category: 'presentation', label: 'Diogo treinou a Introdução', completed: false },
  { id: 'apr-2', category: 'presentation', label: 'Maria Vitória treinou a Hipótese', completed: false },
  { id: 'apr-3', category: 'presentation', label: 'Ana Carolina treinou Materiais e Experimento', completed: false },
  { id: 'apr-4', category: 'presentation', label: 'Gabrielle Nazario treinou Coleta de Dados', completed: false },
  { id: 'apr-5', category: 'presentation', label: 'Kaio treinou a Matemática e Fórmulas', completed: false },
  { id: 'apr-6', category: 'presentation', label: 'Esther treinou os Resultados Reais', completed: false },
  { id: 'apr-7', category: 'presentation', label: 'Julia treinou a Conexão ODS 13 e Conclusão', completed: false },
  { id: 'apr-8', category: 'presentation', label: 'Todos os 7 integrantes sabem explicar o experimento', completed: false },
  { id: 'apr-9', category: 'presentation', label: 'Todos sabem responder dúvidas da banca sobre a ODS 13', completed: false },

  // 🧰 Materiais
  { id: 'mat-1', category: 'materials', label: 'Garrafas do experimento prontas para demonstração', completed: false },
  { id: 'mat-2', category: 'materials', label: 'Água e recipientes para reposição caso necessário', completed: false },
  { id: 'mat-3', category: 'materials', label: 'Termômetro para exibição visual', completed: false },
  { id: 'mat-4', category: 'materials', label: 'Tinta preta (embalagem para mostrar o material utilizado)', completed: false },
  { id: 'mat-5', category: 'materials', label: 'Celular, tablet ou notebook com o CLIMA LAB aberto', completed: false },
  { id: 'mat-6', category: 'materials', label: 'Cartaz ou banner da Feira de Ciências montado', completed: false },
];
