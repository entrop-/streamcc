var express = require('express');
var router = express.Router();
var JSONStream = require('JSONStream');
// var es = require('event-stream')
var parser = JSONStream.parse();
var transform = require('stream-transform');
var readline = require('readline');



var fs = require("fs");
var zlib = require('zlib');

var chunk='';

router.get('/', function(req, res, next) {


    // var pipeline = fs.createReadStream('input/data.ndjson.gz')
    //     .pipe(zlib.createGunzip())
    //     .on('data', function (data){
    //
    //         chunk += data;
    //         console.log('got it');
    //         // var parser = JSONStream.parse(chunk);
    //         //
    //         //
    //         //
    //         // parser.on('data', function(unzipped) {
    //         //     console.log('received:', unzipped.toString());
    //         // });
    //         data.toString();
    //
    //     })
    //     // .on('end',function(){
    //     //
    //     // })
    //     // .pipe(process.stdout)
    //     // .pipe(parser)
    //     .pipe(fs.createWriteStream('output/data.ndjson'))
    //     .on('error', function(e) {console.log(e) });

    var lineReader = readline.createInterface({
        input: fs.createReadStream('input/data.ndjson.gz').pipe(zlib.createGunzip())
    });

    lineReader.on('line', function (line) {
        console.log('Line from file:', line);
    });

    res.send('ppp');
});

module.exports = router;