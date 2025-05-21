// src/components/quests/QuestCard.tsx
import type { Quest } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Users, ShieldCheck, Award, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
}

export function QuestCard({ quest }: QuestCardProps) {
  const progress = quest.requiredUsers > 0 ? (quest.currentUsers / quest.requiredUsers) * 100 : 0;
  const isQuorumMet = progress >= quest.quorumPercentage;

  const StatusIcon = () => {
    switch(quest.status) {
      case 'Open': return <Clock className="w-4 h-4 mr-1 text-blue-500" />;
      case 'In Progress': return <Users className="w-4 h-4 mr-1 text-yellow-500" />;
      case 'Completed': return <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />;
      case 'Failed': return <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />;
      default: return <Clock className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {quest.imageUrl && (
        <div className="relative h-48 w-full">
          <Image 
            src={quest.imageUrl} 
            alt={quest.title} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={quest.dataAiHint || "quest image"}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{quest.title}</CardTitle>
        <CardDescription className="h-16 overflow-hidden text-ellipsis">{quest.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center"><StatusIcon />Status</span>
            <Badge variant={quest.status === 'Open' ? 'secondary' : quest.status === 'Completed' ? 'default' : 'outline'}>
              {quest.status}
            </Badge>
          </div>
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground flex items-center"><Users className="w-4 h-4 mr-1" />Participants</span>
              <span>{quest.currentUsers} / {quest.requiredUsers}</span>
            </div>
            <Progress value={progress} aria-label={`${progress}% participants`} className="h-2"/>
            <p className="text-xs text-muted-foreground mt-1">
              {isQuorumMet ? "Quorum met!" : `${quest.quorumPercentage}% quorum needed to start.`}
            </p>
          </div>
          {quest.leader && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center"><ShieldCheck className="w-4 h-4 mr-1" />Leader</span>
              <span className="font-medium">{quest.leader.name}</span>
            </div>
          )}
           <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center"><Award className="w-4 h-4 mr-1" />Reward</span>
            <span className="font-semibold text-primary">{quest.rewardPerUser} SPHERE / user</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="default" disabled={quest.status !== 'Open'}>
          {quest.status === 'Open' ? 'Join Quest' : quest.status === 'In Progress' ? 'View Progress' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  );
}
