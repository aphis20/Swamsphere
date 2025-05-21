'use server';
/**
 * @fileOverview This file defines a Genkit flow for selecting a leader for a swarm quest based on Swarm Points.
 *
 * - selectSwarmQuestLeader - A function that selects a leader for a swarm quest.
 * - SelectSwarmQuestLeaderInput - The input type for the selectSwarmQuestLeader function.
 * - SelectSwarmQuestLeaderOutput - The return type for the selectSwarmQuestLeader function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelectSwarmQuestLeaderInputSchema = z.object({
  candidateUserAddresses: z.array(
    z.string().describe('The address of a candidate user for the swarm quest leader role.')
  ).describe('An array of candidate user addresses.'),
  swarmPoints: z.record(
    z.string(),
    z.number().describe('The number of swarm points a user has.')
  ).describe('A map of user addresses to their swarm points.'),
  questDescription: z.string().describe('A description of the swarm quest.'),
});
export type SelectSwarmQuestLeaderInput = z.infer<typeof SelectSwarmQuestLeaderInputSchema>;

const SelectSwarmQuestLeaderOutputSchema = z.object({
  leaderAddress: z.string().describe('The address of the selected leader.'),
  reasoning: z.string().describe('The AI reasoning for selecting the leader.'),
});
export type SelectSwarmQuestLeaderOutput = z.infer<typeof SelectSwarmQuestLeaderOutputSchema>;

export async function selectSwarmQuestLeader(input: SelectSwarmQuestLeaderInput): Promise<SelectSwarmQuestLeaderOutput> {
  return selectSwarmQuestLeaderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selectSwarmQuestLeaderPrompt',
  input: {schema: SelectSwarmQuestLeaderInputSchema},
  output: {schema: SelectSwarmQuestLeaderOutputSchema},
  prompt: `You are an AI assistant that selects a leader for a swarm quest.

You are provided with a list of candidate user addresses, their swarm points, and a description of the swarm quest.

You must select the best leader based on the following criteria:

*   The user with the most swarm points should be preferred.
*   The user should be suitable for the quest, according to the quest description.

Candidate User Addresses: {{candidateUserAddresses}}
Swarm Points: {{swarmPoints}}
Quest Description: {{questDescription}}

Based on this information, select a leader and explain your reasoning.

Output the leader address and your reasoning in JSON format.`,
});

const selectSwarmQuestLeaderFlow = ai.defineFlow(
  {
    name: 'selectSwarmQuestLeaderFlow',
    inputSchema: SelectSwarmQuestLeaderInputSchema,
    outputSchema: SelectSwarmQuestLeaderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
