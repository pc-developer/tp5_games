/* goband javascript Document */

var chess = document.getElementById('chess');  
var context = chess.getContext('2d');  
  
//赢法数组  
var win = [];  
var me ;  
var chessboard = []; 
var over;  
var count;  
//赢法的统计数组  
 var myWin = [];  
 var computerWin = [];  
 //定义存放状态的类  
   /*
 function keep(x, y, color) {  
     this.x = x;  
     this.y = y;  
     this.color = color;  
 }  
 */ 
 var newGame = function () {  
     me = true;  
     over = false;   
  
     chessBoard = [];  
     //赢法数组  
     wins = [];  
  
     //赢法统计数组  
     myWin = [];  
     computerWin = [];  
 
     //赢法数组初始化  
     for (var i = 0; i < 15; i++) {  
         win[i] = [];  
         for (var j = 0; j < 15; j++) {  
             win[i][j] = [];  
         }  
     }

     //赢法数组具体  
     count = 0;  
     for (var i = 0; i < 15; i++) {  
         for (var j = 0; j < 11; j++) {  
             for (var k = 0; k < 5; k++) {  
                 win[i][j + k][count] = true;  
             }  
             count++;  
         }  
     }
  
     for (var i = 0; i < 15; i++) {  
         for (var j = 0; j < 11; j++) {  
             for (var k = 0; k < 5; k++) {  
                 win[j + k][i][count] = true;  
             }  
             count++;  
         }  
     }

     for (var i = 0; i < 11; i++) {  
         for (var j = 0; j < 11; j++) {  
             for (var k = 0; k < 5; k++) {  
                 win[i + k][j + k][count] = true;  
             }  
             count++;  
         }  
     }

     for (var i = 0; i < 11; i++) {  
         for (var j = 0; j < 11; j++) {  
             for (var k = 0; k < 5; k++) {  
                 win[i + k][14 - j - k][count] = true;  
             }  
             count++;  
         }  
     }  

     console.log(count);  
     //赢法统计数组初始化  
     for (var i = 0; i < count; i++) {  
         myWin[i] = 0;  
         computerWin[i] = 0;  
     }  
     //定义棋盘  
  
  
     for (var i = 0; i < 15; i++) {  
         chessboard[i] = [];  
         for (var j = 0; j < 15; j++) {  
             chessboard[i][j] = 0;  
         }  
     }  
     chess.onclick = function (e) {  
         myClick(e);  
     }  
 }  

 //背景  
 var water = function () {  
     var logo = new Image();  
     logo.src = "/games/public/static/gameplatform/images/goband_bg.jpg";
     logo.onload = function () {  
         context.drawImage(logo, 0, 0, 450, 450);  
         drawchessboard();  
     }  
 }  

//画线  
 var drawchessboard = function () {  
     context.strokeStyle = "#aaa";  
     for (var i = 0; i < 15; i++) {  
         context.moveTo(15, 15 + i * 30);  
         context.lineTo(435, 15 + i * 30);  
         context.moveTo(15 + i * 30, 15);  
         context.lineTo(15 + i * 30, 435);  
         context.stroke();  
     }  
 }  

//画棋子  
var onestep = function (i, j, me) {  
    context.beginPath();  
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);  
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);  
    if (me) {  
        gradient.addColorStop(0, "#0A0A0A");  
        gradient.addColorStop(1, "#636766");  
    }  
    else {  
        gradient.addColorStop(0, "#D1D1D1");  
        gradient.addColorStop(1, "#F9F9F9");  
    }  
    context.fillStyle = gradient;  
    context.fill();  
    context.closePath();  
}  

//落子  
var myClick = function (e) {  
    if (over)  
    { return; }  
    if (!me)  
    { return; }  
    var x = e.offsetX;  
    var y = e.offsetY;  
    i = Math.floor(x / 30);  
    j = Math.floor(y / 30);  
    if (chessboard[i][j] == 0) {  
        onestep(i, j, me);  
        chessboard[i][j] = 1;  
    
        for (k = 0; k < count; k++) {  
            if (win[i][j][k]) {  
                myWin[k]++;  
                computerWin[k] = 6;  
                if (myWin[k] == 5) {  
                    setTimeout(function () {  
                        gameOver(me);  
                    }, 200)  
                }  
            }  
        }  
    }  
    else {  
        return;  
    }  
    if (!over) {  
        me = !me;  
        computerAI();  
    }  
}  
  
    var computerAI = function () {  
        //得分数据  
        var myScore = [];  
        var computerScore = [];  
        var max = 0;  
        var u = 0; v = 0;  
  
        //得分初始化  
        for (var i = 0; i < 15; i++) {  
            myScore[i] = [];  
            computerScore[i] = [];  
            for (var j = 0; j < 15; j++) {  
                myScore[i][j] = 0;  
                computerScore[i][j] = 0;  
            }  
        }  
  
  
        for (var i = 0; i < 15; i++) {  
            for (var j = 0; j < 15; j++) {  
                if (chessboard[i][j] == 0) //不能下在我下过的地方  
                    for (var k = 0; k < count; k++) {  
                        if (win[i][j][k]) {//下这里可以赢  
                            if (myWin[k] == 1)  
                            { myScore[i][j] += 200; }  
                            else if (myWin[k] == 2)  
                            { myScore[i][j] += 400; }  
                            else if (myWin[k] == 3)  
                            { myScore[i][j] += 2000; }  
                            else if (myWin[k] == 4)  
                            { myScore[i][j] += 10000; }  
  
  
                            if (computerWin[k] == 1)  
                            { computerScore[i][j] += 200; }  
                            else if (computerWin[k] == 2)  
                            { computerScore[i][j] += 420; }  
                            else if (computerWin[k] == 3)  
                            { computerScore[i][j] += 2100; }  
                            else if (computerWin[k] == 4)  
                            { computerScore[i][j] += 20000; }  
                        }  
                    }  
                if (myScore[i][j] > max) {  
                    max = myScore[i][j];  
                    u = i;  
                    v = j;  
                }  
                else if (myScore[i][j] == max) {  
                    if (computerScore[i][j] > computerScore[u][v]) {  
                        u = i;  
                        v = j;  
                    }  
                }  
                if (computerScore[i][j] > max) {  
                    max = computerScore[i][j];  
                    u = i;  
                    v = j;  
                }  
                else if (computerScore[i][j] == max) {  
                    if (myScore[i][j] > myScore[u][v]) {  
                        u = i;  
                        v = j;  
                    }  
                }  
            }  
        }  

        onestep(u, v, false);  
        chessboard[u][v] = 2;  
        for (k = 0; k < count; k++) {  
            if (win[u][v][k]) {  
                computerWin[k]++;  
                myWin[k] = 6;  
                if (computerWin[k] == 5) {  
                    setTimeout(function () {  
                        me = false;
			gameOver(me);  
                    }, 200)  
                }  
            }  
        }  
        if (!over) {  
            me = !me;
        }  
    }  
        //游戏结束界面  
        var gameOver = function (me) {  
            over = true;
	    var a;
	    
            if (me) {  
                a = confirm("你赢了，是否重新开始！");  
            } else {  
                a = confirm("你输了，是否重新开始！");  
            }  
            if (a) {  
                setTimeout(function () {  
                    newGame();  
                    water();  
                }, 200);  
            }  
        };        

       //重开  
       var btn = document.getElementById('game_btn');  
       btn.onclick = function () {  
           var a = confirm("是否重新开始");  
           if (a) {  
               newGame();      
               water();      
           }  
       }

       //加载游戏
       newGame();
       water();

