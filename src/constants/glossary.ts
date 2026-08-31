import { GlossaryTerm } from '../types';

export const SCIENTIFIC_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Radiação Solar',
    symbol: 'E',
    category: 'physics',
    definition: 'Energia emitida pelo Sol que viaja pelo espaço na forma de ondas eletromagnéticas (luz visível, radiação infravermelha e ultravioleta).',
    exampleInProject: 'É a fonte de energia primária que incide sobre ambas as garrafas durante o experimento.'
  },
  {
    term: 'Absorção Térmica',
    category: 'physics',
    definition: 'Processo pelo qual a energia da radiação solar que atinge uma matéria é retida e convertida em energia térmica (calor), aumentando a agitação molecular.',
    exampleInProject: 'A garrafa pintada de preto absorve a maior parte do espectro de luz, convertendo a radiação em calor para a água.'
  },
  {
    term: 'Reflexão e Transmissão',
    category: 'physics',
    definition: 'Reflexão é o redirecionamento da luz de volta ao meio original; transmissão é a passagem da radiação através de um meio transparente sem ser completamente retida.',
    exampleInProject: 'A garrafa transparente permite que grande parte da luz a atravesse (transmissão) e reflita, absorvendo menor proporção direta na parede.'
  },
  {
    term: 'Albedo',
    symbol: 'α',
    category: 'climate',
    definition: 'Medida da capacidade de uma superfície de refletir a radiação solar incidente, variando de 0 (absorção total, cor escura) a 1 (reflexão total, cor branca ou espelhada).',
    exampleInProject: 'Superfícies de asfalto têm baixo albedo (aquecem muito), enquanto geleiras e telhados brancos têm alto albedo.'
  },
  {
    term: 'Variação de Temperatura',
    symbol: 'ΔT',
    category: 'math',
    definition: 'A diferença matemática entre a temperatura final de um corpo e sua temperatura inicial após um período de tempo.',
    exampleInProject: 'ΔT = T_final − T_inicial. Permite comparar o ganho real de calor independente da temperatura inicial exata.'
  },
  {
    term: 'Média Aritmética',
    symbol: 'x̄',
    category: 'math',
    definition: 'A soma de todos os valores de um conjunto de medições dividida pela quantidade total de medições.',
    exampleInProject: 'Ajuda a diminuir a influência de variações pontuais causadas por ventos ou nuvens passageiras entre os testes.'
  },
  {
    term: 'Diferença Percentual',
    symbol: '%',
    category: 'math',
    definition: 'Cálculo que compara o quanto um valor variou em relação a um valor de referência base.',
    exampleInProject: 'Mostra proporcionalmente quanto a garrafa preta variou a mais em relação ao aquecimento da garrafa transparente.'
  },
  {
    term: 'Variável Independente',
    category: 'method',
    definition: 'O fator manipulado intencionalmente pelos cientistas para observar seus efeitos.',
    exampleInProject: 'A cor da superfície das garrafas (preta vs transparente).'
  },
  {
    term: 'Variável Dependente',
    category: 'method',
    definition: 'O que é medido e que pode ser influenciado pela variável independente.',
    exampleInProject: 'A temperatura da água ao longo do tempo de exposição solar.'
  },
  {
    term: 'Variáveis Controladas',
    category: 'method',
    definition: 'Todos os outros fatores mantidos constantes para garantir que o resultado seja decorrente apenas da variável independente.',
    exampleInProject: 'Volume de água, formato da garrafa, material plástico, local, inclinação solar e tempo de exposição.'
  },
  {
    term: 'Ilha de Calor Urbana',
    category: 'climate',
    definition: 'Fenômeno climático em que áreas urbanas densamente construídas com asfalto e concreto apresentam temperaturas significativamente maiores que as áreas rurais vizinhas.',
    exampleInProject: 'Analogia direta com a garrafa preta: cidades cheias de superfícies escuras acumulam calor excessivo durante o dia.'
  },
  {
    term: 'ODS 13 (ONU)',
    category: 'climate',
    definition: 'Objetivo de Desenvolvimento Sustentável nº 13 da ONU: "Ação Contra a Mudança Global do Clima", focado em medidas urgentes de mitigação, adaptação e educação.',
    exampleInProject: 'O projeto fornece a base experimental para discutir soluções como telhados frios e arborização urbana.'
  }
];
