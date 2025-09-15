import { useEffect, useState } from 'react';
import Clock from 'react-clock';
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
    const current = new Date();
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];
    let day = current.getDay();
    let month = current.getMonth();
    const transalations = store.getTranslations()
    const language = store.language as 'en';
    console.log("язык ", language) 
    return `${days[day]} ${current.getDate()} ${months[month]}`;
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
