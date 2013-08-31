var path = require("path")
, fs = require('fs');


var Flickr = function() {
    this.apiKey = null;
};



Flickr.prototype.setApi = function(api_key) {
    var self = this;
    self.apiKey = api_key;
}



// export the module
module.exports = Flickr;

