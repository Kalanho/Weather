import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Location from './Components/Location/Location';
import Coordinates from './Components/Coordinates/Coordinates';
///import Search from './Components/Search/Search';
import WeatherCard from './Components/WeatherCard/WeatherCard';
import Map from './Components/Map/Map';
import General_information from './Components/General_information/General_information';
import store from './store/store';
import { observer } from 'mobx-react-lite';

const weatherData = [
  { day: 1, weatherCondition: "Clear", temperature: 23 },
  { day: 2, weatherCondition: "Clouds", temperature: 20 },
  { day: 3, weatherCondition: "Rain", temperature: 22 },
];

function App() {

  return (
    <div className="App">
      <div className='left-container'>
        <Location city={store.city} country={store.country} />
        <General_information feel={store.feel}
          wind={store.wind}
          humidity={store.humidity}
          weatherCondition={store.weatherConditionString}
          day={store.day}
          temperature={store.feeltemperature} />
        <div className='days'>
          {weatherData.map((weather, index) => (
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
        <Coordinates latitude={store.latitude} longitude={store.longitude} ></Coordinates >
       <Map></Map>
      </div>
    </div>
  );
}

export default observer(App)
