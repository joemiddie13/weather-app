import React from 'react';
import { Typography, Container, Box } from '@mui/material';

function Weather() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Weather App
        </Typography>
        <Typography variant="body1">
          Enter a zip code to get the current weather
        </Typography>
      </Box>
    </Container>
  );
}

export default Weather;