//Šimon Valíček
//cvičenie pondelok 15:00


document.getElementById('game-table').remove();

var tempPlayerX = playerTx;
var tempPlayerY = playerTy;
var tempSpeed = speed;

roadSize = 10;

var animation = 0;

var pix = 8;

window.grid = function (){};
window.testBump = function (){};

var canvas = document.createElement("canvas");
canvas.width = gameWidth*pix; 
canvas.height = gameHeight*pix;
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

var background = document.createElement('img');
background.src = 'https://cdn.pixabay.com/photo/2016/09/10/12/40/grass-1659054_960_720.jpg';
//zdroj: https://pixabay.com/photos/grass-lawn-garden-park-ground-1659054/
//Pixabay License
//Free for commercial use
//No attribution required

var concrete = document.createElement('img');
concrete.src = 'https://cdn.pixabay.com/photo/2016/11/22/20/04/abstract-1850424_960_720.jpg';
//zdroj: https://pixabay.com/photos/abstract-wall-backdrop-background-1850424/
//Pixabay License
//Free for commercial use
//No attribution required

var borderOdd = document.createElement('img');
borderOdd.src = 'https://cdn.pixabay.com/photo/2015/08/16/09/55/tile-890729_960_720.jpg';
//zdroj: https://pixabay.com/photos/tile-red-white-floor-glossy-grout-890729/
//Pixabay License
//Free for commercial use
//No attribution required

var borderEven = document.createElement('img');
borderEven.src = 'https://cdn.pixabay.com/photo/2012/04/13/12/23/flag-32177_960_720.png';
//zdroj: https://pixabay.com/vectors/flag-japan-japanese-nation-32177/
//Pixabay License
//Free for commercial use
//No attribution required

var tireOdd = document.createElement('img');
tireOdd.src = 'https://cdn.pixabay.com/photo/2013/07/12/15/35/alloy-rim-150133_960_720.png';
//zdroj: https://pixabay.com/vectors/alloy-rim-tyre-rim-wheel-150133/
//Pixabay License
//Free for commercial use
//No attribution required

var tireEven = document.createElement('img');
tireEven.src = 'https://cdn.pixabay.com/photo/2013/07/12/16/37/tire-151270_960_720.png';
//zdroj: https://pixabay.com/vectors/tire-tyre-car-transport-wheel-151270/
//Pixabay License
//Free for commercial use
//No attribution required

var carBody = document.createElement('img');
carBody.src = 'https://cdn.pixabay.com/photo/2017/07/07/13/23/spiral-background-2481434_960_720.png';
//zdroj: https://pixabay.com/vectors/spiral-background-spiral-turning-2481434/
//Pixabay License
//Free for commercial use
//No attribution required

var music = document.createElement('audio');
music.src = 'https://audionautix.com/Music/FeelsGood2B.mp3';
//zdroj: https://audionautix.com/Music/FeelsGood2B.mp3
// All free and downloadable music on audionautix.com is created by Jason Shaw.
// This creative commons music is licensed under a Creative Commons Attribution 4.0 International License.

music.loop = true;
var musicButton = document.createElement('img');
var musicReady = true;
musicButton.style.width = '48px';
musicButton.style.height = '48px';
musicButton.src = 'https://cdn.pixabay.com/photo/2014/04/03/10/00/loudspeaker-309554_960_720.png';
//zdroj: https://pixabay.com/vectors/loudspeaker-cartoon-isolated-309554/
//Pixabay License
//Free for commercial use
//No attribution required
document.body.appendChild(musicButton);
musicButton.addEventListener('click',function(){
    if(musicReady){
        music.play();
        console.log('audio on');
        musicReady = false;
    }
    else if(!musicReady){
        music.pause();
        console.log('audio off');
        musicReady = true;
    }
})

var resetButton = document.createElement('img');
resetButton.style.width = '48px';
resetButton.style.height = '48px';
resetButton.src = 'https://cdn.pixabay.com/photo/2012/04/13/00/18/button-31199_960_720.png';
//zdroj: https://pixabay.com/vectors/button-reset-sign-symbol-icon-31199/
//Pixabay License
//Free for commercial use
//No attribution required
document.body.appendChild(resetButton);
resetButton.addEventListener('click',function(){
    reset();
})

var drawBackground = function(){
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
}

var draw = function (array, style){
    for(var i=0;i<array.length;i++) {
        if(typeof array[i] !== 'undefined') {
            ctx.drawImage(style, array[i][0]*pix, array[i][1]*pix, pix, pix)
        }
        else console.log('points['+i+'] is undefined');
    }
}

var drawBorder = function (array, styleOne, styleTwo ){
    for(var i=0;i<array.length;i++) {
        if(typeof array[i] !== 'undefined') {
            if(i % 4 === 0 || i % 4 === 1) 
                ctx.drawImage(styleOne, array[i][0]*pix, array[i][1]*pix, pix, pix);
            if(i % 4 === 2 || i % 4 === 3 )  
                ctx.drawImage(styleTwo, array[i][0]*pix, array[i][1]*pix, pix, pix);
        }
        else console.log('points['+i+'] is undefined');
    }
}

var drawConcreteAndBorder = function (){
    var linePoints = fillLinePoints(line);
    var road = fillRoadLine(linePoints);
    draw(road, concrete);
    var edge = fillEdgeLine(linePoints);
    if(animation%2===0)
    drawBorder(edge, borderOdd, borderEven);
    else if(animation%2===1)
    drawBorder(edge, borderEven, borderOdd);
}

var drawCar = function (tx,ty) {
    var playerPoints = [
        [tx,ty+1],[tx+1,ty+1],[tx+2,ty+1],[tx+3,ty+1],[tx+4,ty+1],
    ];

    var wheels = [
        [tx,ty],[tx+3,ty],
        [tx,ty+2],[tx+3,ty+2]
    ];
   
    var prevPlayerPoints = [
        [prevTx,prevTy],[prevTx+3,prevTy],
        [prevTx,prevTy+1],[prevTx+1,prevTy+1],[prevTx+2,prevTy+1],[prevTx+3,prevTy+1],[prevTx+4,prevTy+1],
        [prevTx,prevTy+2],[prevTx+3,prevTy+2]
    ];

    if(prevTx === -1) prevPlayerPoints = [];
    prevTx = tx;
    prevTy = ty;
  
    draw(prevPlayerPoints,concrete);
    draw(playerPoints,carBody);
    if(animation%2===0)
    draw(wheels,tireOdd);
    else if(animation%2===1)
    draw(wheels,tireEven);

    animation++;
}

var showScore = function() {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, 20, 20);
    ctx.fillText("Speed: " + (100 - speed), 20, 50);
}

var reset = function() {
    console.log('reset');
    animation=0;
    iter = 0;
    score = -75;
    speed = tempSpeed;
    playerTx = tempPlayerX;
    playerTy = tempPlayerY;
    line =[];
    generateLine();
    clearInterval(ival);
    clearInterval(interval);
    ival = setInterval(gameLoop,speed-10);
    interval = setInterval(() => {
        main();
    }, 100);
}

var gameOver = function() {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "40px Helvetica";
    textAlign = 'center';
    textBaseline = 'center';
    console.log('game over');
    ctx.fillText("Game over", canvas.width/2-65, canvas.height/2-140);
    ctx.fillText("Your score: "+score, canvas.width/2-125, canvas.height/2 - 90);
}

clearInterval(ival);


var main = function () {
    ctx.beginPath();
    update();
    drawBackground();
    drawConcreteAndBorder();
    drawCar(playerTx,playerTy);
    showScore();
    if(collision()){
        clearInterval(ival);
        clearInterval(interval);
        gameOver();
    }
    ctx.stroke();
};

var keysDown = {};
document.addEventListener("keydown", function (event) {
    keysDown[event.key.toLowerCase()] = true;
}, false);
document.addEventListener("keyup", function (event) {
    keysDown[event.key.toLowerCase()] = false;
}, false);

var update = function() {
    // console.log('update', keysDown)
    if (keysDown['g']) { 
        movePlayer(1)
    }
    if (keysDown['t']) { 
        movePlayer(-1)
    }
    if (keysDown[" "]) {
        document.getElementById('game-table').remove();
        reset();
    }
}

ival = setInterval(gameLoop,speed-10);
var interval = setInterval(() => {
    main();
}, 50);