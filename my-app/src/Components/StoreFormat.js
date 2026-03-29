export const mapApiDataToStoreFormat = (apiResponse) => {
    const FAHRENHEIT_FREEZING_POINT = 32;
    const CELSIUS_FAHRENHEIT_RATIO = 9 / 5;
    const currentWeather = apiResponse.data[0];
    const weatherConditionString = currentWeather.weather?.description ||
        (currentWeather.clouds > 50 ? "Cloudy" : "Clear");
    return {
        feel: Math.round(currentWeather.app_max_temp),
        wind: Math.round(currentWeather.wind_spd),
        humidity: currentWeather.rh,
        feeltemperature: Math.round(currentWeather.temp),
        day: new Date(currentWeather.valid_date).getDate(),
        weatherConditionString: weatherConditionString,
        fahrenheittemperature: Math.round(
            (currentWeather.temp - FAHRENHEIT_FREEZING_POINT) * CELSIUS_FAHRENHEIT_RATIO
        ),

        weatherData: apiResponse.data.map(({
            valid_date,
            weather,
            clouds,
            temp,
            app_max_temp,
            wind_spd,
            rh,
            pres,
            uv
        }) => ({
            day: new Date(valid_date).getDate(),
            weatherCondition: weather?.description ||
                (clouds > 50 ? "Cloudy" : "Clear"),
            temperature: Math.round(temp),
            feelsLike: Math.round(app_max_temp),
            windSpeed: Math.round(wind_spd),
            humidity: rh,
            pressure: pres,
            uvIndex: uv,
            validDate: valid_date,
            clouds: clouds
        }))
    };
};
export default mapApiDataToStoreFormat;