const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.postSignupUser = async (req, res, next)=>{
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hobbies = req.body.hobbies;
    // console.log(req);

    let user = await User.findOne({email: email});
    console.log(user);
    let saltrounds =10;

    try{
        if(user!=null){
            res.status(409).json({success: false, message: 'Error: User already exists!!'})
        }
        else{
            //hashing password
        bcrypt.hash(password, saltrounds, async(err, hash)=>{
            let user =new User({
                username: username,
                email: email,
                password: hash,
                hobbies: hobbies
              })
              await user.save();
            //   console.log(user);
              res.status(201).json({success: true, message: 'Successfully signed up!!'});
        })
    }
    
        
    }
    catch(err){
        // console.log(err);
        res.status(500).json({success: false, message:err});
    }
}