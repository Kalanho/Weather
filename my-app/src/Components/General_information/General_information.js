import React from 'react';
import './General_information.css'; // Импортируйте CSS файл
function Dat(number) {
    const current = new Date();
    let days = ['Monday', 'Tuesday', 'Wednesdey', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let day = current.getDay();
    return `${days[day - 1]}`;

}

function General_information({ feel,humidity, wind }) {
    
  return (
    <div>
       <div> {Dat()}</div>
      <div className="general">
      <div>Feel Like: {feel}°</div>
      <div>Wind: {wind}m/s</div></div>
      <div>Humidity: {humidity}%</div>
    </div>
  );
}

export default General_information;
