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
    var name=req.body['id'];
    var pass=req.body['password'];
    var qstr=[name,pass];
    console.log(name);
    console.log(client._queryable);
    if(!(client._connecting || client._connected)){
    client.connect();}
    client.query('SELECT * from users where name=$1 and password=$2;', qstr,(err, result) => {
      if (err) throw err;
            console.log(result[0]);
      if(result.length>0){
        console.log("存在しました");
      res.redirect('/')
    }
    else{
      console.log("存在しません");
        res.redirect('/login')
    }
    });
  },
  //ユーザー新規登録
  regsituser:function(req,res,next){
    var name=req.body['name'];
    var pass=req.body['password'];
    var qstr=[name,pass]
    console.log(name);
    console.log(client._connecting);
    if(!(client._connecting || client._connected)){
    client.connect();}
    client.query('select * from users where name=$1;',qstr, (err, result) => {
      if (err) throw err;
      console.log(result);
      if(result.length>0){
        console.log("登録ずみのユーザーです");
        res.redirect('/regist')
      }
      else{
        console.log("登録します");
        client.query('insert into users values(name=$1,password=$2);',qstr, (err, result) => {
        console.log("登録に成功しました");
        res.redirect('/')
            })
      }
  })}}
