var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/add', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/demo', function(req, res, next) {
  res.send('ok好吧');
});
module.exports = router;
