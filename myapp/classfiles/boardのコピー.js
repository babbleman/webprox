function aiueo(delay){
  return new Promise(function(resolve,reject){
    setTimeout(function(){resolve(console.log("pp"));},delay);

  });
}

aiueo(4000).then(function(value){
  console.log("00");
});












function hello(){
  return new Promise(function(resolve,reject){
    setTimeout(function(){ resolve(aiueo(3000))},2000)
  })
}

hello().then(function(value){
  console.log("oooop");
})
