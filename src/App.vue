<template>
  <div id="app">
    <div id="weather-wrap">
      <div class="container">
        <form action="#" class="find-location">
          <input
            type="text"
            placeholder="Find your location..."
            v-model="city"
            @keypress="searchCity"
          />
          <input type="submit" value="Find" />
        </form>
      </div>
      <div class="forecast-table">
        <div class="container">
          <div class="forecast-container">
            <TodayForecast :mainWeather="weather" />
            <NextForecast :nextForecast="nextforecast" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import NextForecast from "./components/NextForecast";
import TodayForecast from "./components/TodayForecast";
export default {
  name: "App",
  data() {
    return {
      API_KEY: "832ddf30396a01dfb3a73871001bd706",
      BASE_URL: "http://api.openweathermap.org/data/2.5/",
      city: "",
      position: {
        lat: "",
        lon: ""
      },
      nextforecast: {},
      weather: {}
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(pos => {
      if (pos) {
        this.position.lat = pos.coords.latitude;
        this.position.lon = pos.coords.longitude;
        this.searchWithGeo(this.position);
        this.nextForecast();
      }
    });
  },
  components: {
    TodayForecast,
    NextForecast
  },
  methods: {
    searchCity(e) {
      if (e.key == "Enter") {
        this.searchWithCity(this.city).then(this.nextForecast);
      }
    },
    async searchWithCity(city) {
      await axios
        .get(this.BASE_URL + "weather", {
          params: {
            q: city,
            units: "metric",
            appid: this.API_KEY
          }
        })
        .then(rsp => rsp.data)
        .then(this.setWeather);
    },
    async searchWithGeo(position = {}) {
      if (position) {
        await axios
          .get(this.BASE_URL + "weather", {
            params: {
              lat: position.lat,
              lon: position.lon,
              units: "metric",
              appid: this.API_KEY
            }
          })
          .then(rsp => rsp.data)
          .then(this.setWeather);
      }
    },
    async nextForecast() {
      await axios
        .get(this.BASE_URL + "onecall", {
          params: {
            lat: this.position.lat,
            lon: this.position.lon,
            exclude: "current,minutely,hourly",
            units: "metric",
            appid: this.API_KEY
          }
        })
        .then(rsp => rsp.data)
        .then(this.setNextForecast);
    },
    setWeather(data) {
      console.log(data.coord);
      this.weather = data;
      this.position = data.coord;
    },
    setNextForecast(data) {
      this.nextforecast = data;
    }
  }
};
</script>
<style>
@import "assets/css/style.css";

#app {
  background: url("assets/cold-bg.jpg") no-repeat top left;
  background-size: cover;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
}

#weather-wrap {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}
</style>
