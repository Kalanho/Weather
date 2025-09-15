import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Location from './Components/Location/Location';
import Coordinates from './Components/Coordinates/Coordinates';
import WeatherCard from './Components/WeatherCard/WeatherCard';
import Map from './Components/Map/Map';
import General_information from './Components/General_information/General_information';
import SearchCityInput from './Components/SearchCityInput/SearchCityInput';
import store from './store/store';
import { observer } from 'mobx-react-lite';
import TemperatureSettings from './Components/TemperatureSettings/TemperatureSettings';



function App() {
  const handleCitySearch = (city: string) => {
    store.setCity(city);
  };
  return (
    <div className="App"> 
     
      <div className='left-container'>
      <TemperatureSettings></TemperatureSettings>
        <Location city={store.city} country={store.country} />
        <General_information feel={store.feel}
          wind={store.wind}
          humidity={store.humidity}
          weatherCondition={store.weatherConditionString}
          day={store.day}
          temperature={store.feeltemperature} />
        <div className='days'>
          {store.weatherData.map((weather, index) => (
            <WeatherCard
              key={index}
              day={weather.day}
              weatherCondition={weather.weatherCondition}
              temperature={weather.temperature}
            />
          ))}
        </div>
      </div>
      <div className='right-container'>
      <SearchCityInput onSearch={handleCitySearch} />
        <Coordinates latitude={store.latitude} longitude={store.longitude} ></Coordinates >
       <Map></Map>
      </div>
    </div>
  );
}

export default observer(App)
