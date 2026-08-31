# ☀️ CLIMA LAB — ODS 13 🌡️ 🌎
> **“A cor de uma superfície influencia seu aquecimento quando exposta à luz solar?”**  
> *Experimente. Meça. Calcule. Entenda.*

Plataforma educacional interativa desenvolvida para apoiar o grupo de estudantes na **Feira de Ciências**, investigando a relação física entre a absorção de radiação solar em superfícies de diferentes cores e o combate às mudanças climáticas no âmbito da **ODS 13 da ONU**.

---

## 👥 Equipe de Estudantes
- **Diogo** — *Introdução & Problematização*
- **Maria Vitória** — *Hipótese Científica*
- **Ana Carolina** — *Materiais & Controle Experimental*
- **Gabrielle Nazario** — *Coleta dos Dados & Repetição*
- **Kaio** — *Matemática & Fórmulas ($\Delta T$, médias)*
- **Esther** — *Resultados & Análise Quantitativa*
- **Julia** — *Conexão ODS 13 & Conclusão*

---

## 🚀 Funcionalidades Principais

1. **Dashboard Inicial**: Visão geral do experimento com cards das garrafas, status dos dados reais, workflow científico e widget de prontidão do grupo.
2. **Experimento Interativo**: Visualização animada com emissão de radiação solar, termômetros em tempo real e controle de velocidade.
3. **Simulador Paramétrico**: Laboratório virtual para variar temperatura inicial, radiação, coeficientes de aquecimento e vento.
4. **Gerenciador de Dados Reais**: Tabela reativa com edição em tempo real, exclusão, filtros e persistência local (`localStorage`).
5. **Gráficos Dinâmicos**: Curva vetorial interativa de Temperatura × Tempo, Comparativo de $\Delta T$ e Taxas de Aquecimento ($^\circ\text{C}/\text{min}$).
6. **Calculadoras Matemáticas Didáticas**: Fórmulas explicadas passo a passo com demonstração de substituição ($\Delta T$, Média Aritmética e Diferença Percentual).
7. **Módulo ODS 13 & Ilhas de Calor**: Comparador de cenários urbanos (asfalto escuro vs telhados frios/vegetação) e aviso de rigor científico.
8. **Treinador de Falas (7 Alunos)**: Modos leitura com síntese de voz (Web Speech API), teste de memória com lacunas interativas e cronômetro de ensaio.
9. **Modo Apresentação (Slides)**: 7 slides em alta visibilidade e resolução para exibição em estande e banca avaliadora.
10. **Checklist & Relatório A4**: Lista de verificação em 4 categorias e gerador de relatório técnico pronto para impressão.

---

## 🛠️ Tecnologias Utilizadas

- **React 18 + TypeScript**
- **Tailwind CSS** (Design System com Glassmorphism & Paleta Científica)
- **Vite** (Build ultrarrápido)
- **Lucide Icons**
- **Canvas Confetti**
- **Web Audio API** (Efeitos sonoros discretos sintetizados nativamente)
- **Web Speech API** (Treinamento auditivo de falas em português)
- **LocalStorage** (Persistência completa offline sem necessidade de backend)

---

## 📦 Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/OriginalBR/climalab.git
   cd climalab
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra no navegador:**
   `http://localhost:3000/`

5. **Para gerar a versão de produção:**
   ```bash
   npm run build
   ```

---

## 📜 Licença
Projeto educacional desenvolvido para a Feira de Ciências — Alinhado aos Objetivos de Desenvolvimento Sustentável (ODS 13) da ONU.
