import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import './WeatherInfo.css';

interface WeatherInfoProps {
  day: number;
  temperature: number;
  weatherCondition: string;
}
const WeatherInfo: React.FC<WeatherInfoProps> = ({ temperature, weatherCondition }) => {
  const weatherIconProps = {
    size: 48,
    animate: true,
    color: 'white',
  };

  const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    <div className="weather-info">
      <div className="day">{days[dayIndex]}</div>
      <div className="temperature">{temperature}°</div>
      <div className="weather-icon">
        <ReactAnimatedWeather icon={icon} {...weatherIconProps} />
      </div>
    </div>
  );
};

export default WeatherInfo;