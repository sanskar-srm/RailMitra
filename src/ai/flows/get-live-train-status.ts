'use server';

/**
 * @fileOverview This file implements the Genkit flow for fetching live train status from an external API.
 *
 * - getLiveTrainStatus - A function that takes a train number and returns live train data.
 * - GetLiveTrainStatusInput - The input type for the getLiveTrainStatus function.
 * - GetLiveTrainStatusOutput - The return type for the getLiveTrainStatus function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetLiveTrainStatusInputSchema = z.object({
  trainNumber: z.string().describe('The train number (e.g., 12345) to get live status for.'),
});
export type GetLiveTrainStatusInput = z.infer<typeof GetLiveTrainStatusInputSchema>;

const GetLiveTrainStatusOutputSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.any(),
});
export type GetLiveTrainStatusOutput = z.infer<typeof GetLiveTrainStatusOutputSchema>;

export async function getLiveTrainStatus(input: GetLiveTrainStatusInput): Promise<GetLiveTrainStatusOutput> {
  return getLiveTrainStatusFlow(input);
}

const getLiveTrainStatusFlow = ai.defineFlow(
  {
    name: 'getLiveTrainStatusFlow',
    inputSchema: GetLiveTrainStatusInputSchema,
    outputSchema: GetLiveTrainStatusOutputSchema,
  },
  async ({ trainNumber }) => {
    const apiKey = process.env.RAPIDAPI_KEY;
    const apiHost = process.env.RAPIDAPI_HOST || 'train-running-status-indian-railways.p.rapidapi.com';

    if (!apiKey) {
      throw new Error('RAPIDAPI_KEY environment variable is not set.');
    }
    
    const url = `https://${apiHost}/trainman/${trainNumber}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      
      if (!result.data) {
        console.error("Unexpected API response format:", result);
        throw new Error("Unexpected API response format");
      }
      
      return result;

    } catch (error) {
      console.error('Error fetching live train status:', error);
      throw error;
    }
  }
);
