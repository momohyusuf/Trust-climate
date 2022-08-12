const weatherImage = document.getElementById('weather-image');

const update = document.getElementById('last--update');
const locationNameValue = document.getElementById('location--name--value');
const locationTime = document.getElementById('time');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

const getWeatherInfo = document.getElementById('get-weather-info');
const place = document.getElementById('location');
const weatherCondition = document.getElementById('weather-condition');
const twentyFourHourForecast = document.getElementById(
  'twenty-four-hour-forecast'
);
const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');
const humidityText = document.getElementById('humidity');
const wind = document.getElementById('wind');
const windDirection = document.getElementById('wind-direction');
// ////////////////

// fetch Nigeria's weather information when the website loads fro the first time
window.addEventListener('DOMContentLoaded', () => {
  return weatherApi('Nigeria');
});
// /////////////

// this function gets the new location value every time it is clicked
getWeatherInfo.addEventListener('click', () => {
  weatherApi(locationNameValue.value);
});
// /////////////////

// this is the function that is responsible for fetching th data
const url = 'http://api.weatherapi.com/v1';
const key = 'bec8e4705ff4fc8872191844220908';
const weatherApi = async (arg) => {
  try {
    const response = await fetch(
      `${url}/forecast.json?key=1${key}&q=${arg}&days=1&aqi=no&alerts=no`
    );
    let data = await response.json();
    // destructuring the needed values from the data gotten from the api
    const {
      current: {
        last_updated,
        wind_degree,
        wind_dir,
        temp_c,
        temp_f,
        humidity,
        condition: { icon, text },
      },
      location: { name, country, localtime },
      forecast: { forecastday },
    } = data;

    //setting the html content to the values destructed from the data

    weatherImage.src = icon;
    weatherCondition.textContent = text;
    sunrise.textContent = forecastday[0].astro.sunrise;
    sunset.textContent = forecastday[0].astro.sunset;
    locationTime.textContent = ` ${new Date(
      localtime
    ).toDateString()} ${new Date(localtime).toLocaleTimeString()}`;
    update.textContent = last_updated;
    place.textContent = `${name} ${country}`;
    wind.textContent = wind_degree;
    windDirection.textContent = wind_dir;
    humidityText.textContent = humidity + '' + '%';
    celsius.textContent = temp_c;

    fahrenheit.textContent = temp_f;

    // getting the twenty four hour daily forecast
    const dailyHourForecast = forecastday[0].hour
      .map((item) => {
        return ` <div class="hourly--forecast">
           <h2>${new Date(item.time).toLocaleTimeString()}</h2>
            <p>${item.condition.text}</p>
         <div class="hourly--forecast--footer">
            <img src=${item.condition.icon} />
            <div>
            <p>${item.temp_c}ºC</p>
            <p>${item.temp_f}°F</p>
            </div>
         
         </div>
     </div>
     `;
      })
      .join(' ');
    twentyFourHourForecast.innerHTML = dailyHourForecast;
    // //////////////
  } catch (error) {
    console.log(error);
  }
};
// ///////////////////////////
