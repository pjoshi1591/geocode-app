const http = require('http');
const url = require('url');
const { StringDecoder }= require('string_decoder');
const handlers = require('./handlers');

const server = http.createServer((req,res) => {

    // Parsing url,path,querystring,method,headers
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const queryStringObject = parsedUrl.query;
    const method = req.method.toLowerCase();
    const headers = req.headers;
    

    //  Get the payload,if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data',(data)=> {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        // Choose the handler this request should go to. if one is not found, use the notFound handler
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, (statusCode,payload) => {
            // Use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            // Use the payload called back by the handler, or default to empty object
            payload = typeof(payload) === 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log('Returning this response: ',statusCode, payloadString);
        });
    });
});

server.listen(3000, () => {
    console.log('The server is up and running now');
});


// Define the request router
const router = {
    'geocode' : handlers.geocode
};