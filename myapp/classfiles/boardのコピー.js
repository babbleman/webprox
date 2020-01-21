module.exports= class Board{
  constructor(){
    this.board=[];
    this.x=20;
    for(var i=1;i<9;i++){
      var arr=[];
    for(var j=1;j<9;j++){
      arr.push(0);
    }
    this.board.push(arr)
  }

  }


}
