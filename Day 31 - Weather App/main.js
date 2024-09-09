const API_KEY = "3540ed5323b3e51df96ad6cf38f42cba";


const ENDPOINTS = {
    CURRENT_FORECAST: "https://api.openweathermap.org/data/2.5/weather",
    FIVE_DAY_FORECAST: "https://api.openweathermap.org/data/2.5/forecast"
}

const formatTemperature = (value) => `${value.toFixed(1)} ℃`

const getIcon = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`

const formatTime = (time) => {
    let [hours, minutes,] = time.split(":");
    return `${hours}:${minutes}`
}

document.addEventListener("DOMContentLoaded", () => {
    const loadCurrentForecast = async () => {
        const cityName = "Pune";
        const response = await fetch(`${ENDPOINTS.CURRENT_FORECAST}?q=${cityName}&appid=${API_KEY}&units=metric`);
        return response.json();

    }

    const getHourlyForecast = async (city) => {

        const response = await fetch(`${ENDPOINTS.FIVE_DAY_FORECAST}?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        return data.list.map(forecast => {
            let { main: { temp, temp_max, temp_min }, dt, dt_txt, weather: [{ description, icon }] } = forecast;
            return { temp, temp_max, temp_min, dt, dt_txt, description, icon }
        })
    }



    const createCurrentForecast = ({ name, main: { temp, temp_min, temp_max }, weather: [{ description, icon }] }) => {
        // <h1>
        //         name
        //     </h1>
        //     <p class="temp">24</p>
        //     <p class="description">description </p>
        //     <p class="min-max-temp">high low</p>


        const container = document.getElementById("current-forecast");

        const heading = document.createElement("h1");
        heading.textContent = name;
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
        minMaxTemp.textContent = `H: ${formatTemperature(temp_max)} L: ${formatTemperature(temp_min)}`

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

    const loadData = async () => {
        const currentForecast = await loadCurrentForecast();
        createCurrentForecast(currentForecast)
        const hourlyForecast = await getHourlyForecast(currentForecast.name);
        createHourlyForecast(hourlyForecast);

    }



    loadData();
})


