const apiKey = "0fda29a098e8463ab01ee469c053d335";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

let unit = "metric";
let city = null;

const searchBox = document.querySelector(".weather_search input");
const searchBtn = document.querySelector(".weather_search i");
const weatherImg = document.querySelector(".weather-icon");
const celsiusBtn = document.querySelector(".weather_unit_celsius");
const fahrenheitBtn = document.querySelector(".weather_unit_farenheit");

async function checkWeather(weather_city) {
  const response = await fetch(
    `${apiUrl}${weather_city}&appid=${apiKey}&units=${unit}`
  );

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather_body").style.display = "none";
    document.querySelector(".weather_info").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".weather_city h1").innerHTML = data.name;
    document.querySelector(".weather_temp").innerHTML = `${data.main.temp}&#176`;
    document.querySelector(".weather_realfeel" ).innerHTML = `${data.main.feels_like}&#176`;
    document.querySelector(".weather_humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".weather_wind").innerHTML = `${data.wind.speed}m/s`;
    document.querySelector(".weather_pressure").innerHTML = `${data.main.pressure}hPa`;
    city = weather_city;

    if (data.weather[0].main == "Clouds") {
      switch (data.weather[0].description) {
        case "scattered clouds":
          weatherImg.src = "assets/img/scatteredclouds.png";
          break;
        case "broken clouds":
          weatherImg.src = "assets/img/brokenclouds.png";
          break;
        case "overcast clouds":
          weatherImg.src = "assets/img/brokenclouds.png";
          break;
        default:
          weatherImg.src = "assets/img/fewclouds.png";
      }
    } else if (data.weather[0].main == "Clear") {
      weatherImg.src = "assets/img/clearsky.png";
    } else if (data.weather[0].main == "Rain") {
      switch (data.weather[0].description) {
        case "light rain":
          weatherImg.src = "assets/img/rain.png";
          break;
        case "moderate rain":
          weatherImg.src = "assets/img/rain.png";
          break;
        case "heavy intensity rain":
          weatherImg.src = "assets/img/rain.png";
          break;
        case "very heavy rain":
          weatherImg.src = "assets/img/rain.png";
          break;
        case "extreme rain":
          weatherImg.src = "assets/img/rain.png";
          break;
        case "freezing rain":
          weatherImg.src = "assets/img/rain-freezing.png";
          break;
        case "freezing rain":
          weatherImg.src = "assets/img/snow.png";
          break;
        case "light intensity shower rain":
          weatherImg.src = "assets/img/showerrain.png";
          break;
        case "shower rain":
          weatherImg.src = "assets/img/showerrain.png";
          break;
        case "heavy intensity shower rain":
          weatherImg.src = "assets/img/showerrain.png";
          break;
        case "ragged shower rain":
          weatherImg.src = "assets/img/showerrain.png";
          break;
        default:
          weatherImg.src = "assets/img/rain.png";
      }
    } else if (data.weather[0].main == "Drizzle") {
      weatherImg.src = "assets/img/showerrain.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.src = "assets/img/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherImg.src = "assets/img/snow.png";
    }

    const weatherBody = document.querySelector(".weather_body");
    const weatherInfo = document.querySelector(".weather_info");
    const weatherError = document.querySelector(".error");

    weatherBody.style.display = "block";
    weatherInfo.style.display = "flex";
    weatherError.style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    checkWeather(searchBox.value);
  }
});

celsiusBtn.addEventListener("click", () => {
  if (unit !== "metric") {
    unit = "metric";
    if (city !== null) {
      checkWeather(city);
    }
  }
});

fahrenheitBtn.addEventListener("click", () => {
  if (unit !== "imperial") {
    unit = "imperial";
    if (city !== null) {
      checkWeather(city);
    }
  }
});
