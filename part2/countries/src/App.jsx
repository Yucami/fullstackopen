import { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({ searchTerm, handleSearchChange }) => (
  <div>
    find countries <input value={searchTerm} onChange={handleSearchChange} />
  </div>
);

const CountryList = ({ countries, handleShowCountry }) => (
  <div>
    {countries.map(country => (
      <div key={country.name.common}>
        {country.name.common} 
      </div>
    ))}
  </div>
);

const CountryDetail = ({ country }) => (
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
  </div>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setCountries(filteredCountries);
          if (filteredCountries.length === 1) {
            setSelectedCountry(filteredCountries[0]);
          } else {
            setSelectedCountry(null);
          }
        });
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowCountry = (countryName) => {
    const country = countries.find(c => c.name.common === countryName);
    setSelectedCountry(country);
  };

  return (
    <div>
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        countries.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : (
          <CountryList countries={countries} handleShowCountry={handleShowCountry} />
        )
      )}
    </div>
  );
};

export default App;