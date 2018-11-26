const express = require('express');
const mongoose =require('mongoose');
const bodyParser =require('body-parser');
const passport=require('passport');
const passportjwt=require('passport-jwt');
const app =new express();


// Use body parser
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
// Mongo DB config 
const mongoDB = require('./config/keys').mongoURI;
// Connect to database
mongoose.connect(mongoDB)
        .then(()=>console.log('MongoDB connected!'))
        .catch(err=>console.log(err));

// Passport initialisation
app.use(passport.initialize());
require('./config/passport')(passport);

// Users route
const users=require('./routes/api/users');
app.use('/api/users',users);

// Profile route
const profiles= require('./routes/api/profiles');
app.use('/api/profiles/',profiles);

// External API request
const externalApi= require('./routes/api/externalApi');
app.use('/api/external/',externalApi);

// Server connection
const port= process.env.PORT||5000;
const ip= process.env.IP;
app.listen(port,ip,()=>{
    console.log('server is connected!');
})

// General routes
app.get('/',(req,res)=>{
    res.send('Hello World!');
})