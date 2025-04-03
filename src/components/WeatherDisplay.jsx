import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Divider,
  useTheme
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
  const theme = useTheme();
  const [backgroundStyle, setBackgroundStyle] = useState({});
  
  useEffect(() => {
    // Set background based on weather condition and time of day
    if (!data) return;
    
    const weatherMain = data.weather[0].main.toLowerCase();
    const isDay = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;
    
    let gradient = '';
    let boxShadow = '';
    
    // Define gradients based on weather
    if (weatherMain.includes('clear')) {
      gradient = isDay 
        ? 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' 
        : 'linear-gradient(135deg, #2c3e50 0%, #4c669f 100%)';
    } else if (weatherMain.includes('cloud')) {
      gradient = isDay 
        ? 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' 
        : 'linear-gradient(135deg, #243949 0%, #517fa4 100%)';
    } else if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
      gradient = 'linear-gradient(135deg, #616161 0%, #9bc5c3 100%)';
    } else if (weatherMain.includes('snow')) {
      gradient = 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)';
    } else {
      gradient = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    }
    
    // Neumorphic shadow effect
    boxShadow = '20px 20px 60px #bebebe, -20px -20px 60px #ffffff, inset 0 0 20px rgba(0,0,0,0.05)';
    
    setBackgroundStyle({
      background: gradient,
      boxShadow: boxShadow,
      transition: 'all 0.5s ease-in-out',
      transform: 'perspective(1000px) rotateX(2deg)',
    });
  }, [data]);

  if (!data) return null;
  
  // Format time from Unix timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Determine the weather icon URL from OpenWeatherMap
  const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  // Common styles for data sections
  const dataSectionStyle = {
    display: 'flex', 
    alignItems: 'center', 
    flexDirection: 'column',
    padding: 2,
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.6)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.8)'
    }
  };

  return (
    <Box 
      sx={{
        p: 4, 
        mt: 3, 
        borderRadius: '24px',
        ...backgroundStyle,
        overflow: 'hidden',
      }}
    >
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 4,
          position: 'relative',
          zIndex: 2
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.grey[800],
            textShadow: '2px 2px 4px rgba(255,255,255,0.5)'
          }}
        >
          {data.name}, {data.sys.country}
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          <img 
            src={weatherIconUrl} 
            alt={data.weather[0].description}
            style={{ 
              width: '120px', 
              height: '120px',
              filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
              animation: 'float 3s ease-in-out infinite',
              '@keyframes float': {
                '0%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
                '100%': { transform: 'translateY(0px)' }
              }
            }}  
          />
          <Typography 
            variant="h1" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.grey[900],
              textShadow: '3px 3px 6px rgba(255,255,255,0.5)',
              ml: 2
            }}
          >
            {Math.round(data.main.temp)}°{units === 'imperial' ? 'F' : 'C'}
          </Typography>
        </Box>
        
        <Typography 
          variant="h6"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '15px',
            padding: '5px 15px',
            display: 'inline-block',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            textTransform: 'capitalize'
          }}
        >
          {data.weather[0].description}
        </Typography>
        
        <Typography 
          variant="body1"
          sx={{ mt: 1 }}
        >
          Feels like: {Math.round(data.main.feels_like)}°{units === 'imperial' ? 'F' : 'C'}
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={6} sm={3}>
          <Box sx={dataSectionStyle}>
            <Opacity sx={{ fontSize: 40, color: '#1A73E8', mb: 1 }} />
            <Typography variant="body2" color="textSecondary">Humidity</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{data.main.humidity}%</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Box sx={dataSectionStyle}>
            <Air sx={{ fontSize: 40, color: '#1A73E8', mb: 1 }} />
            <Typography variant="body2" color="textSecondary">Wind</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {Math.round(data.wind.speed)} {units === 'imperial' ? 'mph' : 'm/s'}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Box sx={dataSectionStyle}>
            <Compress sx={{ fontSize: 40, color: '#1A73E8', mb: 1 }} />
            <Typography variant="body2" color="textSecondary">Pressure</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{data.main.pressure} hPa</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Box sx={dataSectionStyle}>
            <Visibility sx={{ fontSize: 40, color: '#1A73E8', mb: 1 }} />
            <Typography variant="body2" color="textSecondary">Visibility</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{(data.visibility / 1000).toFixed(1)} km</Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Box 
        sx={{ 
          mt: 4, 
          p: 3, 
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.6)',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WbSunny 
                sx={{ 
                  color: '#FF9800', 
                  mr: 2, 
                  fontSize: 40,
                  animation: 'rotate 10s linear infinite',
                  '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }} 
              />
              <Box>
                <Typography variant="body2" color="textSecondary">Sunrise</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{formatTime(data.sys.sunrise)}</Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <NightsStay 
                sx={{ 
                  color: '#5C6BC0', 
                  mr: 2, 
                  fontSize: 40 
                }} 
              />
              <Box>
                <Typography variant="body2" color="textSecondary">Sunset</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{formatTime(data.sys.sunset)}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default WeatherDisplay;