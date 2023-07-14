// Create an object to store weather-related functionality
let weather = {
  apiKey: "6603c3d60154912ffc5f653b9fb11775",
// Method to fetch weather data from OpenWeatherMap API for a specific city
  fetchWeather: function (city) {
// Make a GET request to the API endpoint	  
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
  },
// Method to display weather information on the webpage
  displayWeather: function (data) {
    const { name } = data
    const { icon, description } = data.weather[0]
    const { temp, humidity } = data.main
    const { speed } = data.wind
// Convert temperature from Kelvin to Celsius
    const celsiusTemp = this.convertToCelsius(temp)
// Update the HTML elements with the retrieved weather information
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
// Method to convert temperature from Kelvin to Celsius
  convertToCelsius: function (temperature) {
    return Math.round(temperature)
  },
// Method to initiate a weather search based on user input
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value)
  },
}
// Add event listeners to search button and search bar
// When the search button is clicked, execute the search method to retrieve weather data
document.querySelector(".search button").addEventListener("click", function () {
  weather.search()
})
// When the Enter key is pressed in the search bar, execute the search method to retrieve weather data
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search()
    }
  })
// Fetch and display weather data for the initial city ("Nigeria") when the page loads
weather.fetchWeather("Nigeria")
