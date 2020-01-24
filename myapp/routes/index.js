var express = require('express');
var router = express.Router();
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();
var b=require('../classfiles/board.js')
/* GET home page. */
router.get('/othello', function(req, res, next) {
  res.render('index', { title: 'Express',Board:b});
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express',Board:b});
});
router.get('/', function(req, res, next) {
  res.render('top');
});
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

router.get('/db',(req, res, next)=>{
  client.query('SELECT * from users', (err, res) => {
    if (err) throw err;
    res.render('/db',result)
    });
}
)

module.exports = router;
