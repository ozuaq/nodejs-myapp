var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('ima-chat-top', { title: 'ima-chat-top' });
});

module.exports = router;
