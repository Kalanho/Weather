import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Location from './Components/Location/Location';
import Coordinates from './Components/Coordinates/Coordinates';
///import Search from './Components/Search/Search';
import WeatherCard from './Components/WeatherCard/WeatherCard';
///import Map from './Components/Map/Map';
import General_information from './Components/General_information/General_information';

function App() {

  return (
    <div className="App">
      <div className='left-container'>
        <Location city="MINSK" country="BELARUS" />
        <General_information feel={5} wind={2} humidity={87} weatherCondition="Rain" day={1} temperature={23} />
        <div className='days'>
        <WeatherCard day={1} weatherCondition="Clear"  temperature={23}></WeatherCard>
        <WeatherCard day={2} weatherCondition="Clouds"  temperature={20}></WeatherCard>
        <WeatherCard day={1} weatherCondition="Rain"  temperature={22}></WeatherCard>
        </div>
      </div>
      <div className='right-container'>
        <Coordinates latitude={51.5074} longitude={0.1278} ></Coordinates >
      </div>
    </div>
  );
}

export default App;
