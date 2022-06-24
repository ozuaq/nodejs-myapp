var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('site-description', { title: 'site-description' });
});

module.exports = router;
