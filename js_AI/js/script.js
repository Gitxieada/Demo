// JS实现人机大战之五子棋（AI篇）---慕课网


var me = true;
var over = false;
var chessBoard = [];

//赢法数组
var wins = [];

//赢法的统计数组
//我方赢法
var myWin = [];
//机器赢法
var computerWin = [];


for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}


for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}

var count = 0;
//统计所有横线的赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {

        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}
//所有纵线赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {

        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}

//所有正斜线赢法
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {

        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
//所有反斜线赢法

for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {

        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}
console.log(count);
for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}



var chess = document.getElementById("chess");
var context = chess.getContext("2d");

context.strokeStyle = "#BFBFBF"
var logo = new Image();
logo.src = "images/logo.png";
logo.onload = function () {
    context.drawImage(logo, 0, 0, 450, 450);
    drawChessBoard();


}
var drawChessBoard = function () {

    for (var i = 0; i < 15; i++) {

        //划横线
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        //划纵线
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();

    }

}

var oneStep = function (i, j, me) {

    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);

    context.closePath();
    //渐变填充棋子
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (me) {
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    } else {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }

    context.fillStyle = gradient;
    context.fill();

}


chess.onclick = function (e) {
    if (over) {
        return;
    }
    //如果不是我方下棋
    if (me != true) {
        return
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);

    if (chessBoard[i][j] == 0) {
        oneStep(i, j, me);
        chessBoard[i][j] = 1;

        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                myWin[k]++;
                computerWin[k] = 6;
                if (myWin[k] == 5) {
                    window.alert("你赢了！");
                    over = true;
                }
            }
        }
        if (!over) {
            me = !me;
            computerAI();
        }
    }

}


var computerAI = function () {

    //定义我方得分
    var myScore = []
    //定义电脑得分
    var computerScore = []
    var max = 0;
    var max_i = 0;
    var max_j = 0;
    //初始化
    for (var i = 0; i < 15; i++) {
        myScore[i] = []
        computerScore[i] = []
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    //遍历棋盘
    for (var i = 0; i < 15; i++) {

        for (var j = 0; j < 15; j++) {

            if (chessBoard[i][j] == 0) {
                //此处没有子
                //遍历赢法
                for (var k = 0; k < count; k++) {
                    //拦截我方顺利连5子
                    if (wins[i][j][k]) {


                        if (myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }

                        if (computerWin[k] == 1) {
                            computerScore[i][j] += 200;
                        } else if (computerWin[k] == 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] == 3) {
                            computerScore[i][j] += 2100;
                        } else if (computerWin[k] == 4) {
                            computerScore[i][j] += 20000;
                        }

                    }

                }
				/*得分与max相等的情况下:
					代表要么下此处赢了，要么就是下到此处没有多大用处。
					基于防守：
						电脑在这下子，就算没用也要抢先下在对方在此下棋比较好的地方
					基于进攻：
						电脑在此下棋可以直接赢。
				*/
                //计算机计算我方最佳落点（防守)

                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    max_i = i;
                    max_j = j;

                } else if (myScore[i][j] == max) {

                    //我方最佳
                    if (computerScore[i][j] > computerScore[max_i][max_j]) {
                        max_i = i;
                        max_j = j;
                    }
                }

                // //计算电脑最佳落点（进攻）
                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    max_i = i;
                    max_j = j;
                } else if (computerScore[i][j] == max) {
                    if (myScore[i][j] > myScore[max_i][max_j]) {
                        max_i = i;
                        max_j = j
                    }
                }
            }

        }
    }
    //得出电脑最佳下棋位置max_i,max_j
    oneStep(max_i, max_j, me);
    //白棋落子
    chessBoard[max_i][max_j] = 2;
    for (var k = 0; k < count; k++) {
        if (wins[max_i][max_j][k] == true) {

            computerWin[k]++;
            //电脑在此下子后，对方在第k种方式就无法赢取
            myWin[k] = 6;
            if (computerWin[k] == 5) {
                window.alert("你输了！");
                over = true;
            }
        }

    }

    //轮到人类方下棋
    if (!over) {
        me = !me;
    }
}





