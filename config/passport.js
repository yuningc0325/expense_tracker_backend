const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    mongoose =require('mongoose'),
    User =require('../models/User');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

const passport= function(passport){
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=> {
        User.findById(jwt_payload.id,(err,user)=>{
            if(err) throw err;
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        }
        )
        // console.log(jwt_payload);
    }));
}
module.exports=passport