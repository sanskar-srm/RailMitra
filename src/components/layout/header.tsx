"use client";

import Link from 'next/link';
import { TrainFront } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-br from-[#0f172a]/50 to-[#134e4a]/50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <TrainFront className="h-7 w-7" />
          <span className="text-2xl font-bold">Railमित्र</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-sm font-medium text-gray-300 hover:text-accent transition-colors">Features</Link>
            <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-accent transition-colors">Dashboard</Link>
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-accent transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
