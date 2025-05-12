const apikey = "499ffab0fb81d32a83f5d8a4479dc377";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchbox = document.querySelector(".search input");
    const searchbtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city) {
      try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
          case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
          case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
          case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
          case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
          case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
          default:
            weatherIcon.src = "images/default.png"; // fallback
        }

        document.querySelector(".weather").style.display = "block";

      } catch (error) {
        alert("Error: " + error.message);
      }
    }

    searchbtn.addEventListener("click", () => {
      const city = searchbox.value.trim();
      if (city !== "") {
        checkWeather(city);
      } else {
        alert("Please enter a city name.");
      }
    });