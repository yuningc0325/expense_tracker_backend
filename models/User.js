/**
 * This file is uesd to store and process user models
 */

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

 // User schema
const userSchema =new Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    avatar:{
        type:String
    },
    identity:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:[true,'date is required']
    }
 }
)

const user=mongoose.model('users',userSchema);
module.exports=user;
