const request = require('request')
const geocode = (address, callback)=>{
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2h1ZGFzYW1hZGhhdmFsMjc3IiwiYSI6ImNrbGJ3d2tyNDFhNGkydWxibWhzd2M3NXAifQ._rLBbHvCXkqFAW31iH-Dnw&limit=1'
    request({ url:geocodeURL, json:true},(error,{body}={})=>{

        if(error){
            callback('unable to connect the location Service',undefined)
        }else if(body.features.length === 0){
            callback('unable to find the location. try with other location', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
                //console.log(latitude+ ', '+longitude)
            })
            
        }
    })
}
module.exports = geocode
