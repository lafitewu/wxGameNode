var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/add', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cj', function(req, res, next) {
  res.send('respond with a resource2222');
});
module.exports = router;
