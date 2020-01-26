var Model=require('../models/users.js')
var express = require('express');
var model=new Model();
const Views='../views/'
const { Client } = require('pg');


module.exports={
    //ユーザー登録済み確認
  checkuser:function(req,res,next){
    var name=req.body['id'];
    var pass=req.body['password'];
    var qstr=[name,pass];
    console.log(name);
    var client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
      client.connect()
      client.query('SELECT * from users where name=$1 and password=$2;', qstr,(err, result) => {
      if (err) throw err;
      if(result.rows.length>0){
        console.log("存在しました");
      res.redirect('/')
      client.end();
    }
    else{
      res.render(Views+'/login.ejs',{message:"ユーザ名かパスワードが間違っています"});
      console.log("存在しません");
        client.end();
    }
    });
  },
  //ユーザー新規登録
  regsituser:function(req,res,next){
    var name=req.body['name'];
    var pass=req.body['password'];
    var qstr=[name,pass]
    var client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
    console.log(name);
    console.log(client._connecting);
    console.log(client._connected);
    client.connect();
    client.query('SELECT * from users where name=$1',[name],(err, result) => {
      if (err) throw err;
      console.log(result);
      if(name.length<2){
        res.render(Views+'/regist.ejs',{message:"名前は３文字以上で登録して下さい"});
      }
      else if (pass.length<=3){
        res.render(Views+'/regist.ejs',{message:"パスワードは４文字以上入力してください"});
      }
      else if(result.rows.length>0){
        console.log("登録ずみのユーザーです");
        res.render(Views+'/regist.ejs',{message:"このユーザー名は既に登録されています"});
      }
      else{
        console.log("登録します");
        client.query('insert into users values(name=$1,password=$2);',qstr, (err, result) => {
        console.log("登録に成功しました");
        res.redirect('/')
            })
      }
      client.end();
  })}}
