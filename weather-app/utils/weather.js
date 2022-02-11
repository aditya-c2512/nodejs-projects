const request = require('request')

const forecast = (lat, long, callback) =>
{
    const url = `http://api.weatherstack.com/current?access_key=7cb8971f2d66b4ebf6f29b137d24d442&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}&units=m`

    request(
        {
            url : url,
            json : true
        },
        (error, response) =>
        {
            if(error)
            {
                callback('CAN NOT ACCESS WEATHERSTACK API', undefined)
            }
            else if(response.body.error)
            {
                callback('UNABLE TO FIND LOCATION', undefined)
            }
            else
            {
                callback(
                    undefined,
                    'It is currently ' + response.body.current.temperature + ' degrees celsius out. There is ' + response.body.current.humidity + '% humidity.'
                )
            }
        }
    )
}

module.exports = forecast