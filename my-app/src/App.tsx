import React from 'react';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Clock from 'react-clock';
import Location from './Components/Location/Location';
import Coordinates from './Components/Coordinates/Coordinates';
import Map from './Components/Map/Map';


function App() {

  return (
    <div className="App">
      <div>
        <Location city={222} country={0.1278} ></Location >

        <Map  ></Map >
      </div>
      <div>
        <Coordinates latitude={51.5074} longitude={0.1278} ></Coordinates >
      </div>

    </div>
  );
}

export default App;
