import './App.css';
import {HashRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Homepage from './pages/MyMethods';
import Login from './pages/Login'
import Registration from './pages/Registration';
import Activities from './pages/MyActivities';
import {useState, useEffect} from 'react'
import { Authenticated } from './context/Authentication';
import axios from 'axios';
import Users from './pages/Users';
import Commercials from './pages/Commercials';
//import {useNavigate} from 'react-router-dom'



function App() {
  const [commercial,setListOfCommercials] = useState([])
  const [timer,setTimer] = useState()
  const [actualCommercial,setActualCommercial] = useState()
  const [authObject, setAuthObject] = useState({
    username: "", 
    id: 0,
    status: false })

  var number = 1
  const updateNumber = function(){
    number++
    if(number>=commercial.length)
      number=1
    setActualCommercial(commercial[number])
  }
  setInterval(updateNumber,6000)
  


  useEffect(()=>{
    authenticate()
    getCommercials()
  })

  const authenticate = async()=>{
    await axios.get("http://localhost:8080/registration/authentication",
    {headers: {
        accessToken: localStorage.getItem('accessToken')
    }})
    .then((res)=>{
      if(res.data.error)
        setAuthObject({
          username: "", 
          id: 0,
          status: false })
      else
        setAuthObject({
          username: res.data.username, 
          id: res.data.id,
          status: true })
      })
  }  
   
  const getCommercials =async()=>{
    await axios.get(`http://localhost:8080/commercials`)
    .then((res)=>{
      setListOfCommercials(res.data)})
    .catch((err)=>{
      if(err)
          {}})
  }
    
       
    
 
  const logout = () =>{
    localStorage.removeItem("accessToken")
    setAuthObject({
      username: "", 
      id: 0,
      status: false })
  }

  const incrementCounter=(e)=>{
    alert(e)
    console.log(e)
    const data={imageLink: e.imageLink, targetLink: e.targetLink, id:e.id}
  }


  return (
    <div className="App">
      <Authenticated.Provider value={{authObject,setAuthObject}}>
      <Router>
      <div className='navbar'>
            {!authObject.status && (
              <>
              <Link to="/">Sign In</Link>
              <Link to="/registration">Sign Up</Link>
              </>
              )}
            {authObject.status && authObject.username!=="admin" &&(
              <>
              <Link to="/mymethods">My Methods</Link>
              <Link to="/myactivities">My Activities</Link>
              <Link to="/">
                <span style={{color:"white"}} onClick={logout}>Log Out</span>
              </Link>
              </>
              )}
              {authObject.username==="admin" &&(
                <>
                <Link to='/users'>Users</Link>
                <Link to='/commercials'>Commercials</Link>
                <Link to="/">
                <span style={{color:"white"}} onClick={logout}>Log Out</span>
              </Link>
                </>
              )}
        </div>
        {commercial?.length && (
        <>
        <div className='commercial'>
              {commercial.map((value,key)=>{
                return(
                  <div key={key}>
                    {(key===number) && (
                    <>
                    <div>
                    <a href={value.targetLink} value={key} onClick={(event)=>{incrementCounter(event.target)}} target='blank' rel="norefferer">
                      <img
                        className='commercial'
                        src={value.imageLink}
                        alt="example"
                        />
                    </a>
                    </div>
                    </>)}
                  </div>
                )
              })}

        </div>
        </>
        )}
        <Routes>
          <Route path="/mymethods" exact element={<Homepage/>}/>
          <Route path="/registration" exact element={<Registration/>}/>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/myactivities" exact element={<Activities/>}/>
          <Route path="/users" exact element={<Users/>}/>
          <Route path="/commercials" exact element={<Commercials/>}/>
        </Routes>
      </Router>
    </Authenticated.Provider>
    </div>
    );
  }
  
export default App

  