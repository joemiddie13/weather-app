const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeatherByZip(zipCode, units = 'imperial') {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?zip=${zipCode},us&units=${units}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}