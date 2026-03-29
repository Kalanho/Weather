import { mapApiDataToStoreFormat } from '../Components/StoreFormat';
class WeatherAPIAdapter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.weatherbit.io/v2.0';
        this.units = 'metric';
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);
            console.log("response: ", response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("data: ", data);
            return data;
        } catch (error) {
            console.error('Ошибка при запросе к Weatherbit API:', error);
            throw error;
        }
    }

    async getWeatherByCoordinates(lat, lon) {
        try {
            const url = new URL(`${this.baseUrl}/current`);
            url.searchParams.append('lat', lat);
            url.searchParams.append('lon', lon);
            url.searchParams.append('key', this.apiKey);
            url.searchParams.append('units', this.units);
            return await this.fetchData(url.toString());
        } catch (error) {
            console.error('Ошибка при запросе к Weatherbit API:', error);
            throw new Error('Не удалось получить данные о погоде');
        }
    }

    async getWeatherByCity(city) {
        try {
            const url = new URL(`${this.baseUrl}/current`);
            url.searchParams.append('city', city);
            url.searchParams.append('key', this.apiKey);
            url.searchParams.append('units', this.units);
            return await this.fetchData(url.toString());
        } catch (error) {
            console.error('Ошибка при запросе к Weatherbit API:', error);
            throw new Error('Не удалось получить данные о погоде');
        }
    }

    async getForecast(lat, lon, days = 3) {
        try {
            const url = new URL(`${this.baseUrl}/forecast/daily`);
            url.searchParams.append('lat', lat);
            url.searchParams.append('lon', lon);
            url.searchParams.append('key', this.apiKey);
            url.searchParams.append('units', this.units);
            url.searchParams.append('days', days);
            return await this.fetchData(url.toString());
        } catch (error) {
            console.error('Ошибка при запросе прогноза:', error);
            throw new Error('Не удалось получить прогноз погоды');
        }
    }


    mapApiDataToStoreFormat(apiResponse) {
        return mapApiDataToStoreFormat(apiResponse);
    }


    async getMappedForecast(lat, lon, days = 5) {
        const forecastData = await this.getForecast(lat, lon, days);
        return this.mapApiDataToStoreFormat(forecastData);
    }
}

const testFunction = async () => {
    const apikey = "e98fc5d9896b49c1b09d0374688962c1";
    const lat = "53.9045";
    const lon = "27.5615";
    const connector = new WeatherAPIAdapter(apikey);
    const data = await connector.getForecast(lat, lon);
    console.log("Сырые данные:", data);
    console.log("Тестируем маппинг ответа от API");
    const dataRemapped = connector.mapApiDataToStoreFormat(data);
    console.log("dataRemapped: ", dataRemapped);
    console.log("Тестируем getMappedForecast:");
    const mappedForecast = await connector.getMappedForecast(lat, lon);
    console.log("mappedForecast: ", mappedForecast);
};

testFunction();

export default WeatherAPIAdapter;