var blockSize = 25;
var rows = 20;
var cols = 20;
var board, content;

windown.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize
}