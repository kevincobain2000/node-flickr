var path = require("path")
, https = require('https')
, fs = require('fs');


var Flickr = function(keys) {
    this.apiKey = keys.api_key;
    this.apiUrl = "https://api.flickr.com/services/rest/?";
};


Flickr.prototype.get = function(method, opts, result) {
    var api_url = this.apiUrl
            + "&method=flickr." + method
            + "&api_key=" + this.apiKey
            + "&format=json"
            + "&nojsoncallback=1";

    for (var item in opts) {
        api_url += "&" + item + "=" + opts[item];
    }

    https.get(api_url, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            if (isJsonString(data)){
                var jsonObj = JSON.parse(data);
                result(null, jsonObj);
            } else {
                result(new Error("Error parsing JSON"));
            }
        });
    });
    
  var isJsonString = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  };
    
};


// export the module
module.exports = Flickr;

