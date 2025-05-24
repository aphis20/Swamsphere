// src/components/auth/AuthProvider.tsx
"use client";

import { type ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { LoadingPlaceholder } from '@/components/shared/LoadingPlaceholder';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, loading } = useAuthStatus();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait until auth status is resolved

    const isAuthPage = pathname === '/auth';

    if (!user && !isAuthPage) {
      router.push('/auth');
    } else if (user && isAuthPage) {
      router.push('/dashboard');
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return <LoadingPlaceholder text="Authenticating..." className="min-h-screen flex items-center justify-center" />;
  }

  // If conditions for redirect are met but router hasn't pushed yet,
  // prevent rendering children to avoid flicker.
  if (!loading) {
    const isAuthPage = pathname === '/auth';
    if (!user && !isAuthPage) {
      return <LoadingPlaceholder text="Redirecting to login..." className="min-h-screen flex items-center justify-center" />;
    }
    if (user && isAuthPage) {
      return <LoadingPlaceholder text="Redirecting to dashboard..." className="min-h-screen flex items-center justify-center" />;
    }
  }

  return <>{children}</>;
}
