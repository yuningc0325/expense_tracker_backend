const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const gravatar = require('gravatar');
const jwt=require('jsonwebtoken');
const passport=require('passport');
const User = require('../../models/User');

//$route GET api/users/test
//@desc Return the json message
//@access Public
router.get('/test',(req,res)=>
    res.json({msg:'work'})
)

//$route POST api/users/register
//@desc Return the json message
//@access Public
router.post('/register',(req,res)=>{
    //Define variables
    var name=req.body.name,
        email=req.body.email,
        password=req.body.password;
        avatar=req.body.avatar;
        identity=req.body.identity;

    // Validation of email, the email has existed or not?
    User.findOne({email:email})
        .then((user)=>{
            if(user){
                return res.status(400).json('this email has existed');
            }else{
                // Catch user's avatar by 'gravatar'
                avatar= gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
                // Build an user object
                const newUser= new User({
                    name:name,
                    email:email,
                    avatar:avatar,
                    password:password,
                    identity:identity
                    }
                )

                // Encryption of password
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save()
                            .then(user=>res.json(user))
                            .catch((err)=>console.log(err));
                    });
                });
            }
        })
    console.log(req.body);
})

//$route POST api/users/login
//@desc Return the user token
//@access Public
router.post('/login',(req,res)=>{
    var account=req.body.email;
    var password=req.body.password;
    
    User.findOne({email:account})
        .then(user=>{
            // Check account(email)
            if(!user){
                return res.status(404).json('Can not find the account');
            }else{
                // Check the password
                bcrypt.compare(password,user.password, function(err, result) {
                    if(err) console.log(err);
                    if(result){
                        // Encryption of user's token (json web token)
                        const rule={
                            id:user.id,
                            email:user.email,
                            name:user.name,
                            password:user.password,
                            identity:user.identity
                            };
                        
                        jwt.sign(rule,'secret',{expiresIn:'5h'},(err,token)=>{
                            if(err) throw err;
                            res.json({
                                success:'true',
                                token:'Bearer '+token
                            })
                        })
                        // res.json('Login success!');
                    }else{
                        return res.status(400).json('Password is incorrect.');
                    }
                });
            }
        })
        .catch(err=>console.log(err));
}
)

//$route PUT api/users/:id
//@desc Update the user information
//@access Private
router.put('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const name=req.body.name;
    const id=req.params.id;
    User.findByIdAndUpdate({_id:id},{$set:{name:name}},{new:true})
        .then(user=>{
                res.json(user);
                console.log('backend json is'+user);
        }).catch(err=> console.log(err))
})

//$route GET api/users/current
//@desc Return the user information
//@access Private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity,
        avatar:req.user.avatat
    });
    }
)
module.exports=router;