import React, { useEffect, useState } from "react";
import CountryCapitalGame from "./CountryCapitalGame";

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }
      const countries = await response.json();
      const shuffledCountries = countries.sort(() => Math.random() - 0.5);
      const selectedCountries = shuffledCountries.slice(0, 10);
      const countryData = selectedCountries.reduce((acc, country) => {
        if (country.capital) {
          acc[country.name.common] = country.capital[0];
        }
        return acc;
      }, {});
      setData(countryData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {Object.keys(data).length > 0 ? (
        <CountryCapitalGame data={data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
