
"use client";

import Link from 'next/link';
import { TrainFront, LayoutDashboard, Ticket, Bot, Building2, AlertTriangle, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type HeaderProps = {
  activeView: string;
  setActiveView: (view: string) => void;
};

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'live-status', label: 'Live Train Status', icon: TrainFront },
  { id: 'pnr-status', label: 'PNR Status', icon: Ticket },
  { id: 'live-station', label: 'Live Station', icon: Building2 },
  { id: 'alerts', label: 'Train Alerts', icon: AlertTriangle },
  { id: 'ai-suggester', label: 'AI Route Suggestion', icon: Bot },
];

export default function Header({ activeView, setActiveView }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => handleNavClick('dashboard')}>
          <TrainFront className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Railocate</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                activeView === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 p-2 rounded-md text-base font-medium transition-colors hover:bg-accent ${
                      activeView === item.id ? 'text-primary bg-accent' : 'text-foreground'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
