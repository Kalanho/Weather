import React from 'react';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Clock from 'react-clock';
import Location from './Components/Location/Location';
import Coordinates from './Components/Coordinates/Coordinates';
///import Search from './Components/Search/Search';
import WeatherInfo from './Components/WeatherInfo/WeatherInfo';
import Map from './Components/Map/Map';
import General_information from './Components/General_information/General_information';

function App() {

  return (
    <div className="App">
      <div>
        <Location city={222} country={0.1278} ></Location >
             </div>


             
      <div><WeatherInfo day="CLEAR_DAY" temperature={23} weatherCondition={18}  />
      </div>
      
    
      <div>
        <General_information feel={5} wind={2} humidity={87}  ></General_information >
      </div>

      <div>
        <Coordinates latitude={51.5074} longitude={0.1278} ></Coordinates >
      </div>

    </div>
  );
}

export default App;
