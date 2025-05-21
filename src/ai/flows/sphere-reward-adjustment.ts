'use server';

/**
 * @fileOverview An AI agent for dynamically adjusting SPHERE rewards based on task demand and sphere performance.
 *
 * - adjustSphereReward - A function that handles the reward adjustment process.
 * - AdjustSphereRewardInput - The input type for the adjustSphereReward function.
 * - AdjustSphereRewardOutput - The return type for the adjustSphereReward function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustSphereRewardInputSchema = z.object({
  taskDemand: z
    .number()
    .describe(
      'The current demand for the task, represented as a number between 0 and 1.  1 means very high demand, 0 means very low demand.'
    ),
  spherePerformance: z
    .number()
    .describe(
      'The performance of the sphere, represented as a number between 0 and 1. 1 means very high performance, 0 means very low performance.'
    ),
  baseReward: z
    .number()
    .describe('The base SPHERE reward for the task before adjustments.'),
});
export type AdjustSphereRewardInput = z.infer<typeof AdjustSphereRewardInputSchema>;

const AdjustSphereRewardOutputSchema = z.object({
  adjustedReward: z
    .number()
    .describe(
      'The adjusted SPHERE reward for the task, after considering task demand and sphere performance.'
    ),
  reasoning: z
    .string()
    .describe(
      'The AI reasoning behind the reward adjustment, explaining how task demand and sphere performance influenced the final reward amount.'
    ),
});
export type AdjustSphereRewardOutput = z.infer<typeof AdjustSphereRewardOutputSchema>;

export async function adjustSphereReward(input: AdjustSphereRewardInput): Promise<AdjustSphereRewardOutput> {
  return adjustSphereRewardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustSphereRewardPrompt',
  input: {schema: AdjustSphereRewardInputSchema},
  output: {schema: AdjustSphereRewardOutputSchema},
  prompt: `You are an AI tasked with dynamically adjusting SPHERE rewards for tasks within a Web3 platform called SwarmSphere, based on task demand and sphere performance.

You will be given the task demand (a number between 0 and 1, where 1 is very high demand and 0 is very low demand), the sphere performance (a number between 0 and 1, where 1 is very high performance and 0 is very low performance), and the base reward for the task.

Your goal is to calculate an adjusted reward that incentivizes users to participate in high-value tasks and contribute to successful spheres.

Consider the following factors when adjusting the reward:

*   **Task Demand:** Higher task demand should generally lead to higher rewards to attract more participants.
*   **Sphere Performance:** Higher sphere performance should also lead to higher rewards, as it indicates a successful and valuable sphere.
*   **Base Reward:** The adjusted reward should be proportional to the base reward, but with adjustments based on task demand and sphere performance.

Output the adjusted reward and a brief explanation of your reasoning.

Task Demand: {{{taskDemand}}}
Sphere Performance: {{{spherePerformance}}}
Base Reward: {{{baseReward}}}
`,
});

const adjustSphereRewardFlow = ai.defineFlow(
  {
    name: 'adjustSphereRewardFlow',
    inputSchema: AdjustSphereRewardInputSchema,
    outputSchema: AdjustSphereRewardOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
