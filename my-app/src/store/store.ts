import { makeAutoObservable, action, observable } from 'mobx';
import translations from './constants';
import WeatherAPIAdapter from '../adapters/WeatherAPIAdapter';
import updateStoreWithWeatherData from './storeUpdaters';

const TEMPERATURE = {
    FAHRENHEIT_FREEZING_POINT: 32,
    CELSIUS_FAHRENHEIT_RATIO: 9 / 5,
} as const;

class WeatherStore {
    language = 'en';
    temperatureScale: string = "°F";
    city: string = "Minsk";
    country: string = "BELARUS";
    latitude: number = 51.5074;
    longitude: number = 0.1278;
    feel: number = 6;
    wind: number = 2;
    humidity: number = 87;
    feeltemperature: number = 19;
    day: number = 1;
    weatherConditionString: string = "Rain";

    weatherData: Array<{
        day: number;
        weatherCondition: string;
        temperature: number;
    }> = [];

    weatherAPIAdapter: WeatherAPIAdapter | null = null;

    constructor() {
        makeAutoObservable(this, {
            language: observable,
            temperatureScale: observable,
            setScale: action,
            city: observable,
            setCity: action,
            country: observable,
            setCountry: action,
            latitude: observable,
            setLatitude: action,
            longitude: observable,
            setLongitude: action,
            feel: observable,
            setFeel: action,
            wind: observable,
            setWind: action,
            humidity: observable,
            setHumidity: action,
            feeltemperature: observable,
            setFeelTemperature: action,
            day: observable,
            setDay: action,
            weatherConditionString: observable,
            setWeatherConditionString: action,
            updateWeatherFromAPI: action,
            refreshWeather: action,
            refreshWeatherByCity: action,
            refreshWeatherByCoordinates: action
        });

        this.weatherData = [
            { day: 1, weatherCondition: "Clear", temperature: 23 },
            { day: 2, weatherCondition: "Clouds", temperature: 20 },
            { day: 3, weatherCondition: "Rain", temperature: 22 },
        ];
    }

    initAPIAdapter(apiKey: string) {
        this.weatherAPIAdapter = new WeatherAPIAdapter(apiKey);
    }

    async updateWeatherFromAPI(apiResponse: any) {
        if (!apiResponse || !apiResponse.data) {
            console.error('Некорректный ответ API');
            return false;
        }

        updateStoreWithWeatherData(this, apiResponse);

        if (apiResponse.lat && apiResponse.lon) {
            this.latitude = apiResponse.lat;
            this.longitude = apiResponse.lon;
        }

        return true;
    }

    async refreshWeather() {
        if (!this.weatherAPIAdapter) {
            console.error('API адаптер не инициализирован. Вызовите initAPIAdapter()');
            return false;
        }

        try {
            const forecastData = await this.weatherAPIAdapter.getForecast(
                this.latitude.toString(),
                this.longitude.toString(),
                3
            );

            if (forecastData) {
                await this.updateWeatherFromAPI(forecastData);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Ошибка при обновлении погоды:', error);
            return false;
        }
    }

    async refreshWeatherByCity(city: string) {
        if (!this.weatherAPIAdapter) {
            console.error('API адаптер не инициализирован');
            return false;
        }

        try {
            const weatherData = await this.weatherAPIAdapter.getWeatherByCity(city);

            console.log('Получены данные о городе:', weatherData);

            if (weatherData && weatherData.lat !== undefined && weatherData.lon !== undefined) {
                this.latitude = weatherData.lat;
                this.longitude = weatherData.lon;

                if (weatherData.city_name) {
                    this.city = weatherData.city_name;
                }
                if (weatherData.country_code) {
                    this.country = weatherData.country_code;
                }

                await this.refreshWeather();
                return true;
            } else {
                console.error('Не удалось получить координаты из ответа API');
                return false;
            }
        } catch (error) {
            console.error('Ошибка при поиске города:', error);
            return false;
        }
    }

    async refreshWeatherByCoordinates(lat: number, lon: number) {
        this.latitude = lat;
        this.longitude = lon;
        return await this.refreshWeather();
    }


    getDisplayTemperature(celsius: number): number {
        if (this.temperatureScale === "°F") {
            return Math.round((celsius * 9 / 5) + 32);
        }
        return Math.round(celsius);
    }


    getDisplayFeelTemperature(): number {
        return this.getDisplayTemperature(this.feeltemperature);
    }


    getDisplayFeel(): number {
        return this.getDisplayTemperature(this.feel);
    }


    setScale(temperatureScale: string) {
        this.temperatureScale = temperatureScale;
    }

    setInitialFeelTemperature(celsius: number) {
        this.feeltemperature = celsius;
        this.feel = celsius;
    }

    getTranslations() {
        return translations;
    }

    setLanguage(language: string) {
        this.language = language;
    }

    setCity(city: string) {
        this.city = city;
    }

    setCountry(country: string) {
        this.country = country;
    }

    setLatitude(latitude: number) {
        this.latitude = latitude;
    }

    setLongitude(longitude: number) {
        this.longitude = longitude;
    }

    setFeel(feel: number) {
        this.feel = feel;
    }

    setWind(wind: number) {
        this.wind = wind;
    }

    setHumidity(humidity: number) {
        this.humidity = humidity;
    }

    setFeelTemperature(temperature: number) {
        this.feeltemperature = temperature;
    }

    setDay(day: number) {
        this.day = day;
    }

    setWeatherConditionString(condition: string) {
        this.weatherConditionString = condition;
    }
}

const store = new WeatherStore();
export default store;