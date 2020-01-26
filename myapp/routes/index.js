var express = require('express');
var router = express.Router();
var Controller= require('../controller/controller.js')
var b=require('../classfiles/board.js')
/* GET home page. */
router.get('/othello', function(req, res, next) {
  res.render('index', { title: 'Express',Board:b});
});
router.get('/login', function(req, res, next) {
  res.render('login', { message:""});
});
router.get('/', function(req, res, next) {
  res.render('top');
});
router.post('/top',function(req,res,next){
  res.render('index')
})
router.get('/giveup', function(req, res, next) {
  res.render('giveup')})
router.get('/regist',function(req,res,next){
    res.render('regist',{ message:""})
  })
// router.get('/db',async(req,res)=>{
//   try{
//     const client=await pool.connect()
//     const result=await client. query('select * from users');
//     const results={'results':(result)? result.rows: null}
//     res.render('/db',results);
//   }catch(err){
//     console.error(err);
//     res.send("Error"+err)
//   }
// })

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

// router.get('/db',(req, res, next)=>{
//   client.query('SELECT * from users', (err, res) => {
//     if (err) throw err;
//     res.render('db',result)
//     });
// }
// )
router.post('/logincheck', Controller.checkuser);
router.post('/regist',Controller.regsituser);


module.exports = router;
