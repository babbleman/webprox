var express = require('express');
var router = express.Router();
var pool=require('pg-pool');
var b=require('../classfiles/board.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',Board:b});
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express',Board:b});
});
router.get('/db',async(req,res)=>{
  try{
    const client=await pool.connect()
    const result=await client. query('select * from users');
    const results={'results':(result)? result.rows: null}
    res.render('/db',results);
  }catch(err){
    console.error(err);
    res.send("Error"+err)
  }
})

module.exports = router;
