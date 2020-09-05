const express = require('express');
const {check} = require('express-validator');
const usersControllers = require('../../controllers/users-controller');
const HttpError  = require('../../errorHandling/http-error')

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
             async(req, res, next)=>{
   try{          
       const newUser = new User(req.body);
       const response = await newUser.save();
       res.status(201).json(response)
       console.log(response)
   }catch(err){
      const error = new HttpError('Signing up failed, please try again later!', 500)
      return next(error)
   }
             })

// Post Login: http://localhost:5000/api/users/login
router.post('/login', usersControllers.login)




module.exports = router;