import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");


  useEffect(() => {
    const fetchCountries = async() => {
      try {
        let response = await fetch("https://crio-location-selector.onrender.com/countries");
        let finalData = await response.json();
        setCountries(finalData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };


    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async() => {
      // setSelectedState("")
      if (selectedCountry) {
        try {
          let response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          let finalData = await response.json();

          setStates(finalData);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        } catch (error) {
          console.error("Error fetching states:", error);        }
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async() => {
      if (selectedState && selectedCountry) {
        try {
          let response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          let finalData = await response.json();

          setCities(finalData);
          setSelectedCity("");
        } catch (error) {
          console.error("Error fetching cities:", error);        }
      }
    };

    fetchCities();
  }, [selectedState]);

  return (
    <div className="selectWrapper">
      <h1>Select Location</h1>
      <div className="selectSection">
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option disabled value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
          <option disabled value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
          <option disabled value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <p>
          You Selected <span className="one">{selectedCity}</span>,
          <span className="two"> {selectedState}, {selectedCountry}</span>
        </p>
      )}
    </div>
  );
}

export default App;
