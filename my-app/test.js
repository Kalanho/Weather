import fetch from 'node-fetch';

class WeatherAPIAdapter {
    constructor (apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.weatherbit.io/v2.0';
        this.units = 'metric'; // 'metric' для Цельсия, 'imperial' для Фаренгейта
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
        }
    }

    // Основной метод для получения погоды по координатам
    async getWeatherByCoordinates(lat, lon) {
        try {
            const url = new URL(`${this.baseUrl}/current`);
            url.searchParams.append('lat', lat);
            url.searchParams.append('lon', lon);
            url.searchParams.append('key', this.apiKey);
            url.searchParams.append('units', this.units);

            const data = this.fetchData(url.toString());
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

            const data = this.fetchData(url.toString());
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

            const data = this.fetchData(url.toString());
            return data;

        } catch (error) {
            console.error('Ошибка при запросе прогноза:', error);
            throw new Error('Не удалось получить прогноз погоды');
        }
    }



    mapApiDataToStoreFormat(apiResponse) {
        const FAHRENHEIT_FREEZING_POINT = 32;
        const CELSIUS_FAHRENHEIT_RATIO = 9 / 5;

        // Берем первый день из данных (текущий/сегодняшний)
        const currentWeather = apiResponse.data[0];

        // Получаем строковое описание погоды
        const weatherConditionString = currentWeather.weather?.description ||
            (currentWeather.clouds > 50 ? "Cloudy" : "Clear");

        return {
            // Основные параметры
            feel: Math.round(currentWeather.app_max_temp), // ощущаемая температура
            wind: Math.round(currentWeather.wind_spd), // скорость ветра
            humidity: currentWeather.rh, // влажность
            feeltemperature: Math.round(currentWeather.temp), // текущая температура
            day: new Date(currentWeather.valid_date).getDate(), // день месяца
            weatherConditionString: weatherConditionString,
            fahrenheittemperature: Math.round(
                (currentWeather.temp - FAHRENHEIT_FREEZING_POINT) * CELSIUS_FAHRENHEIT_RATIO
            ), // температура в фаренгейтах

            // Дополнительные параметры для WeatherCard
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
}


const testFunction = async () => {
    const apikey = "e98fc5d9896b49c1b09d0374688962c1";
    const lat = "53.9045";
    const lon = "27.5615";
    const connector = new WeatherAPIAdapter(apikey);

    const data = await connector.getForecast(lat, lon);
    console.log(data);

    console.log("Тестируем ремппинг ответа от АПИ");
    const dataRemapped = connector.mapApiDataToStoreFormat(data);
    console.log("dataRemapped: ", dataRemapped)
}

testFunction()


// у меня есть UI:

//     < General_information
// feel = { store.feel }
// wind = { store.wind }
// humidity = { store.humidity }
// weatherCondition = { store.weatherConditionString }
// day = { store.day }
// temperature = { store.feeltemperature } />
//     <div className='days'>
//         {store.weatherData.map((weather, index) => (
//             <WeatherCard
//                 key={index}
//                 day={weather.day}
//                 weatherCondition={weather.weatherCondition}
//                 temperature={store.temperatureScale === "°F" ? weather.temperature : Math.round((weather.temperature - FAHRENHEIT_FREEZING_POINT) * CELSIUS_FAHRENHEIT_RATIO)}
//             />
//         ))}
//     </div>

// у меня есть store в моем приложении, который содержит
// эти параметры
// feel: number = 6;
// wind: number = 2;
// humidity: number = 87;
// feeltemperature: number = 19;
// day: number = 1;
// weatherConditionString: string = "Rain";
// fahrenheittemperature: number = 19;

// ответ от АПИ:

// {
//     city_name: 'Minsk',
//         country_code: 'BY',
//             data: [
//                 {
//                     app_max_temp: 13.4,
//                     app_min_temp: 3.7,
//                     clouds: 48,
//                     clouds_hi: 29,
//                     clouds_low: 1,
//                     clouds_mid: 66,
//                     datetime: '2026-03-24',
//                     dewpt: -2.4,
//                     high_temp: 13.4,
//                     low_temp: 1.1,
//                     max_dhi: null,
//                     max_temp: 13.4,
//                     min_temp: 3.5,
//                     moon_phase: 0.41,
//                     moon_phase_lunation: 0.2,
//                     moonrise_ts: 1774330900,
//                     moonset_ts: 1774312939,
//                     ozone: 385,
//                     pop: 0,
//                     precip: 0,
//                     pres: 990,
//                     rh: 44,
//                     slp: 1016,
//                     snow: 0,
//                     snow_depth: 0,
//                     sunrise_ts: 1774324835,
//                     sunset_ts: 1774369857,
//                     temp: 9.8,
//                     ts: 1774306860,
//                     uv: 1,
//                     valid_date: '2026-03-24',
//                     vis: 24,
//                     weather: [Object],
//                     wind_cdir: 'WSW',
//                     wind_cdir_full: 'west-southwest',
//                     wind_dir: 250,
//                     wind_gust_spd: 3.3,
//                     wind_spd: 1.3
//                 },
//                 {
//                     app_max_temp: 15.2,
//                     app_min_temp: 0.3,
//                     clouds: 29,
//                     clouds_hi: 31,
//                     clouds_low: 0,
//                     clouds_mid: 19,
//                     datetime: '2026-03-25',
//                     dewpt: -2.4,
//                     high_temp: 15.2,
//                     low_temp: 2.7,
//                     max_dhi: null,
//                     max_temp: 15.2,
//                     min_temp: 1.1,
//                     moon_phase: 0.53,
//                     moon_phase_lunation: 0.24,
//                     moonrise_ts: 1774420532,
//                     moonset_ts: 1774402649,
//                     ozone: 381,
//                     pop: 0,
//                     precip: 0,
//                     pres: 983,
//                     rh: 51,
//                     slp: 1008,
//                     snow: 0,
//                     snow_depth: 0,
//                     sunrise_ts: 1774411087,
//                     sunset_ts: 1774456369,
//                     temp: 8.2,
//                     ts: 1774386060,
//                     uv: 4,
//                     valid_date: '2026-03-25',
//                     vis: 24,
//                     weather: [Object],
//                     wind_cdir: 'S',
//                     wind_cdir_full: 'south',
//                     wind_dir: 189,
//                     wind_gust_spd: 2.8,
//                     wind_spd: 2.8
//                 },
//                 {
//                     app_max_temp: 12.7,
//                     app_min_temp: 0.6,
//                     clouds: 54,
//                     clouds_hi: 59,
//                     clouds_low: 1,
//                     clouds_mid: 71,
//                     datetime: '2026-03-26',
//                     dewpt: -1.6,
//                     high_temp: 12.7,
//                     low_temp: 3.1,
//                     max_dhi: null,
//                     max_temp: 12.7,
//                     min_temp: 2.7,
//                     moon_phase: 0.64,
//                     moon_phase_lunation: 0.27,
//                     moonrise_ts: 1774511402,
//                     moonset_ts: 1774491157,
//                     ozone: 391,
//                     pop: 0,
//                     precip: 0,
//                     pres: 979,
//                     rh: 53,
//                     slp: 1004,
//                     snow: 0,
//                     snow_depth: 0,
//                     sunrise_ts: 1774497339,
//                     sunset_ts: 1774542881,
//                     temp: 7.8,
//                     ts: 1774472460,
//                     uv: 1,
//                     valid_date: '2026-03-26',
//                     vis: 22.9,
//                     weather: [Object],
//                     wind_cdir: 'SSE',
//                     wind_cdir_full: 'south-southeast',
//                     wind_dir: 154,
//                     wind_gust_spd: 2.7,
//                     wind_spd: 2.7
//                 },
//                 {
//                     app_max_temp: 13.4,
//                     app_min_temp: 2.6,
//                     clouds: 58,
//                     clouds_hi: 38,
//                     clouds_low: 10,
//                     clouds_mid: 55,
//                     datetime: '2026-03-27',
//                     dewpt: 1.4,
//                     high_temp: 13.4,
//                     low_temp: 2.4,
//                     max_dhi: null,
//                     max_temp: 13.4,
//                     min_temp: 3.1,
//                     moon_phase: 0.75,
//                     moon_phase_lunation: 0.3,
//                     moonrise_ts: 1774603040,
//                     moonset_ts: 1774578888,
//                     ozone: 404,
//                     pop: 0,
//                     precip: 0,
//                     pres: 988,
//                     rh: 66,
//                     slp: 1013,
//                     snow: 0,
//                     snow_depth: 0,
//                     sunrise_ts: 1774583591,
//                     sunset_ts: 1774629394,
//                     temp: 8,
//                     ts: 1774558860,
//                     uv: 4,
//                     valid_date: '2026-03-27',
//                     vis: 24,
//                     weather: [Object],
//                     wind_cdir: 'S',
//                     wind_cdir_full: 'south',
//                     wind_dir: 182,
//                     wind_gust_spd: 1.7,
//                     wind_spd: 1.7
//                 },
//                 {
//                     app_max_temp: 12.9,
//                     app_min_temp: 1.8,
//                     clouds: 41,
//                     clouds_hi: 13,
//                     clouds_low: 1,
//                     clouds_mid: 30,
//                     datetime: '2026-03-28',
//                     dewpt: -0.1,
//                     high_temp: 12.9,
//                     low_temp: 2.2,
//                     max_dhi: null,
//                     max_temp: 12.9,
//                     min_temp: 2.4,
//                     moon_phase: 0.84,
//                     moon_phase_lunation: 0.34,
//                     moonrise_ts: 1774694854,
//                     moonset_ts: 1774666180,
//                     ozone: 416,
//                     pop: 0,
//                     precip: 0,
//                     pres: 990,
//                     rh: 61,
//                     slp: 1016,
//                     snow: 0,
//                     snow_depth: 0,
//                     sunrise_ts: 1774669843,
//                     sunset_ts: 1774715906,
//                     temp: 7.6,
//                     ts: 1774645260,
//                     uv: 4,
//                     valid_date: '2026-03-28',
//                     vis: 24,
//                     weather: [Object],
//                     wind_cdir: 'ESE',
//                     wind_cdir_full: 'east-southeast',
//                     wind_dir: 111,
//                     wind_gust_spd: 1.9,
//                     wind_spd: 1.9
//                 }
//             ],
//                 lat: 53.9045,
//                     lon: 27.5615,
//                         state_code: '04',
//                             timezone: 'Europe/Minsk'
// }

// мне нужен маппинг который вернет объект с нужными мне параметрами для обновления store это будет первая функция

// и вторая функция которая обновит store соглано объекту подготовленному в первой функции


// 1) чтобы мы получили данные о погоде (все)
// 2) чтобы мы получали данные которые мы можем подставить в наш  UI
