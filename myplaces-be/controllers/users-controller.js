const {validationResult} = require('express-validator')
const HttpError = require("../errorHandling/http-error")
const User = require('../routes/users/userModel') //Users Schema - Model


//Get all users - http://localhost:5000/api/users
const getUsers = async(req, res, next) =>{
    let users;
      try{
           users =await User.find({}, 'email name')//const users = User.find({}, '-password')
         }catch(err){
             const error = new HttpError('Fetching users failed, please try again later!', 500);
             return next(error);
         }
   res.json({users: users.map( user => user.toObject({getters: true}))})
    }


// Signup a new User: http://localhost:5000/api/users/signup
const signup = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next( new HttpError('Invalid inputs passed, please check your data!', 422))
    }
    
    const{name, email,image, password} = req.body;

    let existingUser
    try{
        existingUser = await User.findOne({ email: email})
    }catch(err){
        const error = new HttpError('Signing up failed, please try again later!', 500)
        return next(error)
    }
    
    if(existingUser){
        const error = new HttpError('User already exists, please login instead.', 422)
        return next(error);
    }
    const createdUser = new User({
        name,
        email,
        image,
        password,
        places: []
    })

    try{
        await createdUser.save();
       } catch(err){
           const error = new HttpError(' signingup new user failed, please try again!', 500)
           return next(error);
       }

    res.status(201).json({user: createdUser.toObject({getters: true})})
};


// Log in a registered User: http://localhost:5000/api/users/login - If it works, shkrun aty 'Logged in!'
// nese shkrujm email dhe pass te sakte, dhe post ateher del "loged in"
const login = async(req, res, next) => {
    const {email, password} = req.body;

    let existingUser
    try{
        existingUser = await User.findOne({ email: email})
    }catch(err){
        const error = new HttpError('Logging in failed, please try again later!', 500)
        return next(error)
    }

    if(!existingUser || existingUser.password !== password){
        const error = new HttpError('Invalid credentials, could not log you in.', 401);
        return next(error);
    }
   

    res.json({message: 'Logged in!'})
};



exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;