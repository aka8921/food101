const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/user')
const Orders = require('./model/orders')
const Transactions = require('./model/transactions')
const Menu = require('./model/menu')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const PORT = 3000
const JWT_TOKEN = "kahsdfiyasbcjhsad%^$^^%&^#$JHBjdkjabfs^%$^&%&*JBHJGJH"

mongoose.connect('mongodb://localhost/food101')

app.use(cors())
app.use(express.json())

function isLoggedIn(req, res, next) {
  // Get the token from the request header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    // If there is no token, return an error
    return res.status(401).json({ message: 'No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  // console.log(token)
  // Verify the token
  jwt.verify(token, JWT_TOKEN, (err, decoded) => {
    if (err) {
      // If the token is invalid, return an error
      return res.status(401).json({ message: 'Invalid token.' });
    }
    
    // If the token is valid, set the user ID on the request object and call next()
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
}

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

app.post('/api/menu', isLoggedIn, async (req, res)=>{
  const {name, imageUrl, price, profit} = req.body
  try{
    response = await Menu.create({
        name,
        imageUrl,
        price,
        profit
    })
    console.log("Item Added successfully: ",response)
  }
  catch(error){
    if (error.code === 11000)
        return res.json({status: "error", message: "Item already in use"})
    throw error
  } 
  res.json({status: "ok"})
})

app.get('/api/menu', isLoggedIn, async (req, res)=>{
  Menu.find({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(data);
    }
  });
})

app.get('/api/user', isLoggedIn, (req, res) => {
  // If the middleware is successful, the user ID will be available on the request object
  const userId = req.userId;
  const username = req.username;
  // console.log("userId", userId)
  
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      // Handle the error
      console.error(err);
      return;
    }
  
    if (!user) {
      // Handle the case where the user is not found
      console.error(`User with username ${username} not found.`);
      return;
    }
  
    const userObject = {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      mealCard: user.mealCard,
      userType: user.userType
    };

    // console.log(userObject)

    // Send a response with the user object
    res.status(200).json({ user: userObject });
    });
})

app.put('/api/recharge', isLoggedIn, (req, res) => {
  const userId = req.userId;
  const username = req.username;
  const rechargeAmount = req.body.rechargeAmount

  User.findOneAndUpdate(
    { username }, 
    { $inc: { 'mealCard': rechargeAmount } }, 
    { new: true }
  )
    .then(updatedUser => {
      console.log(updatedUser);
      res.json({status: "ok"})
    })
    .catch(error => {
      console.error(error);
      res.json({status: "error"})
    });
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})