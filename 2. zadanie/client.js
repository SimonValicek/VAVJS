//Šimon Valíček

window.onload = async (ev) => getDataForPage()

document.querySelector('html').style.background = "#FFE4C4"
document.querySelector('body').style.margin = "0px"

//-----------------------------------LOADINGS-----------------------------
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
}

document.addEventListener('keydown',function(ev){
    if(ev.keyCode === 38) movePlayer(-1);
    else if(ev.keyCode === 40) movePlayer(1);
    else if(ev.keyCode === 32 || ev.keyCode === 13) {
    }
});

async function loadPage(data){
    document.querySelector('body').innerHTML = data 
}

async function loadCanvas(lines){
    const canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')
    speed = Math.floor(speed * 0.8);
    score += speed;
    ctx.beginPath()
    update()
    console.log(speed,score)
    if(collision(lines)){
        console.log('havaria')
        gameOver(ctx)
        return false
     }
    drawBackground(ctx)
    drawConcreteAndBorder(ctx,lines)
    drawCar(ctx,playerTx,playerTy)
    showScore(ctx)
    ctx.stroke()
    return true
}



async function getData(id){
    const temp = document.getElementById(id).value
    return await temp
}

async function sendDataToServer(url,data){
    const response = await fetch(`http://localhost:8080${url}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    return await response.text()
}

async function getDataForPage(){
    let temp = await sendDataToServer("/homepage",{})
    loadPage(temp)
}


async function loginOnClick(){
    let username = await getData('username')
    let password = await getData('password')
    let temp = await sendDataToServer("/signIn",{
        username: username,
        password: password,
    })
    loadPage(temp)
}


async function registerOnClick(){
    let temp = await sendDataToServer("/signUpNow", {})
    loadPage(temp);
}


async function garageOnPlay(){
    let temp = await sendDataToServer('/game', {})
    loadPage(temp)
    
    await connectToWS()
}



async function afterRegistration(){  
    let username =  await getData('username');
    let email = await getData('email')
    let password1 = await getData('password1')
    let password2 = await getData('password2')
    let temp = await sendDataToServer('/register',{
        username: username,
        email: email,
        password1: password1,
        password2: password2})
    loadPage(temp)
}



async function backToGarage(){
    let temp = await sendDataToServer('/garage',{})
    loadPage(temp)
}


async function displayTable(){
    let temp = await sendDataToServer('/tableOfUsers',{})
    loadPage(temp)
}

async function deleteFromTable(deleted){
    const name = deleted
    let temp = await sendDataToServer('/tableOfUsers',{
        toBeDeleted:name})
    loadPage(temp)
}

async function deleteFromTableViaSubmit(){
    let username =  await getData('username');
    let email = await getData('email')
    let temp = await sendDataToServer('/tableOfUsers',{
        username: username,
        email: email})
    loadPage(temp)
}

async function connectToWS(){
    const socket = new WebSocket('ws://localhost:8082')
    console.log('Konecne sa nieco vypisalo')
    socket.addEventListener('open',()=>{
         music.loop = true;
    var musicButton = document.createElement('img');
    var musicReady = true;
    musicButton.style.width = '48px';
    musicButton.style.height = '48px';
    musicButton.src = 'https://cdn.pixabay.com/photo/2014/04/03/10/00/loudspeaker-309554_960_720.png'; 
    document.querySelector('body').innerHTML =musicButton 
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
         socket.send(JSON.stringify({
            type: 'hello',
            content: [3,"4"]
         }))
     })

    
    socket.addEventListener('close', async (msg) =>{
        const packet = JSON.parse(msg)
        console.log(packet.packet)
        socket.send(JSON.stringify({
            type: 'uzavrete zo strany klienta'
        }))
    })

    socket.addEventListener('message',async (msg) => {
        //console.log('client prijal spravu')
        const packet = JSON.parse(msg.data)
        let temp = await loadCanvas(packet.content)
        if (!temp){
            socket.send(JSON.stringify({
                type: 'narafali sme',
            }))
        }
        //console.log(packet.content)
    })

    console.log('Konecne sa to pripojilo na port 8082')
}


//___________________________________GAME______________________________

var gameWidth = 160; 
var gameHeight = 80; 
var size = 10; 
var roadSize = 6;
var pix = 8;
var animation = 0;
var playerTx = 1;
var playerTy = Math.floor(gameHeight/2);
var prevTx = -1;
var prevTy = -1;
var speed = 75;
var score = 0;

var background = document.createElement('img')
background.src = 'https://cdn.pixabay.com/photo/2016/09/10/12/40/grass-1659054_960_720.jpg';

var concrete = document.createElement('img');
concrete.src = 'https://cdn.pixabay.com/photo/2016/11/22/20/04/abstract-1850424_960_720.jpg';

var borderOdd = document.createElement('img');
borderOdd.src = 'https://cdn.pixabay.com/photo/2015/08/16/09/55/tile-890729_960_720.jpg';

var borderEven = document.createElement('img');
borderEven.src = 'https://cdn.pixabay.com/photo/2012/04/13/12/23/flag-32177_960_720.png';

var tireEven = document.createElement('img');
tireEven.src = 'https://cdn.pixabay.com/photo/2013/07/12/16/37/tire-151270_960_720.png';

var tireOdd = document.createElement('img');
tireOdd.src = 'https://cdn.pixabay.com/photo/2013/07/12/15/35/alloy-rim-150133_960_720.png';

var carBody = document.createElement('img');
carBody.src = 'https://cdn.pixabay.com/photo/2017/07/07/13/23/spiral-background-2481434_960_720.png';

var drawBackground = function(ctx){
    ctx.drawImage(background,0,0,1280,640);
}

var draw = function (ctx,array, style){
    for(var i=0;i<array.length;i++) {
        if(typeof array[i] !== 'undefined') {
            ctx.drawImage(style, array[i][0]*pix, array[i][1]*pix, pix, pix)
        }
        else console.log('points['+i+'] is undefined');
    }
}

var drawBorder = function (ctx,array, styleOne, styleTwo ){
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

function fillRoadLine(line) {
    var roadLine = [];
    for(var i=0;i<line.length;i++) {
        for(var j=-roadSize+1;j<roadSize;j++) {
            roadLine.push([line[i][0],line[i][1]+j]);
        }
    }
    return roadLine;
}
function fillEdgeLine(line) {
    var edgeLine = [];
    for(var i=0;i<line.length;i++) {
        edgeLine.push([line[i][0],line[i][1]-roadSize]);
        edgeLine.push([line[i][0],line[i][1]+roadSize]);
    }
    return edgeLine;
}

function fillLinePoints(line) {
    return line.filter(function(point,index){
        return index < gameWidth;
    }).map(function(point,index){
        return [index,point];
    });
}

var drawConcreteAndBorder = function (ctx,line){
    var linePoints = fillLinePoints(line);
    var road = fillRoadLine(linePoints);
    draw(ctx,road, concrete);
    var edge = fillEdgeLine(linePoints);
    if(animation%2===0)
    drawBorder(ctx,edge, borderOdd, borderEven);
    else if(animation%2===1)
    drawBorder(ctx,edge, borderEven, borderOdd);
}

var drawCar = function (ctx,tx,ty) {
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
  
    draw(ctx,prevPlayerPoints,concrete);
    draw(ctx,playerPoints,carBody);
    if(animation%2===0)
    draw(wheels,tireOdd);
    else if(animation%2===1)
    draw(ctx,wheels,tireEven);

    animation++;
}

function collision(line) {
    var tx = playerTx;
    var ty = playerTy;
    var playerPoints = [
        [tx,ty],[tx+3,ty],
        [tx,ty+1],[tx+1,ty+1],[tx+2,ty+1],[tx+3,ty+1],[tx+4,ty+1],
        [tx,ty+2],[tx+3,ty+2]
    ];

    var linePoints = fillLinePoints([line[0],line[1],line[2],line[3],line[4],line[5]]);
    var megaLinePoints = fillRoadLine(linePoints).concat(fillEdgeLine(linePoints));;

    var allIn = true;
    playerPoints.forEach(function(playerPoint){
        var isIn = false;
        megaLinePoints.forEach(function(linePoint){
            if(playerPoint[0] === linePoint[0] && playerPoint[1] === linePoint[1]) isIn = true;
        });
        if(!isIn) allIn = false;
    });
    return !allIn;
}

var showScore = function(ctx) {
    ctx.beginPath()
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, 20, 20);
    ctx.fillText("Speed: " + (100 - speed), 20, 50);
    ctx.stroke()
}

var gameOver = function(ctx) {
    console.log('no co sa nevypisujes')
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "40px Helvetica";
    textAlign = 'center';
    textBaseline = 'center';
    console.log('game over');
    ctx.fillText("Game over", 1280/2-65, 640/2-140);
    ctx.fillText("Your score: "+score, 1280/2-125, 640/2 - 90);
}

function movePlayer(points) {
    playerTy = playerTy + points;
    if(playerTy<0) playerTy=0;
    if(playerTy > gameHeight-3) playerTy = gameHeight-3;
}


//-------------------------------------LICENCIE-----------------------------------------------------------
//zdroj: https://pixabay.com/vectors/button-reset-sign-symbol-icon-31199/
//Pixabay License
//Free for commercial use
//No attribution required

//zdroj: https://pixabay.com/photos/grass-lawn-garden-park-ground-1659054/
//Pixabay License
//Free for commercial use
//No attribution required

//zdroj: https://pixabay.com/photos/abstract-wall-backdrop-background-1850424/
//Pixabay License
//Free for commercial use
//No attribution required

//zdroj: https://pixabay.com/photos/tile-red-white-floor-glossy-grout-890729/
//Pixabay License
//Free for commercial use
//No attribution required

//zdroj: https://pixabay.com/vectors/flag-japan-japanese-nation-32177/
//Pixabay License
//Free for commercial use
//No attribution required

//zdroj: https://pixabay.com/vectors/alloy-rim-tyre-rim-wheel-150133/
//Pixabay License
//Free for commercial use
//No attribution required

//zdroj: https://pixabay.com/vectors/tire-tyre-car-transport-wheel-151270/
//Pixabay License
//Free for commercial use
//No attribution required


//zdroj: https://pixabay.com/vectors/spiral-background-spiral-turning-2481434/
//Pixabay License
//Free for commercial use
//No attribution required

//zdroj: https://audionautix.com/Music/FeelsGood2B.mp3
// All free and downloadable music on audionautix.com is created by Jason Shaw.
// This creative commons music is licensed under a Creative Commons Attribution 4.0 International License.


//zdroj: https://pixabay.com/vectors/loudspeaker-cartoon-isolated-309554/
//Pixabay License
//Free for commercial use
//No attribution required

//zdroj: https://pixabay.com/vectors/button-reset-sign-symbol-icon-31199/
//Pixabay License
//Free for commercial use
//No attribution required