import React, { useState } from 'react';

const TemperatureSettings: React.FC = () => {
  const [language, setLanguage] = useState<'EN' | 'RU'>('EN');
  const [unit, setUnit] = useState<'°F' | '°C'>('°F');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'EN' | 'RU';
    setLanguage(value);
  };

  const handleUnitChange = (selectedUnit: '°F' | '°C') => {
    setUnit(selectedUnit);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#4A4A4A',
        padding: '8px 12px',
        borderRadius: '8px',
        gap: '8px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px', // Ограничение ширины
        margin: '0 auto' // Центрирование
      }}
    >
      {/* Иконка (например, стрелка обновления) */}
      <div
        style={{
          width: '36px',
          height: '36px',
          backgroundColor: '#6A6A6A',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        {/* Можно вставить SVG или иконку, здесь пример простого текста */}
        <span style={{ color: '#fff', fontSize: '16px' }}>↻</span>
      </div>

      {/* Выпадающий список языка */}
      <select
        value={language}
        onChange={handleLanguageChange}
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#9A9A9A',
          color: '#fff',
          fontSize: '14px'
        }}
      >
        <option value="EN">EN</option>
        <option value="RU">RU</option>
      </select>

      {/* Переключатели градусов */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          onClick={() => handleUnitChange('°F')}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: unit === '°F' ? '#fff' : '#6A6A6A',
            color: unit === '°F' ? '#4A4A4A' : '#fff',
            fontSize: '14px'
          }}
        >
          °F
        </button>
        <button
          onClick={() => handleUnitChange('°C')}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: unit === '°C' ? '#fff' : '#6A6A6A',
            color: unit === '°C' ? '#4A4A4A' : '#fff',
            fontSize: '14px'
          }}
        >
          °C
        </button>
      </div>
    </div>
  );
};

export default TemperatureSettings;