import React, { useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';
// импортировать store


interface SearchCityInputProps {
  onSearch: (city: string) => void;
}

function SearchCityInput({ onSearch }: SearchCityInputProps) {
  const [city, setCity] = useState<string>('');
  const transalations = store.getTranslations()
const language = store.language as 'en';
console.log("язык ", language)

  // нужно получить значение языка из store
  //нужно получить переводы которые соответвуют определенному языку

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    onSearch(city); 
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        padding: '8px 12px',
        maxWidth: '600px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
       
        margin: '0 auto' // Центрирование
      }}
    >
      {/* Иконка микрофона */}
      <div style={{ marginRight: '8px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="#fff"
          viewBox="0 0 512 512"
        >
          <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z" />
          <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z" />
        </svg>
      </div>

      {/* Инпут */}
      <input
        type="text"
        placeholder={transalations["Search city"][language]} 
      
        value={city}
        onChange={handleChange}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          color: '#fff',
          fontSize: '16px',
        }}
      />

      {/* Кнопка SEARCH */}
      <button
        onClick={handleSearch}
        style={{
          marginLeft: '8px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '4px',
          padding: '6px 12px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {transalations.Search[language]} 
    
      </button>
    </div>
  );
}

// компонент должен быть обернут в обсервер

export default  observer (SearchCityInput);
