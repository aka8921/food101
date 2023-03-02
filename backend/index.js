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
    req.userType = decoded.userType;
    next();
  });
}

function roleCheckAdmin(req, res, next) {
  
  if (req.userType !== "admin") {
    return res.status(401).json({ message: 'This feature is only accessible by admins' });
  }
  next();
}

function roleCheckcanteen(req, res, next) {
  
  if (req.userType !== "admin" || req.userType !== "canteen-staff") {
    return res.status(401).json({ message: 'This feature is only accessible by Admins and Canteen staff' });
  }
  next();
}

function roleCheckKitchen(req, res, next) {
  
  if (req.userType !== "admin" || req.userType !== "canteen-staff" || req.userType !== "kitchen-staff") {
    return res.status(401).json({ message: 'This feature is only accessible by Admins, Canteen and Kitchen staff' });
  }
  next();
}



app.get('/', (req, res) => {
  res.send('Food 101!')
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
            const token = jwt.sign({id: user._id, username: user.username, userType: user.userType}, JWT_TOKEN)
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

app.post('/api/menu', async (req, res)=>{
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

app.put('/api/recharge', isLoggedIn, async (req, res) => {
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

app.get('/api/order', isLoggedIn, async (req, res)=>{
  const userId = req.userId;
  Orders.find({user: userId}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(data);
    }
  });
})

app.post('/api/order', isLoggedIn, async (req, res)=>{
  const {items, total} = req.body
  try{
    response = await Orders.create({
        user: req.userId,
        items,
        total
    })
    console.log("Order Added successfully: ",response)
  }
  catch(error){
    if (error.code === 11000)
        return res.json({status: "error", message: "Item already in use"})
    throw error
  } 
  res.json({status: "ok"})
})

app.delete('/api/order', isLoggedIn, async (req, res)=>{
  const {orderId} = req.body
  console.log("Delete")
  Orders.findByIdAndDelete(orderId)
    .then(order => {
      if (order) {
        res.status(200).json({ status: "ok", message: `Order with _id ${orderId} deleted`, order });
      } else {
        res.status(404).json({ message: `Order with _id ${orderId} not found` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
})

app.post('/api/transaction', isLoggedIn, async (req, res) => {
  const {transactionAmount} = req.body

  try{
    response = await Transactions.create({
        user: req.userId,
        transactionAmount
    })
    console.log("Order Added successfully: ",response)
  }
  catch(error){
    if (error.code === 11000)
        return res.json({status: "error", message: "Item already in use"})
    throw error
  } 
  res.json({status: "ok"})

})

app.get('/api/transaction', isLoggedIn, async (req, res)=>{
  const userId = req.userId;
  Transactions.find({user: userId}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(data);
    }
  });
})

// Admin

app.post('/api/admin/sign-up',isLoggedIn, roleCheckAdmin, async (req, res) => {
  const {username, password, firstName, lastName, userType, mealCard} = req.body
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
        userType,
        mealCard : mealCard | 0
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

app.get('/api/admin/superuser', async (req, res) => {
  const password = "superuser"
  hashedPassword = await(bcrypt.hash(password, 10))
  try{
    response = await User.create({
        username: "superuser",
        password: hashedPassword,
        firstName: "Super",
        lastName: "User",
        userType: "admin",
        mealCard : 0
    })
    console.log("SuperUser Created successfully: ",response)
  }
  catch(error){
    if (error.code === 11000)
        return res.json({status: "error", message: "Username already in use"})
    throw error
  } 
  res.json({status: "ok"})
})

app.get('/api/admin/users', isLoggedIn, roleCheckAdmin, (req, res) => {
  // If the middleware is successful, the user ID will be available on the request object
  const userId = req.userId;
  const username = req.username;
  const userType = req.userType
  // console.log("userId", userId)
  
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
    }

    const simplifiedUsers = users.map(user => (
      { 
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        mealCard: user.mealCard,
        userType: user.userType
      }
      
      ));

    // Send a response with the simplifiedUsers object
    res.status(200).json({ users: simplifiedUsers });
    });
})

app.delete('/api/admin/users', isLoggedIn, async (req, res)=>{
  const {userId} = req.body
  console.log("Delete")
  User.findByIdAndDelete(userId)
    .then(user => {
      if (user) {
        res.status(200).json({ status: "ok", message: `Order with _id ${userId} deleted`, user });
      } else {
        res.status(404).json({ message: `Order with _id ${userID} not found` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})