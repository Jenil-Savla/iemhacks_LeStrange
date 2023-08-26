import React from 'react'
import { useEffect, useState } from "react";
import TopButtons from "./TopButtons";
import Inputs from "./Inputs";
import TimeAndLocation from "./TimeAndLocation";
import TemperatureAndDetails from "./TemperatureAndDetails";
import Forecast from "./Forecast";
import getFormattedWeatherData from "./weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Weather() {
    const [query, setQuery] = useState({ q: "berlin" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const getFinalWeather= async () => {
          const options = {
            method: 'GET',
            url: 'https://weather338.p.rapidapi.com/weather/forecast',
            params: {
              date: '20200622',
              latitude: '37.765',
              longitude: '-122.463',
              language: 'en-US',
              units: 'm'
            },
            headers: {
              'X-RapidAPI-Key': '755b5f6b31msh0a57b80698ace6ep116191jsne5929616c853',
              'X-RapidAPI-Host': 'weather338.p.rapidapi.com'
            }
          };
          try {
            const response = await axios.request(options)
            .then(response => response.json())
            .then(data => setWeather(data))
          } catch (error) {
            console.error(error);
          }
        };
        getFinalWeather();
      }, []);
  
    useEffect(() => {
      const fetchWeather = async () => {
        const message = query.q ? query.q : "current location.";
  
        toast.info("Fetching weather for " + message);
  
        await getFormattedWeatherData({ ...query, units }).then((data) => {
          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}.`
          );
  
          setWeather(data);
        });
      };
  
      fetchWeather();
    }, [query, units]);
  
    const formatBackground = () => {
      if (!weather) return "from-cyan-700 to-blue-700";
      const threshold = units === "metric" ? 20 : 60;
      if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
  
      return "from-yellow-700 to-orange-700";
    };
  
    return (
      <div
        className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
  
        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
  
            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        )}
  
        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
      </div>
    );
  }
