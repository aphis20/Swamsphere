// src/components/layout/AppLayout.tsx
import type { ReactNode } from 'react';
import { BottomNavbar } from './BottomNavbar';
import Link from 'next/link';
import { Zap } from 'lucide-react'; // Using Zap as a placeholder for SwarmSphere logo icon

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block text-foreground">
              SwarmSphere
            </span>
          </Link>
          {/* Desktop Navigation (placeholder, can be expanded) */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
             <Link href="/dashboard" className="text-foreground/60 transition-colors hover:text-foreground/80">Tasks</Link>
             <Link href="/quests" className="text-foreground/60 transition-colors hover:text-foreground/80">Quests</Link>
             <Link href="/spheres" className="text-foreground/60 transition-colors hover:text-foreground/80">Spheres</Link>
             <Link href="/profile" className="text-foreground/60 transition-colors hover:text-foreground/80">Profile</Link>
             <Link href="/ar" className="text-foreground/60 transition-colors hover:text-foreground/80">AR View</Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8 pb-20 md:pb-8 max-w-4xl">
        {children}
      </main>
      
      <BottomNavbar />
    </div>
  );
}
