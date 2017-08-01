'use strict';
const scrapeIt = require("scrape-it");
const request = require('request');
const json2csv = require('json2csv');
const fs = require('fs');
const productArray = [];
const openWSDatabase = 'https://openws.herokuapp.com/glassybaby?apiKey=8fa0e46f0361117d65d91d6032391324';

function httpGetProducts() {
    request(openWSDatabase, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let jsonObject = JSON.parse(body);
        let scrapeData = runScraper(jsonObject[0].data);
        return scrapeData;
    });
}

function runScraper(data) {
    data.forEach(function (productUrl) {
        scrapeIt(productUrl, {
            'id': {
                selector: 'meta[name="keywords"]',
                convert: x => x = Math.random().toString(36).substr(2, 9)
            },
            'availability': {
                selector: 'meta[name="og:availability"]',
                attr: "content",
                convert: x => x = "in stock"
            },
            'condition': {
                selector: 'meta[name="og:rating"]',
                attr: "content",
                convert: x => x = "new"
            },
            'description': {
                selector: 'meta[name="og:description"]',
                    attr: "content"
            },
            'image_link': {
                selector: 'meta[name="og:image"]',
                    attr: "content"
            },
            'link': {
                selector: 'meta[name="og:url"]',
                attr: "content",
                convert: x => x = productUrl
            },
            'title': {
                selector: 'title'
            },
            'price': {
                selector: 'meta[name="og:price:standard_amount"]',
                    attr: "content",
                    convert: x => x + ' USD'
            },
            'brand': {
                selector: 'meta[name="og:provider_name"]',
                    attr: "content",
            }

        }, (err, res) => {
            productArray.push(res);
        });
    });

    return productArray;
}


// var csv = json2csv({ data: myCars, fields: fields });
//
// fs.writeFile('glassybaby.csv', csv, function(err) {
//     if (err) throw err;
//     console.log('file saved');
// });

let test = httpGetProducts();
console.log(test);
