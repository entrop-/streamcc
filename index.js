"use strict";

var parse = require('JSONStream').parse,
    fs = require('fs'),
    path = require('path'),
    zlib = require('zlib'),
    es = require('event-stream'),

    inStream = fs.createReadStream(path.join('input', 'data.ndjson.gz')),
    outStream = fs.createWriteStream(path.join('output', 'data.csv'));

inStream
    .pipe(zlib.createGunzip())
    .pipe(parse('*'))
    .pipe(es.mapSync((data) => {
    console.log(data);
            return [data.date, data.type, data.price, data.rate].join(',') + '\n';

}))
.pipe(outStream)

    .on('end', () => {

    outStream.close();

});