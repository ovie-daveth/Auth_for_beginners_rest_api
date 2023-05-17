const validator = require('validator')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const createToken = require("../token")

const regsiterUsers = async (req, res) => {
    const { email, password, name } = req.body
    if(!email || !password || !name) {
        res.status(401).json({error: 'Invalid email or password'});
    } else if (!validator.isEmail(email)) {
       return res.status(400).json({ error: 'Invalid email address' });
    } else if (!validator.isStrongPassword(password)) {
      return  res.status(400).json({ error: 'Invalid password, must contain a special char and six min digit' });
    } 
    try {
        const exist = await User.findOne({email})
    if(exist){
        return res.status(400).json({ error: 'Email already exists' });
    } else {
        const user = await User.create({ email, password, name });
        const token = await createToken(res, user._id);
        //res.cookie('token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

       return res.status(201).json({success: "Registered succesfully", user});
    }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
   
}

const loginUsers = (req, res) => {
    console.log("Login users")
    res.json({success: true, message: "Login users"})
}

const getUsers = (req, res) => {
    console.log("getUser users")
    res.json({success: true, message: "getUser users"})
}

const updateUsers = (req, res) => {
    console.log("Update users")
    res.json({success: true, message: "Updateusers"})
}

module.exports = {
    regsiterUsers,
    loginUsers,
    getUsers,
    updateUsers,
}
