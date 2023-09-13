import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {

  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response.data)
      setAllCountries(response.data)
    })
  }, [])

  const handleFilterChange = (e) => {
    console.log(e.target.value)
    setFilter(e.target.value)

    if(filter){
      const regex = new RegExp(filter, 'i')
      const countries2 = allCountries.filter(country => country.name.common.match(regex))

      setFilteredCountries(countries2)
    }


    // const countriesNames = allCountries.map(country => country.name.common)
    // const countries = allCountries.filter(country => country.name.common.includes(filter))
  }

  return (
    <div>
      <h2>Countries App</h2>
      Search: <input 
        value={filter}
        onChange={handleFilterChange}
      />

      <h1>Countries</h1>
      <Countries 
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </div>
  );
}

export default App;
