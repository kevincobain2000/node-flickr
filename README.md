Install
-------

<pre>
npm install node-flickr
</pre>

ALternatively,
<pre>
npm install https://github.com/kevincobain2000/node-flickr/tarball/master
</pre>


Set Up
-------

<pre>
var Flickr = require("node-flickr");
var keys = {"api_key": "XXX"}
flickr = new Flickr(keys);
</pre>

Usage
-----

- [flickr.photos.search]

[flickr.photos.search]: http://www.flickr.com/services/api/flickr.photos.search.html

<pre>
flickr.get("photos.search", {"tags":"cat,dogs"}, function(err, result){
    if (err) return console.error(err);
    console.log(result.photos);
});

flickr.get("photos.search", {"tags":"cat,dogs","user_id":123456}, function(err, result){
    if (err) return console.error(err);
    console.log(result.photos);
});
</pre>



http://www.flickr.com/services/api/flickr.photos.getContext.html
<pre>
flickr.get("photos.getContext", {"photo_id":9638138263}, function(err, result){
    if (err) return console.error(err);
    console.log(result);
});
</pre>

http://www.flickr.com/services/api/flickr.photos.getSizes.html

<pre>
flickr.get("photos.getSizes", {"photo_id":9638138263}, function(err, result){
    if (err) return console.error(err);
    console.log(result.sizes);
});
</pre>


For More Methods refer to http://www.flickr.com/services/api/





