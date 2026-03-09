import React from 'react';
import './Coordinates.css';
import store from '../../store/store';
import { observer } from 'mobx-react-lite';
import { ICoordinatesProps } from './ICoordinatesProps';

const Coordinates: React.FC<ICoordinatesProps> = ({ latitude, longitude }) => {
  const translations = store.getTranslations()
  const language = store.language as 'en';
  console.log("язык ", language)
  return (
    <div className="coordinates">
      <div>{translations.Latitude[language]} {latitude}°</div>
      <div>{translations.Longitude[language]} {longitude}°</div>
    </div>
  );
}
export default observer(Coordinates);
