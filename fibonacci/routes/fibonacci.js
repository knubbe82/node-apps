const express = require('express');
const router = express.Router();

const math = require('../math');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.query.fibonum) {
    res.render('fibonacci', {
      title: "Calculate Fibonacci numbers",
      fibonum: req.query.fibonum,
      fiboval: math.fibonacci(req.query.fibonum)
    });
  } else {
    res.render('fibonacci', {
      title: "Calculate Fibonacci numbers",
      fibonum: undefined,
    })
  }
});

module.exports = router;
