import React from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Grid, 
  Divider 
} from '@mui/material';
import {
  Air,
  Opacity,
  Visibility,
  Compress,
  WbSunny,
  NightsStay
} from '@mui/icons-material';

function WeatherDisplay({ data, units }) {
  if (!data) return null;
  
  // Format time from Unix timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {data.name}, {data.sys.country}
        </Typography>
        <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
          {Math.round(data.main.temp)}°{units === 'imperial' ? 'F' : 'C'}
        </Typography>
        <Typography variant="h6">
          {data.weather[0].main}: {data.weather[0].description}
        </Typography>
        <Typography variant="body1">
          Feels like: {Math.round(data.main.feels_like)}°{units === 'imperial' ? 'F' : 'C'}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Opacity color="primary" />
            <Typography variant="body2" color="textSecondary">Humidity</Typography>
            <Typography variant="body1">{data.main.humidity}%</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Air color="primary" />
            <Typography variant="body2" color="textSecondary">Wind</Typography>
            <Typography variant="body1">
              {Math.round(data.wind.speed)} {units === 'imperial' ? 'mph' : 'm/s'}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Compress color="primary" />
            <Typography variant="body2" color="textSecondary">Pressure</Typography>
            <Typography variant="body1">{data.main.pressure} hPa</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Visibility color="primary" />
            <Typography variant="body2" color="textSecondary">Visibility</Typography>
            <Typography variant="body1">{(data.visibility / 1000).toFixed(1)} km</Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WbSunny color="warning" sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="textSecondary">Sunrise</Typography>
              <Typography variant="body1">{formatTime(data.sys.sunrise)}</Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NightsStay color="action" sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body2" color="textSecondary">Sunset</Typography>
              <Typography variant="body1">{formatTime(data.sys.sunset)}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default WeatherDisplay;