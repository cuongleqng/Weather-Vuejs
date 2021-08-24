export default {
   roundNumber(number) {
      return Math.round(number)
   },
   convertWindDirection(number) {
      const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
      return compassSector[(number / 22.5).toFixed(0)];
   },
   convertUnixtime(time) {
      return (new Date(time).toLocaleTimeString("en-US",{
         hour: '2-digit',
         minute: '2-digit'
      }))
   }
}