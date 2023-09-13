import React from 'react'
import Country from './Country'

const Countries = ({filteredCountries, setFilteredCountries}) => {

    if (filteredCountries.length > 10) {    
      return (
          <p>Keep searching...</p>
      )
    } else if ((filteredCountries.length > 2 && filteredCountries.length < 10) || filteredCountries.length === 0) {
      return (
        <ul>
          {
            filteredCountries.map((country, i) => <li key={i}>
              <p>{country.name.common}</p>
              <button onClick={() => setFilteredCountries([country])}>SHOW</button>
            </li>)
          }
        </ul>
      )
    } else {
        return (
            <Country country={filteredCountries[0]} />
        )
    }
  }

export default Countries