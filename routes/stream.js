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
            .pipe(parser("*"))
            .pipe(fs.createWriteStream(path.join('output', 'data.csv')))
        ;

    res.send('ppp');
});

module.exports = router;