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

let toCsv = (items) => {

    console.log(items);
    // const items = json3.items
    // const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    // const header = Object.keys(items[0])
    // let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    // csv.unshift(header.join(','))
    // csv = csv.join('\r\n')
    //
     return items;
}

inStream
    .pipe(zlib.createGunzip())
    .pipe(parse())
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
    .pipe(jsonexport())
    .pipe(outStream)
    .on('finish', () => {

        console.log('average friends: ', avarageFriends / userCount  )

    });