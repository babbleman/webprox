let {PythonShell} = require('python-shell')
var x="./python/test.py"
var pyshell=new PythonShell(x)
pyshell.send(20)
pyshell.on('message',function(data,err){
  // if (err) throw err
  console.log(data);
})
// PythonShell.run(x, null, function (err,data) {
//   if (err) throw err;
//   for(var i=0;i<10;i++){
//     console.log(data[i]);
//   }
// });
