"use client";

import { useState } from 'react';
import { Sidebar, SidebarProvider, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarInset } from '@/components/ui/sidebar';
import { LayoutDashboard, TrainFront, Ticket, Bot, Building2, AlertTriangle } from 'lucide-react';

import LiveTrainStatus from '@/components/features/live-train-status';
import PnrStatus from '@/components/features/pnr-status';
import AiRouteSuggestion from '@/components/features/ai-route-suggestion';
import LiveStation from '@/components/features/live-station';
import TrainAlerts from '@/components/features/train-alerts';
import Dashboard from '@/components/features/dashboard';

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
      case 'ai-suggester':
        return <AiRouteSuggestion />;
      case 'live-station':
        return <LiveStation />;
      case 'alerts':
        return <TrainAlerts />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="p-4">
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    <TrainFront className="text-primary" /> Railocate
                  </h1>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('dashboard')} isActive={activeView === 'dashboard'} tooltip="Dashboard">
                  <LayoutDashboard />
                  <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('live-status')} isActive={activeView === 'live-status'} tooltip="Live Train Status">
                  <TrainFront />
                  <span className="group-data-[collapsible=icon]:hidden">Live Train Status</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('pnr-status')} isActive={activeView === 'pnr-status'} tooltip="PNR Status">
                  <Ticket />
                  <span className="group-data-[collapsible=icon]:hidden">PNR Status</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('live-station')} isActive={activeView === 'live-station'} tooltip="Live Station">
                  <Building2 />
                  <span className="group-data-[collapsible=icon]:hidden">Live Station</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('alerts')} isActive={activeView === 'alerts'} tooltip="Train Alerts">
                  <AlertTriangle />
                  <span className="group-data-[collapsible=icon]:hidden">Train Alerts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView('ai-suggester')} isActive={activeView === 'ai-suggester'} tooltip="AI Route Suggestion">
                  <Bot />
                  <span className="group-data-[collapsible=icon]:hidden">AI Route Suggestion</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="p-4 md:p-8">
            {renderContent()}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
