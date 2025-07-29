import React from 'react';
import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import './Location.css'; // Импортируйте CSS файл


function Location({ city, country }) {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  function formatTime() {
    let hours = value.getHours();
    const minutes = value.getMinutes();
    const seconds = value.getSeconds();
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
  }
  function padZero(number) {
    return (number < 10 ? "0" : "") + number;
  }
  function Dateform(number) {
    const current = new Date();
    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];
    let day = current.getDay();
    let month = current.getMonth();
    return `${days[day - 1]} ${current.getDate()} ${months[month]}`;
  }
  return (
    <div>
      <div className="Location">
        <div>{city},{country}</div>
      </div>
      <p>{Dateform()} {formatTime()}</p>
    </div>
  );
}

export default Location;
