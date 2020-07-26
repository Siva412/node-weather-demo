const request = require('request');

const weatherInfo = (coord, callback) => {
    const url = "http://api.weatherstack.com/current";
    request({
        url: url,
        json: true,
        qs: {
            access_key: "c127bfb63a5945b6af16cdd107c6bb7d",
            query: coord
        }
    },
        (error, response) => {
            if (error) {
                callback("Something went wrong", undefined);
                return;
            }
            if (!response.body.success && response.body.error) {
                callback(response.body.error.info, undefined);
                return;
            }
            const location = response.body.location;
            const currentWeather = response.body.current;
            callback(undefined, {
                temperature: currentWeather.temperature,
                description: currentWeather.weather_descriptions[0],
                location: location.name
            });
        });
};

module.exports = weatherInfo;