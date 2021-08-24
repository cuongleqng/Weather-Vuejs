<template>
  <div class="next-forecast">
     <div class="forecast" v-for="item in nextForecast.daily" :key="item.dt">
         <div class="forecast-header">
            <div class="day">{{ getDayOfWeek(item.dt) }}</div>
         </div> <!-- .forecast-header -->
         <div class="forecast-content">
            <div class="forecast-icon">
                <img :src="require(`@/assets/css/images/icons/icon-${(item.weather[0].icon).slice(0,2)}.svg`)" alt="" width="48">
            </div>
            <div class="degree">{{ item.temp.day | roundNumber }}<sup>o</sup>C</div>
            <p>
               <small>{{ item.temp.min | roundNumber }}<sup>o</sup></small> - 
               <small>{{ item.temp.max | roundNumber }}<sup>o</sup></small>
            </p>
         </div>
      </div>
  </div>
</template>

<script>
import dateTimeHelper from '../helper/dateTimeHelper'
export default {
   props: {
      nextForecast:{}
   },
   methods: {
      getDayOfWeek(time) {
         const dt = new Date(time * 1000)
         const arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
         return arr[dt.getDay()]
      },
   },
   data() {
      return {

      }
   },
   filters: {
      ...dateTimeHelper
   }
}
</script>

<style>
.next-forecast::after {
   content:'';
   display: block;
   clear: both;
}
.next-forecast .forecast {
   height: 210px;
   overflow: hidden;
}
</style>