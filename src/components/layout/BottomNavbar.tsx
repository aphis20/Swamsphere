// src/components/layout/BottomNavbar.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, ListChecks, Users, UserCircle, ScanLine, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useAuthStatus } from '@/hooks/useAuthStatus'; // Import useAuthStatus

const baseNavItems = [
  { href: '/dashboard', label: 'Tasks', icon: Home },
  { href: '/quests', label: 'Quests', icon: ListChecks },
  { href: '/spheres', label: 'Spheres', icon: Users },
  { href: '/profile', label: 'Profile', icon: UserCircle },
  { href: '/ar', label: 'AR View', icon: ScanLine },
];

export function BottomNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuthStatus();

  const handleSignOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await signOut(auth);
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
      router.push('/auth'); // Explicit redirect after sign out
    } catch (error) {
      console.error("Sign out error:", error);
      toast({ title: "Sign Out Failed", description: "Could not sign you out. Please try again.", variant: "destructive" });
    }
  };

  // AppLayout handles not rendering this component on /auth page,
  // so we don't need an explicit check for pathname === '/auth' here.

  if (authLoading) {
    return null; // Don't render navbar contents while auth is loading
  }

  let itemsToDisplay = [];
  if (user) {
    itemsToDisplay = [...baseNavItems, { href: '#signout', label: 'Sign Out', icon: LogOut, action: handleSignOut }];
  } else {
    itemsToDisplay = [{ href: '/auth', label: 'Auth', icon: LogIn }];
  }
  
  const finalNavItemsCount = itemsToDisplay.length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border shadow-md md:hidden">
      <div className={`flex justify-around items-center h-full max-w-md mx-auto`}>
        {itemsToDisplay.map((item) => {
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
          
          if (item.action) { // For the Sign Out button
            return (
              <button
                key={item.label}
                onClick={item.action}
                className={cn(
                  'flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 ease-in-out text-muted-foreground hover:text-foreground',
                  `w-[calc(100%/${finalNavItemsCount})]`
                )}
              >
                <item.icon className={cn('w-6 h-6 mb-0.5', 'stroke-[2px]')} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 ease-in-out',
                `w-[calc(100%/${finalNavItemsCount})]`, // Dynamic width
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
