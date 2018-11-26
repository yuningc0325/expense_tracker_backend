const express=require('express');
const router=express.Router();
const passport=require('passport');
const Profile=require('../../models/Profile');


//$route GET api/profiles/test
//@desc Return the json message
//@access Public
router.get('/test',(req,res)=>
    res.json({msg:'profiles route work'})
)

//$route POST api/profiles/add
//@desc Add an expense
//@access Private
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res)=>{

    var profilesField={};
    if(req.body.category) profilesField.category=req.body.category;
    if(req.body.item) profilesField.item=req.body.item;
    if(req.body.location) profilesField.location=req.body.location;
    if(req.body.payer) profilesField.payer=req.body.payer;
    if(req.body.payMethod) profilesField.payMethod=req.body.payMethod;
    if(req.body.price) profilesField.price=req.body.price;
    if(req.body.currency) profilesField.currency=req.body.currency;

    new Profile(profilesField).save()
                                .then(profile=>{
                                res.send(profile);
                                }).catch(err=> 
                                    console.log(err))
})

//$route GET api/profiles/
//@desc Return all expense track information
//@access Private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.find()
           .then(profiles=>{
               if(!profiles){
                   return res.status(404).json('There is no any information');
               }else{
                   res.json(profiles);
               }
           })
           .catch(err=>console.log(err));
})

//$route GET api/profiles/:id
//@desc Return a specific expense information
//@access Private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const id=req.params.id;
    Profile.findById(id)
            .then(profile=>{
                if(!profile){
                    return res.status(404).json('No corresponding information');
                }else{
                    res.json(profile);
                }
            }).catch(err=>{
                return res.status(404).json(err);
            });
})

//$route PUT api/profiles/:id
//@desc Edit a specific expense information
//@access Private
router.put('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
   
    var profilesField={};
    if(req.body.category) profilesField.category=req.body.category;
    if(req.body.item) profilesField.item=req.body.item;
    if(req.body.location) profilesField.location=req.body.location;
    if(req.body.payer) profilesField.payer=req.body.payer;
    if(req.body.payMethod) profilesField.payMethod=req.body.payMethod;
    if(req.body.price) profilesField.price=req.body.price;
    if(req.body.currency) profilesField.currency=req.body.currency;
    
    Profile.findOneAndUpdate({_id:req.params.id},{$set:profilesField},{new:true})
            .then(profile=>{
                res.json(profile);
            }).catch(err=> {
                return res.status(404).json(err);
            })
})

//$route DELETE api/profiles/:id
//@desc Delete a specific expense information
//@access Private
router.delete('/:id',passport.authenticate('jwt', {session:false}),(req,res)=>{
        Profile.findOneAndRemove({ _id:req.params.id})
            .then(profile=>{
                profile.save().then(profile=>{
                    res.json(profile);
                }).catch(err=>res.status(404).json(err+"delete false"))
            })
})

//$route DELETE api/profiles/delete
//@desc Delete a specific expense information
//@access Private
router.delete('/delete',passport.authenticate('jwt', {session:false}),(req,res)=>{
    Profile.remove().then(
        res.json(profile)
    ).catch(err=>res.status(404).json(err+"delete"))
})



module.exports=router;