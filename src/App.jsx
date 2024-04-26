import React from "react";
import Search from "./Components/Search";
import { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import { APIKEY } from "../APIKEY";
import clearSky from "../public/clearSky.jpg";
import clearNight from "../public/clearNight.jpg";
import dayCloud from "../public/dayCloudy.jpg";
import mistDay from "../public/mistDay.jpg";
import mistNight from "../public/mistNight.jpg";
import nightCloudy from "../public/nightCloudy.jpg";
import rainyDay from "../public/rainyDay.jpg";
import rainyNight from "../public/rainyNight.jpg";
import snowDay from "../public/snowDay.jpg";
import snowNight from "../public/snowNight.jpg";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchBtn, setSearchBtn] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [celcius, setCelcius] = useState(false);

  useEffect(() => {
    const ApiData = async () => {
      try {
        const rawData = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            searchInput ? searchInput : "delhi"
          }&appid=${APIKEY}`
        );
        const data = await rawData.json();
        setWeatherData(data);
        // console.log("useEffect" + data);
      } catch (error) {
        console.log(error);
      }
    };
    ApiData();
  }, [searchBtn]);

  if (!weatherData) {
    return <div>loader..</div>;
  } else if (weatherData.cod == "400" || weatherData.cod == "404") {
    return (
      <>
        Please provide {weatherData.cod == "404" ? "valid" : null} inputs and
        reload the page!
      </>
    );
  }

  function backgroundImage() {
    // console.log(weatherData);
    if (weatherData.weather[0].icon == "01d") {
      return `url(${clearSky})`;
    } else if (weatherData.weather[0].icon == "01n") {
      return `url(${clearNight})`;
    } else if (
      weatherData.weather[0].icon == "02d" ||
      weatherData.weather[0].icon == "03d" ||
      weatherData.weather[0].icon == "04d"
    ) {
      return `url(${dayCloud})`;
    } else if (
      weatherData.weather[0].icon == "02n" ||
      weatherData.weather[0].icon == "03n" ||
      weatherData.weather[0].icon == "04n"
    ) {
      return `url(${nightCloudy})`;
    } else if (
      weatherData.weather[0].icon == "09d" ||
      weatherData.weather[0].icon == "10d" ||
      weatherData.weather[0].icon == "11d"
    ) {
      return `url(${rainyDay})`;
    } else if (
      weatherData.weather[0].icon == "09n" ||
      weatherData.weather[0].icon == "10n" ||
      weatherData.weather[0].icon == "11n"
    ) {
      return `url(${rainyNight})`;
    } else if (weatherData.weather[0].icon == "13d") {
      return `url(${snowDay})`;
    } else if (weatherData.weather[0].icon == "13n") {
      return `url(${snowNight})`;
    } else if (weatherData.weather[0].icon == "50d") {
      return `url(${mistDay})`;
    } else if (weatherData.weather[0].icon == "50n") {
      return `url(${mistNight})`;
    } else {
      return `url(${clearSky})`;
    }
  }

  const celciusToF = (e) => {
    setCelcius(e.target.checked);
  };
  return (
    <div
      style={{
        backgroundImage: `${backgroundImage()}`,
        height: "100vh",
        // widht: "100vw",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchBtn={setSearchBtn}
      />
      <Dashboard data={weatherData} celciusToF={celciusToF} celcius={celcius} />
    </div>
  );
}

export default App;
