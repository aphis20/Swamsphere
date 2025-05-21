// src/components/layout/BottomNavbar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListChecks, Users, UserCircle, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Tasks', icon: Home },
  { href: '/quests', label: 'Quests', icon: ListChecks },
  { href: '/spheres', label: 'Spheres', icon: Users },
  { href: '/profile', label: 'Profile', icon: UserCircle },
  { href: '/ar', label: 'AR View', icon: ScanLine },
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border shadow-md md:hidden">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 ease-in-out',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className={cn('w-6 h-6 mb-0.5', isActive ? 'stroke-[2.5px]' : 'stroke-[2px]')} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
