import React from 'react';
import './Coordinates.css'; // Импортируйте CSS файл

interface CoordinatesProps {
  latitude: number;
  longitude: number;
  
}
const Coordinates: React.FC<CoordinatesProps> = ({ latitude, longitude }) => {
  return (
    <div className="coordinates">
      <div>Latitude: {latitude}°</div>
      <div>Longitude: {longitude}°</div>
    </div>
  );
}

export default Coordinates;
