import React from 'react';
import './General_information.css'; // Импортируйте CSS файл
import ReactAnimatedWeather from 'react-animated-weather';

interface GeneralInformationProps {
  feel: number;
  day: number;
  humidity: number;
  wind: number;
  temperature: number;
  weatherCondition: string;
}
const General_information: React.FC<GeneralInformationProps> = ({ day, temperature, weatherCondition, feel, humidity, wind }) => {
  const weatherIconProps = {
    animate: true,
    color: 'white',
  };
  let icon: string;

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
    <div className="weather-container">
      <div className="weather-temperature">
        <div >{temperature}°</div>
      </div>
      <div className="weather-details">
        <div>OVERCAST</div>
        <div >FEELS LIKE: {feel}°</div>
        <div >WIND: {wind} m/s</div>
        <div >HUMIDITY: {humidity}%</div>
      </div>
      <div className="weather-icons">
        <ReactAnimatedWeather icon={icon} {...weatherIconProps} />
      </div>
    </div>
  );
}

export default General_information;