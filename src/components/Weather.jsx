import React, { useState } from 'react';
import { Typography, Container, Box, CircularProgress, Alert } from '@mui/material';
import WeatherSearch from './WeatherSearch';
import WeatherDisplay from './WeatherDisplay';
import { fetchWeatherByZip } from '../utils/api';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState('imperial');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSearch = async (zipCode, selectedUnits) => {
    setLoading(true);
    setError(null);
    setUnits(selectedUnits);
    
    try {
      const data = await fetchWeatherByZip(zipCode, selectedUnits);
      
      // Check if the API returned an error
      if (data.cod !== 200) {
        throw new Error(data.message || 'Error fetching weather data');
      }
      
      setWeatherData(data);
      console.log('Weather data:', data); // For debugging
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Weather App
        </Typography>
        
        <WeatherSearch onSearch={handleSearch} />
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        
        {weatherData && !loading && !error && (
          <WeatherDisplay data={weatherData} units={units} />
        )}
      </Box>
    </Container>
  );
}

export default Weather;