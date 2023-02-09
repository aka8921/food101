const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const PORT = 3000
const JWT_TOKEN = "kahsdfiyasbcjhsad%^$^^%&^#$JHBjdkjabfs^%$^&%&*JBHJGJH"

mongoose.connect('mongodb://localhost/food101')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/sign-in', async (req, res) => {
    const {username, password} = req.body
    console.log(username, " Signing in...")
    if(!username || typeof username !== 'string'){
        return res.json({status: "error", message: "Invalid Username"})
    }

    if(!username || password.length < 5){
        return res.json({status: "error", message: "Password Too Short"})
    }
    try{
        user = await User.findOne({
            username
        }).lean()
        if(!user){
            return res.send({status: "error", message: "Invalid Username / Passowrd"})
        }

        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({id: user._id, username: user.username}, JWT_TOKEN)
            return res.send({status: "ok", body: token, message: "user verified"})
        }
        else{
            return res.send({status: "error", message: "Invalid Username / Passowrd"})
        }
        }
        catch(error){
            console.log(error)
            return res.json({status: "error"})
        } 

    res.send({status: "ok"})
  })

app.post('/api/sign-up', async (req, res) => {
  const {username, password, firstName, lastName, userType} = req.body
  if(!username || typeof username !== 'string'){
    return res.json({status: "error", message: "Invalid Username"})
  }

  if(!username || password.length < 5){
    return res.json({status: "error", message: "Password Too Short"})
  }
  hashedPassword = await(bcrypt.hash(password, 10))
  try{
    response = await User.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        userType
    })
    console.log("User Created successfully: ",response)
  }
  catch(error){
    if (error.code === 11000)
        return res.json({status: "error", message: "Username already in use"})
    throw error
  } 
  res.json({status: "ok"})
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})