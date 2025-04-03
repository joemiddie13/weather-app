import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Weather from './components/Weather';
// Import Roboto font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create a theme instance
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
      <Weather />
    </ThemeProvider>
  );
}

export default App;