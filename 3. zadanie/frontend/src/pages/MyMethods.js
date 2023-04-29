import React from 'react'
import axios from 'axios';
import {useEffect, useState} from 'react'


function Homepage() {
    const [listOfMethods, setListOfMethods] = useState([])
    const [description,setDescription] = useState("")
    const [title,setTitle] = useState("")

    useEffect(()=>{
      getMethods()
      
    },[])

    const getMethods = async()=>{
    axios.get("http://localhost:8080/methods",
          {headers:{
            accessToken: localStorage.getItem("accessToken"),
          }})
        .then((response)=>{
          setListOfMethods(response.data)})
        .catch((error)=>{
          if(error.response){
            alert(error.response)
          }}) }
  
    const createMethod=async()=>{
      const data = {method: title, description: description}
      await axios.post("http://localhost:8080/methods",
          data,
          {headers:{
            accessToken: localStorage.getItem("accessToken"),
          }})
          .then((res)=>{
            const methodToAdd = {method: title, description: description}
            setListOfMethods([...listOfMethods,methodToAdd])
          })
    }

    const deleteMethod=async(value)=>{
       await axios.delete("http://localhost:8080/methods",
              {headers:{
                method:value.method,
                description:value.description
              }})
              .then((res)=>{
                if(res.data.error)
                  alert(res.data.error)
                else{
                  alert("The method has been deleted, please refresh the page")
                }
              })
    }
  
    return (
      <div className='createMethod'>
        <h1>You have to refresh after deleting a method</h1>
        <h2>Please avoid using diacritics to work properly, use only a-z A-Z characters</h2>
        <div className='title'>
          <label>Title: </label>
          <input type="text" onChange={(event)=>{setTitle(event.target.value)}}></input>
        </div>
        <div className='description'>
          <label>Description: </label>
          <input className='description' type="text" onChange={(event)=>{setDescription(event.target.value)}}></input>
        </div>
        <div>
          <button onClick={createMethod}>Create Method</button>
        </div>
        <table>

        {listOfMethods.map((value,key)=>{
          return (
            <tr>
            <div key={key}>
            <td>
              <div>{value.method}</div>
            </td>
            <td>
              <div>{value.description}</div>
            </td>
            <td>
              <button onClick={()=>{deleteMethod(value)}}>Delete</button>
            </td>
            </div>
            </tr>
        )
      })}
      </table>
    </div>
  )
}

export default Homepage

//navigate(`/methods/${value.id}`