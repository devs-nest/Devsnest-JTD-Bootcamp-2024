const API_KEY = "b0057d022ba1916d88cf8ec6245d661e";

const DAY_OF_THE_WEEK = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const ENDPOINTS = {
    CURRENT_FORECAST_CORD: "https://api.openweathermap.org/data/2.5/weather",
    CURRENT_FORECAST: "https://api.openweathermap.org/data/2.5/weather",
    FIVE_DAY_FORECAST: "https://api.openweathermap.org/data/2.5/forecast",
    GEOLOCATION: "http://api.openweathermap.org/geo/1.0/direct"
}

const formatTemperature = (value) => `${value.toFixed(1)}℃`

const getIcon = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`

const formatTime = (time) => {
    let [hours, minutes,] = time.split(":");
    return `${hours}:${minutes}`
}

const getDay = (dateValue) => DAY_OF_THE_WEEK[new Date(dateValue).getDay()]

document.addEventListener("DOMContentLoaded", () => {
    const loadCurrentForecast = async ({ lat, lon }) => {
        const cityName = "Pune";
        const response = lat && lon ? await fetch(`${ENDPOINTS.CURRENT_FORECAST_CORD}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`) :
            await fetch(`${ENDPOINTS.CURRENT_FORECAST}?q=${cityName}&appid=${API_KEY}&units=metric`);
        return response.json();

    }

    const getHourlyForecast = async (city) => {

        const response = await fetch(`${ENDPOINTS.FIVE_DAY_FORECAST}?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        console.log(data);

        return data.list.map(forecast => {
            let { main: { temp, temp_max, temp_min }, dt, dt_txt, weather: [{ description, icon }] } = forecast;
            return { temp, temp_max, temp_min, dt, dt_txt, description, icon }
        })
    }



    const createCurrentForecast = ({ sys: { country }, name, main: { temp, temp_min, temp_max }, weather: [{ description, icon }] }) => {
        // <h1>
        //         name
        //     </h1>
        //     <p class="temp">24</p>
        //     <p class="description">description </p>
        //     <p class="min-max-temp">high low</p>


        const container = document.getElementById("current-forecast");
        container.innerHTML = "";

        const heading = document.createElement("h1");
        heading.textContent = `${name}, ${country}`;
        const temperature = document.createElement("p");
        temperature.classList.add("temp");
        temperature.textContent = formatTemperature(temp);

        const descriptionContainer = document.createElement("section");
        descriptionContainer.classList.add("description-container");



        const iconElement = document.createElement("img");
        iconElement.src = getIcon(icon);
        iconElement.classList.add("icon");

        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("description");
        descriptionElement.textContent = description;

        descriptionContainer.append(iconElement, descriptionElement);

        const minMaxTemp = document.createElement("p");
        minMaxTemp.classList.add("min-max-temp")
        minMaxTemp.textContent = `H: ${formatTemperature(temp_max)} L: ${formatTemperature(temp_min)} `

        // container.appendChild(heading);
        // container.appendChild(temperature);
        // container.appendChild(descriptionElement);
        // container.ap
        // container.appendChild(minMaxTemp);
        container.append(heading, temperature, descriptionContainer, minMaxTemp)

    }

    const createHourlyForecast = (hourlyForecast) => {
        let dataFor12Entries = hourlyForecast.slice(1, 13);
        // <article>
        //     <h3 class="time">now</h3>
        //     <p class="icon">icon</p>
        //     <p class="hourly-temp">temp</p>
        // </article>
        const hourlyContainerElement = document.querySelector(".hourly-forecast-container");
        hourlyContainerElement.innerHTML = "";

        for (let { temp, icon, dt_txt } of dataFor12Entries) {
            const container = document.createElement("article");
            container.classList.add("hour-info");

            const time = document.createElement("h3");
            time.textContent = formatTime(dt_txt.split(" ")[1]);
            time.classList.add("time");

            const iconImage = document.createElement("img");
            iconImage.classList.add("icon")
            iconImage.src = getIcon(icon);

            const temperature = document.createElement("p");
            temperature.classList.add("hourly-temp");
            temperature.textContent = formatTemperature(temp);

            container.append(time, iconImage, temperature);

            hourlyContainerElement.appendChild(container);
        }

    }





    const createFiveDayForecast = (hourlyForecast) => {
        const result = Object.groupBy(hourlyForecast, (forecast) => getDay(forecast.dt_txt.split(" ")[0]))
        console.log(result);


        for (let day in result) {
            let temp_min = Math.min(...Array.from(result[day], ({ temp_min }) => temp_min))
            let temp_max = Math.max(...Array.from(result[day], ({ temp_max }) => temp_max))
            result[day] = { temp_max, temp_min, icon: getIcon(result[day][0].icon) }
        }
        const forecastContainer = document.querySelector(".five-day-forecast-container");
        forecastContainer.innerHTML = "";

        for (let day in result) {
            const dayContainer = document.createElement("article");
            dayContainer.classList.add("day-wise-forecast");

            const dayOfTheWeek = document.createElement("h3");
            dayOfTheWeek.classList.add("day");
            dayOfTheWeek.textContent = day === DAY_OF_THE_WEEK[new Date().getDay()] ? "Today" : day;

            const image = document.createElement("img");
            image.src = result[day].icon;
            image.classList.add("icon")

            const minTemp = document.createElement("p");
            minTemp.classList.add("min-temp");
            minTemp.textContent = formatTemperature(result[day].temp_min);

            const maxTemp = document.createElement("p");
            maxTemp.classList.add("max-temp");
            maxTemp.textContent = formatTemperature(result[day].temp_max);

            dayContainer.append(dayOfTheWeek, image, minTemp, maxTemp);
            forecastContainer.appendChild(dayContainer);
        }


    }

    const createFeelsLike = ({ main: { feels_like } }) => {
        const element = document.querySelector("#feels-like .temp");
        element.textContent = formatTemperature(feels_like);
    }

    const createHumidity = ({ main: { humidity } }) => {
        const element = document.querySelector("#humidity .humidity");
        element.textContent = `${humidity}% `;

    }

    const loadData = async (data) => {
        const currentForecast = await loadCurrentForecast(data);
        console.log(currentForecast);

        createCurrentForecast(currentForecast)
        const hourlyForecast = await getHourlyForecast(currentForecast.name);
        console.log(hourlyForecast);
        createFeelsLike(currentForecast);
        createHumidity(currentForecast);
        createHourlyForecast(hourlyForecast);

        createFiveDayForecast(hourlyForecast);

    }

    const getGeolocationInfo = async (cityName) => {
        const response = await fetch(`${ENDPOINTS.GEOLOCATION}?q=${cityName}&limit=5&appid=${API_KEY}`)
        return response.json();
    }


    const onInput = async event => {

        let cityName = event.target.value;
        if (cityName) {
            const cities = await getGeolocationInfo(cityName);
            const dataList = document.getElementById("cities");
            let options = "";
            for (let { lat, lon, country, name, state } of cities) {
                options += `<option data-coords=${JSON.stringify({ lat, lon })} value="${name}, ${state}, ${country}"></option >`;
            }
            dataList.innerHTML = options;
        }

    }


    function debounce(func, timeout = 800) {
        let timer;
        return (...args) => {
            console.log("debounce called");
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args)
            }, timeout);

        }
    }

    const onSelect = (event) => {
        let selectedOption = document.querySelector("datalist > option");
        if (selectedOption) {
            let result = JSON.parse(selectedOption.getAttribute("data-coords"));
            if (result) {
                loadData(result)
            }
        }

    }

    const searchElement = document.getElementById("search");
    const debounceSearch = debounce(event => onInput(event));
    searchElement.addEventListener("input", debounceSearch);
    searchElement.addEventListener("change", onSelect)
    // loadData();

    const loadDataUsingGeolocation = () => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lon } }) => {
            loadData({ lat, lon });
        }, () => {
            alert("Unable to fetch location");
            loadData({});
        })
    }

    loadDataUsingGeolocation();

})


