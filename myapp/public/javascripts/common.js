


class Board{
  constructor(size){
    this.size=size
    this.turn=1
    this.board=[];
    this.direction=[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]
    for(var i=0;i<size;i++){
      var arr=[];
    for(var j=0;j<size;j++){
      arr.push(0);
    }
    this.board.push(arr)
  }
  var x=parseInt(size/2);
  this.board[x-1][x-1]=1;
  this.board[x][x]=1;
  this.board[x-1][x]=2;
  this.board[x][x-1]=2;
  }

  drawboard(){
    for(var i=0;i<this.size;i++){
    for(var j=0;j<this.size;j++){
      var color=""
      if (this.board[i][j]==1){
        color="black";
      }
      else if(this.board[i][j]==2){
        color="white";
      }
      else{
        color="green";
      }
        document.getElementById(10*i+j).style.background=color;
    }}


}

    isavailable(arr){
      var y=arr[0]
      var x=arr[1]
      if(!(this.board[y][x])==0){
        return false
      }
      var opp;
      if(this.turn==1){
        opp=2
      }
      else{
        opp=1
      }
      var flag=false;
      for(var i=0;i<this.direction.length;i++){
        var xx=x;
        var yy=y;
        var s=this.direction[i][0];
        var t=this.direction[i][1];
        yy+=s
        xx+=t
        if (!(0<=xx && xx<=this.size-1 && 0<=yy && yy<=this.size-1)){
          continue;
        }
        if(!(this.board[yy][xx]==opp)){
          continue;
        }
        while(true){
          yy+=s
          xx+=t
          if (!(0<=xx && xx<=this.size-1 && 0<=yy && yy<=this.size-1)){
            break
          }
          if(this.board[yy][xx]==0){
          break
          }
          if(this.board[yy][xx]==this.turn){
            return true
          }
        }

      }
      return false;
    }

    turnchange(){
      var opp;
      if(this.turn==1){
        opp=2
      }
      else{
        opp=1
      }
      this.turn=opp;
    }

    putstone(pos){
      if(!(this.isavailable(pos))){
        return
      }
      var y=pos[0]
      var x=pos[1]
      this.board[y][x]=this.turn
      var opp;
      if(this.turn==1){
        opp=2
      }
      else{
        opp=1
      }
      for(var i=0;i<this.direction.length;i++){
        var xx=x;
        var yy=y;
        var s=this.direction[i][0];
        var t=this.direction[i][1];
        yy+=s
        xx+=t
        var flag=false
        if (!(0<=xx && xx<=this.size-1 && 0<=yy && yy<=this.size-1)){
          continue;
        }
        if(this.board[yy][xx]!=opp){
          continue;
        }
        var arr=[[yy,xx]];
        while(true){
          yy+=s
          xx+=t
          if(!(0<=xx && xx<=this.size-1 && 0<=yy && yy<=this.size-1)){
            break
          }
          if(this.board[yy][xx]==0){
            break
          }
          if(this.board[yy][xx]==this.turn){
            flag=true
            break
          }
          arr.push([yy,xx]);
        }
        if(flag){
        for(var j=0;j<arr.length;j++){
          this.board[arr[j][0]][arr[j][1]]=this.turn;
        }}
      }
      this.turnchange();
      this.drawboard()
      // this.randomput()


    }
    searchavailavle(){
      var arr=[]
      for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        if(this.isavailable([i,j])){
          arr.push([i,j])
        }
      }
      }
      return arr
    }

    randomput(){
      var arr=this.searchavailavle()
      var randnum =  Math.floor( Math.random() * arr.length )
      console.log(arr);
      this.putstone(arr[randnum])

    }

    check(id){
      var y=parseInt(id/10)
      var x=id%10
      this.putstone([y,x])
      this.randomput();
    }

}
function sleep(waitMsec) {
  var startMsec = new Date();

  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}

// var x=new Board(8);
// x.putstone([2,4])
// x.randomput()
// x.randomput()
