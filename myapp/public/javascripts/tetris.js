class Tetris{
  constructor(){
    this.boardheight=20;
    this.boardwidth=10;
    this.nowpeace;
    this.gameend=false
    this.ongame=false
    this.nowmovingplace;
    this.nowmovingstate;
    this.nextpeace;
    this.nextmovingstate;
    this.hold=0
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
this.nextpeace=a
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

  rotate(dir){
    var flasharray=this.flashdropplace().map(a=>a.slice())
    var len=this.nowmovingstate.length
    var arraycopy=this.nowmovingstate.map(a=>a.slice())
    var array2=this.nowmovingstate.map(a=>a.slice())
    var array=[]
    //値渡しができている前提、必要があれば書き換える
    if(dir=="right"){
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        var pp=arraycopy[len-1-j][i]
        array2[i][j]=pp
        if(pp!=0){
          array.push([i,j])
        }
      }
    }
  }
  else if(dir=="left"){
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        var pp=arraycopy[i][j]
        array2[len-1-j][i]=pp
        if(pp!=0){
          array.push([len-1-j,i])
        }
      }
    }
  }
    var beforearray=this.getplace().map(a=>a.slice())
    var afterarray=[]
    for (var i = 0; i < array.length; i++) {
      var s=array[i][0]
      var t=array[i][1]
      //nowmovingplace[i][j]には二次元配列が入っている
      var y=this.nowmovingplace[s][t][0]
      var x=this.nowmovingplace[s][t][1]
      afterarray.push([y,x])
      if(!(0<=x && x<this.boardwidth && y<this.boardheight)){
        return
      }
    }
    this.nowmovingstate=array2;
    this.changeboard(beforearray,afterarray,flasharray)
  }
  // rotateleft(){
  //   var len=this.nowmovingstate.length
  //   var arraycopy=this.nowmovingstate.map(a=>a.slice())
  //   var array2=this.nowmovingstate.map(a=>a.slice())
  //   //値渡しができている前提、必要があれば書き換える
  //   for (var i = 0; i < len; i++) {
  //     for (var j = 0; j < len; j++) {
  //       array2[len-1-j][i]=arraycopy[i][j]
  //     }
  //   }
  //   var array=this.getmovingstate()
  //   for (var i = 0; i < array.length; i++) {
  //     var s=array[i][0]
  //     var t=array[i][1]
  //     //nowmovingplace[i][j]には二次元配列が入っている
  //     var y=this.nowmovingplace[s][t][0]
  //     var x=this.nowmovingplace[s][t][1]
  //     if(!(0<=x && x<this.boardwidth && y<this.boardheight)){
  //       return
  //     }
  //   }
  //   this.nowmovingstate=array2;
  // }

  move(dir){
    if(!this.canmove(dir)){
      return
    }
    var flasharray=this.flashdropplace().map(a=>a.slice())
    var beforearray=this.getplace().map(a=>a.slice())
    var afterarray=[]
    var s=dir[0]
    var t=dir[1]
    var len=this.nowmovingstate.length
    var array=this.getmovingstate()
    for (var x = 0; x < len; x++) {
      for (var j = 0; j < len; j++) {
        this.nowmovingplace[x][j][0]+=s
        this.nowmovingplace[x][j][1]+=t
      }
    }
    for (var i = 0; i < array.length; i++) {
      var y=array[i][0]
      var x=array[i][1]
      afterarray.push([this.nowmovingplace[y][x][0],this.nowmovingplace[y][x][1]])
    }
    this.changeboard(beforearray,afterarray,flasharray)

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

  holdpeace(){
    if(this.hold==0){
      this.hold=this.nowmovingstate.map(a=>a.slice())
      this.createnewpeace(this.makenewplace.bind(this))
    }
    else{
      this.nowmovingstate=this.hold.map(a=>a.slice())
      this.hold=this.nowmovingstate.map(a=>a.slice())
    }

  }

  flashdropplace(){
    var placecopy=this.getplace().map(a=>a.slice())
    var flag=false
    while(true){
    for (var i = 0; i < placecopy.length; i++) {
      placecopy[i][0]+=1
    }
    for (var i = 0; i < placecopy.length; i++) {
      var y=placecopy[i][0]
      var x=placecopy[i][1]
      if(y>=this.boardheight){
        flag=true
      }
      else if(this.board[y][x]>0){
        flag=true
      }

    }
    if(flag){
      for (var i = 0; i < placecopy.length; i++) {
        placecopy[i][0]-=1
      }
      break
    }
  }
  return placecopy
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
    // for (var i = 0; i < array.length; i++) {
    //   var y=array[i][0]
    //   var x=array[i][1]
    //   //Y軸,一番下の行のポジションが３になるように設定
    //   this.nowmovingplace[y][x][0]=4-len+y
    //   //X軸
    //   this.nowmovingplace[y][x][1]+=middle-peacemiddle+x
    // }
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
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
    if(!this.nextpeace){
      this.nextmovingstate=this.randompeace()
    }
    this.nowmovingstate=this.nextmovingstate.map(a=>a.slice())
    this.nowpeace=this.nextpeace
    this.nextmovingstate=this.randompeace()
    callback()
  }

  drop(){
    var dir=[1,0]
    if(this.canmove(dir)){
      this.move(dir)
    }
    else{

      this.determinestone();
      this.createnewpeace(this.makenewplace.bind(this))
      this.moveonboard()
      this.drawboard()
      this.drawnextpeace()
    }

  }
  droptolast(){
    while(true){
      if(!this.canmove([1,0])){
        break
      }
      this.move([1,0])
    }
    this.moveonboard()
    this.drop()
  }

  moveonboard(){
    for (var i = 0; i < this.boardheight; i++) {
      for (var j = 0; j < this.boardwidth; j++) {
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
    this.drawboard();
  }
  changeboard(array,array2,flasharray){
    for (var i = 0; i < array.length; i++) {
      if(array2.indexOf(array[i])==-1){
      var s=array[i][0]
      var t=array[i][1]
      this.board[s][t]=0
    }
    }
    for (var i = 0; i < array2.length; i++) {
      var s=array[i][0]
      var t=array[i][1]
      this.board[s][t]=-this.nowpeace;
    }
    this.draw(array,array2,flasharray)
  }
  draw(array,array2,flasharray){
    var flashplace=this.flashdropplace();
    for (var i = 0; i < flasharray.length; i++) {
        var y=flasharray[i][0]
        var x=flasharray[i][1]
        document.getElementById(100*(y+1)+x).style.background=this.colorarray[0]
    }
    for (var i = 0; i < flashplace.length; i++) {
      var y=flashplace[i][0]
      var x=flashplace[i][1]
      if(this.board[y][x]==0){
      document.getElementById(100*(y+1)+x).style.background="#e8ede9";}
    }
    for (var i = 0; i < array.length; i++) {
      if(array2.indexOf(array[i])==-1){
      var s=array[i][0]
      var t=array[i][1]
      if(s>=3){
      document.getElementById(100*(s+1)+t).style.background=this.colorarray[0];}
    }

    }
    for (var i = 0; i < array2.length; i++) {
      var s=array2[i][0]
      var t=array2[i][1]
      if(s>=3){
      document.getElementById(100*(s+1)+t).style.background=this.colorarray[this.nowpeace];}
    }

  }


  drawboard(){

    for (var i = 3; i <tetris.boardheight; i++) {
      for (var j = 0; j < tetris.boardwidth; j++) {
        var color=Math.abs(this.board[i][j])
        document.getElementById(100*(i+1)+j).style.background=this.colorarray[color];
      }
    }

    var flashplace=this.flashdropplace();
    for (var i = 0; i < flashplace.length; i++) {
      var y=flashplace[i][0]
      var x=flashplace[i][1]
      if(this.board[y][x]==0){
      document.getElementById(100*(y+1)+x).style.background="#e8ede9";}
    }

    // for (var i = 0; i < 4; i++) {
    //   for (var j = 0; j < 4; j++) {
    //     var num=this.nowmovingstate[i][j]
    //     document.getElementById(10*(i+1)+j).style.background=this.colorarray[num];
    //   }
    // }

    // var array=this.flashdropplace().bind(this)
    // alert("hahahad")
    // for (var i = 0; i < array.length; i++) {
    //   var y=array[i][0]
    //   var x=array[i][1]
    //   alert("hi")
    //   document.getElementById(100*(y+1)+x).style.background="black";
    // }
  }
  drawnextpeace(){
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        document.getElementById(10*(i+1)+j).style.background=this.colorarray[0];
      }
    }
    var len=this.nextmovingstate.length
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len; j++) {
        if(this.nextmovingstate[i][j]!=0){
          document.getElementById(10*(i+1)+j).style.background=this.colorarray[this.nextpeace];
        }
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
  this.drawboard();
  }
  movedraw(dir){
    this.move(dir)
    this.drawboard();
  }
}

function pause(){
if(!tetris.ongame){
  tetris.ongame=true
  tetris.createnewpeace(tetris.makenewplace.bind(tetris));
  setInterval("draws()",700);
}
else{
  tetris.ongame=false
  clearInterval()
}

}

var t=new Tetris();
t.createnewpeace(t.makenewplace.bind(t));
// for (var i = 0; i <100; i++) {
//   t.drop()

// }

// t.board.splice(1,4)
// for (var i = 0; i < 20; i++) {
// t.droptolast()
// t.moveonboard()
// }

//変更イベントがある一覧
//ピースが動いた時(move)回転した時(rotatel or rotater)
//ライン消しが行われた時 (checkline)
//新しいドロップが落ちてくる時
//ピースが落ち切った時
//ピースが落ち切った時に場合わけをする
//もしもライン消しが行われていなかったら落ち切った部分だけを更新する
//ライン消しが行われた場合は全てのボードを再描画する
//ピースが落ち切った時にまずは落ち切ったときの様子を描画してそこでチェックラインをする
//チェックラインを通れば画面全体を再描画、新規にピースを作成する時はピースの一部分を描画する
