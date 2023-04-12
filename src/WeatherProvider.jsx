import React from 'react';

export const CitiesContext = React.createContext([]);

export const WeatherProvider = ({ children }) => {
  const [cities, setCities] = React.useState([]);

  return (
    <CitiesContext.Provider value={{ cities, setCities }}>
      {children}
    </CitiesContext.Provider>
  );
};

export const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '063e2a3dc3430acec61e8c7794a88f96';

export const getWeatherApi = (city) => {
  return `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=en`;
};
