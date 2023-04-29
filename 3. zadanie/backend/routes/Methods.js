const express = require('express')
const router = express.Router()
const {Methods} = require('../models')
const {validateToken} = require('../middlewares/Authentication')

router.get('/', validateToken, async (req,res)=>{
    const username = req.user.username
    const methods = await Methods.findAll({where:{username:username}})
    res.json(methods)
})

router.get('/byId/:id', async (req,res)=>{
    const id = req.params.id
    const method = await Methods.findByPk(id)
    res.json(method)
})

router.post('/', validateToken, async (req,res)=>{
    const {method,description} = req.body
    const username = req.user.username
    await Methods.create({
        method:method,
        description:description,
        username:username
    })
    res.json(method)
})


router.delete('/', async(req,res)=>{
    const method = req.header('method')
    const description = req.header('description')
    const success = await Methods.destroy({
        where:{
            method:method,
            description:description,
        }
    })
    if(!success){
        res.json({error: "The method with given ID does not belong to you, or was not found"})
        return
    }
    res.json("Success")
    return
})

module.exports = router