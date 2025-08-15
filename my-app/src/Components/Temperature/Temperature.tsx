import React from 'react';
import './Temperature.css'; // Импортируйте CSS файл
interface TemperatureProps {
  temperatur: number;
}


const Temperature: React.FC<TemperatureProps> = ({ temperatur }) => {
  return (
    <div className="temperatur">
      <div>{temperatur}°</div>
    </div>
  );
}

export default Temperature;
