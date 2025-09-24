import React from 'react';
import './General_information.css'; // Импортируйте CSS файл
import ReactAnimatedWeather from 'react-animated-weather';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';

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
  let condition:string;
  const translations = store.getTranslations()
  const language = store.language as 'en';
  console.log("язык ", language) 
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
  switch (weatherCondition) {
    case 'Rain':
      condition="RAIN";
      break;
    case 'Clouds':
      condition="CLOUDY";
      break;
    case 'Clear':
      condition="CLEAR DAY";
      break;
    case 'Snow':
      condition="  SNOW";
      break;
    case 'Thunderstorm':
      condition="CLEAR DAY";
      break;
    case 'Fog':
      condition="FOG";
      break;
    default:
      condition="CLEAR DAY";
  }

  return (
    <div className="weather-container">
      <div className="weather-temperature">
        <div >{temperature}°</div>
      </div>
      <div className="weather-details">
        <div>{condition}</div>
        <div >{translations["Feels like"][language]} {feel}°</div>
        <div >{translations.Wind[language]} {wind} m/s</div>
        <div >{translations.Humidity[language]} {humidity}%</div>
      </div>
      <div className="weather-icons">
        <ReactAnimatedWeather icon={icon} {...weatherIconProps} />
      </div>
    </div>
  );
}

export default observer  (General_information);