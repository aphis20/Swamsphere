// src/components/spheres/SphereCard.tsx
import type { Sphere } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Users, Target, Settings, DollarSign } from 'lucide-react';

interface SphereCardProps {
  sphere: Sphere;
}

export function SphereCard({ sphere }: SphereCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {sphere.imageUrl && (
        <div className="relative h-40 w-full">
          <Image 
            src={sphere.imageUrl} 
            alt={sphere.name} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={sphere.dataAiHint || "sphere image"}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{sphere.name}</CardTitle>
        <CardDescription className="h-12 overflow-hidden text-ellipsis">{sphere.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center"><Users className="w-4 h-4 mr-1" />Members</span>
            <Badge variant="secondary">{sphere.memberCount}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center"><Target className="w-4 h-4 mr-1" />Active Tasks</span>
            <Badge variant="outline">{sphere.customTasks.length}</Badge>
          </div>
           {sphere.totalStaked !== undefined && (
            <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center"><DollarSign className="w-4 h-4 mr-1" />Swarm Bonds</span>
                <Badge variant="outline">{sphere.totalStaked} SPHERE</Badge>
            </div>
           )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="default">
          View Sphere
        </Button>
      </CardFooter>
    </Card>
  );
}
