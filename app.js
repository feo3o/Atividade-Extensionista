Notification.requestPermission();

function notify()
{
    new Notification("O tempo acabou!");
}

let timeleft = 10800000;
let interval;

const timerUpdate = () => {
    const hours = Math.floor(timeleft / (1000 * 60 * 60));
    const minutes = Math.floor(timeleft / (1000 * 60) % 60);
    const seconds = timeleft % 60;

    relogio.innerHTML = `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
}

const startTimer = () => {
    interval = setInterval(() => {
        timeleft--;
        timerUpdate();

        if (timeleft === 0)
        {
            clearInterval(interval);
            notify("O tempo acabou!");
            timeleft = 10800000;
            timerUpdate();
        }
    }, 1000);
}

const pauseTimer = () => clearInterval(interval);
start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);

const aviso = document.getElementById("aviso");
const borda = document.getElementById("weather-container");

function getWeather() {
    const apiKey = 'COLOQUE SUA API AQUI';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Por favor digite uma cidade');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p style="">${cityName}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); 

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); 
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); 

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}
