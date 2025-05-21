// src/components/tasks/TaskCard.tsx
import type { Task } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Zap, Tag, TestTubeDiagonal, Cpu, FileText } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

const TaskTypeIcon = ({ type }: { type: Task['type'] }) => {
  switch (type) {
    case 'Data Annotation': return <Tag className="w-4 h-4 mr-2" />;
    case 'App Testing': return <TestTubeDiagonal className="w-4 h-4 mr-2" />;
    case 'AI Computation': return <Cpu className="w-4 h-4 mr-2" />;
    case 'Survey': return <FileText className="w-4 h-4 mr-2" />;
    case 'RWA Verification': return <Zap className="w-4 h-4 mr-2" />; // Placeholder, using Zap
    case 'DeSci Data Collection': return <Zap className="w-4 h-4 mr-2" />; // Placeholder
    default: return <Zap className="w-4 h-4 mr-2" />;
  }
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {task.imageUrl && (
        <div className="relative h-48 w-full">
          <Image 
            src={task.imageUrl} 
            alt={task.title} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={task.dataAiHint || "task image"}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{task.title}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          <TaskTypeIcon type={task.type} />
          {task.type}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 h-20 overflow-hidden text-ellipsis">
          {task.description}
        </p>
        {task.requiredSkills && task.requiredSkills.length > 0 && (
          <div className="mb-3">
            <h4 className="text-xs font-semibold mb-1 text-foreground">Required Skills:</h4>
            <div className="flex flex-wrap gap-1">
              {task.requiredSkills.map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="font-semibold text-lg text-primary">
          {task.reward} <span className="text-xs text-muted-foreground">SPHERE</span>
        </div>
        <Button size="sm" variant="default">
          Start Task
        </Button>
      </CardFooter>
    </Card>
  );
}
