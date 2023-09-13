import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [ weather, setWeather ] = useState([])

  console.log(country.capital)

  useEffect(() => {
    const params = {
      access_key: 'df961b90858eae74cb596a36d290f0cf',
      query: country.capital[0]
    }

    axios.get('http://api.weatherstack.com/current', {params}).then(response => {
      const apiResponse = response.data
      console.log(apiResponse)
      console.log(apiResponse.current.temperature)
      console.log(apiResponse.location.name)
      setWeather([apiResponse])
    })
  }, [country])

  console.log(weather)

  if (weather.length > 0) {
    console.log(weather[0].current.temperature)
    console.log(weather[0].location.name)
    const capital = weather[0].location.name
    const temperature = weather[0].current.temperature
    const icon = weather[0].current.weather_icons[0]
    const wind_dir = weather[0].current.wind_dir
    const wind_speed = weather[0].current.wind_speed
    return (
      <>
        <h2>{country.name.common}</h2>
        <p><b>Capital: </b>{country.capital.join(', ')}</p>
        <p><b>Population: </b>{country.population}</p>
        <p><b>Alternative Spellings:</b></p>
        <ul>
        {country.altSpellings.map((altSpelling, i) => <li key={i}>{altSpelling}</li>)}
        </ul>
        <p><b>Flag: </b></p>
        <img src={country.flags.png} alt={country.flags.alt} width='100px'></img>
        <p>Current weather in {capital} is {temperature} celcius degrees.</p>
        <img src={icon} alt='Weather icon' width='50px'></img>
        <p>Wind speed is {wind_speed} mph, direction: {wind_dir}</p>
      </>
    )
  }

  return (
    <>
      <h2>{country.name.common}</h2>
      <p><b>Capital: </b>{country.capital.join(', ')}</p>
      <p><b>Population: </b>{country.population}</p>
      <p><b>Alternative Spellings:</b></p>
      <ul>
      {country.altSpellings.map((altSpelling, i) => <li key={i}>{altSpelling}</li>)}
      </ul>
      <p><b>Flag: </b></p>
      <img src={country.flags.png} alt={country.flags.alt} width='100px'></img>
    </>
  )
}

export default Country