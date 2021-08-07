const express = require('express');
const router = express.Router();
const http = require('http');
const math = require('../math');

router.get('/', function (req, res, next) {
    console.log(req.params.fibonum);
    if (req.params.fibonum) {
        let httpreq = http.request({
            host: "localhost",
            port: process.env.SERVERPORT,
            path: `/fibonacci/${Math.floor(req.query.fibonum)}`,
            method: 'GET'
        });
        httpreq.on('response', (response) => {
            response.on('data', (chunk) => {
                let data = JSON.parse(chunk);
                res.render('fibonacci', {
                    title: "Calculate Fibonacci numbers",
                    fibonum: req.query.fibonum,
                    fiboval: data.result
                  });
            });
            response.on('error', (err) => { next(err); });
        });
        httpreq.on('error', (err) => { next(err); });
        httpreq.end();
    } else {
        res.render('fibonacci', {
            title: "Calculate Fibonacci numbers",
            fiboval: undefined
          });
    }
});

module.exports = router;