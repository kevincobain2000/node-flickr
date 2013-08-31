var path = require("path")
, http = require('http')
, fs = require('fs');


var Flickr = function(keys) {
    this.apiKey = keys['api_key'];
    this.apiUrl = "http://api.flickr.com/services/rest/?";
};


Flickr.prototype.photosSearch = function(opts, result) {

    api_url = this.apiUrl
            + "&method=flickr.photos.search"
            + "&api_key=" + this.apiKey
            + "&format=json"
            +"&nojsoncallback=1";

    // items are: e.g. tags, user_id
    // http://www.flickr.com/services/api/flickr.photos.search.html
    for (var item in opts) {
        api_url += "&" + item + "=" + opts[item];
    }
    http.get(api_url, function(res) {
        data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            var jsonObj = JSON.parse(data);
            result(jsonObj);
        });
    });
}



// export the module
module.exports = Flickr;

