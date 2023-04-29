const express = require('express')
const router = express.Router()
const {Commercials} = require('../models')

router.get("/", async (req,res)=>{
    const commercials = await Commercials.findAll()
    res.json(commercials)
})

router.post("/", async (req,res)=>{
    const commercialObject = req.body
    await Commercials.create({
        imageLink: commercialObject.imageLink,
        targetLink: commercialObject.targetLink,
        counter: commercialObject.counter
    })
})

router.delete("/", async(req,res)=>{
    const imageLink = req.header('imageLink')
    const targetLink = req.header('targetLink')
    const id = req.header('id')
    const success = await Commercials.destroy({
        where:{
            imageLink:imageLink,
            targetLink:targetLink,
            id:id
        }
    })
    if(!success){
        res.json({error: "There has been some issue with deleting commercial from database"})
        return
    }
    res.json("success")
    return
})


module.exports = router