var express = require('express');
var router = express.Router();
var JSONStream = require('JSONStream');
// var es = require('event-stream')
var parser = JSONStream.parse();
var transform = require('stream-transform');
// var json2csv = require('json2csv-stream');
// var parser = new json2csv();



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




        // pipeline.on('end', function() {
        //     console.log('done');
        //     var stream = fs.createReadStream('input/data.ndjson')
        //         .pipe(parser)
        //         .pipe(fs.createWriteStream('output/data.ndjson'));
        //
        //     stream.on('data', function(data) {
        //         console.log('received:', data);
        //     });
        //
        // });





    // res.send('ppp');
});

module.exports = router;