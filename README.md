# Weather App 🌦️

A modern React application that connects to the OpenWeatherMap API to display real-time weather data for any US zip code.

<img width="922" alt="image" src="https://github.com/user-attachments/assets/af01ab89-69d6-4db9-806a-6a7f801ecd92" />

## Features

- **Search by Zip Code**: Enter any 5-digit US zip code to get current weather data
- **Unit Selection**: Toggle between Fahrenheit (°F) and Celsius (°C)
- **Detailed Weather Information**: View comprehensive weather data including:
  - Current temperature and "feels like" temperature
  - Weather conditions with descriptive icons
  - Humidity, wind speed, pressure, and visibility
  - Sunrise and sunset times
- **Responsive Design**: Works on desktop and mobile devices
- **Dynamic UI**: Background and styling changes based on current weather conditions
- **Error Handling**: Clear error messages for invalid inputs or API issues

## Technologies Used

- **React**: Frontend UI library
- **Vite**: Build tool and development server
- **Material UI**: Component library with custom theming
- **OpenWeatherMap API**: Weather data source
- **CSS-in-JS**: Styled components via Material UI's styling system
- **Environment Variables**: Secure API key storage

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_WEATHER_API_KEY=your_openweather_api_key_here
   ```

   You can get an API key by signing up at [OpenWeatherMap](https://openweathermap.org/).

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── Weather.jsx         # Main weather component
│   │   ├── WeatherSearch.jsx   # Search form component
│   │   └── WeatherDisplay.jsx  # Weather data display component
│   ├── utils/
│   │   └── api.js              # API utility functions
│   ├── App.jsx                 # App component with theming
│   └── main.jsx               # Entry point
├── public/
│   └── ...                     # Static assets
└── ...                         # Configuration files
```

## Usage

1. Enter a 5-digit US zip code in the search field
2. Select your preferred temperature unit (Fahrenheit or Celsius)
3. Click "Get Weather" to view the current weather data
4. Observe how the UI changes based on the current weather conditions

## Learning Concepts

This project demonstrates several key React concepts:

- **Controlled Component Pattern**: Form inputs managed by React state
- **Component Composition**: Breaking UI into reusable components
- **API Integration**: Asynchronous data fetching with fetch()
- **Conditional Rendering**: Displaying different UI based on application state
- **Custom Styling**: Advanced Material UI theming and styling
- **Error Handling**: Graceful error management for API requests

## Future Enhancements

- Geolocation support to get weather for the user's current location
- Extended forecasts (hourly, 5-day)
- Historical weather data
- Weather maps and visualizations
- Saving favorite locations

## License

MIT

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Material UI](https://mui.com/) for the component library
- [Vite](https://vitejs.dev/) for the build tooling
