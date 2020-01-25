var Model=require('../models/users.js')
var express = require('express');
var model=new Model();
const Views='../views/'
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports={
    //ユーザー登録済み確認
  checkuser:function(req,res,next){
    var name=req.body['name'];
    var pass=req.body['password'];
    var qstr=[name,pass];
    console.log(name);
    client.connect();
    client.query('SELECT * from users where name=$1 and password=$2;', qstr,(err, result) => {
      if (err) throw err;
      if(result.length>0){
      res.redirect('/')
    }
    else{
        res.render('..views/login.ejs', { message:"ユーザー名かパスワードが間違っています"});
    }
      client.end();
    });
  },
  //ユーザー新規登録
  regsituser:function(req,res,next){
    var name=req.body['name'];
    var pass=req.body['password'];
    var qstr=[name,pass]
    console.log(name);
    client.connect();
    client.query('INSERT INTO users values($1,$2);',qstr, (err, result) => {
      if (err) throw err;
      res.redirect('/')
      client.end();
    });


  }
}
