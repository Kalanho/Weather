import React from 'react';
import './GeneralInformation.css';
import ReactAnimatedWeather from 'react-animated-weather';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';
import { IGeneralInformationProps } from './IGeneralInformationProps';
import { getWeatherIcon } from '../shared/utils';

type Language='en' | 'ru' | 'zh';

const GeneralInformation: React.FC<IGeneralInformationProps> = ({ temperature, weatherCondition, feel, humidity, wind }) => {
  const weatherIconProps = {
    animate: true,
    color: 'white',
  };

  const translations = store.getTranslations()
  const language = store.language as Language;
  const { icon, condition } = getWeatherIcon(weatherCondition);
  console.log("язык ", language)

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

export default observer(GeneralInformation);