import React from "react";
import { CitiesContext } from "./WeatherProvider";
import "./CityCard.scss";

export const CityCard = () => {
  const { cities } = React.useContext(CitiesContext);

  // 'cities' dizisi boş işe yani şehir seçilmemiş ise ekrana uyarı veriyor.
  if (cities.length < 1)
    return (
      <div className="cardListContainer">
        <div className="cardContainer noWeatherCard">
          Hava Durumunu Görmek İçin Bir Şehir Seçmelisiniz...
        </div>
      </div>
    );

  const groupedWeathers = groupWeatherByDay(cities);
  const averageWeathers = getAverageWeather(groupedWeathers);

  // Hava durumu verilerini kullanarak Card oluşturuluyor.
  return (
    <div className="cardListContainer">
      {averageWeathers.map((weather) => {
        return (
          <div className="cardContainer">
            <img
              className="weatherIcon"
              src={getWeatherIcon(weather.icon)}
              alt="weather icon"
            />
            <p className="weatherDescription">{weather.description}</p>
            <p className="weatherDate">
              {new Date(weather.day).toLocaleDateString("tr-TR")}
            </p>
            <p className="weatherMinTemp">
              <strong>Lowest temp:</strong> {weather.minTemp} °C
            </p>
            <p className="weatherMaxTemp">
              <strong>Highest temp:</strong> {weather.maxTemp} °C
            </p>
          </div>
        );
      })}
    </div>
  );
};

// 'cities' dizinindeki hava durum verilerini gün bazında grupladım. 'dayRecords' adında bir nesne oluşturdum.
const groupWeatherByDay = (cities) => {
  const daysRecords = {};
  for (const city of cities) {
    const [plainDate, time] = city.dt_txt.split(" ");
    if (!daysRecords[plainDate]) {
      daysRecords[plainDate] = [];
    }

    const minTemp = city.main.temp_min;
    const maxTemp = city.main.temp_max;
    const weatherDescription = city.weather[0].description;
    const weatherIcon = city.weather[0].icon;
    const recordedTime = time;
    daysRecords[plainDate].push({
      minTemp,
      maxTemp,
      weatherDescription,
      weatherIcon,
      recordedTime,
    });
  }
  return daysRecords;
};

// Ortalama değerleri hesaplıyorum.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
const getAverageWeather = (daysRecords) => {
  const weathersAverageByDay = Object.entries(daysRecords).map(
    ([day, weathers]) => {
      let minTemp = 0,
        maxTemp = 0,
        descriptionRecord = {};

      for (const weather of weathers) {
        if (!minTemp) minTemp = weather.minTemp;
        if (!maxTemp) maxTemp = weather.maxTemp;

        if (minTemp > weather.minTemp) minTemp = weather.minTemp;
        if (maxTemp < weather.maxTemp) maxTemp = weather.maxTemp;
        const currentDescription = weather.weatherDescription;
        if (!descriptionRecord[currentDescription]) {
          descriptionRecord[currentDescription] = {
            count: 0,
            icon: weather.weatherIcon,
            description: currentDescription,
          };
        }
        descriptionRecord[currentDescription].count++;
      }

      let mostCommonWeather,
        commonWeatherCount = 0,
        weatherIcon;
      Object.entries(descriptionRecord).forEach(
        ([description, weatherValue]) => {
          if (weatherValue.count > commonWeatherCount) {
            commonWeatherCount = weatherValue.count;
            mostCommonWeather = weatherValue.description;
            weatherIcon = weatherValue.icon;
          }
        }
      );

      return {
        day,
        minTemp: minTemp.toFixed(0),
        maxTemp: maxTemp.toFixed(0),
        description: mostCommonWeather,
        icon: weatherIcon,
      };
    }
  );
  return weathersAverageByDay;
};

const getWeatherIcon = (icon) => `http://openweathermap.org/img/w/${icon}.png`;
