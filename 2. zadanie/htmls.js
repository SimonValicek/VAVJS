//Šimon Valíček

const homepageStart = `
                <div style="
                        background-color: rosybrown;

                    ">
                        <div style="
                        background-color: orange;    
                        text-align: center;
                        width: 30%;
                        height: 230px;
                        border: 1px outset black;
                        border-radius: 40px;
                        margin-top:15%;
                        margin-bottom: 15%;
                        margin-left: 35%;
                        margin-right: 35%;
                        ">
                    <br>
                    <div style="
                        font-family: Luminari, fantasy;
                        
                    ">
                    <label>Game login</label>
                    </div>
                    </br>
                    <br>
                        <input id="username" type="username" position="relative" text-align="relative" placeholder="Username">
                    </br>
                    <br>
                        <input id="password" type="password" position="relative" text-align="center" placeholder="Password">
                    </br>
                    <br>
                        <button style=" 
                            text-align:center; 
                            position:relative;  
                            background-color: #4CAF50;"

                            onclick="loginOnClick()" >Sign In</button> 
                    </br>
                    <br>
                    <button style="
                        position:relative;
                        background-color: #4CAF50;"

                        onclick="registerOnClick()">Sign up now</button>
                    </br>`

const homepageEnd=    `                
                    </div>
                </div>`

//___________________________________________________________________-
const registrationStart = `
                <div style="
                        background-color: rosybrown;

                    ">
                        <div style="
                        background-color: orange;    
                        text-align: center;
                        width: 30%;
                        height: 300px;
                        border: 1px outset black;
                        border-radius: 40px;
                        margin-top:15%;
                        margin-bottom: 15%;
                        margin-left: 35%;
                        margin-right: 35%;
                        ">
                    <br>
                    <div style="
                        font-family: Luminari, fantasy;
                        
                    ">
                    <label>Register</label>
                    </div>
                    </br>
                    <br>
                        <input id="username" type="username" position="relative" text-align="relative" placeholder="Username">
                    </br>
                    <br>
                        <input id="email" type="username" position="relative" text-align="relative" placeholder="E-mail">
                    </br>
                    <br>
                        <input id="password1" type="password" position="relative" text-align="center" placeholder="Password">
                    </br>
                    <br>
                        <input id="password2" type="password" position="relative" text-align="center" placeholder="Password">
                    </br>
                    <br>
                        <button style=" 
                            text-align:center; 
                            position:relative;  
                            background-color: #4CAF50;"

                            onclick="afterRegistration()" >Register</button> 
                    </br>
                   `

const registrationEnd = `   </div>
</div>`


//____________________________________________________________________
const garage = `
<div style="
    background-color: rosybrown;">
    <div style="
        background-color: orange;    
        text-align: center;
        width: 50%;
        height: 600px;
        border: 1px outset black;
        border-radius: 40px;
        margin-top: 60px;
        margin-left: 25%;">
        
        <div style="
            font-family: Luminari, fantasy;
            font-size: 40px;">
                <br>
                    <label>Chose your car</label>
                </br>
        </div>
        <div style="
            font-family: Luminari, fantasy;
            font-size: 30px;
            text-align: relative;
            margin-left: 0px">
                <label>Tires&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</label>
                <label>Color</label>
        </div>
        <br>
            <img src="https://cdn.pixabay.com/photo/2016/01/12/12/57/tire-1135376_960_720.png" alt="tire1" 
                style="
                width:48px;
                height:48px;">
            <button style=" 
                text-align:center; 
                position:relative;  
                background-color: #4CAF50;">Choose
            </button> 
            <button style=" 
                text-align:center; 
                position:relative;  
                background-color: #4CAF50;">Choose
            </button> 
            <img src="https://cdn.pixabay.com/photo/2018/05/14/16/54/cyber-3400789_960_720.jpg" alt="tire1" 
                style="
                width:48px;
                height:48px;">
        </br>
        <br>
            <img src="https://cdn.pixabay.com/photo/2014/04/02/16/27/wheel-307316_960_720.png" alt="tire2"
                style="
                width:48px;
                height:48px;">
            <button style=" 
                text-align:center; 
                position:relative;  
                background-color: #4CAF50;">Choose
            </button> 
            <button style=" 
                text-align:center; 
                position:relative;  
                background-color: #4CAF50;">Choose
            </button> 
            <img src="https://cdn.pixabay.com/photo/2015/12/26/08/20/brick-wall-1108405_960_720.jpg" alt="tire2"
                style="
                width:48px;
                height:48px;">
        </br>
        <br>
            <img src="https://cdn.pixabay.com/photo/2013/07/12/15/35/alloy-rim-150133_960_720.png" alt="tire3"
                style="
                width:48px;
                height:48px;">
            <button style=" 
                text-align:center; 
                position:relative;  
                background-color: #4CAF50;">Choose
            </button> 
            <button style=" 
                text-align:center; 
                position:relative;  
                background-color: #4CAF50;">Choose
            </button> 
            <img src="https://cdn.pixabay.com/photo/2016/11/21/13/29/yellow-1845394_960_720.jpg" alt="tire3"
                style="
                width:48px;
                height:48px;">
        </br>
        <br>
            <img src="https://cdn.pixabay.com/photo/2012/04/18/02/58/tire-36705_960_720.png" alt="tire4"
                style="
                width:48px;
                height:48px;">
            <button style=" 
                text-align:center; 
                position:relative;  
                background-color: #4CAF50;">Choose
            </button> 
            <button style=" 
                text-align:center; 
                position:relative;  
                background-color: #4CAF50;">Choose
            </button> 
            <img src="https://cdn.pixabay.com/photo/2016/07/05/16/53/leaves-1498985_960_720.jpg" alt="tire4"
                style="
                width:48px;
                height:48px;">
        </br>
        <br>
            <img src="https://cdn.pixabay.com/photo/2013/07/13/12/22/car-159720_960_720.png" alt="tire5"
                style="
                width:48px;
                height:48px;">
            <button style=" 
                text-align:center; 
                position:relative;  
                background-color: #4CAF50;">Choose
            </button> 
            <button style=" 
                text-align:center; 
                position:relative;  
                background-color: #4CAF50;">Choose
            </button> 
            <img src="https://cdn.pixabay.com/photo/2018/03/29/19/34/northern-lights-3273425_960_720.jpg" alt="tire5"
                style="
                width:48px;
                height:48px;">
        </br>
        
    <br>
    <button style="
        position:relative;
        background-color: #4CAF50;"
        onclick="registerOnClick()">Save</button>
    <button style="
        position:relative;
        background-color: #4CAF50;"
        onclick="garageOnPlay()">Play</button>
    </br>
    <button style="
        position:relative;
        background-color: #4CAF50;"
        onclick="displayTable()">Show users</button>
    </br>
    </div>
</div>`

//___________________________________________________________________________________________________________________________________________


const wrongInput = `<br><label style="color: red;">Wrong input</label></br>`
const userAlreadyExists = `<br><label style="color: red;">User already exists</label></br>`

//____________________________________________________________________

const canvas = `
    <div>
    <canvas id="canvas" 
        width="1280" height="640" style="">

    </canvas>
    </div>`



module.exports.homepageStart = homepageStart
module.exports.homepageEnd = homepageEnd
module.exports.registrationStart = registrationStart
module.exports.garage = garage
module.exports.registrationEnd = registrationEnd

module.exports.wrongInput = wrongInput
module.exports.userAlreadyExists =userAlreadyExists
module.exports.canvas = canvas