var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ima-chat', { title: 'ima-chat' });
});

module.exports = router;
