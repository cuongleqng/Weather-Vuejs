<template>
    <div class="today forecast" v-if="mainWeather.main">
        <div class="forecast-header">
            <div class="day">{{ getDayOfWeek() }}</div>
            <div class="date">{{ getDayMonth() }}</div>
        </div> <!-- .forecast-header -->
        <div class="forecast-content">
            <div class="location">{{ mainWeather.name }}</div>
            <div class="status">{{ mainWeather.weather[0].description }}</div>
            <div class="degree">
                <div class="num">{{ mainWeather.main.temp | roundNumber }}<sup>o</sup>C</div>
                <div class="forecast-icon">
                    <img :src="require(`@/assets/css/images/icons/icon-${(mainWeather.weather[0].icon).slice(0,2)}.svg`)" alt="" width="90">
                </div>
            </div>
            <span><img src="@/assets/css/images/icon-umberella.png" alt="">{{ mainWeather.main.humidity }}%</span>
            <span><img src="@/assets/css/images/icon-wind.png" alt="">{{ mainWeather.wind.speed * 3.6 | roundNumber}}km/h</span>
            <span><img src="@/assets/css/images/icon-compass.png" alt="">{{ mainWeather.wind.deg | convertWindDirection }}</span>
            <span><img src="@/assets/css/images/sunrise.png" alt="">{{ mainWeather.sys.sunrise | convertUnixtime }}</span>
        </div>
    </div>
</template>

<script>
import  dateTimeHelper  from '../helper/dateTimeHelper.js'
export default {
    name: 'TodayForecast',
    props: {
        mainWeather : {}
    },
    data(){
        return {
        }
    },
    methods: {
        getDayOfWeek() {
            const dt = new Date()
            const arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            return arr[dt.getDay()]
        },
        getDayMonth() {
            const dt = new Date()
            return dt.toLocaleString('en-US', {
                day: 'numeric',
                month: 'short'
            })
        },
        getWeatherImage(staus){
            const img = '@/assets/css/images/icon-umberella.png'
            return img;
        }
    },
    filters: {
        ...dateTimeHelper
    }
}
</script>

<style>

</style>