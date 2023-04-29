//Šimon Valíček

const {homepageStart, canvas, homepageEnd, userAlreadyExists, garage, registration, registrationStart, registrationEnd, wrongInput} = require('./htmls')

const bcrypt = require('bcrypt')
const express = require('express');
const WebSocketServer = require('ws')
const mongoose = require('mongoose');

const app = express()
var PORT = 8080
var wsPORT = 8082

const wss = new WebSocketServer.Server({port: wsPORT})
    
app.use(express.static(__dirname)) 
app.use(express.json({extended: false}))
    
//--------------------------------CONFIG--------------------------------

mongoose.connect('mongodb://simon:hesloHESLO12345@46.101.238.160:27017/?authMechanism=SCRAM-SHA-1')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDB...',err))


app.listen(PORT, (err) => {
    if(err) 
        console.log(err)
    console.log('Listening on port ', PORT)
})


wss.on('connection', (ws) => {
    console.log('som tu')

    
    generateLine();
    var interval = setInterval(()=>{
        ws.send(JSON.stringify({
         content: line,
        }))
        if((iter % gameWidth) === 0 && iter !== 0) 
            bumpLine()
        moveLine()
        iter++
    },100)
   
   
    ws.on('message', (data) => {
        const packet = JSON.parse(data);
        console.log(packet.type) 
        if(packet.type==='narafali sme')
            clearInterval(interval)
    })

    ws.on('close', (msg)=>{
        const packet = JSON.parse(msg);
        console.log(packet.type)
        ws.send(JSON.stringify({
            packet: 'uzavrete zo strany serveru',
           })) 
        clearInterval(interval)
        })

    console.log('WS connected on port ', wsPORT)
})


    
    //------------------------------------SERVER---------------------------
var userObject = {}


const validateEmail = (email)=>{
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}        

const onlyLetters = (str) => {
    return /^[a-zA-Z]+$/.test(str)
}

app.post('/homepage', (req, res) => {
    let array =[]
    array.push(homepageStart)
    array.push(homepageEnd)
    return res.send(array.join(""))
 });


 app.post('/signIn', async (req,res)=>{
    let temp = req.body
    userObject={}
    let user = await getUser(temp.username)
    const isValid = await bcrypt.compare(temp.password, user[0].password)
    if(user.length!==0 && isValid){
        userObject = user
        //if(user.login==='admin' && user.password==='123'
        return res.send(garage)

    }
    else {
        let array =[]
        array.push(homepageStart)
        array.push(wrongInput)
        array.push(homepageEnd)
        return res.send(array.join(""))
    } 
});


app.post('/signUpNow', async (req,res)=>{
    let array = []
    array.push(registrationStart)
    array.push(registrationEnd)
    return res.send(array.join(""))
});  


app.post('/game', async (req, res)=>{
    return res.send(canvas)
})


app.post('/register',async (req,res)=>{
    let temp = req.body
    let password1 = temp.password1
    let password2 = temp.password2
    let email = temp.email
    let username = temp.username
    let array = []
    userObject={}
    array.push(registrationStart)
    let existingUsername = await checkUsername(username)
    let existingEmail = await checkEmail(email)
    if(existingUsername.length!==0 || existingEmail.length!==0){    
        array.push(userAlreadyExists)
        array.push(registrationEnd)
        return res.send(array.join(""))
    }
    else if (password1===password2&& validateEmail(email)&& onlyLetters(username) &&password1 && password2 && email && username){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password1,salt)
          
        userObject =await createUser(username, hash, email)
        return res.send(garage)
    }
    else{
        array.push(wrongInput)
        array.push(registrationEnd)
        return res.send(array.join(""))
    }
});  

app.post('/garage',async (req,res)=>{
    return res.send(garage)
})


app.post('/tableOfUsers', async (req,res)=>{
    let deletion = req.body
    await deleteUser(deletion.login, deletion.email)
    let users = await getUsers()
    let array = []
    for (let user of users){
        if (user.login === 'admin')
            continue
        array.push(`<br><button onclick="deleteFromTable(${user.login.toString()})">${user.login}</button><p1>&nbspemail:${user.email}</p1></br>`)
    }
    if (userObject[0].isAdmin===true){    
        array.push(`<br><input id="username" type="username" position="relative" text-align="relative" placeholder="Username"></br>`)
        array.push(`<br><input id="email" type="email" position="relative" text-align="relative" placeholder="Email"></br>`)
        array.push(`<br><input id="password1" type="password" position="relative" text-align="relative" placeholder="Password"></br>`)
        array.push(`<br><input id="password2" type="password" position="relative" text-align="relative" placeholder="Confirm Password"></br>`)
        array.push(`<br><button onclick="afterRegistration()">Add</button></br>`)
    }
    array.push(`<br><button onclick="backToGarage()">Back to garage</button></br>`)
    res.send(array.join(""))
    })




//--------------------------GAME------------------------------------



//--------------------------DATABASE--------------------------------

const User = mongoose.model('User', new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    carColor: {type: String, default:null, required: false},
    carWheels: {type: String, default:null, required: false},
    highestScore: {type: Number, default:0, required: false},
    highestSpeed: {type: Number, default:0, required: false},
    isLogged: {type: Boolean, default:false, required: false,},
    isAdmin: {type:Boolean, default:false, required:false}
}));

async function createUser(login,password,email){
    const user = new User({
        login: login,
        password: password,
        email: email,
    });
    try{
        await user.save();
        return user
    }
    catch (ex) {
        return console.log(ex.message)
    }
}

async function getUser(username){
    const user = await User
        .find({login: username})
    return user
}

async function checkUsername(username){
    const user = await User
        .find({login: username})
    return user
}

async function checkEmail(email){
    const user = await User
        .find({email:email})
    return user
}

async function getUsers(){
    const users = await User
        .find()
        .select(['id','login', 'email'])
    return users
}

async function deleteUser(username,email){
    const user = await User
        .find({login: username, email:email})
    console.log('user deleted', user)
}

// async function update(username){

// }


//---------------------------------GAME------------------------

var gameHeight = 80; 
var gameWidth = 160; 
var iter = 0;

 function random(min, max) { 
     return Math.floor(Math.random() * (max - min + 1) + min)
 }

 var line = [];
 function generateLine() {
     for(var i=0;i<gameWidth*2;i++) line.push(Math.floor(gameHeight/2));
 }

 function moveLine(){
    line.shift();
    line.push(Math.floor(gameHeight/2));
}

function random(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function bumpLine() {
    var gW = gameWidth;
    var gW2 = gW/2;
    var gW4 = gW/4;
    var gH = gameHeight;
    var gH2 = gH/2;
    var bump = random(0,gH-1);

    var bumpOffset = bump - gH2;
    if(bump < gH2) bumpOffset = gH2 - bump;
    if(bump !== Math.floor(gH2)) {
        var bx = gW+gW2;
        var by = bump;
        var sx = gW+1;
        var sy = gH2;
        var xx = gW+gW4;
        var xy = ((bump - gH2)/2)+gH2; 
        if(bump < gH2) xy = bump + (bumpOffset/2);
        var mx = gW+gW2;
        var my = gH2;
        var slope = gW2 / bumpOffset; //old Math.floor(gW/2) / (Math.floor(gH/2) - bump);
        var ox = gW+gW2;
        var oy = xy - (slope * (ox-xx));
        if(bump < gH2) oy = (slope * (ox-xx)) + xy;
        var r = by-oy;
        if(bump < gH2) r = oy-by;
        var ex = gW-2;
        var ey = Math.floor(gH/2);
        for(var i=gW+1;i<(gW*2)-1;i++) {
            var fx = i;
            line[i] = Math.floor(Math.sqrt((r*r)-((fx-ox)*(fx-ox)))+oy);
            if(bump < gH2) line[i] = -Math.floor(Math.sqrt((r*r)-((fx-ox)*(fx-ox)))-oy);
        }
    }
    else {
        for(var i=gW+1;i<(gW*2)-1;i++) {
            line[i] = Math.floor(gH2);
        }
    }
}





