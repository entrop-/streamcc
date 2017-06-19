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
    .pipe(parse())
    .pipe(es.mapSync((data) => {

        //recount age
        let bdayYear = new Date(data.personal.birthday).getFullYear();
        let age = new Date().getFullYear() - bdayYear;

        data.personal.age = age;
        console.log(data);
        console.log('---------');
            return [bdayYear, age,data.personal.age, data.personal.name].join(',') + '\n';

}))
.pipe(outStream)

    .on('end', () => {

    outStream.close();

});