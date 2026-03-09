export const getWeatherIcon = (weatherCondition: string): { icon: string; condition: string } => {
    switch (weatherCondition) {
        case 'Rain':
            return { icon: 'RAIN', condition: 'RAIN' };
        case 'Clouds':
            return { icon: 'CLOUDY', condition: 'CLOUDY' };
        case 'Clear':
            return { icon: 'CLEAR_DAY', condition: 'CLEAR_DAY' };
        case 'Snow':
            return { icon: 'SNOW', condition: 'SNOW' };
        case 'Thunderstorm':
            return { icon: 'THUNDERSTORM', condition: 'THUNDERSTORM' };
        case 'Fog':
            return { icon: 'FOG', condition: 'FOG' };
        default:
            return { icon: 'CLEAR_DAY', condition: 'CLEAR_DAY' };
    }

};

export const getDays = (format: 'uppercase' | 'short' | 'capitalized' = 'capitalized'): string[] => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    switch (format) {
        case 'uppercase':
            return days.map(day => day.toUpperCase());
        case 'short':
            return days.map(day => day.substring(0, 3));
        case 'capitalized':
        default:
            return days;
    }
};