const container = document.querySelector(".container");
const search = document.querySelector(".searchbox button");
const weatherbox = document.querySelector(".weatherbox");
const weatherdetails = document.querySelector(".weatherdetails");
const error = document.querySelector(".notfound");

search.addEventListener("click", () => {
  const APIkey = "481e3346a7caa677a6cb179fbd8fd43c";

  const city = document.querySelector("#search").value;

  // Remove active classes before fetching new data to allow re-triggering animations
  weatherbox.classList.remove("active");
  weatherdetails.classList.remove("active");
  error.classList.remove("active");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherbox.classList.remove("active");
        weatherdetails.classList.remove("active");
        error.classList.add("active");
        return;
      }
      container.style.height = "470px";

      const image = document.querySelector(".weatherbox img");
      const temperature = document.querySelector(".weatherbox .temperature");
      const description = document.querySelector(".weatherbox .description");
      const humidity = document.querySelector(".weatherdetails .humidity span");
      const wind = document.querySelector(".weatherdetails .wind span");

      // Update weather image based on API response
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "clear.png";
          break;

        case "Rain":
          image.src = "rain.png";
          break;

        case "Mist":
          image.src = "mist.png";
          break;

        case "Haze":
          image.src = "mist.png";
          break;

        case "Snow":
          image.src = "snow.png";
          break;

        case "Clouds":
          image.src = "cloud.png";
          break;

        default:
          image.src = "cloud.png";
          break;
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      // Use setTimeout to ensure DOM updates before re-adding active class for animation
      setTimeout(() => {
        weatherbox.classList.add("active");
        weatherdetails.classList.add("active");
        error.classList.remove("active");
      }, 10);
    });
});
