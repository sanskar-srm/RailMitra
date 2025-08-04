"use client";

import { useState } from 'react';
import LiveTrainStatus from '@/components/features/live-train-status';
import PnrStatus from '@/components/features/pnr-status';
import LiveStation from '@/components/features/live-station';
import TrainAlerts from '@/components/features/train-alerts';
import Dashboard from '@/components/features/dashboard';
import Header from '@/components/layout/header';

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />;
      case 'live-status':
        return <LiveTrainStatus />;
      case 'pnr-status':
        return <PnrStatus />;
      case 'live-station':
        return <LiveStation />;
      case 'alerts':
        return <TrainAlerts />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-grow pt-16">
        <div className="container mx-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
