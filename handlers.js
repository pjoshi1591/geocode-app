// Define all the handlers
let handlers = {};

// Geocode handler
handlers.geocode = (data,callback) => {
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._geocode[data.method](data,callback);
    } else {
        callback(405);
    }
};

// Container for the users submethods
handlers._geocode = {}

// Geocode - get
handlers._geocode.get = function(data,callback){
    const address = typeof(data.queryStringObject.address) == 'string' && data.queryStringObject.address.trim().length > 0 ? data.queryStringObject.address.trim() : false;
    
    if(address) {
        callback(200, {'geocode' : '118.2439,34.0544'});
    } else {
        callback(400, {'Error' : 'Missing required field'});
    }
};

// Not found handler
handlers.notFound = (data,callback) =>{
    callback(404,{'Error' : 'Page not found'});
};

// Export the handlers
module.exports = handlers;