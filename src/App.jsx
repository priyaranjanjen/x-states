import { useEffect, useState } from "react"

import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const fetchCountries = async() => {
    let response = await fetch("https://crio-location-selector.onrender.com/countries");
    let finalData = await response.json();

    setCountries(finalData);
  }

  const fetchStates = async(countryName) => {
    let response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
    let finalData = await response.json();

    setStates(finalData);
    setCities([]); // Reset cities when a new country is selected
  }

  const fetchCities = async(countryName, stateName) => {
    let response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
    let finalData = await response.json();

    setCities(finalData);
  }

  useEffect(() => {
    fetchCountries();
  }, [])

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState(""); // Reset selected state
    setSelectedCity(""); // Reset selected city
    fetchStates(selectedCountry);
  }

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setSelectedCity(""); // Reset selected city
    fetchCities(selectedCountry, selectedState);
  }

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  }

  return (
    <div className="selectWrapper">
      <h1>Select Location</h1>

      <div className="selectSection">
        <select defaultValue="" onChange={handleCountryChange}>
          <option disabled value="">Select Country</option>
          {
            countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))
          }
        </select>

        <select defaultValue="" onChange={handleStateChange} disabled={!selectedCountry}>
          <option disabled value="">Select State</option>
          {
            states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))
          }
        </select>

        <select defaultValue="" onChange={handleCityChange} disabled={!selectedState}>
          <option disabled value="">Select City</option>
          {
            cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))
          }
        </select>
      </div>
      {
        selectedCity &&
        <p>You Selected <span className="one">{selectedCity},</span> <span className="two">{selectedState}, {selectedCountry}</span></p>
      }
    </div>
  )
}

export default App;
