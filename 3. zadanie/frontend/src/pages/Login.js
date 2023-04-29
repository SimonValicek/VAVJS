import React, { useState, useContext } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Authenticated} from '../context/Authentication'



function Login() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {setAuthObject} = useContext(Authenticated)

    let navigate = useNavigate()

    const onLogin=async()=>{
        const data = {username: username, password: password}
        await axios.post("http://localhost:8080/registration/login", data)
            .then((res)=>{
                if(res.data.error)
                    alert(res.data.error)
                else{
                    localStorage.setItem("accessToken",res.data.token)
                    setAuthObject({
                        username: res.data.username, 
                        id: res.data.id,
                        status: true
                    })
                    if(res.data.username==="admin")
                        navigate('/users')
                    else
                        navigate('/mymethods')
                }
            })
        }
    

    return (
    <div className='loginContainer'>
        <h2>Make sure you logged out before signing in, check localstorage and delete accessToken if there is some</h2>
        <label>Meno pre admina je "admin" a heslo pre admina je taktiež "admin"</label>
        <div className='loginField'>
            <input type="text" placeholder="username" onChange={(event)=>{setUsername(event.target.value)}}/>
        </div>
        <div className='passwordField'>
            <input type="password" placeholder='********' onChange={(event)=>{setPassword(event.target.value)}}/>
        </div>
        <div className='loginButton'>
            <button onClick={onLogin}>Sign In</button>
        </div>
    </div>
  )
}

export default Login