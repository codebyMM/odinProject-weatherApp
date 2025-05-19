// doms.js
import {
    getWeather
} from "./api";
const cityElement = document.querySelector('.city');
const dayData = document.querySelector('.day-data');
const dateData = document.querySelector('.date-data');
const weatherDescription = document.querySelector('.weather-description');
const temperature = document.querySelector('.temperature');
const body = document.body;
const loading = document.querySelector('.loading');

export async function showData(city = "london") {
    loading.classList.remove('hide');
    try {
        await delay(1000);
        let currentData = await getWeather(city);
        let date = getDateData(currentData.currentConditions.datetimeEpoch);
        loading.classList.add('hide');

        dayData.innerText = date.day;
        dateData.innerText = `${date.month} ${date.date}, ${date.year}`;
        weatherDescription.innerText = currentData.currentConditions.conditions;
        temperature.innerHTML = `${convertToCelsius(currentData.currentConditions.temp)}&#176;C`;
        cityElement.innerText = currentData.resolvedAddress;
        createDays(currentData.days);

        if (currentData.currentConditions.conditions.includes('Rain')) {
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        } else {
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1746937807433-05748b80caf4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        }
    } catch (err) {
        loading.classList.add('hide');
        alert('Cant Find Your City');
    }
}

function convertToCelsius(x) {
    return Math.floor((x - 32) * 5 / 9);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
};

function createDays(days) {
    const dayContainer = document.querySelector('.upcoming-weathers');
    const day = days.filter((__, index) => index > 0 && index <= 5);

    dayContainer.innerHTML = '<h4>Upcoming Weathers</h4>' + day.map((d) => {
        let date = getDateData(d.datetimeEpoch);
        return `<div class="day">
        <div>
        <p class="upcoming-description">${d.conditions}</p>
        <p class="upcoming-temperature">${convertToCelsius(d.temp)}&#176;C</p>
        </div>
        <div class="upcoming-date">${date.date} ${date.month} ${date.year}</div>
        </div>`
    }).join('');
    return dayContainer;
}

function getDateData(epoch) {
    const date = new Date(epoch * 1000);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return {
        day: days[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear()
    };
}