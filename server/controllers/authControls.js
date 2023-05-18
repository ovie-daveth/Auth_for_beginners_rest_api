const validator = require('validator') //to validate email and password
const mongoose = require('mongoose') //to create database in mongodb
const User = require('../models/userModel') //userSchema from models
const createToken = require("../token") //created token to track our loggged in user
const bcrypt = require('bcrypt') // for hashing password

const regsiterUsers = async (req, res) => {
    const { email, password, name } = req.body // received from client
    // console.log("The password", password) used this for debugging
    if(!email || !password || !name) {
        res.json({error: 'Invalid email or password'});
    } else if (!validator.isEmail(email)) {
       return res.json({ error: 'Invalid email address' });
    } else if (!validator.isStrongPassword(password)) {
      return  res.json({ error: 'Invalid password, must contain a special char and six min digit' });
    } 
    try {
        const exist = await User.findOne({email}) // a mongodb method to check if email exist
    if(exist){
        return res.json({ error: 'Email already exists' });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
        const user = await User.create({ email, password: hashedPassword, name }); 
        await createToken(res, user._id);
        
        return res.status(201).json({success: "Registered succesfully", user});
    }
    } catch (error) {
        console.error(error);
        return res.json({ error: 'Internal server error' });
    }
   
}

const loginUsers = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
      return  res.status(404).json({ error: 'empty credentials'});
    }
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password); //compares the user password and the registerd password
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
        }
    
        // Password is valid, proceed with login
        // Generate and send the token
        await createToken(res, user._id);
        return res.json({ success: 'Logged in successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}
// get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json({ success: true, users });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

// a user is allowed to see hisown profile
const getUser = async (req, res) => {
    const user = { //from the protect function
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        location: req.user.location,
        gender: req.user.gender,
        joined: req.user.createdAt,
        lastUpdate: req.user.updatedAt,
      };
    
      console.log(user);
      res.status(200).json({sucess: 'Updated successfully', user});
  };
  

const updateUsers = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
      try {
          //get me the user for an edit, if no edit save it again
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          user.location = req.body.location || user.location;
          user.gender = req.body.gender || user.gender;
  
          const updatedUser = await user.save()
          res.status(200).json(updatedUser)
      } catch (error) {
        res.json({ error: "restricted"})
      }
    } else{
        res.status(404).json({error: 'User not found'})
    }
}

const logout = (req, res) => {
    res.cookie("token", '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(201).json({success: "loggged out"})
}

module.exports = {
    regsiterUsers,
    loginUsers,
    getUsers,
    getUser,
    updateUsers,
    logout,
}
