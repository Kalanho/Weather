import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import './WeatherInfo.css'; // Optionally, for additional styling

function WeatherInfo({ day, temperature, weatherCondition }) {
  const weatherIconProps = {
    size: 48, // Adjust the size as needed
    animate: true,
    color: 'white', // Icon color
  };
  const current = new Date();
  let icon = 'CLEAR_DAY'; // Default icon
  let days = ['Monday', 'Tuesday', 'Wednesdey', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
 day = current.getDay();
  switch (weatherCondition) {
    case 'Rain':
      icon = 'RAIN';
      break;
    case 'Clouds':
      icon = 'CLOUDY';
      break;
    case 'Clear':
      icon = 'CLEAR_DAY';
      break;
    case 'Snow':
      icon = 'SNOW';
      break;
    case 'Thunderstorm':
      icon = 'THUNDERSTORM';
      break;
    case 'Fog':
      icon = 'FOG';
      break;
    default:
      icon = 'CLEAR_DAY';
  }

  return (
    <div className="weather-info">
      <div className="day">{days[day - 1]}</div>
      <div className="temperature">{temperature}°</div>
      <div className="weather-icon">
        <ReactAnimatedWeather
          icon={icon}
          {...weatherIconProps}
        />
      </div>
    </div>
  );

}
export default WeatherInfo;
