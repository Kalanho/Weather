import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import './WeatherInfo.css';
import { IWeatherInfoProps } from './IWeatherInfoProps';
import {  getWeatherIcon, getDays } from '../shared/utils';

const WeatherInfo: React.FC<IWeatherInfoProps> = ({ temperature, weatherCondition }) => {
  const weatherIconProps = {
    size: 48,
    animate: true,
    color: 'white',
  };
  const days = getDays();
  const current = new Date();
  const dayIndex: number = current.getDay();
  const { icon } = getWeatherIcon(weatherCondition);
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