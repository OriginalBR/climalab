import { SpeechMember } from '../types';

export const INITIAL_MEMBERS: SpeechMember[] = [
  {
    id: 'diogo',
    name: 'Diogo',
    role: 'Apresentador 1',
    topic: 'Introdução & Problematização',
    avatarSeed: 'Diogo',
    speechText: `Olá! Nós somos o grupo formado por Diogo, Maria Vitória, Ana Carolina, Gabrielle Nazario, Kaio, Julia e Esther.

Nosso trabalho está relacionado à ODS 13, que trata da Ação Contra a Mudança Global do Clima.

Para nosso experimento, fizemos uma pergunta: a cor de uma superfície pode influenciar o quanto ela se aquece quando recebe luz do Sol?

Para investigar isso, utilizamos duas garrafas do mesmo tamanho: uma preta e uma transparente.`,
    clozeTemplate: `Olá! Nós somos o grupo formado por Diogo, Maria Vitória, Ana Carolina, Gabrielle Nazario, Kaio, Julia e Esther.

Nosso trabalho está relacionado à {{ODS 13}}, que trata da Ação Contra a Mudança Global do {{Clima}}.

Para nosso experimento, fizemos uma pergunta: a {{cor}} de uma superfície pode influenciar o quanto ela se {{aquece}} quando recebe luz do {{Sol}}?

Para investigar isso, utilizamos duas garrafas do mesmo tamanho: uma {{preta}} e uma {{transparente}}.`,
    clozeAnswers: ['ODS 13', 'Clima', 'cor', 'aquece', 'Sol', 'preta', 'transparente'],
    tips: [
      'Fale com entusiasmo e projete a voz para captar a atenção da banca.',
      'Apresente os nomes dos colegas com clareza.',
      'Destaque bem a pergunta-chave do experimento.'
    ],
    masteryLevel: 'none',
    practiceCount: 0
  },
  {
    id: 'maria-vitoria',
    name: 'Maria Vitória',
    role: 'Apresentadora 2',
    topic: 'Hipótese Científica',
    avatarSeed: 'Maria',
    speechText: `Nossa hipótese era que a garrafa preta apresentaria um aumento maior de temperatura, porque superfícies escuras tendem a absorver uma maior proporção da radiação solar.

Mas não queríamos apenas assumir que isso aconteceria. Por isso, fizemos medições para comparar os resultados e verificar nossa hipótese através de dados.`,
    clozeTemplate: `Nossa {{hipótese}} era que a garrafa {{preta}} apresentaria um aumento maior de {{temperatura}}, porque superfícies escuras tendem a {{absorver}} uma maior proporção da {{radiação solar}}.

Mas não queríamos apenas assumir que isso aconteceria. Por isso, fizemos {{medições}} para comparar os resultados e verificar nossa hipótese através de {{dados}}.`,
    clozeAnswers: ['hipótese', 'preta', 'temperatura', 'absorver', 'radiação solar', 'medições', 'dados'],
    tips: [
      'Enfatize a palavra "Hipótese" e a expressão "Radiação Solar".',
      'Explique que cientistas não apenas "acham", mas testam com dados.'
    ],
    masteryLevel: 'none',
    practiceCount: 0
  },
  {
    id: 'ana-carolina',
    name: 'Ana Carolina',
    role: 'Apresentadora 3',
    topic: 'Materiais & Controle Experimental',
    avatarSeed: 'Ana',
    speechText: `Para realizar o experimento, usamos duas garrafas iguais, a mesma quantidade de água, tinta preta, um termômetro e a luz do Sol.

Colocamos a mesma quantidade de água nas duas garrafas e medimos a temperatura inicial.

Depois, deixamos as duas no mesmo local e pelo mesmo período de tempo, tentando manter as condições iguais para que a principal diferença fosse a cor das garrafas.`,
    clozeTemplate: `Para realizar o experimento, usamos duas garrafas {{iguais}}, a mesma quantidade de {{água}}, tinta preta, um {{termômetro}} e a luz do {{Sol}}.

Colocamos a mesma quantidade de água nas duas garrafas e medimos a temperatura {{inicial}}.

Depois, deixamos as duas no mesmo local e pelo mesmo período de {{tempo}}, tentando manter as condições {{iguais}} para que a principal diferença fosse a {{cor}} das garrafas.`,
    clozeAnswers: ['iguais', 'água', 'termômetro', 'Sol', 'inicial', 'tempo', 'iguais', 'cor'],
    tips: [
      'Aponte para as garrafas físicas ou para o cartaz/tela neste momento.',
      'Destaque a importância do controle de variáveis (mesmo volume, mesmo local).'
    ],
    masteryLevel: 'none',
    practiceCount: 0
  },
  {
    id: 'gabrielle-nazario',
    name: 'Gabrielle Nazario',
    role: 'Apresentadora 4',
    topic: 'Coleta de Dados & Repetição',
    avatarSeed: 'Gabrielle',
    speechText: `Durante o experimento, medimos a temperatura da água em intervalos de tempo determinados e anotamos todos os resultados.

Também repetimos o experimento para termos mais dados e diminuir a influência de fatores externos, como vento ou mudanças na intensidade da luz solar.

Depois, organizamos todas as informações em uma tabela.`,
    clozeTemplate: `Durante o experimento, medimos a {{temperatura}} da água em intervalos de {{tempo}} determinados e anotamos todos os resultados.

Também {{repetimos}} o experimento para termos mais dados e diminuir a influência de fatores {{externos}}, como {{vento}} ou mudanças na intensidade da luz solar.

Depois, organizamos todas as informações em uma {{tabela}}.`,
    clozeAnswers: ['temperatura', 'tempo', 'repetimos', 'externos', 'vento', 'tabela'],
    tips: [
      'Mostre a tabela de dados no app ou no cartaz.',
      'Explique que repetir o experimento aumenta a confiabilidade científica.'
    ],
    masteryLevel: 'none',
    practiceCount: 0
  },
  {
    id: 'kaio',
    name: 'Kaio',
    role: 'Apresentador 5',
    topic: 'Matemática Aplicada & Fórmulas',
    avatarSeed: 'Kaio',
    speechText: `A matemática foi importante para transformar nossas observações em resultados que pudéssemos comparar.

Calculamos a variação de temperatura usando:

ΔT = temperatura final − temperatura inicial.

Também calculamos a média dos testes e fizemos um gráfico de temperatura por tempo.

Assim, conseguimos comparar matematicamente o aquecimento das duas garrafas.`,
    clozeTemplate: `A {{matemática}} foi importante para transformar nossas observações em {{resultados}} que pudéssemos comparar.

Calculamos a variação de temperatura usando:

{{ΔT}} = temperatura {{final}} − temperatura {{inicial}}.

Também calculamos a {{média}} dos testes e fizemos um {{gráfico}} de temperatura por tempo.

Assim, conseguimos comparar matematicamente o aquecimento das duas garrafas.`,
    clozeAnswers: ['matemática', 'resultados', 'ΔT', 'final', 'inicial', 'média', 'gráfico'],
    tips: [
      'Pronuncie claramente "Delta T: Variação de Temperatura".',
      'Mostre a fórmula matemática com confiança.'
    ],
    masteryLevel: 'none',
    practiceCount: 0
  },
  {
    id: 'esther',
    name: 'Esther',
    role: 'Apresentadora 6',
    topic: 'Análise dos Resultados Reais',
    avatarSeed: 'Esther',
    speechText: `Depois de analisar os dados, conseguimos verificar qual das duas garrafas apresentou maior aumento de temperatura.

Aqui podemos observar nossa tabela e nosso gráfico, que mostram como a temperatura mudou durante o experimento.

Os resultados são importantes porque não estamos apenas dizendo que uma garrafa aqueceu mais: estamos comprovando através de medições e cálculos o que aconteceu.`,
    clozeTemplate: `Depois de analisar os {{dados}}, conseguimos verificar qual das duas garrafas apresentou {{maior}} aumento de temperatura.

Aqui podemos observar nossa {{tabela}} e nosso {{gráfico}}, que mostram como a temperatura mudou durante o experimento.

Os resultados são importantes porque não estamos apenas dizendo que uma garrafa aqueceu mais: estamos {{comprovando}} através de {{medições}} e {{cálculos}} o que aconteceu.`,
    clozeAnswers: ['dados', 'maior', 'tabela', 'gráfico', 'comprovando', 'medições', 'cálculos'],
    tips: [
      'Cite os valores exatos de ΔT da garrafa preta e da transparente.',
      'Aponte as curvas no gráfico de Temperatura x Tempo.'
    ],
    masteryLevel: 'none',
    practiceCount: 0
  },
  {
    id: 'julia',
    name: 'Julia',
    role: 'Apresentadora 7',
    topic: 'Conexão ODS 13 & Conclusão',
    avatarSeed: 'Julia',
    speechText: `E como isso se relaciona com a ODS 13?

Nosso experimento não representa sozinho o aquecimento global. Ele demonstra um princípio relacionado à absorção da radiação solar e ao aquecimento das superfícies.

Esse fenômeno pode ser relacionado às cidades, que possuem diferentes superfícies, como asfalto, concreto, telhados e áreas com vegetação.

A ODS 13 busca combater as mudanças climáticas e aumentar nossa capacidade de lidar com seus impactos.

Portanto, através de um experimento simples, conseguimos juntar Ciências, Matemática e mudanças climáticas, mostrando como os dados científicos podem nos ajudar a entender melhor esses problemas.

Obrigado pela atenção!`,
    clozeTemplate: `E como isso se relaciona com a {{ODS 13}}?

Nosso experimento não representa sozinho o aquecimento global. Ele demonstra um princípio relacionado à {{absorção}} da radiação solar e ao aquecimento das {{superfícies}}.

Esse fenômeno pode ser relacionado às {{cidades}}, que possuem diferentes superfícies, como {{asfalto}}, concreto, telhados e áreas com {{vegetação}}.

A ODS 13 busca combater as {{mudanças climáticas}} e aumentar nossa capacidade de lidar com seus impactos.

Portanto, através de um experimento simples, conseguimos juntar Ciências, Matemática e mudanças climáticas, mostrando como os dados científicos podem nos ajudar a entender melhor esses problemas.

Obrigado pela atenção!`,
    clozeAnswers: ['ODS 13', 'absorção', 'superfícies', 'cidades', 'asfalto', 'vegetação', 'mudanças climáticas'],
    tips: [
      'Finalize com calma, postura firme e contato visual com os avaliadores.',
      'Enfatize a ligação entre o experimento de laboratório e a realidade urbana.'
    ],
    masteryLevel: 'none',
    practiceCount: 0
  }
];
