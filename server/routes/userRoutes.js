const express = require('express');
const { loginUsers, getUsers, updateUsers, regsiterUsers } = require('../controllers/authControls');
const router = express.Router();


router.post('/api/register', regsiterUsers)

router.post('/api/login', loginUsers)

router.get('/api/users', getUsers)

router.put('/api/users', updateUsers)


module.exports = router;