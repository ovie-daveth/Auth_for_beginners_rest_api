//to protect our routes

const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect =async (req, res, next) => {

    let token = req.cookies.token

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

            req.user = await User.findById(decoded._id).select("-password"); //a mongoose method of getting a particular user
            next()
        } catch (error) {
            res.status(401).json({ error: "Invalid JWT token"})
        }

    } else{
        res.status(403).json({error:"Not authorized to access"})
    }
}

module.exports = protect