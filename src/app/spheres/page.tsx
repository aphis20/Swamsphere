// src/app/spheres/page.tsx
"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SphereCard } from '@/components/spheres/SphereCard';
import { CreateSphereDialog } from '@/components/spheres/CreateSphereDialog';
import { mockSpheres } from '@/lib/mockData';
import type { Sphere } from '@/types';
import { useHasMounted } from '@/hooks/useHydration';
import { LoadingPlaceholder } from '@/components/shared/LoadingPlaceholder';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Gem } from "lucide-react";

export default function SpheresPage() {
  const [spheres, setSpheres] = useState<Sphere[]>(mockSpheres); // Initialize with mock data
  const hasMounted = useHasMounted();

  const handleSphereCreated = (newSphereData: { name: string; description: string; rules?: string }) => {
    const newSphere: Sphere = {
      id: `sphere-${Date.now()}`, // Simple unique ID
      name: newSphereData.name,
      description: newSphereData.description,
      imageUrl: 'https://placehold.co/300x200.png',
      dataAiHint: 'abstract community',
      memberCount: 1, // Creator is the first member
      customTasks: [],
      rules: newSphereData.rules ? newSphereData.rules.split(',').map(r => r.trim()) : [],
    };
    setSpheres(prevSpheres => [newSphere, ...prevSpheres]);
  };
  
  if (!hasMounted) {
    return <LoadingPlaceholder text="Loading Spheres..." />;
  }

  return (
    <>
      <PageHeader
        title="Community Spheres"
        description="Join or create self-evolving communities (Spheres) with custom tasks and DAO-governed rules."
        actions={<CreateSphereDialog onSphereCreated={handleSphereCreated} />}
      />

      <Alert className="mb-6 bg-accent/30 border-accent/50">
        <Gem className="h-4 w-4 text-accent-foreground" />
        <AlertTitle className="text-accent-foreground font-semibold">Shape Your Ecosystem!</AlertTitle>
        <AlertDescription className="text-accent-foreground/80">
          Spheres are dynamic DAOs. Participate in governance, propose tasks, and help your sphere thrive.
          Compete in "Swarm Wars" events for bonus SPHERE rewards!
        </AlertDescription>
      </Alert>

      {spheres.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spheres.map((sphere) => (
            <SphereCard key={sphere.id} sphere={sphere} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-8">No spheres available yet. Be the first to create one!</p>
      )}
    </>
  );
}
