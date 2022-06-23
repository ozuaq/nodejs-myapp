var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('ima-chat-description', { title: 'ima-chat-description' });
});

module.exports = router;
