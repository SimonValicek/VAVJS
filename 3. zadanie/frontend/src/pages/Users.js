import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {CSVLink} from 'react-csv'


function Users() {

    const [listOfUsers, setListOfUsers] = useState([])
    const [userUsername, setUserUsername] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userAge, setUserAge] = useState("")
    const [array,setArray]=useState([])
    const [userHeight, setUserHeight] = useState("")
    const fileReader = new FileReader()
    const [file,setFile] = useState()
    const [fileHeaders] = useState([
        {label: 'Username', key: 'username'},
        {label: 'Password', key: 'password'},
        {label: 'E-mail', key: 'email'},
        {label: 'Age', key: 'age'},
        {label: 'Height', key: 'height'}
      ])

    useEffect(()=>{
       getUsers()
    },[])

    const getUsers = async()=>{
        await axios.get(`http://localhost:8080/registration`)
        .then((res)=>{
            setListOfUsers(res.data)})
        .catch((err)=>{
            if(err)
                alert(err.response)
        })
    }

    const onDelete = async(data) => {
        await axios.delete(`http://localhost:8080/registration`,{
            headers:{
                username: data.username,
                email: data.email,
                age: data.age,
                height: data.height
            }})
            .then((res)=>{
                if(res.data.error)
                    alert(res.data.error)
                else
                    alert("User has been successfully deleted, please refresh the page to see changes.")
            })
    }

    const Submit = async() => {
        const data = {username: userUsername, password: userPassword, email: userEmail, age: userAge, height: userHeight}
        await axios.post("http://localhost:8080/registration",data)
            .then((res)=>{
                if(res.data.error)
                    alert(res.data.error)
                else
                    alert("User has been succesfully added to the database, please refresh the page to see changes")
            })
    }

    const handleCsvFile = (e) => {
        e.preventDefault();
        if (file)
            fileReader.onload = (event) => {
                const csvOutput = event.target.result
                csvOutput.slice(0,csvOutput.indexOf("\n")).split(",")
                const rows = csvOutput.slice(csvOutput.indexOf("\n")+1).split("\n")

                const array = rows.map(i=>{
                    const values = i.split(",")
                    return values 
                })
                setArray(array)
                for(let item of array){
                    if(item[0]!==""){
                    let parsed = item[0].split(';')
                        const data = {username: parsed[0], password: parsed[1], email: parsed[2], age: parseInt(parsed[3]), height: parseInt(parsed[4])}
                        axios.post("http://localhost:8080/registration", data,
                        ).then((res)=>{
                            if(res.data.error)
                                alert(res.data.error)
                            else
                                alert("User has been added to the database")
                        })
                    }
                }
            }
            fileReader.readAsText(file)
    }

    return (
        <div>
            
            <h3>Create New User</h3>
            <div>
                <label>Username: </label>
                <input type="text" value={userUsername} onChange={(event)=>{setUserUsername(event.target.value)}}></input>
            </div>
            <div>
                <label>Password: </label>
                <input type="password" value={userPassword} onChange={(event)=>{setUserPassword(event.target.value)}}></input>
            </div>
            <div>
                <label>Email: </label>
                <input type="email" value={userEmail} onChange={(event)=>{setUserEmail(event.target.value)}}></input>
            </div>
            <div>
                <label>Age: </label>
                <input type="number" value={userAge} onChange={(event)=>{setUserAge(event.target.value)}}></input>
            </div>
            <div>
                <label>Height: </label>
                <input type="number" value={userHeight} onChange={(event)=>{setUserHeight(event.target.value)}}></input>
            </div>
            <div>
                <button onClick={Submit}>Add User</button>
            </div>
            <hr/>
            <h3>Import & Export</h3>
                <div className='importExport'>
                    <form>
                    {listOfUsers?.length && 
                    <CSVLink
                        headers={fileHeaders}
                        data={listOfUsers}
                        separator={";"}
                        filename="users.csv"
                        target="_blank"
                    >
                    Export data
                    </CSVLink>}
                    </form>
                    <form>
            <input 
                type={"file"}
                id={"csvFileInput"} 
                accept={".csv"}
                onChange={(event)=>{setFile(event.target.files[0])}}/>
            <button onClick={(e)=>{handleCsvFile(e)}}>Import CSV</button>
        </form>
        <table>
            <tbody>
               {array.map((item)=>(
                <tr key={item.id}>
                    {Object.values(item).map((val)=>(
                        <td>{val}</td>
                    ))}
                </tr>
               ))} 
            </tbody>
        </table>
                </div>
            <hr/>
            <h3>List of Users</h3>
         
            {listOfUsers.map((value,key)=>{
                return (
                    <div key={key}>
                        <label>ID: {value.id}   </label>
                        <label>Username: {value.username}   </label>
                        <label>E-mail: {value.email}    </label>
                        <label>Age: {value.age} </label>
                        <label>Height: {value.height}   </label>
                        <button onClick={()=>{onDelete(value)}}>Delete</button>
                    </div>
                )
            })}
        
        </div>
    )
}

export default Users