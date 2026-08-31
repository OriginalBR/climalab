import React from 'react';
import { ExperimentProvider, useExperiment } from './context/ExperimentContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { Footer } from './components/layout/Footer';
import { GlossaryModal } from './components/layout/GlossaryModal';
import { PrintableReportModal } from './components/report/PrintableReportModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ExperimentPage } from './pages/ExperimentPage';
import { SimulationPage } from './pages/SimulationPage';
import { DataPage } from './pages/DataPage';
import { ChartsPage } from './pages/ChartsPage';
import { MathPage } from './pages/MathPage';
import { Ods13Page } from './pages/Ods13Page';
import { SpeechesPage } from './pages/SpeechesPage';
import { PresentationPage } from './pages/PresentationPage';
import { ChecklistPage } from './pages/ChecklistPage';

const MainContent: React.FC = () => {
  const { activePage } = useExperiment();

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <HomePage />;
      case 'experiment':
        return <ExperimentPage />;
      case 'simulation':
        return <SimulationPage />;
      case 'data':
        return <DataPage />;
      case 'charts':
        return <ChartsPage />;
      case 'math':
        return <MathPage />;
      case 'ods13':
        return <Ods13Page />;
      case 'speeches':
        return <SpeechesPage />;
      case 'presentation':
        return <PresentationPage />;
      case 'checklist':
        return <ChecklistPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-hidden pb-24 md:pb-8">
          {renderActivePage()}
        </main>
      </div>

      {/* Mobile Floating Bar & Drawer */}
      <MobileNavigation />

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <GlossaryModal />
      <PrintableReportModal />
    </div>
  );
};

export function App() {
  return (
    <ExperimentProvider>
      <MainContent />
    </ExperimentProvider>
  );
}

export default App;
