// WEATHERSTACK API ACCESS KEY : 7cb8971f2d66b4ebf6f29b137d24d442
// MAPBOX API ACCESS KEY : pk.eyJ1IjoiYWRpdHlhLWMyNTEyIiwiYSI6ImNremk0MDQyeDQ3dXkyd25reXd1YXU5emcifQ.xn6WRRtqq7dwd5_Z1HTyfA

const chalk = require('chalk')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/weather.js')

const successMsg = chalk.green.inverse
const processMsg = chalk.white.inverse
const errorMsg = chalk.red.inverse
const errorDesc = chalk.red

const location = 'Washington DC'

geocode(
    location, 
    (error, data) =>
    {
        if(error)
        {
            console.log(errorDesc(error))
        }
        else
        {
            console.log(successMsg(data.name))
            console.log(successMsg('LATITUDE : ' + data.lat + ' LONGITUDE : ' + data.long))
            forecast(
                data.lat, data.long,
                (error, data) =>
                {
                    if(error)
                    {
                        console.log(errorDesc(error))
                    }
                    else
                    {
                        console.log(processMsg(data))
                    }
                }
            )
        }
    }
)

