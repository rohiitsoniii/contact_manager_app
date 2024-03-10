const asyncHandler =require("express-async-handler")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
//@desc register a user
//@route post /api/users/register
//@acess public 

const registerUser = asyncHandler(async (req,res) =>{
    const {username,email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    };
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already exist")
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("hashed Password: ", hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`User created ${user}`)
    if (user) {
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400);
        throw new error("user data is not valid")
    }
    res.json({message:" Register the user"});
});

//@desc login a user
//@route post /api/users/login
//@acess public 

const loginUser = asyncHandler(async (req,res) =>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("all field are mandtory")
    }
    const user = await User.findOne({email});
    //compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))) {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"30m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new error("email or password is not valid")
    }


    
});

//@desc current user info
//@route post /api/users/current
//@acess private

const currentUser = asyncHandler(async (req,res) =>{
    res.json(req.user);
});
module.exports={registerUser,loginUser,currentUser}