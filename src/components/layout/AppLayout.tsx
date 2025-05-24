// src/components/layout/AppLayout.tsx
"use client";

import type { ReactNode } from 'react';
import { BottomNavbar } from './BottomNavbar';
import Link from 'next/link';
import { Zap, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useAuthStatus } from '@/hooks/useAuthStatus'; // Import useAuthStatus
import { LoadingPlaceholder } from '@/components/shared/LoadingPlaceholder';

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuthStatus(); // Use the auth status hook

  const isAuthPage = pathname === '/auth';

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
      // AuthProvider will handle redirecting to /auth, or router.push('/auth') can be explicit.
      router.push('/auth'); 
    } catch (error) {
      console.error("Sign out error:", error);
      toast({ title: "Sign Out Failed", description: "Could not sign you out. Please try again.", variant: "destructive" });
    }
  };

  if (isAuthPage) {
    // Render children directly without AppLayout structure for auth page
    // AuthProvider wraps this, so children here is effectively the <AuthPage />
    return <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">{children}</main>;
  }
  
  // This loading state is for the AppLayout itself, AuthProvider handles initial app load.
  if (authLoading) {
      return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <LoadingPlaceholder text="Loading SwarmSphere..." />
        </div>
      );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href={user ? "/dashboard" : "/auth"} className="mr-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block text-foreground">
              SwarmSphere
            </span>
          </Link>
          <nav className="hidden md:flex flex-1 items-center justify-end gap-6 text-sm font-medium">
             <Link href="/dashboard" className="text-foreground/60 transition-colors hover:text-foreground/80">Tasks</Link>
             <Link href="/quests" className="text-foreground/60 transition-colors hover:text-foreground/80">Quests</Link>
             <Link href="/spheres" className="text-foreground/60 transition-colors hover:text-foreground/80">Spheres</Link>
             <Link href="/profile" className="text-foreground/60 transition-colors hover:text-foreground/80">Profile</Link>
             <Link href="/ar" className="text-foreground/60 transition-colors hover:text-foreground/80">AR View</Link>
             
             {user ? (
                <Button onClick={handleSignOut} variant="outline" size="sm">
                    <LogOut />
                    Sign Out
                </Button>
             ) : (
                <Button asChild variant="outline" size="sm">
                  <Link href="/auth" className="flex items-center">
                    <LogIn />
                    Authenticate
                  </Link>
                </Button>
             )}
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8 pb-20 md:pb-8 max-w-4xl">
        {children}
      </main>
      
      {!isAuthPage && <BottomNavbar />} {/* Conditionally render BottomNavbar */}
    </div>
  );
}
