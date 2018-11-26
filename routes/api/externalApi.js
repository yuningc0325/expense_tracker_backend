const express=require('express');
const router=express.Router();
const request = require('request');


//$route GET api/external/weather
//@desc Return the json message
//@access Public
router.get('/currency',(req,res)=>
request('https://tw.rter.info/capi.php',function(err,response,body){
        if(err) console.log(err);
        var content = JSON.parse(body);
        res.json(content);
    })
    
)
module.exports=router;
