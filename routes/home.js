var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('home', { title: 'ozayoshi\'s works' });
});

module.exports = router;
