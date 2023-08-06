import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*REGISTER USER*/
export const register = async(req,res)=>{
    try{
        const{
            firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile,
            impressions,
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*10000),
            impressions: Math.floor(Math.random()*10000),
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err)
    {
        res.status(500).json({error:err.message});
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email: email});
        if(!user)return res.status(400).json({msg:"User doesn't exist"});

    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
}