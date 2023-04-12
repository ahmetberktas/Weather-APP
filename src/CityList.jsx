import React from 'react';
import { CityCard } from './CityCard';
import { CitiesContext, getWeatherApi } from './WeatherProvider';
import AVAILABLE_CITY_LIST from './cities.json';
import './CityList.scss';

export const CityList = () => {
  const { setCities } = React.useContext(CitiesContext);

  // API üzerinden verileri çekerek sonuçları 'setCities' adlı state değişkenine atıyorum.
  const fetchSelectedCity = (city) => {
    const fetchUrl = getWeatherApi(city);
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => setCities(data.list));
  };

  const getSelectedCity = (event) => {
    const selectedCityFromDropdown = event.target.value;
    fetchSelectedCity(selectedCityFromDropdown);
  };

  return (
    <div>
      <select className="city-select" onChange={getSelectedCity}>
        <option value="">Şehir Seçiniz</option>
        {AVAILABLE_CITY_LIST.map((city) => {
          return (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          );
        })}
      </select>
      <CityCard />
    </div>
  );
};
