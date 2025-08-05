'use server';

export async function getLiveTrainStatus({ trainNumber }: { trainNumber: string }) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey) {
    return { error: 'RAPIDAPI_KEY environment variable is not set.' };
  }
  if (!apiHost) {
    return { error: 'RAPIDAPI_HOST environment variable is not set.' };
  }
  
  // Using startDay=1 as a default, can be parameterized later if needed.
  const url = `https://${apiHost}/api/v1/liveTrainStatus?trainNo=${trainNumber}&startDay=1`;
  
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
      return { error: `API request failed with status ${response.status}: ${errorText}` };
    }
    
    const result = await response.json();
    
    if (!result.status || !result.data) {
      console.error("Unexpected API response format:", result);
      return { error: result.message || "Unexpected API response format" };
    }
    
    return { data: result.data };

  } catch (error: any) {
    console.error('Error fetching live train status:', error);
    return { error: error.message || 'An unknown error occurred.' };
  }
}
