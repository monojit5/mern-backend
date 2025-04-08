const express = require('express');
const { register, login, upload  } = require('../controllers/userController');
const router = express.Router();

router.post('/register', upload.single("image"),  register)
router.post('/login',   login)

module.exports = router;