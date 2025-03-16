const diabetes = document.getElementById("diabetes");
const colesterol = document.getElementById("colesterol");
const postura = document.getElementById("postura");
const depressao = document.getElementById("depressao");
const diabetes_class = document.getElementById("diabetes_class")
const colesterol_class = document.getElementById("colesterol_class");
const postura_class = document.getElementById("postura_class");
const depressao_class = document.getElementById("depressao_class");
const update_page = document.getElementById("reload");
const diabetes_start = document.getElementById("diabetes_start");
const diabetes_pause = document.getElementById("diabetes_pause");
const diabetes_timer = document.getElementById("diabetes_timer");

Notification.requestPermission();

function notify()
{
    new Notification("O tempo acabou!");
}

diabetes.addEventListener("click", event => 
{
    diabetes_class.style.display = "block";

});

colesterol.addEventListener("click", event =>
{
    colesterol_class.style.display = "block";
});

postura.addEventListener("click", event =>
{
    postura_class.style.display = "block";
});

depressao.addEventListener("click", event =>
{
    depressao_class.style.display = "block";
});

reload.addEventListener("click", event =>
{
    location.reload();
});

let diabetes_timeleft = 10800000;
let diabetes_interval;

const diabetesTimerUpdate = () => {
    const hours = Math.floor(diabetes_timeleft / (1000 * 60 * 60));
    const diabetes_minutes = Math.floor(diabetes_timeleft / (1000 * 60) % 60);
    const diabetes_seconds = diabetes_timeleft % 60;

    diabetes_timer.innerHTML = `${hours.toString().padStart(2,"0")}:${diabetes_minutes.toString().padStart(2,"0")}:${diabetes_seconds.toString().padStart(2,"0")}`;
}

const diabetesStartTimer = () => {
    diabetes_interval = setInterval(() => {
        diabetes_timeleft--;
        diabetesTimerUpdate();

        if (diabetes_timeleft === 0)
        {
            clearInterval(interval);
            notify("O tempo acabou!");
            diabetes_timeleft = 10800000;
            diabetesTimerUpdate();
        }
    }, 1000);
}

const diabetes_pauseTimer = () => clearInterval(diabetes_interval);

const pomodoro_timer = document.getElementById("pomodoro_timer");
const pomodoro_start = document.getElementById("start");
const pomodoro_pause = document.getElementById("pause");
const pomodoro_restart = document.getElementById("restart");
let time_left = 1500;
let interval;

const updateTimer = () => {
    const minutes = Math.floor(time_left / 60);
    const seconds = time_left % 60;

    pomodoro_timer.innerHTML = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
}

const startTimer = () => {
    interval = setInterval(() => {
        time_left--;
        updateTimer();

        if (time_left === 0)
        {
            clearInterval(interval);
            notify("O tempo acabou!");
            time_left = 1500;
            updateTimer();
        }
    }, 1000);
}

const stopTimer = () => clearInterval(interval);
const resetTimer = () => {
    clearInterval(interval);
    time_left = 1500;
    updateTimer();
}

pomodoro_start.addEventListener("click", startTimer);
pomodoro_pause.addEventListener("click", stopTimer);
pomodoro_restart.addEventListener("click", resetTimer);
diabetes_start.addEventListener("click", diabetesStartTimer);
diabetes_pause.addEventListener("click", diabetes_pauseTimer);

const aviso = document.getElementById("aviso");
const borda = document.getElementById("weather-container");

function getWeather() {
    const apiKey = '################';
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

        if (temperature > 29)
        {
            aviso.innerHTML = `A temperatura hoje é alta, cuidado com a desidratação e com a baixa humidade.<br> Use protetor solar ou evite sair de casa durante o pico de temperatura.`
            borda.style.border="5px solid red";
            borda.style.boxShadow="10px 10px 100px red";
        }
        else if (temperature >20)
        {
            aviso.innerHTML = `A temperatura hoje está agradável.`
            borda.style.border="5px solid yellow";
            borda.style.boxShadow="10px 10px 100px yellow";
        }
        else
        {
            aviso.innerHTML = `Hoje a temperatura está baixa, cuidado com ventos fortes e chuvas.`;
            borda.style.border="5px solid blue";
            borda.style.boxShadow="10px 10px 100px blue";
        }

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
