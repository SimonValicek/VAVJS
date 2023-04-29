import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {CSVLink} from 'react-csv'




function Activities() {
  
    const [weights, setWeights] = useState([])
    const [pulses, setPulses] = useState([])
    const [steps, setSteps] = useState([])
    const [filterVariable, setFilterVariable] = useState("")
    const [file, setFile] = useState()
    const [allActivities,setAllActivities] = useState([])
    const [array, setArray] = useState([])
    const [date,setDate] = useState()
    const [listOfMethods,setListOfMethods] = useState([])
    const [methodValue, setMethodValue] = useState("")
    const [valueValue,setValueValue] = useState("")
    const [param,setParam] = useState("")
    const [dateBegin,setDateBegin] = useState()
    const [dateEnd, setDateEnd] = useState()
    const [filterMethod, setFilterMethod] = useState("")
    const [maxValue,setMaxValue] = useState()
    const [dateArray,setDateArray] = useState([])
    const [valueArray,setValueArray] = useState([])
    const [minDate,setMinDate] = useState()
    const [maxDate,setMaxDate] = useState()

    const [fileHeaders] = useState([
        {label: 'Date', key: 'date'},
        {label: 'Activity', key: 'activity'},
        {label: 'Value', key: 'value'},
        {label: 'User', key: 'user'},
      ])
   
    const fileReader = new FileReader()
    useEffect(()=>{
        getProducts()
    
        var c = document.getElementById("myCanvas")
        var ctx = c.getContext("2d")
        drawBackground(ctx)
        drawData(ctx)
    })

    const drawBackground = (ctx) =>{
        ctx.beginPath()
        ctx.fillStyle = "#FFF0F5"
        ctx.fillRect(0,0,800,800)
        ctx.stroke()

        ctx.beginPath()
        ctx.strokeStyle = "#000000"
        ctx.moveTo(100,100)
        ctx.lineTo(100,700)
        ctx.lineTo(700,700)
        ctx.stroke()
    }
   
    const drawData = (ctx) =>{
        const sortFunction=(a,b)=>{
            if(a[0]===b[0])
                return 0
            else
                return (a[0]<b[0]) ? -1:1
        }
        ctx.beginPath()
        ctx.strokeStyle="#000000"
        ctx.fillStyle="#4B0082"
        const xDiff = dateEnd - dateBegin
        let coordinates = []
        for(let i=0;i<valueArray.length;i++){
            ctx.fillRect((100+(600/xDiff)*(dateArray[i]-dateBegin))-3,(700-(580/maxValue)*(valueArray[i]))-3,6,6)
            ctx.moveTo((100+(600/xDiff)*(dateArray[i]-dateBegin)),695)
            ctx.lineTo((100+(600/xDiff)*(dateArray[i]-dateBegin)),705)
            ctx.fillText(`${dateArray[i].toISOString().split('T')[0]}`,(100+(600/xDiff)*(dateArray[i]-dateBegin))-10, 715 )
            ctx.moveTo(95,(700-(580/maxValue)*(valueArray[i])))
            ctx.lineTo(105,(700-(580/maxValue)*(valueArray[i])))
            ctx.fillText(`${valueArray[i]}`, 70, (700-(580/maxValue)*(valueArray[i]))-5)
            coordinates.push([(100+(600/xDiff)*(dateArray[i]-dateBegin)),(700-(580/maxValue)*(valueArray[i]))])
            
        }
        ctx.stroke()
        coordinates.sort(sortFunction)
        console.log(coordinates)
        if(coordinates.length!==0){

            ctx.beginPath()
            ctx.strokeStyle="#4B0082"
            
            let prev = coordinates.shift()
            console.log(prev)
            ctx.moveTo(prev[0],prev[1])
            while(coordinates.length!==0){
                    let act = coordinates.shift()
                    ctx.lineTo(act[0],act[1])
                }
            ctx.stroke()
            }
    }

    const getProducts =async()=>{
        try{
        await axios.get("http://localhost:8080/activities/weights",
                {headers:{
                    accessToken: localStorage.getItem("accessToken"),
                }})
            .then((res)=>{
                if(!res.data.error)
                    setWeights(res.data)})
            .catch((err)=>{
                 if(err.response)
                    console.log(err.response)
                else if(err.request)
                    console.log(err.request)
                else
                    console.log(err.message)})}
        catch(e) {}

        try{
        await axios.get("http://localhost:8080/activities/pulses",
                {headers:{
                    accessToken: localStorage.getItem("accessToken"),
                }})
            .then((res)=>{
                if(!res.data.error)
                    setPulses(res.data)})
            .catch((err)=>{
                if(err.response)
                    console.log(err.response)
                else if(err.request)
                    console.log(err.request)
                else
                    console.log(err.message)})}
        catch(e){}

        try{
        await axios.get("http://localhost:8080/activities/steps",
                {headers:{
                    accessToken: localStorage.getItem("accessToken"),
                }})
            .then((res)=>{
                if(!res.data.error)
                    setSteps(res.data)})
            .catch((err)=>{
                if(err.response)
                    console.log(err.response)
                else if(err.request)
                    console.log(err.request)
                else
                    console.log(err.message)})}
        catch(e) {}

        try{
        await axios.get("http://localhost:8080/methods",
          {headers:{
            accessToken: localStorage.getItem("accessToken"),
          }})
            .then((res)=>{
                if(!res.data.error)
                    setListOfMethods(res.data)})
            .catch((err)=>{
                if(err.response)
                    console.log(err.response)
                else if(err.request)
                    console.log(err.request)
                else
                    console.log(err.message)})}
        catch(e){}

        setAllActivities([...weights,...pulses,...steps])
    }
    

    const setGraphValues = () =>{
        let dates = []
        let values = []
        if(filterVariable===""){
            alert("Param is missing, please select some to be able to show graph")
            return
        }
        if(!dateBegin || !dateEnd){
            alert("Time range is missing, please select some to be able to show graph")
            return
        }
        if(filterVariable==="weight"){
            if(filterMethod!==""){
                for(let item of weights){
                    let itemDate = new Date(item.date)
                    if(dateBegin<=itemDate && itemDate<=dateEnd && item.activity===filterMethod){
                        dates.push(itemDate)
                        values.push(item.value)
                    }
                }
            }
            else{
                for(let item of weights){
                    let itemDate = new Date(item.date)
                    if(dateBegin<=itemDate && itemDate<=dateEnd){
                        dates.push(itemDate)
                        values.push(item.value)
                    }
                }
                }
        }
        else if(filterVariable==="pulse"){
            if(filterMethod!==""){
                for(let item of pulses){
                    let itemDate = new Date(item.date)
                    if(dateBegin<=itemDate && itemDate<=dateEnd && item.activity===filterMethod){
                        dates.push(itemDate)
                        values.push(item.value)
                    } 
                }
            }
            else{
                for(let item of pulses){
                    let itemDate = new Date(item.date)
                    if(dateBegin<=itemDate && itemDate<=dateEnd){
                        dates.push(itemDate)
                        values.push(item.value)
                    } 
                }
            }
        }
        else if(filterVariable==='steps'){
            if(filterMethod!==""){
                for(let item of steps){
                    let itemDate = new Date(item.date)
                    if(dateBegin<=itemDate && itemDate<=dateEnd && item.activity===filterMethod){
                        dates.push(itemDate)
                        values.push(item.value)
                    } 
                }
            }
            else{
                for(let item of steps){
                    let itemDate = new Date(item.date)
                    if(dateBegin<=itemDate && itemDate<=dateEnd){
                        dates.push(itemDate)
                        values.push(item.value)
                } 
            }
        }
        }
        else{
            alert("I have no idea what is going on!")
        }

        setMaxValue(Math.max(...values))
        setDateArray(dates)
        setValueArray(values)
        setMinDate(new Date(Math.min(...dates)))
        setMaxDate(new Date(Math.max(...dates)))
       
    }

    const onDelete = async(value,param) => {
        const id = value.id
        await axios.delete(`http://localhost:8080/activities/byId/${id}`,
            {headers:{
                id: id,
                time: value.date,
                param:param
            }}
            )
            .then(()=>{
                console.log(value)})
            .catch((err)=>{
                if(err.response)
                    console.log(err.response)
                else if(err.request)
                    console.log(err.request)
                else
                    console.log(err.message)})
    }

    const createActivity=async()=>{
        const data = {date:date, activity:methodValue, param:param, value:valueValue}
        await axios.post('http://localhost:8080/activities',
                    data,
                    {headers:{
                        accessToken: localStorage.getItem("accessToken")
                    }})
            .then((res)=>{
                if(res.data.error)
                    alert(res.data.error)
                else{
                    alert("Measure has been added successfully, please refresh the page")
                }   
            })
            .catch((err)=>{
                console.log(err)})
    }

    return (
    <div>
        <h3>Export</h3>
                    <div>

                    <form>
                    {allActivities?.length && 
                    <CSVLink
                    headers={fileHeaders}
                    data={allActivities}
                    separator={";"}
                    filename="users.csv"
                    target="_blank"
                    >
                    Export data
                    </CSVLink>}
                    </form>
                    </div>
                    
          
        <div className='creatingActivity'>
            <h3>Create Activity</h3>
            <label>Select a Method</label>
            <label>(If there are some)</label>
            {listOfMethods.map((value,key)=>{
                return(
                    <div key={key}>
                        <label>{value.method}</label>    
                        <input type="radio" name="method" value={value.method} onChange={(event)=>{setMethodValue(event.target.value)}}></input>
                    </div>
                    ) 
            })}
            <div>
                <label>Value: </label>
                <input type="number" onChange={(event)=>{setValueValue(event.target.value)}}></input>
            </div>
            <div>
                <label>Date: </label>
                <input type="date" value={date} onChange={(event)=>{setDate(event.target.value)}}></input>
            </div>
            <div className='weight'>
                <label>weight</label>
                <input type="radio" name="param" value="weight" onChange={(event)=>{setParam(event.target.value)}}></input>
            </div>
            <div className='pulse'>
                <label>pulse</label>
                <input type="radio" name="param" value="pulse" onChange={(event)=>{setParam(event.target.value)}}></input>
            </div>
            <div className='steps'>
                <label>steps</label>
                <input type="radio" name="param" value="steps" onChange={(event)=>{setParam(event.target.value)}}></input>
            </div>
            <div>
                <button onClick={createActivity}>Add New Activity</button>
            </div>
        <hr/>
            
        </div>
            <h3>Filter</h3>
            <h5>Params</h5>
            <div>
                <label>all</label>
                <input type="radio" name="type" value="" onChange={(event)=>{setFilterVariable(event.target.value)}}></input>
            </div>
            <div className='weight'>
                <label>weight</label>
                <input type="radio" name="type" value="weight" onChange={(event)=>{setFilterVariable(event.target.value)}}></input>
            </div>
            <div className='pulse'>
                <label>pulse</label>
                <input type="radio" name="type" value="pulse" onChange={(event)=>{setFilterVariable(event.target.value)}}></input>
            </div>
            <div className='steps'>
                <label>steps</label>
                <input type="radio" name="type" value="steps" onChange={(event)=>{setFilterVariable(event.target.value)}}></input>
            </div>
            <h5>Methods</h5>
            <div>
                <label>all</label>
                <input type="radio" name="method" value="" onChange={(event)=>{setFilterMethod(event.target.value)}}></input>
            </div>
            {listOfMethods.map((value,key)=>{
                return(
                    <div key={key}>
                        <label>{value.method}</label>    
                        <input type="radio" name="method" value={value.method} onChange={(event)=>{setFilterMethod(event.target.value)}}></input>
                    </div>
                    ) 
            })}
            <h5>Date</h5>
            <div className='date'>
                <label>from </label>
                <input type='date' onChange={(event)=>{setDateBegin(new Date(event.target.value))}}></input>
                <label> to </label>
                <input type='date' onChange={(event)=>{setDateEnd(new Date(event.target.value))}}></input>
            </div>
        <hr/>
        <div>
            <h3>Table of activities</h3>
        </div>
        <div className='table'>
        <table>
        {(filterVariable==="" || filterVariable==="weight") &&( 
        <>
        {weights.map((value,key)=>{
            let time = new Date(value.date)
            let method = value.activity
            return (
                <div>
                {((dateBegin<=time || !dateBegin) && (!dateEnd || time<=dateEnd)) && (
                <>
                {(filterMethod===method || filterMethod==="") && (
                <>
                <div key={key}>
                <tr>
                    <td>
                        <div>Method: {value.activity}</div>
                    </td>
                    <td>
                        <div>User: {value.user}</div>
                    </td>
                    <td>
                        <div>Param: weight</div>
                    </td>
                    <td>
                        <div>Value: {value.value}</div>
                    </td>
                    <td>
                        <div>Date: {value.date} {typeof(value.date)}</div>
                    </td>
                    <td>
                        <button onClick={()=>{onDelete(value,'weights')}}>Delete</button>
                    </td>

                </tr>
                </div>
                </>
                )}
                </>
                )}
                </div>
            )
        })}
         </>)
        }
        {(filterVariable==="" || filterVariable==="pulse") && (
        <>
        {pulses.map((value,key)=>{
            let time = new Date(value.date)
            let method = value.activity
            return(
                <div>
                {((dateBegin<=time || !dateBegin) && (!dateEnd || time<=dateEnd)) && (
                <>
                {(filterMethod===method || filterMethod==="") && (
                <> 
                <div key={key}>
                <tr>
                    <td>
                        <div>Method: {value.activity}</div>
                    </td>
                    <td>
                        <div>User: {value.user}</div>
                    </td>
                    <td>
                        <div>Param: pulses</div>
                    </td>
                    <td>
                        <div>Value: {value.value}</div>
                    </td>
                    <td>
                        <div>Date: {value.date}</div>
                    </td>
                    <td>
                        <button onClick={()=>{onDelete(value,'pulses')}}>Delete</button>
                    </td>
                </tr>
                </div>
                </>
                )}
                </>
                )}  
                </div> 
            )
        })}
        </>
        )}
        {(filterVariable==="" || filterVariable==="steps") && (
        <>
        {steps.map((value,key)=>{
            let time = new Date(value.date)
            let method = value.activity
            return(
                <div>
                {((dateBegin<=time || !dateBegin) && (!dateEnd || time<=dateEnd)) && (
                <> 
                {(filterMethod===method || filterMethod==="") && (
                <> 
                <div key={key}>
                <tr>
                    <td>
                        <div>Method: {value.activity}</div>
                    </td>
                    <td>
                        <div>User: {value.user}</div>
                    </td>
                    <td>
                        <div>Param: steps</div>
                    </td>
                    <td>
                        <div>Value: {value.value}</div>
                    </td>
                    <td>
                        <div>Date: {value.date}</div>
                    </td>
                    <td>
                        <button onClick={()=>{onDelete(value,'steps')}}>Delete</button>
                    </td>
                    </tr>
                </div>
                </>
                )}
                </>
                )}
                </div> 
            )
        })}
        </>
        )}
   
        </table>   
        </div>
        <hr/>
        <div>
            <h3>Graph</h3>
            <h5>Click on the "Draw Graph" button to apply filter changes on graph</h5>
            <button onClick={setGraphValues}>Draw Graph</button>
        </div>
        <div>
            <canvas id="myCanvas" height="800" width="800" style={{ border: "1px solid #000000" }}/>
        </div>
    </div>

    
  )
}

export default Activities