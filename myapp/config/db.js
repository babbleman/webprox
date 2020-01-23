var Pg= require('pg-pool');
const pg=new Pg({
database:'d8j1jndcuogbgu',
user:'zhrmwkgtdknttd',
password:'19f0585b36e273fc87813acdb28d443cecf2576138eccef959f6814987af9452',
host:'ec2-52-55-59-250.compute-1.amazonaws.com',
port:'5432',
});

pg.connect();
var query="select * from users"
pg.query(query)
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))
