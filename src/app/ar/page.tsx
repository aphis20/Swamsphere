// src/app/ar/page.tsx
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ScanLine, Map } from 'lucide-react';

export default function ARPage() {
  return (
    <>
      <PageHeader
        title="AR Visualizations"
        description="Experience SwarmSphere in Augmented Reality. Visualize tasks, quests, and spheres in your environment."
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ScanLine className="w-6 h-6 mr-2 text-primary" />
            Augmented Reality Interface
          </CardTitle>
          <CardDescription>
            This section will integrate ARKit/ARCore for immersive visualizations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center items-center p-8 bg-muted rounded-lg">
            <Image 
              src="https://placehold.co/400x300.png" 
              alt="AR Placeholder" 
              width={400} 
              height={300} 
              className="rounded-md shadow-md"
              data-ai-hint="augmented reality interface" 
            />
          </div>
          <p className="text-muted-foreground">
            Imagine seeing task progress as 3D "pheromone trails" guiding you to objectives, or viewing sphere activity maps overlaid on your real-world surroundings.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Scan your environment to discover and join nearby quests.</li>
            <li>Visualize data contributions in DeSci projects.</li>
            <li>Explore sphere territories and member activity in AR.</li>
          </ul>
          <div className="flex items-center p-4 border border-dashed rounded-lg">
            <Map className="w-10 h-10 mr-4 text-accent" />
            <div>
                <h4 className="font-semibold text-foreground">Coming Soon!</h4>
                <p className="text-sm text-muted-foreground">Our team is actively developing AR features to enhance your SwarmSphere experience. Stay tuned for updates!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
