var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('home', { title: 'ozayoshi\'s works' });
});

router.get('/site-description', function(req, res, next) {
  res.render('site-description', { title: 'site-description' });
});

router.get('/ima-chat-top', function(req, res, next) {
  res.render('ima-chat-top', { title: 'ima-chat-top' });
});

router.get('/ima-chat-description', function(req, res, next) {
  res.render('ima-chat-description', { title: 'ima-chat-description' });
});

router.post('/ima-chat', function(req, res, next) {
  let roomName = req.body.roomName;
  let userName = req.body.userName;
  console.log(roomName+userName);
  res.render('ima-chat', { title: 'ima-chat', roomName: roomName, userName: userName });
});

module.exports = router;
