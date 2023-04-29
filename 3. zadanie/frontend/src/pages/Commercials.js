import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Commercials() {
  
  const [listOfCommercials,setListOfCommercials] = useState([])
  const [imageLinkInput, setImageLinkInput] = useState("")
  const [targetLinkInput, setTargetLinkInput] = useState("")
  const [changeImageLink, setChangeImageLink] = useState("")
  const [changeTargetLink, setChangeTargetLink] = useState("")



  useEffect(()=>{
    getCommercials()
  })

  const getCommercials = async() =>{
    await axios.get(`http://localhost:8080/commercials`)
      .then((res)=>{
        setListOfCommercials(res.data)})
      .catch((err)=>{
        if(err)
          console.log(err)})
  }

    
  
    const onSubmit = () => {
      const data = {imageLink: imageLinkInput, targetLink: targetLinkInput, counter: 0}
      axios.post(`http://localhost:8080/commercials`,data)
      .then((res)=>{
        setListOfCommercials(res.data)})
      .catch((err)=>{
        if(err)
          alert(err)})
        }

    const deleteCommercial=(value)=>{
      axios.delete(`http://localhost:8080/commercials`,
          {headers:{
            imageLink:value.imageLink,
            targetLink:value.targetLink,
            id:value.id
          }})
          .then((res)=>{
            if(res.data.error)
              alert(res.data.error)
            else
              alert("The commercial has been added to database, please refresh the page to see changes")
          })
    }
    
  
      
  return (
    <div className='commercialDiv'>
      <h3>Commercials</h3>
      <div>
        <label>Image link: </label>
        <input type="url" value={imageLinkInput} onChange={(event)=>{setImageLinkInput(event.target.value)}}></input>
      </div>
      <div>
        <label>Target link: </label>
        <input type="url" value={targetLinkInput} onChange={(event)=>{setTargetLinkInput(event.target.value)}}></input>
      </div>
      <button onClick={onSubmit}>Add Commercial</button>
      <hr/>
      <h3>List of Commercials</h3>
      {listOfCommercials.map((value,key)=>{
        return(
          <div key={key} className="commercialDivDiv">
            <label>Image Link: {value.imageLink}</label>
            <label>Target Link: {value.targetLink}</label>
            <label>Counter: {value.counter}</label>
            <button onClick={()=>{deleteCommercial(value)}}>Delete</button>
            <div>
              <img 
                src={value.imageLink}
                alt="example"
                className='commercialImage'
                />
           
            </div>
          </div>
          )
        })}
      </div>
  )
}

export default Commercials