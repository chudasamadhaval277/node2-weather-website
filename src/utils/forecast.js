const request = require('request')
const forecast = (latitude,longitude,callback)=>{

    const forecastURL = 'http://api.weatherstack.com/current?access_key=274164f60c383b8c090237b99799175a&query='+latitude+','+longitude+'&units=m'
    request({ url:forecastURL, json:true},(error,{body})=>{

        if(error){
            callback('unable to connect weather services', undefined)
        }else if(body.error){
            callback('unable to find the location.',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+' . It is currently '+ body.current.temperature +' degree out. It feel like '+ body.current.feelslike +' degree out. The Humidity is '+body.current.humidity+'.')
       }
    })
}
module.exports = forecast