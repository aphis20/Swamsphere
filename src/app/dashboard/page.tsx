// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskRecommendationForm } from '@/components/tasks/TaskRecommendationForm';
import { LoadingPlaceholder } from '@/components/shared/LoadingPlaceholder';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { recommendTasks, RecommendTasksInput, RecommendTasksOutput } from '@/ai/flows/task-recommendation';
import { mockTasks, availableTasksForAI, mockUserProfile } from '@/lib/mockData'; // Using mockTasks for display
import type { Task } from '@/types';
import { useHasMounted } from '@/hooks/useHydration';


export default function DashboardPage() {
  const [recommendedTasks, setRecommendedTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasMounted = useHasMounted();

  // Initial load with some mock tasks, or could be empty until form submission
  useEffect(() => {
    if(hasMounted) { // Only run on client after mount
        // Simulate initial recommendations or show a default set
        setRecommendedTasks(mockTasks.slice(0,2)); // Show a few mock tasks initially
    }
  }, [hasMounted]);

  const handleRecommendations = async (userInput: Omit<RecommendTasksInput, 'availableTasks'>) => {
    setIsLoading(true);
    setError(null);
    setRecommendedTasks([]); 
    try {
      const aiInput: RecommendTasksInput = {
        ...userInput,
        availableTasks: availableTasksForAI, 
      };
      const result: RecommendTasksOutput = await recommendTasks(aiInput);
      
      // This is a simplified mapping. In a real app, you'd fetch task details based on IDs/titles.
      // For now, filter mockTasks based on titles returned by AI.
      const matchedTasks = mockTasks.filter(task => 
        result.recommendedTasks.some(recTaskTitle => task.title.toLowerCase().includes(recTaskTitle.toLowerCase()) || recTaskTitle.toLowerCase().includes(task.title.toLowerCase()))
      );
      
      if (matchedTasks.length > 0) {
        setRecommendedTasks(matchedTasks);
      } else if (result.recommendedTasks.length > 0) {
        // If AI recommended tasks but we couldn't match, show AI's text as a fallback
        // This indicates a mismatch between AI output and available structured tasks
         setRecommendedTasks(result.recommendedTasks.map((title, index) => ({
          id: `ai-rec-${index}`,
          title: title,
          description: result.reasoning || "AI recommended task based on your profile.",
          reward: Math.floor(Math.random() * 20) + 5, // Random reward
          type: "AI Computation", // Default type
         })));
      } else {
        setRecommendedTasks([]);
         setError("No specific tasks matched your profile based on current AI analysis, but explore general tasks below!");
         setRecommendedTasks(mockTasks.slice(0,3)); // Show some general tasks
      }

    } catch (e) {
      console.error(e);
      setError('Failed to fetch recommendations. Please try again.');
      setRecommendedTasks(mockTasks.slice(0,3)); // Show some general tasks on error
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!hasMounted) {
    return <LoadingPlaceholder text="Initializing Dashboard..." />;
  }

  return (
    <>
      <PageHeader
        title="Task Dashboard"
        description="Discover tasks tailored to your skills and preferences, powered by AI."
      />

      <TaskRecommendationForm 
        onSubmit={handleRecommendations} 
        isLoading={isLoading}
        defaultValues={{
          userSkills: mockUserProfile.skills.join(', '),
          userLocation: mockUserProfile.location,
          deviceCapabilities: mockUserProfile.deviceCapabilities
        }}
      />

      {error && (
        <Alert variant="destructive" className="mb-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && <LoadingPlaceholder text="Fetching recommendations..." />}

      {!isLoading && recommendedTasks.length === 0 && !error && (
        <Alert className="mb-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>No Recommendations Yet</AlertTitle>
          <AlertDescription>
            Fill out the form above to get personalized task recommendations or explore general tasks.
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && recommendedTasks.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Recommended For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </>
      )}

      {!isLoading && (mockTasks.length > 0 && recommendedTasks.length === 0 || error) && (
         <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Explore All Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
      )}
    </>
  );
}
