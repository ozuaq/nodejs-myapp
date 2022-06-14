var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
  let roomName = req.body.roomName;
  let userName = req.body.userName;
  console.log(roomName+userName);
  res.render('ima-chat', { title: 'ima-chat', roomName: roomName, userName: userName });
});

module.exports = router;
