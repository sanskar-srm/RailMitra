
'use server';

export async function getLiveStationStatus({ stationCode }: { stationCode: string }) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey) {
    return { error: 'RAPIDAPI_KEY environment variable is not set.' };
  }
  if (!apiHost) {
    return { error: 'RAPIDAPI_HOST environment variable is not set.' };
  }
  
  const url = `https://${apiHost}/api/v2/getStationDetailsByCode?station_code=${stationCode}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    });

    if (!response.ok) {
       if (response.status === 429) {
        return { error: 'You have exceeded the monthly API quota. Please check your RapidAPI plan.' };
      }
      const errorText = await response.text();
      console.error("API Error:", errorText);
      return { error: `API request failed with status ${response.status}: ${errorText}` };
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
      delay: train.delay,
    }));
    
    return { trains: transformedTrains };

  } catch (error: any) {
    console.error('Error fetching live station data:', error);
    return { error: error.message || 'An unknown error occurred.' };
  }
}
