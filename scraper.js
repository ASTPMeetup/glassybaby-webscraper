'use strict';
const scrapeIt = require("scrape-it");
const request = require('request');
const json2csv = require('json2csv');
const fs = require('fs');
const productArray = [];
const openWSDatabase = 'https://openws.herokuapp.com/glassybaby?apiKey=8fa0e46f0361117d65d91d6032391324';
let scrapedData = [];

let productData = [
    "http://www.glassybaby.com/afternoon-delight",
    "http://www.glassybaby.com/american-made",
    "http://www.glassybaby.com/at-the-cabin",
    "http://www.glassybaby.com/best-man",
    "http://www.glassybaby.com/extended-family",
    "http://www.glassybaby.com/father-of-the-bride",
    "http://www.glassybaby.com/from-this-day-forward",
    "http://www.glassybaby.com/happily-ever-after",
    "http://www.glassybaby.com/maid-of-honor",
    "http://www.glassybaby.com/mother-of-the-bride",
    "http://www.glassybaby.com/no-you-go-first",
    "http://www.glassybaby.com/nourish",
    "http://www.glassybaby.com/pajamas-all-day",
    "http://www.glassybaby.com/pilgrimage",
    "http://www.glassybaby.com/pride",
    "http://www.glassybaby.com/sowing-the-field",
    "http://www.glassybaby.com/starter-kit",
    "http://www.glassybaby.com/summer-of-love",
    "http://www.glassybaby.com/you-may-kiss-the-bride",
    "http://www.glassybaby.com/product/4706",
    "http://www.glassybaby.com/awesome-aint-easy",
    "http://www.glassybaby.com/a-million-bucks",
    "http://www.glassybaby.com/amore",
    "http://www.glassybaby.com/angel",
    "http://www.glassybaby.com/ankle-deep",
    "http://www.glassybaby.com/aquamarine",
    "http://www.glassybaby.com/aqua-verde",
    "http://www.glassybaby.com/azalea",
    "http://www.glassybaby.com/baby",
    "http://www.glassybaby.com/product/4447",
    "http://www.glassybaby.com/bambi",
    "http://www.glassybaby.com/bark",
    "http://www.glassybaby.com/beach",
    "http://www.glassybaby.com/bedford-brown",
    "http://www.glassybaby.com/begin-again",
    "http://www.glassybaby.com/believe",
    "http://www.glassybaby.com/belle",
    "http://www.glassybaby.com/beluga",
    "http://www.glassybaby.com/bff",
    "http://www.glassybaby.com/big-sky",
    "http://www.glassybaby.com/birthday-suit",
    "http://www.glassybaby.com/blue-eyes",
    "http://www.glassybaby.com/brave",
    "http://www.glassybaby.com/breathe",
    "http://www.glassybaby.com/brother",
    "http://www.glassybaby.com/bud",
    "http://www.glassybaby.com/butterscotch",
    "http://www.glassybaby.com/cabo",
    "http://www.glassybaby.com/canary",
    "http://www.glassybaby.com/cashmere",
    "http://www.glassybaby.com/caspar",
    "http://www.glassybaby.com/celadon",
    "http://www.glassybaby.com/celebrate",
    "http://www.glassybaby.com/chatham",
    "http://www.glassybaby.com/cherish",
    "http://www.glassybaby.com/chesapeake",
    "http://www.glassybaby.com/chocolate",
    "http://www.glassybaby.com/chocolate-covered-cherry",
    "http://www.glassybaby.com/cloud",
    "http://www.glassybaby.com/clover",
    "http://www.glassybaby.com/coal_4",
    "http://www.glassybaby.com/comfort",
    "http://www.glassybaby.com/compassion",
    "http://www.glassybaby.com/courage",
    "http://www.glassybaby.com/cozy",
    "http://www.glassybaby.com/crayola",
    "http://www.glassybaby.com/cream",
    "http://www.glassybaby.com/creamsicle",
    "http://www.glassybaby.com/creme-brulee",
    "http://www.glassybaby.com/crush",
    "http://www.glassybaby.com/dad",
    "http://www.glassybaby.com/daffodil",
    "http://www.glassybaby.com/daisy",
    "http://www.glassybaby.com/dance-party",
    "http://www.glassybaby.com/dawn",
    "http://www.glassybaby.com/day-one",
    "http://www.glassybaby.com/determined",
    "http://www.glassybaby.com/diva",
    "http://www.glassybaby.com/dolphin",
    "http://www.glassybaby.com/dream",
    "http://www.glassybaby.com/dubs",
    "http://www.glassybaby.com/eggplant",
    "http://www.glassybaby.com/elephant",
    "http://www.glassybaby.com/emerald",
    "http://www.glassybaby.com/emerson",
    "http://www.glassybaby.com/evergreen",
    "http://www.glassybaby.com/everlasting",
    "http://www.glassybaby.com/faith",
    "http://www.glassybaby.com/far-out",
    "http://www.glassybaby.com/fearless",
    "http://www.glassybaby.com/feelin-groovy",
    "http://www.glassybaby.com/fertile",
    "http://www.glassybaby.com/flawless",
    "http://www.glassybaby.com/forever",
    "http://www.glassybaby.com/fortitude",
    "http://www.glassybaby.com/friendship",
    "http://www.glassybaby.com/frog-hunting",
    "http://www.glassybaby.com/gem",
    "http://www.glassybaby.com/gingerbread",
    "http://www.glassybaby.com/given-to-fly",
    "http://www.glassybaby.com/godmother",
    "http://www.glassybaby.com/goodness",
    "http://www.glassybaby.com/grace",
    "http://www.glassybaby.com/grammy",
    "http://www.glassybaby.com/grateful-red",
    "http://www.glassybaby.com/gratitude",
    "http://www.glassybaby.com/great-oak",
    "http://www.glassybaby.com/greenlake",
    "http://www.glassybaby.com/grin",
    "http://www.glassybaby.com/happiness",
    "http://www.glassybaby.com/happy-birthday",
    "http://www.glassybaby.com/hidden-moss",
    "http://www.glassybaby.com/hide-seek",
    "http://www.glassybaby.com/home",
    "http://www.glassybaby.com/homegrown",
    "http://www.glassybaby.com/home-sweet-home",
    "http://www.glassybaby.com/hope",
    "http://www.glassybaby.com/horoscope",
    "http://www.glassybaby.com/hudson",
    "http://www.glassybaby.com/hugs",
    "http://www.glassybaby.com/hyacinth",
    "http://www.glassybaby.com/imagine",
    "http://www.glassybaby.com/janes-caramel",
    "http://www.glassybaby.com/joy",
    "http://www.glassybaby.com/kindfull",
    "http://www.glassybaby.com/kindness",
    "http://www.glassybaby.com/lady-di",
    "http://www.glassybaby.com/lamb",
    "http://www.glassybaby.com/latte",
    "http://www.glassybaby.com/lavender",
    "http://www.glassybaby.com/lemon-drop",
    "http://www.glassybaby.com/lifeguard",
    "http://www.glassybaby.com/lions-heart",
    "http://www.glassybaby.com/little-bear",
    "http://www.glassybaby.com/little-boy-blue",
    "http://www.glassybaby.com/lollypop",
    "http://www.glassybaby.com/lotus",
    "http://www.glassybaby.com/love",
    "http://www.glassybaby.com/lucky",
    "http://www.glassybaby.com/luxury",
    "http://www.glassybaby.com/master-of-the-universe",
    "http://www.glassybaby.com/melchior",
    "http://www.glassybaby.com/midnight",
    "http://www.glassybaby.com/product/4169",
    "http://www.glassybaby.com/mom",
    "http://www.glassybaby.com/mother-earth",
    "http://www.glassybaby.com/mountain-lake",
    "http://www.glassybaby.com/muse",
    "http://www.glassybaby.com/nest",
    "http://www.glassybaby.com/nishino",
    "http://www.glassybaby.com/ocean",
    "http://www.glassybaby.com/peace",
    "http://www.glassybaby.com/peaceful",
    "http://www.glassybaby.com/pearl",
    "http://www.glassybaby.com/peony",
    "http://www.glassybaby.com/petal",
    "http://www.glassybaby.com/peter-pan",
    "http://www.glassybaby.com/petunia",
    "http://www.glassybaby.com/pollen",
    "http://www.glassybaby.com/pond",
    "http://www.glassybaby.com/poppy",
    "http://www.glassybaby.com/princess",
    "http://www.glassybaby.com/promise",
    "http://www.glassybaby.com/pumpkin",
    "http://www.glassybaby.com/purple-haze",
    "http://www.glassybaby.com/purr",
    "http://www.glassybaby.com/rave-green",
    "http://www.glassybaby.com/remember",
    "http://www.glassybaby.com/ripe-olive",
    "http://www.glassybaby.com/root-beer",
    "http://www.glassybaby.com/roots",
    "http://www.glassybaby.com/product/4835",
    "http://www.glassybaby.com/rubber-ducky",
    "http://www.glassybaby.com/safe",
    "http://www.glassybaby.com/sage",
    "http://www.glassybaby.com/sassy",
    "http://www.glassybaby.com/sea-foam",
    "http://www.glassybaby.com/seattle-sunset",
    "http://www.glassybaby.com/shine",
    "http://www.glassybaby.com/silver-lining",
    "http://www.glassybaby.com/sister",
    "http://www.glassybaby.com/skinny-dip",
    "http://www.glassybaby.com/smile",
    "http://www.glassybaby.com/smooch",
    "http://www.glassybaby.com/snuggle",
    "http://www.glassybaby.com/sorry",
    "http://www.glassybaby.com/soul",
    "http://www.glassybaby.com/spirit",
    "http://www.glassybaby.com/stormy",
    "http://www.glassybaby.com/strength",
    "http://www.glassybaby.com/studio-54",
    "http://www.glassybaby.com/sunshine",
    "http://www.glassybaby.com/sweetheart",
    "http://www.glassybaby.com/sweet-patootie",
    "http://www.glassybaby.com/sweet-pea",
    "http://www.glassybaby.com/tangerine",
    "http://www.glassybaby.com/tembo-brother",
    "http://www.glassybaby.com/tembo-elephant",
    "http://www.glassybaby.com/tembo-muse",
    "http://www.glassybaby.com/thank-you",
    "http://www.glassybaby.com/toy-soldier",
    "http://www.glassybaby.com/tradition",
    "http://www.glassybaby.com/triumph",
    "http://www.glassybaby.com/true-blue",
    "http://www.glassybaby.com/true-love",
    "http://www.glassybaby.com/true-white",
    "http://www.glassybaby.com/tulip",
    "http://www.glassybaby.com/turquoise",
    "http://www.glassybaby.com/tutu",
    "http://www.glassybaby.com/unconditional",
    "http://www.glassybaby.com/valor",
    "http://www.glassybaby.com/warm-fuzzy",
    "http://www.glassybaby.com/welcome",
    "http://www.glassybaby.com/wet-dog",
    "http://www.glassybaby.com/whiskers",
    "http://www.glassybaby.com/whiskey",
    "http://www.glassybaby.com/whisper",
    "http://www.glassybaby.com/wicked",
    "http://www.glassybaby.com/wild-rose",
    "http://www.glassybaby.com/wingman",
    "http://www.glassybaby.com/wings",
    "http://www.glassybaby.com/wise",
    "http://www.glassybaby.com/wish",
    "http://www.glassybaby.com/zen",
    "http://www.glassybaby.com/grape-juice",
    "http://www.glassybaby.com/bellini",
    "http://www.glassybaby.com/cape-codder",
    "http://www.glassybaby.com/champagne",
    "http://www.glassybaby.com/cola",
    "http://www.glassybaby.com/cosmo",
    "http://www.glassybaby.com/earl-grey",
    "http://www.glassybaby.com/family-hour",
    "http://www.glassybaby.com/fizz",
    "http://www.glassybaby.com/fruit-punch",
    "http://www.glassybaby.com/gin-fizz",
    "http://www.glassybaby.com/happy-hour",
    "http://www.glassybaby.com/hard-cider",
    "http://www.glassybaby.com/mama",
    "http://www.glassybaby.com/mimosa",
    "http://www.glassybaby.com/night-cap",
    "http://www.glassybaby.com/on-the-rocks",
    "http://www.glassybaby.com/papa",
    "http://www.glassybaby.com/product/4792",
    "http://www.glassybaby.com/single-malt",
    "http://www.glassybaby.com/sparkling-water",
    "http://www.glassybaby.com/splash",
    "http://www.glassybaby.com/twist",
    "http://www.glassybaby.com/babytrain-5",
    "http://www.glassybaby.com/color-club-12-months",
    "http://www.glassybaby.com/color-club-6-months",
    "http://www.glassybaby.com/color-club-3-months",
    "http://www.glassybaby.com/wine-tote",
    "http://www.glassybaby.com/glassybaby-matches",
    "http://www.glassybaby.com/scented-tea-light",
    "http://www.glassybaby.com/glassybaby-tote",
    "http://www.glassybaby.com/palm-wax-tea-lights-100",
    "http://www.glassybaby.com/beeswax-tea-lights-15-hour",
    "http://www.glassybaby.com/beeswax-tea-lights-100",
    "http://www.glassybaby.com/beeswax-tea-lights-5-hour",
    "http://www.glassybaby.com/palm-wax-tea-lights-16"
];

function httpGetProducts() {
    request(openWSDatabase, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let jsonObject = JSON.parse(body);
        scrapedData = runScraper(jsonObject[0].data);
        return scrapedData;
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
            if (productArray.length == 260) {
                createCSVFile(productArray);
            }
        });
    });
}

function createCSVFile(productList){
    var csv = json2csv({ data: productList});

    fs.writeFile('glassybaby.csv', csv, function(err) {
        if (err) throw err;
            console.log('file saved');
    });
}
httpGetProducts();