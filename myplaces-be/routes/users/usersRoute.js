const express = require('express');
const {check} = require('express-validator');
const usersControllers = require('../../controllers/users-controller');

const router = express.Router();



// Get all users: http://localhost:5000/api/users
router.get('/', usersControllers.getUsers )


// Post Signup:  http://localhost:5000/api/users/signup
router.post('/signup', 
            [
             check('name')
                .not()
                .isEmpty(),
             check('email').normalizeEmail()
                .isEmail(),
             check('password')
                .isLength({min: 6})
            ], 
            usersControllers.signup)

// Post Login: http://localhost:5000/api/users/login
router.post('/login', usersControllers.login)




module.exports = router;