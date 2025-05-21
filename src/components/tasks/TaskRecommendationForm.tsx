// src/components/tasks/TaskRecommendationForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription as ShadCNCardDescription } from "@/components/ui/card";
import type { RecommendTasksInput } from '@/ai/flows/task-recommendation';

const formSchema = z.object({
  userSkills: z.string().min(2, "Please enter at least one skill.").describe("Comma-separated list of user skills"),
  userLocation: z.string().min(2, "Please enter your location.").describe("User's current location"),
  deviceCapabilities: z.string().min(2, "Describe your device.").describe("User's device capabilities (e.g., low-end smartphone, high-end desktop)"),
});

type TaskRecommendationFormValues = z.infer<typeof formSchema>;

interface TaskRecommendationFormProps {
  onSubmit: (data: Omit<RecommendTasksInput, 'availableTasks'>) => void;
  isLoading: boolean;
  defaultValues?: Partial<TaskRecommendationFormValues>;
}

export function TaskRecommendationForm({ onSubmit, isLoading, defaultValues }: TaskRecommendationFormProps) {
  const form = useForm<TaskRecommendationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userSkills: defaultValues?.userSkills || "",
      userLocation: defaultValues?.userLocation || "",
      deviceCapabilities: defaultValues?.deviceCapabilities || "",
    },
  });

  function handleFormSubmit(data: TaskRecommendationFormValues) {
    onSubmit({
      userSkills: data.userSkills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0),
      userLocation: data.userLocation,
      deviceCapabilities: data.deviceCapabilities,
    });
  }

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle>Find Your Tasks</CardTitle>
        <ShadCNCardDescription>
          Tell us about yourself to get personalized task recommendations.
        </ShadCNCardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., data entry, translation, graphic design" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter skills separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Nairobi, Kenya" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceCapabilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Capabilities</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Low-end smartphone with 2G internet, High-performance laptop" {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe the device you'll use for tasks.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? "Finding Tasks..." : "Get Recommendations"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
