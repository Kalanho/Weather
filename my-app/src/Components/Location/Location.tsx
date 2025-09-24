import { useEffect, useState } from 'react';
import './Location.css'; // Импортируйте CSS файл
import { observer } from 'mobx-react-lite';
import store from '../../store/store';

interface LocationProps {
  city: string;
  country: string;
} 
function Location({ city, country }: LocationProps) {
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  function formatTime():string {
    let hours = value.getHours();
    const minutes = value.getMinutes();
    const seconds = value.getSeconds();
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  }
  function padZero(number:number):string {
    return (number < 10 ? "0" : "") + number;
  }
  function Dateform():string {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];
    const translations = store.getTranslations();
    const language = store.language as 'en';
    const current = new Date();
    let day = current.getDate();
    let month = current.getMonth();
  const langData = translations[language];
  const dayName = langData.days[current.getDay()];
  const monthName = langData.months[month] ;
    console.log("язык ", language) 
    return `${dayName} ${day} ${monthName}`;
  }
  return (
    <div className="Location">
      <div className="Locations">
       {city},{country}</div>
      <div className="Dateform">
      {Dateform()} {formatTime()}
    </div>
    
  </div>);
}

export default  observer( Location);
