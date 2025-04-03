import React, { useState } from 'react';
import { Typography, Container, Box, Paper } from '@mui/material';
import WeatherSearch from './WeatherSearch';

function Weather() {
  const [searchParams, setSearchParams] = useState(null);
  
  const handleSearch = (zipCode, units) => {
    setSearchParams({ zipCode, units });
    // We'll add API call in the next step
    console.log(`Searching for weather in ${zipCode} with units: ${units}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Weather App
        </Typography>
        
        <WeatherSearch onSearch={handleSearch} />
        
        {searchParams && (
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6">
              Search Parameters (Debug Info):
            </Typography>
            <Typography variant="body1">
              Zip Code: {searchParams.zipCode}
            </Typography>
            <Typography variant="body1">
              Units: {searchParams.units === 'imperial' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default Weather;