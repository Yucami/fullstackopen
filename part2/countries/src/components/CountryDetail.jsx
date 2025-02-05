import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (api_key) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [country.capital, api_key]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <div>temperature: {weather.main.temp} °C</div>
          <div>wind: {weather.wind.speed} m/s</div>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`Weather icon`} />
        </div>
      )}
    </div>
  );
};

export default CountryDetail;