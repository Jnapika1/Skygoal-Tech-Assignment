const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(id, username){
    return jwt.sign({userId: id, name:username}, process.env.TOKEN_KEY)
}

const postUserLogin = async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    // console.log(emailExists);
    try{
        const emailExists = await User.findOne({email:email});
        if(emailExists!=null){
            bcrypt.compare(password, emailExists.password, (err, result)=>{
                if(err){
                    throw new Error('Something went wrong');
                }
                if(result===true){
                    res.status(201).json({success : true, message: 'User logged in successfully!', token: generateAccessToken(emailExists._id, emailExists.username)});
                    // res.redirect('../views/expense.html');
                }
                else{
                    res.status(401).json({success:false, message: 'Incorrect Password!'});
                }
            })
        }
        else{
            res.status(404).json({success : false, message: 'User not found!'});
        }
    }
    catch(err){
        res.status(500).json({success: false, message: err});
    }
    
}
module.exports={generateAccessToken, postUserLogin};