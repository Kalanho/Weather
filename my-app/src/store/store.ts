import { makeAutoObservable, action, observable } from 'mobx';
import translations from './constants';

const TEMPERATURE = {
    FAHRENHEIT_FREEZING_POINT: 32,
    CELSIUS_FAHRENHEIT_RATIO: 5 / 9,
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
    fahrenheittemperature: number = 19;



    weatherData: Array<{
        day: number;
        weatherCondition: string;
        temperature: number;
    }> = [];
    constructor() {
        makeAutoObservable(this, {
            setInitialFeelTemperature: action,
            fahrenheittemperature: observable,
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
            setWeatherConditionString: action
        });
        this.weatherData = [
            { day: 1, weatherCondition: "Clear", temperature: 23 },
            { day: 2, weatherCondition: "Clouds", temperature: 20 },
            { day: 3, weatherCondition: "Rain", temperature: 22 },
        ];
    }


    fahrenheit(): number {
        return this.temperatureScale === "°F" ?
            this.fahrenheittemperature :
            Math.round((this.fahrenheittemperature - TEMPERATURE.FAHRENHEIT_FREEZING_POINT) * TEMPERATURE.CELSIUS_FAHRENHEIT_RATIO);
    }

    setScale(temperatureScale: string) {
        this.temperatureScale = temperatureScale;
        this.feel = this.fahrenheit();
        this.feeltemperature = this.fahrenheit();
    }

    setInitialFeelTemperature(fahrenheittemperature: number) {
        this.fahrenheittemperature = fahrenheittemperature;
        this.feel = this.fahrenheit();
        this.feeltemperature = this.fahrenheit();
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