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
  train_no: z.string(),
  train_name: z.string(),
  exp_arrival: z.string(),
  exp_departure: z.string(),
  platform_no: z.string().nullable(),
  status: z.string(),
  delay: z.string(),
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
    const apiHost = process.env.RAPIDAPI_HOST || 'train-running-status-indian-railways.p.rapidapi.com';

    if (!apiKey) {
      throw new Error('RAPIDAPI_KEY environment variable is not set.');
    }
    
    const url = `https://${apiHost}/api/v1/getStationDetailsByCode?station_code=${stationCode}`;
    
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
      
      if (!result.data || !Array.isArray(result.data.trains_at_station)) {
        console.error("Unexpected API response format:", result);
        return { trains: [] };
      }

      const transformedTrains = result.data.trains_at_station.map((train: any) => ({
        train_no: train.train_no,
        train_name: train.train_name,
        exp_arrival: train.exp_arrival,
        exp_departure: train.exp_departure,
        platform_no: train.platform_no,
        status: train.isRunning ? 'Running' : 'Not Running',
        delay: train.delay,
      }));
      
      return { trains: transformedTrains };

    } catch (error) {
      console.error('Error fetching live station data:', error);
      throw error;
    }
  }
);
