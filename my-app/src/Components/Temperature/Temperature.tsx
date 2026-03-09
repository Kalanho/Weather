import React from 'react';
import './Temperature.css';
import { ITemperatureProps } from './ITemperatureProps';

const Temperature: React.FC<ITemperatureProps> = ({ temperatur }) => {
  return (
    <div className="temperatur">
      <div>{temperatur}°</div>
    </div>
  );
}
export default Temperature;
