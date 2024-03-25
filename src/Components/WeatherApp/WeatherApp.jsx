import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import humidity_icon from "../Assets/humidity.png";
import wind_icon from "../Assets/wind.png";
import clear_icon from "../Assets/clear.png";
import drizzle_icon from '../Assets/drizzle.png';
import snow_icon from "../Assets/snow.png";
import rain_icon from "../Assets/rain.png"

const WeatherApp = () => {
    let api_key = "90f6e38b355020a0ec081b1a2d094a98"
    const [wIcon,setWIcon] = useState(null)
    const [humidity, setHumidity] = useState('--');
    const [wind, setWind] = useState('--');
    const [temperature, setTemperature] = useState('--');
    const [location, setLocation] = useState('Enter City Name');

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === ""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        let response = await fetch(url);
        let data = await response.json();
        if(data.cod === '404'){
            setLocation(data.message)
            setHumidity('--')
            setWind('--')
            setTemperature('--')
            setWIcon(null)
            return 0;
        }
        setHumidity(data.main.humidity)
        setLocation(data.name)
        setWind(Math.floor(data.wind.speed))
        setTemperature(Math.floor(data.main.temp))

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            setWIcon(clear_icon);
        }else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
            setWIcon(cloud_icon)
        }else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            setWIcon(drizzle_icon)
        }else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            setWIcon(drizzle_icon)
        }else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            setWIcon(rain_icon)
        }else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
            setWIcon(rain_icon)
        }else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            setWIcon(snow_icon)
        }else{
            setWIcon(clear_icon)
        }
    }

  return (
      <div className="container">
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='search' />
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt='' />
            </div>
        </div>
        <div className="weather-image">
            <img src={wIcon} alt='' />
        </div>
        <div className="weather-temp">{temperature} ° C</div>
        <div className="weather-location">{location}</div>
        <div className="data-container">
            <div className="element">
                <img className='icon' src={humidity_icon} alt='' />
                <div className="data">
                    <div className="humidity-percent">{humidity} %</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img className='icon' src={wind_icon} alt='' />
                <div className="data">
                    <div className="wind-speed">{wind} km/hr</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default WeatherApp
