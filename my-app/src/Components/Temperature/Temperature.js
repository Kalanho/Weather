import React from 'react';
import './Temperature.css'; // Импортируйте CSS файл

function Temperature({ Temperatur  }) {
  return (
    <div className="temperature">
      <div>{Temperatur}°</div>
    </div>
  );
}

export default Temperature;
