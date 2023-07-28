const asyncHandler = require("express-async-handler");
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const User = require("../models/user");

const registerUser = asyncHandler(async(req, res, next) => {
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.statusCode=400;
        throw new Error('incomplete fields');
    }
    //check if email already exists 
    const user=await User.findOne({email});
    console.log(user);
    if(user){
        res.statusCode=400;
        throw new Error('user already exists');
    }
    //create new user
    const hashedPassword= await bcrypt.hash(password,10);
    const newUser=await User.create({
        username,email,password:hashedPassword
    })

    res.json(newUser);


});

const loginUser = asyncHandler(async(req, res, next) => {
    const {email,password}=req.body;
    if(!email || !password){
        res.statusCode=400;
        throw new Error('incomplete fields');
    }
    //check if user email exists
    const user=await User.findOne({email});
    if(!user){
        res.statusCode=401;
        throw new Error('user email not found');
    }

    //check password match
    const match=await bcrypt.compare(password,user.password);
    if(!match){
        res.statusCode=401;
        throw new Error('password did not match ');
    }

    //user logged in  send access token
    //access token must be send by client
    const token=jwt.sign({
        id:user._id,
        username:user.username,
        email:user.email,
    },process.env.SECRET_TOKEN,{expiresIn:'15m'});
    res.json(token);

});

const currentUser = asyncHandler(async(req, res, next) => {
    res.json(req.user)
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
