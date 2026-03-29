import React, { useEffect } from 'react';
import './App.css';
import Location from './Components/Location/Location';
import Coordinates from './Components/Coordinates/Coordinates';
import WeatherCard from './Components/WeatherCard/WeatherCard';
import Map from './Components/Map/Map';
import General_information from './Components/GeneralInformation/GeneralInformation';
import SearchCityInput from './Components/SearchCityInput/SearchCityInput';
import store from './store/store';
import { observer } from 'mobx-react-lite';
import TemperatureSettings from './Components/TemperatureSettings/TemperatureSettings';

function App() {
  const API_KEY = "e98fc5d9896b49c1b09d0374688962c1";

  useEffect(() => {
    store.initAPIAdapter(API_KEY);
    store.refreshWeather();

    const interval = setInterval(() => {
      store.refreshWeather();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCitySearch = (city: string) => {
    store.refreshWeatherByCity(city);
  };

  return (
    <div className="App">
      <div className='left-container'>
        <div className='TemperatureSettings'>
          <TemperatureSettings />
        </div>
        <Location city={store.city} country={store.country} />
        <General_information
          feel={store.getDisplayFeel()}
          wind={store.wind}
          humidity={store.humidity}
          weatherCondition={store.weatherConditionString}
          day={store.day}
          temperature={store.getDisplayFeelTemperature()}
        />
        <div className='days'>
          {store.weatherData.slice(0, 3).map((weather, index) => (
            <WeatherCard
              key={index}
              day={weather.day}
              weatherCondition={weather.weatherCondition}
              temperature={store.getDisplayTemperature(weather.temperature)}
            />
          ))}
        </div>
      </div>
      <div className='right-container'>
        <div className='top-row'>
          <SearchCityInput onSearch={handleCitySearch} />
          <Coordinates latitude={store.latitude} longitude={store.longitude} />
        </div>
        <Map />
      </div>
    </div>
  );
}

export default observer(App);