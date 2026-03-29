import { mapApiDataToStoreFormat } from '../Components/StoreFormat';

export const updateStoreWithWeatherData = (store, apiResponse) => {
    const mappedData = mapApiDataToStoreFormat(apiResponse);

    store.feel = mappedData.feel;
    store.wind = mappedData.wind;
    store.humidity = mappedData.humidity;
    store.feeltemperature = mappedData.feeltemperature;
    store.day = mappedData.day;
    store.weatherConditionString = mappedData.weatherConditionString;
    store.fahrenheittemperature = mappedData.fahrenheittemperature;
    store.weatherData = mappedData.weatherData;
    store.cityName = apiResponse.city_name;
    store.countryCode = apiResponse.country_code;
    store.timezone = apiResponse.timezone;

    if (typeof store.notifyListeners === 'function') {
        store.notifyListeners();
    }

    return store;
};

export default updateStoreWithWeatherData;
