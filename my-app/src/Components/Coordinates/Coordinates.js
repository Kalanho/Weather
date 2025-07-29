import React from 'react';
import './Coordinates.css'; // Импортируйте CSS файл

function Coordinates({ latitude, longitude }) {
  return (
    <div className="coordinates">
      <div>Latitude: {latitude}°</div>
      <div>Longitude: {longitude}°</div>
    </div>
  );
}

export default Coordinates;
