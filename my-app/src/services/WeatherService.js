
class WeatherAPIAdapter {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = 'https://api.weatherbit.io/v2.0';
      this.units = 'metric'; // 'metric' для Цельсия, 'imperial' для Фаренгейта
    }
  
    // Основной метод для получения погоды по координатам
    async getWeatherByCoordinates(lat, lon) {
      try {
        const url = new URL(`${this.baseUrl}/current`);
        url.searchParams.append('lat', lat);
        url.searchParams.append('lon', lon);
        url.searchParams.append('key', this.apiKey);
        url.searchParams.append('units', this.units);
  
        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
        
      } catch (error) {
        console.error('Ошибка при запросе к Weatherbit API:', error);
        throw new Error('Не удалось получить данные о погоде');
      }
    }
  
    // Дополнительный метод для получения погоды по названию города
    async getWeatherByCity(city) {
      try {
        const url = new URL(`${this.baseUrl}/current`);
        url.searchParams.append('city', city);
        url.searchParams.append('key', this.apiKey);
        url.searchParams.append('units', this.units);
  
        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
        
      } catch (error) {
        console.error('Ошибка при запросе к Weatherbit API:', error);
        throw new Error('Не удалось получить данные о погоде');
      }
    }
  
    // Метод для получения прогноза на несколько дней
    async getForecast(lat, lon, days = 5) {
      try {
        const url = new URL(`${this.baseUrl}/forecast/daily`);
        url.searchParams.append('lat', lat);
        url.searchParams.append('lon', lon);
        url.searchParams.append('key', this.apiKey);
        url.searchParams.append('units', this.units);
        url.searchParams.append('days', days);
  
        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
        
      } catch (error) {
        console.error('Ошибка при запросе прогноза:', error);
        throw new Error('Не удалось получить прогноз погоды');
      }
    }
  }