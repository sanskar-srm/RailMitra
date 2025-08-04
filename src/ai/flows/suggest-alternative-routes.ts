'use server';

/**
 * @fileOverview This file implements the Genkit flow for suggesting alternative routes when a train is delayed or canceled.
 *
 * - suggestAlternativeRoutes - A function that takes train details and delay information as input and returns suggestions for alternative routes.
 * - SuggestAlternativeRoutesInput - The input type for the suggestAlternativeRoutes function.
 * - SuggestAlternativeRoutesOutput - The return type for the suggestAlternativeRoutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeRoutesInputSchema = z.object({
  trainNumber: z.string().describe('The train number of the delayed or canceled train.'),
  currentLocation: z.string().describe('The current location of the traveler.'),
  destination: z.string().describe('The final destination of the traveler.'),
  delayReason: z.string().describe('The reason for the delay or cancellation.'),
  delayInMinutes: z.number().describe('The delay in minutes, if applicable.'),
});
export type SuggestAlternativeRoutesInput = z.infer<typeof SuggestAlternativeRoutesInputSchema>;

const SuggestAlternativeRoutesOutputSchema = z.object({
  alternativeRoutes: z.array(
    z.object({
      routeDescription: z.string().describe('A description of the alternative route.'),
      estimatedArrivalTime: z.string().describe('The estimated arrival time at the destination using this route.'),
      travelTime: z.string().describe('The estimated travel time using this route.'),
      modeOfTransport: z.string().describe('The mode of transport for this route (e.g., bus, train, flight).'),
      cost: z.string().optional().describe('The cost of this route, if available.'),
    })
  ).describe('An array of alternative routes to reach the destination.'),
});
export type SuggestAlternativeRoutesOutput = z.infer<typeof SuggestAlternativeRoutesOutputSchema>;

export async function suggestAlternativeRoutes(input: SuggestAlternativeRoutesInput): Promise<SuggestAlternativeRoutesOutput> {
  return suggestAlternativeRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeRoutesPrompt',
  input: {schema: SuggestAlternativeRoutesInputSchema},
  output: {schema: SuggestAlternativeRoutesOutputSchema},
  prompt: `You are a helpful travel assistant specializing in suggesting alternative routes for travelers whose trains have been delayed or canceled in India.

  Given the following information about the traveler's situation, suggest alternative routes to reach their destination. Provide detailed and practical route options, including estimated travel time, mode of transport, and any associated costs.

  Train Number: {{{trainNumber}}}
  Current Location: {{{currentLocation}}}
  Destination: {{{destination}}}
  Delay Reason: {{{delayReason}}}
  Delay in Minutes: {{{delayInMinutes}}}

  Format your output as a JSON array of alternative routes, including a route description, estimated arrival time, travel time, mode of transport, and cost (if available).
  Make the route descriptions very detailed, including intermediate stations or cities for the traveler to navigate through.
  Provide at least three distinct viable alternative routes.
  `,
});

const suggestAlternativeRoutesFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeRoutesFlow',
    inputSchema: SuggestAlternativeRoutesInputSchema,
    outputSchema: SuggestAlternativeRoutesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
