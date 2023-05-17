

const regsiterUsers = (req, res) => {
    console.log("Register users")
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
