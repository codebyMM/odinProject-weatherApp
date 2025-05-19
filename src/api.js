// api.js

export async function getWeather(city) {
    city = `${city[0].toUpperCase()}${city.slice(1)}`;
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=9RE7UDPQFZGNTMPF2N6LPF24S`);
    const weatherData = await response.json();
    return weatherData;
}
