/**
 * This file is uesd to store and process profile models
 */

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

 // Profile schema
const profileSchema =new Schema({
    category:{
        type:String,
        required:true
    },
    item:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    payer:{
        type:String,
        required:true
    },
    payMethod:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        default:'NT',
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:[true,'date is required']
    }
 }
)

const profile=mongoose.model('profile',profileSchema);
module.exports=profile;