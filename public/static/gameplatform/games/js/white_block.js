/* white_block javascript Document */

var w = 260;
var h = 400;
var socre = 0;
var starttime;
var endtime;
var allTime = 0;
var quicknum = 0.5;

function rect(arr, y){  //每个rect表示一行
    this.y = y;
    this.arr = arr;     //arr数组表示这一行每个矩形的颜色
}

// 设置画布
var games = document.getElementById('games');
games.width = w;
games.height = h;
var canvas = games.getContext('2d');

//矩形初始化
var rectArr = new Array();
function drawStartRect(){
    for(var i = 0; i < 6; i++){
        var arr = new Array();
        /*** 
        *
        * 0: 白色
        * 1: 红色
        * 2: 黑色
        * 3及以上: 灰色
        *
        **/
        
        for (var j = 0; j < 4; j++){
           arr[j] = 0;
        }
        
        var num = Math.floor(Math.random() * 4);
        arr[num] = 2;
        rectArr[i] = new rect(arr, i * 100 - 200);
    }
}

drawStartRect();
//画矩形
function drawRect(){
    for(var i = 0; i < rectArr.length; i++){
        for(var j = 0; j < rectArr[i].arr.length; j++){
            switch(rectArr[i].arr[j]){
                case 0: {
                    canvas.fillStyle = '#FFFFFF';
                    break;
                }
                case 1: {
                    canvas.fillStyle = '#FF0000';
                    break;
                }
                case 2: {
                    canvas.fillStyle = '#000000';
                    break;
                }
                case 3: {
                    canvas.fillStyle = '#DDDDDD';
                    break;
                }
                default: {
                    canvas.fillStyle = '#DDDDDD';
                }
            }
            
            canvas.fillRect(j * (w / 4), rectArr[i].y, (w / 4), (h / 4));
            canvas.strokeStyle = '#666666';
            canvas.strokeRect(j * (w / 4), rectArr[i].y, (w / 4), (h / 4));
        }
    }
    
    canvas.strokeStyle = '#00000';
    canvas.strokeRect(0, 0, w, h);
}

//矩形移动
function run(){
    drawRect();
    for(var i = 0; i < rectArr.length; i++){
        rectArr[i].y += quicknum;
        
        if(rectArr[i].y > h){
            for(var j = 0; j < rectArr[i].arr.length; j++){
                //游戏结速
                if(rectArr[i].arr[j] == 2){
                    isrunning = false;
                    clearInterval(running);
                    rectArr[i].arr[j] = 1;
                    print();
                    //回退
                    backing = setInterval('goback()', 1);
                    return;
                }
            }
            
            for(var j = 0; j < 4; j++){
                rectArr[i].arr[j] = 0;
            }
  
            var num = Math.floor(Math.random() * 4);
            rectArr[i].arr[num] = 2;
            rectArr[i].y -= (h / 4) * 6;
            
         }
         
         endtime = new Date();
         allTime = (endtime - starttime - stoptime) / 1000;
         document.getElementById('times').innerHTML = allTime + '秒';
    }
    
}

var running = null;
var begin = true;
var isrunning = true;

function onDown(event){
    if(begin){
        if(flagstop){
            starttime = new Date();
        }
        
        running = setInterval('run();', 10);
        begin = false;
        isrunnign = true;
    }
    if(isrunning){
        //获取点击时x、y坐标
        event = event || window.event;
        
        var x = event.clientX - 400;
        var y = event.clientY - 100;
        
        for(var i = 0; i < rectArr.length; i++){
            if(rectArr[i].y < y && rectArr[i].y + (h / 4) > y){
                var num = Math.floor(x / (w / 4));
                rectArr[i].arr[num]++;
                drawRect();
                if(rectArr[i].arr[num] == 1){
                    print();
                    clearInterval(running);
                    isrunning = false;
                    return;
                }else if(rectArr[i].arr[num] = 3){
                    socre++;
                    var copysocre = socre;
                    
                    if(socre % 10 == 0){
                        quicknum = quicknum + 0.2;
                    }
                    
                    document.getElementById('socre').innerHTML = socre;
                }
            }
        }
    }
}

var backnum = 0;
var backing = null;

function goback(){
    if(backnum == (h / 4)){
        clearInterval(backing);
    }
   
    for(var i = 0; i < rectArr.length; i++){
        rectArr[i].y--;
    } 
   
    drawRect();
    backnum++;
}

function start(){
    if(flagstop){
        starttime = new Date();
    }
    
    running = setInterval('run();', 5);
    begin = false;
    isrunning = true;
}

var stoptime = 0;
var stopstarttime = null;
var stopendtime = null;
var flagstop = true;

function stop(){
    if(flagstop && !begin){
        stopstarttime = new Date();
        clearInterval(running);
        flagstop = false;
        isrunning = false;
        begin =true;
    }else if(!flagstop){
        stopendtime = new Date();
        stoptime = stopendtime - stopstarttime;
        running = setInterval('run();', 5);
        flagstop = true;
        isrunning = true;
        begin = false;
    }
}

function reset(){
    window.location.reload();
}

function print(){
    document.getElementById('socre').innerHTML = socre + '分';
    document.getElementById('times').innerHTML = allTime + '秒';
}

drawRect();
print();

