// src/app/quests/page.tsx
"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { QuestCard } from '@/components/quests/QuestCard';
import { mockQuests } from '@/lib/mockData';
import { useHasMounted } from '@/hooks/useHydration';
import { LoadingPlaceholder } from '@/components/shared/LoadingPlaceholder';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";


export default function QuestsPage() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <LoadingPlaceholder text="Loading Quests..." />;
  }

  return (
    <>
      <PageHeader
        title="Swarm Quests"
        description="Collaborate on large-scale tasks, achieve quorums, and earn greater rewards as a team."
        actions={
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Quest
            </Button>
        }
      />
      
      <Alert className="mb-6 bg-accent/30 border-accent/50">
        <Info className="h-4 w-4 text-accent-foreground" />
        <AlertTitle className="text-accent-foreground font-semibold">Join the Swarm!</AlertTitle>
        <AlertDescription className="text-accent-foreground/80">
          Swarm Quests require a minimum number of participants (quorum) to start. Your participation is key!
          Leaders are selected based on Swarm Points and guide the quest, earning bonus rewards.
        </AlertDescription>
      </Alert>

      {mockQuests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {mockQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No active quests at the moment. Check back soon!</p>
      )}
    </>
  );
}
