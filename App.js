let weather = {
  apiKey: "6603c3d60154912ffc5f653b9fb11775",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
  },
  displayWeather: function (data) {
    const { name } = data
    const { icon, description } = data.weather[0]
    const { temp, humidity } = data.main
    const { speed } = data.wind

    const celsiusTemp = this.convertToCelsius(temp)

    document.querySelector(".city").innerHTML = "Weather in " + name
    document.querySelector(".icons").src =
      "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector(".description").innerHTML = description
    document.querySelector(".temp").innerHTML = celsiusTemp + "&#8451;"
    document.querySelector(".humidity").innerHTML =
      "Humidity: " + humidity + "%"
    document.querySelector(".wind").innerHTML = "Wind speed: " + speed + "km/h"
    document.querySelector(".weather").classList.remove("loading")
  },
  convertToCelsius: function (temperature) {
    return Math.round(temperature)
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value)
  },
}

document.querySelector(".search button").addEventListener("click", function () {
  weather.search()
})

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search()
    }
  })

weather.fetchWeather("Nigeria")
