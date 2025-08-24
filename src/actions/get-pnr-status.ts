
'use server';

export async function getPnrStatus({ pnrNumber }: { pnrNumber: string }) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey) {
    return { error: 'RAPIDAPI_KEY environment variable is not set.' };
  }
  if (!apiHost) {
    return { error: 'RAPIDAPI_HOST environment variable is not set.' };
  }
  
  const url = `https://${apiHost}/api/v3/getPNRStatus?pnrNumber=${pnrNumber}`;
  
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
      return { error: `API request failed with status ${response.status}` };
    }
    
    const result = await response.json();
    
    if (!result.status || !result.data) {
      console.error("Unexpected API response format:", result);
      return { error: result.message || "Failed to fetch PNR data." };
    }
    
    return { data: result.data };

  } catch (error: any) {
    console.error('Error fetching PNR status:', error);
    return { error: error.message || 'An unknown error occurred.' };
  }
}
