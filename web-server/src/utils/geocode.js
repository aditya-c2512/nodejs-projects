const request = require('request')

const geocode = (address, callback) =>
{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWRpdHlhLWMyNTEyIiwiYSI6ImNremk0MDQyeDQ3dXkyd25reXd1YXU5emcifQ.xn6WRRtqq7dwd5_Z1HTyfA&limit=1`
    request(
        {
            url : url,
            json : true
        },
        (error, {body}) =>
        {
            if(error)
            {
                callback('CAN NOT ACCESS MAPBOX API', undefined)
            }
            else if(body.features.length === 0)
            {
                callback('LOCATION NOT FOUND', undefined)
            }
            else
            {
                callback(
                    undefined,
                    {
                        lat : body.features[0].center[1],
                        long : body.features[0].center[0],
                        name : body.features[0].place_name
                    }
                )
            }
        }
    )
}

module.exports = geocode