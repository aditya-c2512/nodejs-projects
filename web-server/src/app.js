const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/weather.js')

const app = express()

// Paths for Express Config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// Setup Handlebars
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// Setup Static Directory
app.use(express.static(publicDir))

app.get(
    '',
    (req,res) =>
    {
        res.render(
            'index',
            {
                title : 'WEATHER!'
            }
        )
    }
)
app.get(
    '/about',
    (req,res) =>
    {
        res.render(
            'about',
            {
                title : 'ABOUT'
            }
        )
    }
)
app.get(
    '/help',
    (req,res) =>
    {
        res.render(
            'help',
            {
                title : 'HELP'
            }
        )
    }
)
app.get(
    '/help/*',
    (req,res) =>
    {
        res.render(
            'main_404',
            {
                title : '404',
                error : 'HELP ARTICLE NOT FOUND'
            }
        )
    }
)
app.get(
    '/weather',
    (req, res) =>
    {
        if(!req.query.address)
        {
            return res.send(
                {
                    error : 'Please provide a location'
                }
            )
        }

        geocode(
            req.query.address, 
            (error, geocodeData) =>
            {
                if(error)
                {
                    return res.send({ error })
                }
                else
                {
                    forecast(
                        geocodeData,
                        (error, forecastData) =>
                        {
                            if(error)
                            {
                                return res.send({ error })
                            }
                            else
                            {
                                return res.send(
                                    {
                                        location : geocodeData.name,
                                        forecast : forecastData
                                    }
                                )
                            }
                        }
                    )
                }
            }
        )
    }
)
app.get(
    '/products',
    (req, res) =>
    {
        res.send(
            {
                products : []
            }
        )
    }
)

app.get(
    '*',
    (req, res) =>
    {
        res.render(
            'main_404',
            {
                title : '404',
                error : 'PAGE NOT FOUND'
            }
        )
    }
)
app.listen(
    3000,
    () =>
    {
        console.log('Starting server on Port 3000')
    }
)