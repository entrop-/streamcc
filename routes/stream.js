var express = require('express');
var router = express.Router();
var JSONStream = require('JSONStream');
// var es = require('event-stream')
var parser = JSONStream.parse();
var transform = require('stream-transform');



var fs = require("fs");
var zlib = require('zlib');

var chunk='';

router.get('/', function(req, res, next) {


    var pipeline = fs.createReadStream('input/data.ndjson.gz')
        .pipe(zlib.createGunzip())
        .on('data', function (data){

            chunk += data;

        })
        .on('end',function(){
            console.log('got it');
            var parser = JSONStream.parse(chunk);



            parser.on('data', function(data) {
                console.log('received:', data.toString());
            });
        })
        .pipe(fs.createWriteStream('output/data.ndjson'))
        .on('error', function(e) {console.log(e) });


    res.send('ppp');
});

module.exports = router;