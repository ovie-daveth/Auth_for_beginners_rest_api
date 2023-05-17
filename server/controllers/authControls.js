const validator = require('validator')

const regsiterUsers = (req, res) => {
    const { email, password, name } = req.body
    if(!email || !password || !name) {
        res.status(401).json({error: 'Invalid email or password'});
    } else if (!validator.isEmail(email)) {
        res.status(400).json({ error: 'Invalid email address' });
    } else if (!validator.isStrongPassword(password)) {
        res.status(400).json({ error: 'Invalid password, must contain a special char and six min digit' });
    }
    res.json({success: true, message: "Register users"})
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
