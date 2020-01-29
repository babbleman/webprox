class Tetris{
  constructor(){
    this.boardheight=20;
    this.boardwidth=10;
    this.nowpeace;
    this.gameend=false
    this.nowmovingplace;
    this.nowmovingstate;
    this.colorarray=['white','#04adbf','red','green','purple','#c3c904','blue','orange']
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
    this.peaceblank=
    []
    // アイ
    this.peacei=
    [[0,0,0,0],
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0]
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
    [1,0,0],
    [1,1,1],
    [0,0,0]
  ]
  this.peacel=
  [
    [0,0,1],
    [1,1,1],
    [0,0,0]
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
var a = Math.floor( Math.random() * max+1 ) ;
console.log(a);
this.nowpeace=a
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
      if(this.board[ss+s][tt+t]>0){
        return false
      }
    }
    return true
  }

  rotateright(){
    var len=this.nowmovingstate.length
    var arraycopy=this.nowmovingstate.map(a=>a.slice())
    var array2=this.nowmovingstate.map(a=>a.slice())
    //値渡しができている前提、必要があれば書き換える
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        array2[i][j]=arraycopy[len-1-j][i]
      }
    }
    var array=this.getmovingstate()
    for (var i = 0; i < array.length; i++) {
      var s=array[i][0]
      var t=array[i][1]
      //nowmovingplace[i][j]には二次元配列が入っている
      var y=this.nowmovingplace[s][t][0]
      var x=this.nowmovingplace[s][t][1]
      if(!(0<=x && x<this.boardwidth && y<this.boardheight)){
        console.log(y,x);
        return
      }
    }
    this.nowmovingstate=array2;
  }
  rotateleft(){
    var len=this.nowmovingstate.length
    var arraycopy=this.nowmovingstate.map(a=>a.slice())
    var array2=this.nowmovingstate.map(a=>a.slice())
    //値渡しができている前提、必要があれば書き換える
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        array2[len-1-j][i]=arraycopy[i][j]
      }
    }
    var array=this.getmovingstate()
    for (var i = 0; i < array.length; i++) {
      var s=array[i][0]
      var t=array[i][1]
      //nowmovingplace[i][j]には二次元配列が入っている
      var y=this.nowmovingplace[s][t][0]
      var x=this.nowmovingplace[s][t][1]
      if(!(0<=x && x<this.boardwidth && y<this.boardheight)){
        console.log(y,x);
        return
      }
    }
    this.nowmovingstate=array2;
  }

  move(dir){
    if(!this.canmove(dir)){
      return
    }
    var s=dir[0]
    var t=dir[1]
    var len=this.nowmovingstate.length
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        this.nowmovingplace[i][j][0]+=s
        this.nowmovingplace[i][j][1]+=t
      }
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
      this.board[s][t]=Math.abs(this.nowpeace)
    }
    this.checline();
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
    // console.log(middle);
    // for (var i = 0; i < array.length; i++) {
    //   var y=array[i][0]
    //   var x=array[i][1]
    //   //Y軸,一番下の行のポジションが３になるように設定
    //   this.nowmovingplace[y][x][0]=4-len+y
    //   //X軸
    //   this.nowmovingplace[y][x][1]+=middle-peacemiddle+x
    // }
    // console.log(this.nowmovingplace);
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        console.log(this.nowmovingplace[i][j][0]);
        this.nowmovingplace[i][j][0]=4-len+i
        this.nowmovingplace[i][j][1]=middle-peacemiddle+j
      }
    }
    //横位置をランダムに設定する場合

    // var a = Math.floor( Math.random() * ((this.boardwidth-this.getwidth()) + 1) ) ;
    // for (var i = 0; i < len; i++) {
    //   for (var j = 0; j < array.length; j++) {
    //
    //   }
    // }
  }
  endcheck(){
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < this.boardwidth; j++) {
        if(this.board[i][j]!=0){
        return true}
      }
    }
    return false
  }

  createnewpeace(callback){
    this.nowmovingstate=this.randompeace()
    callback()
  }

  drop(){
    var dir=[1,0]
    if(this.canmove(dir)){
      this.move(dir)
    }
    else{
      if(this.endcheck()){
        this.gameend=true
        return
      }

      this.determinestone();
      this.createnewpeace(this.makenewplace.bind(this))
    }
    this.moveonboard();
  }
  droptolast(){
    while(true){
      if(!this.canmove([1,0])){
        break
      }
      this.move([1,0])
    }
    this.moveonboard()
  }

  moveonboard(){
    for (var i = 0; i < this.boardheight; i++) {
      for (var j = 0; j < this.boardwidth; j++) {
        console.log(i,j)
        console.log(this.board);
        console.log(this.board[i][j]);
        if(this.board[i][j]<0){
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
          this.board[s][t]=-this.nowpeace
        }
  }
  checline(){
    for (var i = 0; i < this.boardheight; i++) {
      var flag=true
      for (var j = 0; j < this.boardwidth; j++) {
        if(this.board[i][j]==0){
          flag=false
          break
        }
      }
      if(flag){
        this.board.splice(i,1)
        var a=[]
        for (var i = 0; i <this.boardwidth;i++) {
          a.push(0)
        }
        this.board.unshift(a);
      }
    }
  }

  drawboard(){
    for (var i = 3; i <tetris.boardheight; i++) {
      for (var j = 0; j < tetris.boardwidth; j++) {
        var color=Math.abs(this.board[i][j])
        document.getElementById(100*(i+1)+j).style.background=this.colorarray[color];
      }
    }
  }
  reset(){
    for (var i = 0; i < this.boardheight; i++) {
      for (var j= 0;j < this.boardwidth; j++) {
        this.board[i][j]=0
      }
    }
  this.createnewpeace(this.makenewplace.bind(this))
  }

}


var t=new Tetris();
t.createnewpeace(t.makenewplace.bind(t));
for (var i = 0; i <100; i++) {
  t.drop()
  // console.log(t.nowmovingplace);
  // console.log(t.board);
}

t.board.unshift("a")
t.board.splice(1,4)
console.log(t.board);

// for (var i = 0; i < 20; i++) {
// t.droptolast()
// t.moveonboard()
// }
