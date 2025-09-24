import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import './WeatherCard.css';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';

interface WeatherCardProps {
  day: number;
  temperature: number;
  weatherCondition: string;
}
const WeatherCard: React.FC<WeatherCardProps> = ({ weatherCondition, temperature }) => {
  const weatherIconProps = {

    size: 75,
    animate: true,
    color: 'white',
  };
  const transalations = store.getTranslations()
  const language = store.language as 'en';
  console.log("язык ", language) 

  const fullday: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const translations = store.getTranslations();
  const current = new Date();
  let day = current.getDay();
  const langData = translations[language];
  console.log("язык ", language)
  const nextDayIndex = (day + 1) % 7;
  const dayName = langData.fullday[nextDayIndex];
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


    <div className="WeatherCard">

      <div className="day">{dayName}</div>
      <div className="Card">
        <div className="temperature">{temperature}°</div>

        <div className="weather">
          <ReactAnimatedWeather icon={icon} {...weatherIconProps} />
        </div></div>
    </div>

  );
};

export default observer(WeatherCard);