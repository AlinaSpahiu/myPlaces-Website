const axios = require('axios');
const HttpError = require('../errorHandling/http-error');

const API_KEY = 'AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvzA';

// dummy coordinates when you don't have api on googleMaps
// function getCoordsForAddress(address) { 
//     return {
//              lat: 40.7484474,
//              lng: -73.9871516
//             }
// }

async function getCoordsForAddress(address) { 

    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    )
    const data = response.data;
    if(!data || data.status === 'ZERO_RESULTS'){
        const error = new HttpError('Could not find location fot the specified address!', 422)
        throw error;
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}

module.exports = getCoordsForAddress;
