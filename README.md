===================
Work is in Progress
===================

Install
-------

<pre>
npm install node-flickr //NOT YET AN NPM MODULE
</pre>

Use This⬇
<pre>
npm install https://github.com/kevincobain2000/node-flickr/tarball/master
</pre>

Doc
---

**Set Up**

<pre>
var Flickr = require("node-flickr");
var keys = {"api_key": "XXX"}
flickr = new Flickr(keys);
</pre>

**Methods**

flickr.photos.search
// http://www.flickr.com/services/api/flickr.photos.search.html

<pre>
flickr.photosSearch({"tags":"cat,dogs"}, function(result){
    console.log(result.photos);
});

flickr.photosSearch({"tags":"cat,dogs","user_id":123456}, function(result){
    console.log(result.photos);
});

</pre>





