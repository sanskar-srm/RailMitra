'use server';

/**
 * @fileOverview This file implements the Genkit flow for fetching live station status from an external API.
 *
 * - getLiveStationStatus - A function that takes a station code and returns live train data.
 * - GetLiveStationStatusInput - The input type for the getLiveStationStatus function.
 * - GetLiveStationStatusOutput - The return type for the getLiveStationStatus function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetLiveStationStatusInputSchema = z.object({
  stationCode: z.string().describe('The station code (e.g., NDLS) to get live status for.'),
  hours: z.number().optional().default(4).describe('The window in hours to get data for.'),
});
export type GetLiveStationStatusInput = z.infer<typeof GetLiveStationStatusInputSchema>;

const TrainDataSchema = z.object({
  TrainNo: z.string(),
  TrainName: z.string(),
  SchArrTime: z.string(),
  SchDepTime: z.string(),
  ActArrTime: z.string(),
  ActDepTime: z.string(),
  DelayInArrival: z.string(),
  DelayInDeparture: z.string(),
  Platform: z.number().nullable(),
  Status: z.string(),
});

const GetLiveStationStatusOutputSchema = z.object({
  trains: z.array(TrainDataSchema),
});
export type GetLiveStationStatusOutput = z.infer<typeof GetLiveStationStatusOutputSchema>;

export async function getLiveStationStatus(input: GetLiveStationStatusInput): Promise<GetLiveStationStatusOutput> {
  return getLiveStationStatusFlow(input);
}

const getLiveStationStatusFlow = ai.defineFlow(
  {
    name: 'getLiveStationStatusFlow',
    inputSchema: GetLiveStationStatusInputSchema,
    outputSchema: GetLiveStationStatusOutputSchema,
  },
  async ({ stationCode, hours }) => {
    const apiKey = process.env.RAPIDAPI_KEY;
    const apiHost = process.env.RAPIDAPI_HOST || 'irctc1.p.rapidapi.com';

    if (!apiKey) {
      throw new Error('RAPIDAPI_KEY environment variable is not set.');
    }
    
    // As per the API documentation, `fromStationCode` is used.
    const url = `https://${apiHost}/api/v3/getLiveStation?fromStationCode=${stationCode}&hours=${hours}`;
    
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
      
      if (!result.data || !Array.isArray(result.data.trains)) {
        console.error("Unexpected API response format:", result);
        return { trains: [] };
      }
      
      return { trains: result.data.trains };

    } catch (error) {
      console.error('Error fetching live station data:', error);
      throw error;
    }
  }
);
