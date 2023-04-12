import React from 'react';
import { WeatherProvider } from './WeatherProvider';
import { CityList } from './CityList';
import Footer from './Footer';
import './App.scss';
import Banner from './Banner';

function App() {
  return (
    <WeatherProvider>
      <Banner></Banner>
      <div className="weather-provider">
        <CityList/>
      </div>
      <Footer></Footer>
    </WeatherProvider>
  );
}

export default App;
