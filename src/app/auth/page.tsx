// src/app/auth/page.tsx
"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { AuthForm } from '@/components/auth/AuthForm';
import { useHasMounted } from '@/hooks/useHydration';
import { LoadingPlaceholder } from '@/components/shared/LoadingPlaceholder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export default function AuthPage() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <LoadingPlaceholder text="Loading Authentication..." />;
  }

  return (
    <>
      <PageHeader
        title="Welcome to SwarmSphere"
        description="Sign in or create an account to join the swarm."
      />
      <div className="flex justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Authenticate</CardTitle>
            <CardDescription>Access your tasks, quests, and spheres.</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
