const express = require('express');
const {check} = require('express-validator')

const placesControllers = require('../../controllers/places-controller')
const Place = require('./placeModel')

const router = express.Router();

//Get all places - http://localhost:5000/api/users
router.get('/', async(req, res, next) =>{
     const allPlaces = await Place.find(req.query).populate('authors')
     res.json(allPlaces)
})
    
    

// Get a place by PlaceId - http://localhost:5000/api/places/p1
router.get('/:pid', placesControllers.getPlaceById)


// Get a place by UserId - http://localhost:5000/api/places/user/u1
router.get('/user/:uid', placesControllers.getPlacesByUserId)

// Post a place - 
router.post('/', 
           [
            check('title')
                 .not()
                 .isEmpty()
                 .withMessage("Title can not be empty!"),
            check('description')
                 .isLength({min: 5})
                 .withMessage("Description incorrect! Add at least 5 characters!"),
            check('address')
                 .not()
                 .isEmpty()
                 .withMessage("Please add a correct address!") 
           ],
            async(req, res, next)=>{
                 const newPlace = new Place(req.body);
                 const response = await newPlace.save()
                 res.json(response)
            })

// Edit a place - 
router.patch('/:pid',
              [
               check('title').not().isEmpty().withMessage("Title can not be empty!"),
               check('description').isLength({min: 5}).withMessage("Description incorrect! Add at least 5 characters!")

              ], 
              placesControllers.updatePlaceById)

// Delete a place - 
router.delete('/:pid', placesControllers.deletePlaceById)

module.exports = router;