const express = require('express')
const router = express.Router()
const {Steps} = require('../models')
const {Pulses} = require('../models')
const {Weights} = require('../models')
const {validateToken} = require('../middlewares/Authentication')



router.get('/weights', validateToken, async(req,res)=>{
    const username = req.user.username
    const weights = await Weights.findAll({where:{
        user:username,
       }})
    if(!weights){
        res.json({error: "There is no related activity in this database"})
        return
    }
    res.json(weights)
    return
})

router.get('/pulses', validateToken, async(req,res)=>{
    const username = req.user.username
    const pulses = await Pulses.findAll({where:{
        user:username,
       }})
    if(!pulses){
        res.json({error: "There is no related activity in this database"})
        return
    }
    res.json(pulses)
    return
})

router.get("/steps", validateToken, async (req,res)=>{
    const username = req.user.username
    const steps = await Steps.findAll({where:{
        user:username,
       }})
    if(!steps){
        res.json({error: "There is no related activity in this database"})
        return
    }
    res.json(steps)
    return
})

router.post("/", validateToken, async (req,res)=>{
    const activityObject = req.body
    const username = req.user.username
    if(!activityObject.date){
        res.json({error:"Date needs to be selected"})
        return
    }
    if(!activityObject.activity){
        res.json({error:"Activity needs to be selected"})
        return
    }
    if(!activityObject.date){
        res.json({error:"Value needs to be selected"})
        return
    }
    if(!username){
        res.json({error:"Something went wrong with this user"})
        return
    }
    if(!activityObject.param){
        res.json({error:"Param needs to be selected"})
        return
    }
    if(activityObject.param==="weight")
        await Weights.create({
            date: activityObject.date,
            activity: activityObject.activity,
            value: activityObject.value,
            user: username
        })
    else if(activityObject.param==="steps")
        await Steps.create({
            date: activityObject.date,
            activity: activityObject.activity,
            value: activityObject.value,
            user:username
        })
   else if(activityObject.param==="pulse")
        await Pulses.create({
            date: activityObject.date,
            activity: activityObject.activity,
            value: activityObject.value,
            user:username
        })
    res.json(activityObject)
    return
})

router.delete("/byId/:id", async (req,res)=>{
    const activityId = req.params.id
    const time = req.header('time')
    const param = req.header('param')
    if(param==="weights"){
        let weight = await Weights.destroy({
                where:{
                    id: activityId,
                    date: time
                }
        })
        if(!weight){
            res.json({error: "There has been some issue with deleting from weights"})
            return
        }
        res.json('success')
        return
    }
    if(param==="pulses"){
        let pulse = await Pulses.destroy({
            where:{
                id: activityId,
                date: time
            }
        })
        if(!pulse){
            res.json({error: "There has been some issue with deleting from pulses"})
            return
        }
        res.json('success')
        return
    }
    if(param==="steps"){
        let steps = await Steps.destroy({
            where:{
                id: activityId,
                date: time
            }
        })
        if(!steps){
            res.json({error: "There has been some issue with deleting from steps"})
            return
        }
        res.json('success')
        return
    }   
})

module.exports = router


























// router.get("/", validateToken, async (req,res)=>{
//     const username = req.user.username
//     let activities =[]
//     const param = req.body.param
//     if(param){
//         activities = await Activities.findAll({where:{user:username, param: param}})
//         res.json(activities)
//     }        
//     activities = await Activities.findAll({where:{user:username}})
//     res.json(activities)
// })


// router.post("/", validateToken, async (req,res)=>{
//     const username = req.user.username
//     const activityObject={
//         acitivity: req.body.activity,
//         param: req.body.param,
//         value: req.body.value,
//         user: username
//     }
//     await Activities.create({
//             activity: req.body.activity,
//             param: req.body.param,
//             value: req.body.value,
//             user: username
//         })
//     res.json(activityObject)
// })
