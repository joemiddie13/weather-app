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
  Paper
} from '@mui/material';

function WeatherSearch({ onSearch }) {
  const [zipCode, setZipCode] = useState('');
  const [units, setUnits] = useState('imperial'); // 'imperial' for °F, 'metric' for °C
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation for US zip codes
    if (/^\d{5}$/.test(zipCode)) {
      setError('');
      onSearch(zipCode, units);
    } else {
      setError('Please enter a valid 5-digit US zip code');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Enter US Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          margin="normal"
          error={!!error}
          helperText={error}
          placeholder="Enter 5-digit zip code"
          inputProps={{
            pattern: "[0-9]{5}",
            maxLength: 5
          }}
        />
        
        <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
          <FormLabel component="legend">Temperature Units</FormLabel>
          <RadioGroup 
            row 
            value={units} 
            onChange={(e) => setUnits(e.target.value)}
          >
            <FormControlLabel value="imperial" control={<Radio />} label="Fahrenheit (°F)" />
            <FormControlLabel value="metric" control={<Radio />} label="Celsius (°C)" />
          </RadioGroup>
        </FormControl>
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 2 }}
        >
          Get Weather
        </Button>
      </Box>
    </Paper>
  );
}

export default WeatherSearch;