import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  useTheme
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';

function WeatherSearch({ onSearch }) {
  const [zipCode, setZipCode] = useState('');
  const [units, setUnits] = useState('imperial');
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (/^\d{5}$/.test(zipCode)) {
      setError('');
      onSearch(zipCode, units);
    } else {
      setError('Please enter a valid 5-digit US zip code');
    }
  };

  // Neumorphic styles
  const neumorphicStyle = {
    backgroundColor: '#e0e5ec',
    borderRadius: '16px',
    boxShadow: '10px 10px 20px #b8bdc5, -10px -10px 20px #ffffff',
    padding: '30px',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '15px 15px 30px #b8bdc5, -15px -15px 30px #ffffff',
    }
  };

  const buttonStyle = {
    borderRadius: '12px',
    padding: '12px 24px',
    fontWeight: 'bold',
    fontSize: '1rem',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    boxShadow: '6px 6px 12px #b8bdc5, -6px -6px 12px #ffffff, inset 0px 0px 0px #4a8af4, inset 0px 0px 0px #82bdff',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '10px 10px 20px #b8bdc5, -10px -10px 20px #ffffff',
      transform: 'translateY(-3px)',
    },
    '&:active': {
      boxShadow: 'inset 6px 6px 12px #4a8af4, inset -6px -6px 12px #82bdff',
      transform: 'translateY(0px)',
    }
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: 'inset 2px 2px 5px #b8bdc5, inset -2px -2px 5px #ffffff',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: 'inset 4px 4px 8px #b8bdc5, inset -4px -4px 8px #ffffff',
      },
      '&.Mui-focused': {
        boxShadow: 'inset 4px 4px 8px #b8bdc5, inset -4px -4px 8px #ffffff',
      }
    }
  };

  return (
    <Box sx={neumorphicStyle}>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        noValidate 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <TextField
          fullWidth
          label="Enter US Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          error={!!error}
          helperText={error}
          placeholder="Enter 5-digit zip code"
          InputProps={{
            startAdornment: (
              <LocationOn sx={{ mr: 1, color: theme.palette.primary.main }} />
            ),
          }}
          inputProps={{
            pattern: "[0-9]{5}",
            maxLength: 5
          }}
          sx={textFieldStyle}
        />
        
        <FormControl component="fieldset" sx={{ mt: 1 }}>
          <FormLabel 
            component="legend" 
            sx={{ 
              fontSize: '1.1rem', 
              fontWeight: 'medium',
              color: theme.palette.text.primary
            }}
          >
            Temperature Units
          </FormLabel>
          <RadioGroup 
            row 
            value={units} 
            onChange={(e) => setUnits(e.target.value)}
            sx={{
              '.MuiFormControlLabel-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '12px',
                margin: '10px 10px 10px 0',
                padding: '5px 15px',
                boxShadow: '4px 4px 8px #b8bdc5, -4px -4px 8px #ffffff',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '6px 6px 12px #b8bdc5, -6px -6px 12px #ffffff',
                  transform: 'translateY(-2px)'
                }
              }
            }}
          >
            <FormControlLabel 
              value="imperial" 
              control={
                <Radio 
                  sx={{
                    color: theme.palette.primary.main,
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              } 
              label="Fahrenheit (°F)" 
            />
            <FormControlLabel 
              value="metric" 
              control={
                <Radio 
                  sx={{
                    color: theme.palette.primary.main,
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              } 
              label="Celsius (°C)" 
            />
          </RadioGroup>
        </FormControl>
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          endIcon={<Search />}
          sx={buttonStyle}
        >
          Get Weather
        </Button>
      </Box>
    </Box>
  );
}

export default WeatherSearch;