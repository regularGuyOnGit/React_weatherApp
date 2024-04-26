import React from "react";
import "../Style/dashboard.css";
import Humidity from "../../public/humidity.jpg";
import Wind from "../../public/windSpeed.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/fontawesome-free-solid";

function Dashboard({ data, celcius, celciusToF }) {
  const timeZone = () => {
    return data.timezone / 3600;
  };
  const tempKelvinToCelcius = (input) => {
    return Math.round((input - 273.15) * 10) / 10;
  };
  const tempKelvinToFahrenheit = (input) => {
    return Math.round((((input - 273.15) * 9) / 5 + 32) * 10) / 10;
  };
  return (
    <div className="dashBoard">
      <div className="cityName">
        <span>City Name : </span>
        <span>"{data.name}"</span>
      </div>
      <div className="county">
        {data.sys.country ? (
          <div>
            <span>Country Name : </span> <span>{data.sys.country}</span>
          </div>
        ) : null}
      </div>
      <div className="timezone">
        <span>Time Zone :</span>
        {}
        {timeZone() > 0 ? (
          <span>"{timeZone()}hrs Ahead of UTC"</span>
        ) : (
          <span>"{timeZone()}hrs Behind of UTC"</span>
        )}{" "}
      </div>
      <div className="weather">
        <span>Weather : </span>
        <span>{data.weather[0].description}</span>
      </div>
      <div className="humidity">
        <span>Humidity : </span>
        <div>
          <span>
            <img src={Humidity} alt="humid Icon" />
          </span>

          <span>{data.main.humidity}%</span>
        </div>
      </div>
      <div className="windSpeed">
        <span>Wind :</span>
        <div>
          <span>
            <img src={Wind} alt="" />
          </span>
          <span>{data.wind.speed} MPH</span>
        </div>
      </div>
      <div className="minTemp">
        <span>Min Temp :</span>{" "}
        {celcius ? (
          <span>{tempKelvinToCelcius(data.main.temp_min)}°C</span>
        ) : (
          <span>{tempKelvinToFahrenheit(data.main.temp_min)}°F</span>
        )}
      </div>
      <div className="temp">
        <span>Temp :</span>
        {celcius ? (
          <span>{tempKelvinToCelcius(data.main.temp)}°C</span>
        ) : (
          <span>{tempKelvinToFahrenheit(data.main.temp)}°F</span>
        )}
      </div>
      <div className="maxTemp">
        <span>Max Temp :</span>{" "}
        {celcius ? (
          <span>{tempKelvinToCelcius(data.main.temp_max)}°C</span>
        ) : (
          <span>{tempKelvinToFahrenheit(data.main.temp_max)}°F</span>
        )}
      </div>
      <div className="sunriseAndSunset">
        {data.weather[0].icon.slice(-1) == "n" ? (
          <span className="moon">
            Night Time <FontAwesomeIcon icon={faMoon} />
          </span>
        ) : (
          <span className="sun">
            Day Time <FontAwesomeIcon icon={faSun} />
          </span>
        )}
      </div>
      <div className="switchTemp">
        <span>Fahrenheit</span>
        <label className="switch">
          <input type="checkbox" onClick={(e) => celciusToF(e)} />
          <span className="slider round"></span>
        </label>
        <span>Celcius</span>
      </div>
    </div>
  );
}

export default Dashboard;
