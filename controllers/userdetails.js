const User = require('../models/user');

exports.getUserDetails = async(req, res, next)=>{
    try{
        const userId = req.user._id; 
        const userDetails = await User.findById(userId).select('username email hobbies');
        res.status(201).json({userDetails, success:true})
    }
    catch(err){
        console.log(err);
    }
}

