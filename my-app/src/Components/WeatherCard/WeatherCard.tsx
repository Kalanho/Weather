import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import './WeatherCard.css';

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
  const days: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const current = new Date();
  const dayIndex: number = current.getDay();
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
 
      <div className="day">{days[dayIndex+1]}</div>
<div className="Card">
     <div className="temperature">{temperature}°</div>
      
      <div className="weather">
        <ReactAnimatedWeather icon={icon} {...weatherIconProps} />
      </div></div>
    </div>

  );
};

export default WeatherCard;