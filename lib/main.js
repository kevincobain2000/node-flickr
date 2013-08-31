var redis = require("redis")
        , path = require("path")
        , dataFile = path.join(__dirname, "../", "data/edict.tsv")
        , fs = require('fs')
        , redis = require('redis')
        , client = redis.createClient()
        , readline = require('readline');


var Edict = function() {
    this.word = null;
    this.redisDB = 2;
};

Edict.prototype.redisOn = function(callback) {
    var self = this;
    client.select(self.redisDB, function(err, res) {
        if (err)
            callback(false);
        else
            callback(true);
    });//end client.select
};//end redisOn

function unique(arr) {
  var result = [],
      map = {};
  for (var i = 0; i < arr.length; i++) {
    var duplicate = map[arr[i]];
    if (!duplicate) {
        result.push(arr[i]);
        map[arr[i]] = true;
    }
  }
  return result;
}

Edict.prototype.redisEnterEntries = function(tabSplitArray, callback) {
    WORD = tabSplitArray[0];            // string
    PRON = tabSplitArray[1];            // string
    GLOSS = unique(tabSplitArray.slice(2,tabSplitArray.length));            // string
    
    WORDS = WORD.split(';');
    for (var item in WORDS) {
        w = WORDS[item];
            client.hmset("word:" + w,
            "Pron", PRON,
            "Gloss", GLOSS,
            function(err, reply) {
                
            });//end callback client.hmset

    }

    callback(true);
};

Edict.prototype.redisSetEntries = function(callback) {
    var self = this;
    var rd = readline.createInterface({
        input: fs.createReadStream(dataFile),
        output: process.stdout,
        terminal: false
    });
    // readline file line by line
    rd.on('line', function(line) {
        
        dicLineToArray = line.split("\t");
        self.redisEnterEntries(dicLineToArray, function(res){
            console.log(res);
        });

    }).on('close', function() {
        callback(true);
    });// end rd.on
};//end redisSetEntries()

Edict.prototype.redisEntryCheck = function(callback) {
    var self = this;
    var redisOn = self.redisOn(function(res) {
        if (res) { //i.e. redis was able to connect
            client.hgetall("word:" + self.word, function(err, reply) {
                if (!reply) { //change it to !reply
//                    self.redisSetEntries(function(res) {
//                    });
                } //endif no reply
                else callback(reply);
            }); //end hgetall()
        }//endif (res)
    });//end redisOn()
};//end redisEntryCheck()

Edict.prototype.setDB = function(redisDB){
    var self = this;
    self.redisDB = redisDB;
    
}
Edict.prototype.get = function(word,callback) {
    var self = this;
    self.word= word;
    self.redisEntryCheck(function(reply) {
        callback(reply);
    });
}; // end get()

module.exports = Edict;

