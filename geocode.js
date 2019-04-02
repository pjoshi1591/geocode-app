const https = require('https');

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicGpvc2hpMTUiLCJhIjoiY2plY3lyeW91MHZqbzJybWt4cmM2djF3YiJ9.yiNymklGOJL_8-z07LRf1A';

const request= https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk)=> {
        data = data+ chunk.toString()

    });
    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body.features[0].center)
    })
})

request.end()