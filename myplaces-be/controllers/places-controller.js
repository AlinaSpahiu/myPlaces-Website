const uniqid = require('uniqid');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../errorHandling/http-error');
//const getCoordsForAddress = require('../util/location');
const Place = require('../routes/places/placeModel')
const User = require('../routes/users/userModel');




let Dummy_Places = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the best',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: ' New York',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the best',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: ' New York',
        creator: 'u1'
    },
    {
        id: 'p3',
        title: 'Empire State Building',
        description: 'One of the best',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: ' New York',
        creator: 'u1'
    },
    {
        id: 'p4',
        title: 'Empire State Building',
        description: 'One of the best',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: ' New York',
        creator: 'u2'
    }
]

//Get all Places - http://localhost:5000/api/users
const getAllPlaces = (req, res, next) =>{
    res.json({places: Dummy_Places});
    }
    

    
// Get a place by PlaceId - http://localhost:5000/api/places/p1
const getPlaceById = async(req, res, next) =>{
    const placeId = req.params.pid; // {pid = 'p1'}
    let place;
    try{
        place = await Place.findById(placeId)
      
    }catch(err){
        const error = new HttpError('Could not find a place!', 500)
        return next(error)
    }
   

    if (!place) {
        const error = new HttpError('Could not find a place for the provided id.', 404);
       return next(error)
    }
    
      res.json({ place:place.toObject({getters: true}) }); // or just: res.json({ place })
}

// Get a place by UserId - http://localhost:5000/api/places/user/u1
const getPlacesByUserId =  async(req, res, next) => {
    const userId = req.params.uid;
    let userWithPlaces;
    try{
    userWithPlaces = await (await User.findById(userId)).populated('places')
    } catch(err){
        const error = new HttpError('Fetching places failed, pls try again later!', 500)
        return next(error);
    }
    
    if(!userWithPlaces || userWithPlaces.places.length === 0){
       return next( new HttpError('Could not find a place for the provided user id', 404) );
     }
    res.json({places: userWithPlaces.map(place => place.toObject({getters:true}))})
}


// Post a place - 
const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { title, description, address, image, creator } = req.body;
  
    // let coordinates;
    // try {
    //   coordinates = await getCoordsForAddress(address);
    // } catch (error) {
    //   return next(error);
    // }
  
    const createdPlace = new Place({
      title,
      description,
      address,
     // location: coordinates,
      image,
      creator
    });
  
    let user;
    try {
      user = await User.findById(creator);
    } catch (err) {
      const error = new HttpError('Creating place failed, please try again', 500);
      return next(error);
    }
  
    if (!user) {
      const error = new HttpError('Could not find user for provided id', 404);
      return next(error);
    }
  
    console.log(user);
  
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      
      await createdPlace.save({ session: sess });
      //user.places.push(createdPlace);
      //await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
        console.log(err)
        const error = new HttpError(
        'Creatinggggggggg place failed, please try again.',
        500
      );
      return next(error);
      
    }
    
  
    res.status(201).json({ place: createdPlace });
  };

// Update Place:
const updatePlaceById = async(req, res, next) => {
    const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check your data!', 422))
      }

    const {title, description} = req.body;
    const placeId = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeId)
    }catch(err){
        const error = new HttpError('Something went Wrrong. Could not update!', 500)
        return next(error)
    }
    
    place.title = title;
    place.description = description;

 try{
     await place.save();
 } catch(err){
     const error = new HttpError('Could not update place!', 500)
     return next(error);
 }

    res.status(200).json({place: place.toObject({getters: true})})


};

// Delete Place:
const deletePlaceById = async(req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try{
        place = await (await Place.findById(placeId)).populate('creator');
    }catch(err){
        const error = new HttpError('Could not delete the place!', 500)
        return next(error);
    }

    if(!place) {
        const error = new HttpError('Could not find place for this id!', 404)
        return next(error);
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session: sess});
        place.creator.places.pull(place);
        await place.creator.save({session: sess});
        await sess.commitTransaction();

    }catch(err){
        const error = new HttpError('Could not delete the place!', 500);
        return next(error);
    }
    res.status(200). json({message: 'Deleted place!'})
};


exports.getAllPlaces = getAllPlaces
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;