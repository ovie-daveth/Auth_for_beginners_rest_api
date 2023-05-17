const express = require('express');
const { loginUsers, getUsers, updateUsers, regsiterUsers, getUser, logout } = require('../controllers/authControls');
const protect = require('../midddlewares/authMiddleware');
const router = express.Router();


router.post('/api/register', regsiterUsers)

router.post('/api/login', loginUsers)

router.get('/api/users', getUsers) //to get all users by admin

router.route('/api/user/')
  .get(protect, getUser) // Retrieve a specific user profile by the authorized user
  .put(protect, updateUsers); // Update a specific user profile by the authorized user

router.post('/api/logout', logout)



module.exports = router;