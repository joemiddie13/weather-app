import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Weather from './components/Weather';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Provides consistent baseline styles */}
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          minHeight: '100vh'
        }}
      >
        <Weather />
      </Box>
    </ThemeProvider>
  );
}

export default App;