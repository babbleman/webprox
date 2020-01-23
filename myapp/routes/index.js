var express = require('express');
var router = express.Router();
var b=require('../classfiles/board.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',Board:b});
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express',Board:b});
});

module.exports = router;
