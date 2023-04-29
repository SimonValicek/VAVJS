import React, {useContext, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Authenticated} from '../context/Authentication'

function Registration() {

    const {setAuthObject} = useContext(Authenticated)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [height,setHeight] = useState("")
    const [age,setAge] = useState("")



    let navigate=useNavigate()

    const onSubmit=async()=>{
        const data = {username: username, password: password, email: email, age:age, height:height}
        await axios.post("http://localhost:8080/registration", data)
            .then((res)=>{
                if(res.data.error){
                    alert(res.data.error)
                }
                else{
                    localStorage.setItem("accessToken",res.data.token)
                    setAuthObject({
                        username: res.data.username, 
                        id: res.data.id,
                        status: true
                    })
                    navigate('/mymethods')
                }
            })
    }

  
    return (
        <div className='registrationContainer'>
            <h2>Make sure you logged out before signing up, check localstorage and delete accessToken if there is some</h2>
            <div className='username'>
            <label>Username: </label>
            <input type="text" placeholder="username" onChange={(event)=>{setUsername(event.target.value)}}/>
            </div>
            <div className='username'>
            <label>Password: </label>
            <input type="password" placeholder="********" onChange={(event)=>{setPassword(event.target.value)}}/>
            </div>
            <div className='username'>
            <label>Email: </label>
            <input type="email" placeholder="example@gmail.com" onChange={(event)=>{setEmail(event.target.value)}}/>
            </div>
            <div className='username'>
            <label>Age: </label>
            <input type="number" placeholder="age" onChange={(event)=>{setAge(event.target.value)}}/>
            </div>
            <div className='username'>
            <label>Height: </label>
            <input type="number" placeholder="height" onChange={(event)=>{setHeight(event.target.value)}}/>
            </div> 
            <button className='registerButton' onClick={onSubmit}>Sign Up</button>
        </div>
  )
}

export default Registration