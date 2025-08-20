import { makeAutoObservable, action, observable } from 'mobx';

class WeatherStore {
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

    constructor() {
        makeAutoObservable(this, {
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