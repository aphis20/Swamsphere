// src/ai/flows/task-recommendation.ts
'use server';
/**
 * @fileOverview Task recommendation AI agent.
 *
 * - recommendTasks - A function that handles the task recommendation process.
 * - RecommendTasksInput - The input type for the recommendTasks function.
 * - RecommendTasksOutput - The return type for the recommendTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendTasksInputSchema = z.object({
  userSkills: z
    .array(z.string())
    .describe('A list of skills possessed by the user.'),
  userLocation: z
    .string()
    .describe('The current location of the user (e.g., city, country).'),
  deviceCapabilities: z
    .string()
    .describe('The capabilities of the user device (e.g., low-end smartphone, high-end desktop).'),
  availableTasks: z
    .array(z.string())
    .describe('A list of available tasks on the platform.'),
});
export type RecommendTasksInput = z.infer<typeof RecommendTasksInputSchema>;

const RecommendTasksOutputSchema = z.object({
  recommendedTasks: z
    .array(z.string())
    .describe('A list of tasks recommended for the user.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the task recommendations.'),
});
export type RecommendTasksOutput = z.infer<typeof RecommendTasksOutputSchema>;

export async function recommendTasks(input: RecommendTasksInput): Promise<RecommendTasksOutput> {
  return recommendTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendTasksPrompt',
  input: {schema: RecommendTasksInputSchema},
  output: {schema: RecommendTasksOutputSchema},
  prompt: `You are an AI task recommendation agent designed to provide personalized task recommendations to users based on their skills, location, and device capabilities.

  Given the following user information and available tasks, recommend the most suitable tasks for the user:

  User Skills: {{#if userSkills}}{{#each userSkills}}- {{{this}}}{{/each}}{{else}}No skills listed.{{/if}}
  User Location: {{{userLocation}}}
  Device Capabilities: {{{deviceCapabilities}}}
  Available Tasks: {{#if availableTasks}}{{#each availableTasks}}- {{{this}}}{{/each}}{{else}}No tasks available.{{/if}}

  Provide a list of recommended tasks and explain your reasoning for each recommendation.

  {{#if availableTasks}}
  Recommended Tasks:
  {{/if}}
  `, 
});

const recommendTasksFlow = ai.defineFlow(
  {
    name: 'recommendTasksFlow',
    inputSchema: RecommendTasksInputSchema,
    outputSchema: RecommendTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
