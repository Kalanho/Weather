import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import './WeatherCard.css';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';
import { IWeatherCardProps } from './IWeatherCardProps'
import {  getWeatherIcon, getDays } from '../shared/utils';

const WeatherCard: React.FC<IWeatherCardProps> = ({ weatherCondition, temperature }) => {
  const DAYS_IN_WEEK = 7;
  const NEXT_DAY_OFFSET = 1;
  const weatherIconProps = {
    size: 75,
    animate: true,
    color: 'white',
  };
  const transalations = store.getTranslations()
  const language = store.language as 'en';
  console.log("язык ", language)
  const days = getDays('uppercase');
  const translations = store.getTranslations();
  const current = new Date();
  let day = current.getDay();
  const langData = translations[language];
  console.log("язык ", language)
  const nextDayIndex = (day + NEXT_DAY_OFFSET) % DAYS_IN_WEEK;
  const dayName = langData.fullday[nextDayIndex];
  const { icon } = getWeatherIcon(weatherCondition);
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