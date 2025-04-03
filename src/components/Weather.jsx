import React, { useState } from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  CircularProgress, 
  Alert,
  useTheme 
} from '@mui/material';
import WeatherSearch from './WeatherSearch';
import WeatherDisplay from './WeatherDisplay';
import { fetchWeatherByZip } from '../utils/api';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState('imperial');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  
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
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Box 
          sx={{ 
            my: 4,
            perspective: '1000px'
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.grey[800],
              textShadow: '3px 3px 6px rgba(255,255,255,0.8)',
              mb: 5,
              transform: 'perspective(1000px) rotateX(5deg)',
              paddingBottom: '10px',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '10%',
                width: '80%',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, rgba(66, 133, 244, 0.8), transparent)',
                borderRadius: '2px'
              }
            }}
          >
            Weather App
          </Typography>
          
          <WeatherSearch onSearch={handleSearch} />
          
          {loading && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 4 
              }}
            >
              <CircularProgress 
                size={60}
                thickness={5}
                sx={{
                  color: theme.palette.primary.main,
                  boxShadow: '0 0 15px rgba(66, 133, 244, 0.5)'
                }}
              />
            </Box>
          )}
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: 3,
                borderRadius: '12px',
                boxShadow: '8px 8px 16px #b8bdc5, -8px -8px 16px #ffffff',
              }}
            >
              {error}
            </Alert>
          )}
          
          {weatherData && !loading && !error && (
            <WeatherDisplay data={weatherData} units={units} />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Weather;