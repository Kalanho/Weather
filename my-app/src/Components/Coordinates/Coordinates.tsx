import React from 'react';
import './Coordinates.css'; // Импортируйте CSS файл
import store from '../../store/store';
import { observer } from 'mobx-react-lite';


interface CoordinatesProps {
  latitude: number;
  longitude: number;
  
}
const Coordinates: React.FC<CoordinatesProps> = ({ latitude, longitude }) => {
  // 
const transalations = store.getTranslations()
const language = store.language as 'en';
console.log("язык ", language)

  return (
    <div className="coordinates">
      <div>{transalations.Latitude[language]} {latitude}°</div>
      <div>{transalations.Longitude[language]} {longitude}°</div>
    </div>
  );
}

export default observer( Coordinates);
