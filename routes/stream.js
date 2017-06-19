var express = require('express');
var router = express.Router();
var JSONStream = require('JSONStream');
var es = require('event-stream');
var parser = JSONStream.parse();
var transform = require('stream-transform');
var readline = require('readline');
const path = require('path');


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

    // var lineReader = readline.createInterface({
    //     input: fs.createReadStream('input/data.ndjson.gz').pipe(zlib.createGunzip()),
    //     output: fs.createWriteStream('output/data.csv'),
    //     terminal: false
    // });
    //
    // lineReader.on('line', function (line) {
    //     console.log('Line from file:', line);
    // });

    //(path.join('input', 'file.json'))
    var s = fs.createReadStream(path.join('input', 'data.ndjson.gz'))
            .pipe(zlib.createGunzip())
            .pipe(es.split())
            .pipe(es.mapSync(function(line){

                    console.log('line:',line);



                    return line;

                })
                    .on('error', function(err){
                        console.log('Error while reading file.', err);
                    })
                    .on('end', function(){
                        console.log('Read entire file.')
                    })
            )
            .pipe(fs.createWriteStream(path.join('output', 'data.csv')))
        ;

    res.send('ppp');
});

module.exports = router;