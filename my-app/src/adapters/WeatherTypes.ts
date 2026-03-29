export interface WeatherAPIResponse {
    city_name: string;
    country_code: string;
    state_code: string;
    timezone: string;
    lat: number;
    lon: number;
    data: WeatherData[];
}

export interface WeatherData {
    app_max_temp: number;
    app_min_temp: number;
    clouds: number;
    datetime: string;
    dewpt: number;
    high_temp: number;
    low_temp: number;
    max_temp: number;
    min_temp: number;
    pop: number;
    precip: number;
    pres: number;
    rh: number;
    slp: number;
    snow: number;
    temp: number;
    ts: number;
    uv: number;
    valid_date: string;
    vis: number;
    weather: {
        description: string;
        code: number;
        icon: string;
    };
    wind_cdir: string;
    wind_cdir_full: string;
    wind_dir: number;
    wind_spd: number;
    wind_gust_spd: number;
}

export interface CurrentWeatherResponse {
    city_name: string;
    country_code: string;
    lat: number;
    lon: number;
    timezone: string;
    data: CurrentWeather[];
}

export interface CurrentWeather {
    temp: number;
    app_temp: number;
    rh: number;
    clouds: number;
    wind_spd: number;
    wind_dir: number;
    weather: {
        description: string;
        code: number;
        icon: string;
    };
    datetime: string;
    ts: number;
    sunrise: string;
    sunset: string;
}