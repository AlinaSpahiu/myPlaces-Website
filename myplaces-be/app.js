const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const placeRoutes = require('./routes/places/placesRoute');
const userRoutes = require('./routes/users/usersRoute')
const HttpError = require("./errorHandling/http-error")

const app = express()

//
app.use(bodyParser.json())

// Routes:
app.use('/api/places', placeRoutes); // =>/api/places...
app.use('/api/users', userRoutes)

//Error Handling:

// a middleware when a specific route doesnt exists:
app.use((req, res, nex) =>{
     const error = new HttpError('Could not find this route', 404);
     throw error;
})
app.use((error, req, res, next) => {
    if(res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });

mongoose
.connect("mongodb://localhost:27017/myplaces?retryWrites=false", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // removes the warning:DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
  
})
   .then(() =>{ app.listen(5000, ()=>{ console.log("hei, I'm on port 5000!")}) })
   .catch(err => { console.log(err) });
