"use strict";

var parse = require('JSONStream').parse,
    fs = require('fs'),
    path = require('path'),
    zlib = require('zlib'),
    es = require('event-stream'),
    jsonexport = require('jsonexport'),

    inStream = fs.createReadStream(path.join('input', 'data.ndjson.gz')),
    outStream = fs.createWriteStream(path.join('output', 'data.csv')),

    avarageFriends = 0,
    userCount = 0;

function handleError (error) {
    console.log('¯\\_(ツ)_/¯',error.toString());
    this.emit('end');
}

inStream
    .pipe(zlib.createGunzip())
    .on('error', handleError)

    .pipe(parse())
    .on('error', handleError)

    .pipe(es.mapSync((data) => {

        //recount age
        let bdayYear = new Date(data.personal.birthday).getFullYear();
        let age = new Date().getFullYear() - bdayYear;
        data.personal.age = age;

        //collect friends data
        avarageFriends += data.friends.length;
        userCount ++;

        return JSON.stringify(data) + '\n';

    }))
    .on('error', handleError)

    .pipe(jsonexport())
    .on('error', handleError)

    .pipe(outStream)
    .on('finish', () => {
        console.log('average friends: ', avarageFriends / userCount  )
    })
    .on('error', handleError);