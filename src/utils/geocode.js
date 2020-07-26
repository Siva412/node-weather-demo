const request = require('request');

const getGeoCode = (location, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`;
    request({
        url: geoUrl,
        json: true,
        qs:{
            access_token: "pk.eyJ1Ijoic2l2YTc1OSIsImEiOiJja2N4MGozaGIwamYyMnpzMXdsaGp4b2lnIn0.9LNPOgAmXsIHPq8fN3Tz7Q",
            limit: 1
        }
    }, (error, response) => {
        if(error){
            callback("Something went wrong", undefined);
            return;
        }
        if(response.body.message){
            callback(response.body.message, undefined);
            return;
        }
        const geoResponse = response.body;
        if(geoResponse && geoResponse.features && geoResponse.features.length === 0){
            callback("No Location found", undefined);
            return;
        }
        callback(undefined, {
            latitude: geoResponse.features[0].center[1],
            longitude: geoResponse.features[0].center[0],
            location: geoResponse.features[0].place_name
        });
    });   
};

module.exports = getGeoCode;