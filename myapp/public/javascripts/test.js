class Tetris{
  constructor(){
    this.boardheight=20;
    this.boardwidth=10;
    this.nowmovingplace;
    this.nowmovingstate;
    this.colorarray=['white','pink','yellow','blue','orange','black','red','purple']
    //確定石
    this.kakutei=9
    // 盤面の作成
    this.board=[]
    for (var i = 0; i < this.boardheight; i++) {
      var array=[];
      for (var j= 0;j < this.boardwidth; j++) {
        array.push(0);
      }
      this.board.push(array);
    }

    // ピースの作成
    this.peacearray=[];
    // アイ
    this.peaceblank=
    []
    this.peacei=
    [[0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,1]
  ]
  this.peacez=
  [
    [0,0,0],
    [1,1,0],
    [0,1,1]
  ]
  this.peaces=
  [
    [0,0,0],
    [0,1,1],
    [1,1,0]
  ]
  this.peacet=
  [
    [0,0,0],
    [1,1,1],
    [0,1,0]
  ]
  this.peaceo=
  [
    [1,1],
    [1,1]
  ]
  this.peacej=
  [
    [0,0,0],
    [1,0,0],
    [1,1,1]
  ]
  this.peacel=
  [
    [0,0,0],
    [0,0,1],
    [1,1,1]
  ]
  this.peacearray.push(this.peaceblank)
  this.peacearray.push(this.peacei)
  this.peacearray.push(this.peaces)
  this.peacearray.push(this.peacez)
  this.peacearray.push(this.peaceo)
  this.peacearray.push(this.peacet)
  this.peacearray.push(this.peacej)
  this.peacearray.push(this.peacel)
  }


  randompeace(){
    var max=this.peacearray.length-1
var a = Math.floor( Math.random() * (max)+1 ) ;
return this.peacearray[a];
  }
  getmovingstate(){
    var array=[]
    for (var i = 0; i < this.nowmovingstate.length; i++) {
      for (var j = 0; j < this.nowmovingstate.length; j++) {
        if(this.nowmovingstate[i][j]==1){
          array.push([i,j])
        }
      }
    }
    return array
  }
  getplace(){
    var placearray=[]
    var array=this.getmovingstate()
    for (var i = 0; i < array.length; i++) {
      var s=array[i][0]
      var t=array[i][1]
      //nowmovingplace[i][j]には二次元配列が入っている
      placearray.push(this.nowmovingplace[s][t])
    }
    return placearray
  }

  canmove(dir){
    var s=dir[0]
    var t=dir[1]
    var array=this.getplace()
    for (var i = 0; i < array.length; i++) {
      var ss=array[i][0]
      var tt=array[i][1]
      if(!(ss+s<this.boardheight && 0<=tt+t && tt+t<this.boardwidth)){
        return false
      }
      if(this.board[ss+s][tt+t]==this.kakutei){
        return false
      }
    }
    return true
  }

  rotateright(){
    var len=this.nowmovingstate.length
    var arraycopy=this.nowmovingstate.map(a=>a.slice())
    //値渡しができている前提、必要があれば書き換える
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        this.nowmovingstate[i][j]=arraycopy[len-1-j][i]
      }
    }

  }
  rotateleft(){
    var len=this.nowmovingstate.length
    var arraycopy=this.nowmovingstate.map(a=>a.slice())
    //値渡しができている前提、必要があれば書き換える
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        this.nowmovingstate[len-1-j][i]=arraycopy[i][j]
      }
    }

  }

  move(dir){
    var s=dir[0]
    var t=dir[1]
      var array=this.getmovingstate()
      for (var i = 0; i < array.length; i++) {
        var y=array[i][0]
        var x=array[i][1]
        this.nowmovingplace[y][x][0]+=s
        this.nowmovingplace[y][x][1]+=t
      }


  }
  getwidth(){
    var min=1000
    var max=-1
    for (var i = 0; i < this.nowmovingstate.length; i++) {
      for (var j = 0; j < this.nowmovingstate.length; j++) {
        if(this.nowmovingstate[i][j]==1){
          if(j>max){
            max=j
          }
          if(j<min){
            min=j
          }
          }
        }
      }
      return max-min+1
  }
  getheight(){
    var min=1000
    var max=-1
    for (var i = 0; i < this.nowmovingstate.length; i++) {
      for (var j = 0; j < this.nowmovingstate.length; j++) {
        if(this.nowmovingstate[i][j]==1){
          if(i>max){
            max=i
          }
          if(i<min){
            min=i
          }
          }
        }
      }
      return max-min+1
  }
  determinestone (){
    var array=this.getmovingstate();
    for (var i = 0; i < array.length; i++) {
      var y=array[i][0]
      var x=array[i][1]
      var s=this.nowmovingplace[y][x][0]
      var t=this.nowmovingplace[y][x][1]
      this.board[s][t]=9
    }
  }

  makenewplace(){
    var len=this.nowmovingstate.length
    var array=[]
    for (var i = 0; i < len; i++) {
      var array2=[]
      for (var j = 0; j < len; j++) {
        array2.push([0,0])
      }
      array.push(array2)
    }
    this.nowmovingplace=array
    array=this.getmovingstate();
    var middle=Math.floor((this.boardwidth)/2)
    var peacemiddle=Math.floor(len/2)
    console.log(middle);
    for (var i = 0; i < array.length; i++) {
      var y=array[i][0]
      var x=array[i][1]
      //Y軸,一番下の行のポジションが３になるように設定
      this.nowmovingplace[y][x][0]=4-len+y
      //X軸
      this.nowmovingplace[y][x][1]+=middle-peacemiddle+x
    }
    console.log(this.nowmovingplace);
    //横位置をランダムに設定する場合

    // var a = Math.floor( Math.random() * ((this.boardwidth-this.getwidth()) + 1) ) ;
    // for (var i = 0; i < len; i++) {
    //   for (var j = 0; j < array.length; j++) {
    //
    //   }
    // }
  }

  createnewpeace(callback){
    this.nowmovingstate=this.randompeace()
    callback()
  }

  droptolast(){
    while(true){
      if(!this.canmove([1,0])){
        break
      }
      this.move([1,0])
    }
  }

  drop(){
    var dir=[1,0]
    if(this.canmove(dir)){
      console.log("hello");
      this.move(dir)
    }
    else{
      this.determinestone();
      this.createnewpeace(this.makenewplace.bind(this))
    }
    this.moveonboard();
  }

  moveonboard(){
    for (var i = 0; i < this.boardheight; i++) {
      for (var j = 0; j < this.boardwidth; j++) {
        if(this.board[i][j]!=0 && this.board[i][j]!=9){
          this.board[i][j]=0
        }
      }
    }
        var array=this.getmovingstate();
        for (var i = 0; i < array.length; i++) {
          var y=array[i][0]
          var x=array[i][1]
          var s=this.nowmovingplace[y][x][0]
          var t=this.nowmovingplace[y][x][1]
          this.board[s][t]=1
        }
  }

}


var x=300
