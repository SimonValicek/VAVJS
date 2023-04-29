const express = require('express')
const router = express.Router()
const {Users} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const {validateToken} = require('../middlewares/Authentication')

const validateEmail = (email)=>{
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}        

router.post('/', async (req,res)=>{
    const {username, password, email, age, height} = req.body
    const emailForm=validateEmail(email)
    if(!emailForm){
        res.json({error: `Email is invalid +${email}`})
        return
    }
    if(username==="admin"){
        res.json({error: "You cant register as admin"})
        return
    }
    const userUsername = await Users.findOne({where:{username:username}})
    if (userUsername){
        res.json({error: "User with this username already exists"})
        return
    }
    const userEmail = await Users.findOne({where:{email:email}})
    if (userEmail){
        res.json({error: "User with this e-mail already exists"})
        return
    }
    bcrypt.hash(password, 10)
            .then(async (hash)=>{
                await Users.create({
                    username: username,
                    password: hash,
                    email: email,
                    age: age,
                    height: height
                })

                const user = await Users.findOne({where:{username:username}})

                const accessToken = sign({
                    username: user.username, 
                    id: user.id},
                    "importantsecret")
                res.json({token: accessToken, username: username, id: user.id})
                return
            })
})


router.post('/login',async (req,res)=>{
    const {username, password} = req.body
    if(!username){
        res.json({error: "You have to type your username"})
        return
    }
    else if(!password){
        res.json({error: "You have to type password"})
        return
    }
    else if(username==="admin"){
        if(password!=="admin"){
            res.json({error:"Wrong password"})
            return
        }
        const accessToken =sign({
            username: "admin"},
            "importantsecret")
            res.json({token: accessToken, username: "admin", id:null})
            return
    }
    else{
        const user = await Users.findOne({where: {username:username}})
        if(!user){
            res.json({error: "User Doesn´t exist"})
            return
        } 
        bcrypt.compare(password, user.password)
            .then(async (value)=>{
            if(!value){
                res.json({error: "Wrong password"})
                return 
            }
            const accessToken = sign({
                username: user.username, 
                id: user.id},
                "importantsecret")
            res.json({token: accessToken, username: username, id: user.id})
            return
            })    
        }
    })

router.get('/authentication',validateToken,(req,res)=>{
        res.json(req.user)})

router.get('/', async(req,res)=>{
    const users = await Users.findAll()
    res.json(users)
})

router.delete('/', async(req,res)=>{
    const username = req.header('username')
    const email = req.header('email')
    const age = req.header('age')
    const height = req.header('height')
    const succes = await Users.destroy({
        where:{
            username: username,
            email: email,
            age: age,
            height: height
        }
    })
    if(!succes){
        res.json({error:"There has been some issue with deleting user"})
        return
    }
    res.json("success")
    return
})

module.exports = router