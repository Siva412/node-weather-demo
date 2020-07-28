const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');


const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public');
const hbsViewsDir = path.join(__dirname, '../templates/views');
const hbspartialsDir = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')
app.set('views', hbsViewsDir)
hbs.registerPartials(hbspartialsDir)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Siva'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Siva'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Siva'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            "error": "Please provide address"
        })
        return;
    }
    geocode(req.query.address, (error, data) => {
        if(error){
            res.send({
                error
            })
            return;
        }
        const coords = data.latitude+','+data.longitude;
        weather(coords, (error, weatherData) => {
            if(error){
                res.send({
                    error
                })
                return;
            }
            // console.log(`Current temparature is ${chalk.green.inverse(weatherData.temperature+'\xB0C')} in ${chalk.bold(data.location)} and forecast ${chalk.inverse(weatherData.description)}`);
            res.send({
                temparature: weatherData.temperature,
                location: data.location,
                forecast: weatherData.description,
                icon: weatherData.icon
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('pagenotfound', {
        title: '404',
        message: 'Help article not Found'
    })
})

app.get('*', (req, res) => {
    res.render('pagenotfound', {
        title: '404',
        message: 'Page not Found'
    })
})

app.listen(port, () => {
    console.log('Listening on '+port);
})