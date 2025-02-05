import { useState, useEffect } from 'react';
import CountryDetail from './components/CountryDetail';
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
        <button onClick={() => handleShowCountry(country.name.common)}>show</button> 
      </div>
    ))}
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
          // console.log('response', response);
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          );
          console.log('filteredCountries', filteredCountries);
          setCountries(filteredCountries);
          if (filteredCountries.length === 1) {
            setSelectedCountry(filteredCountries[0]);
            // console.log('filteredCountries', setSelectedCountry);
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
    console.log('Selected Country', country);
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