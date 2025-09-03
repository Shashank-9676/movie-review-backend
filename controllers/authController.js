import { userModel } from "../model/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export async function register(req,res){
    const {username,name,password,email} = req.body
    const user = await userModel.findOne({username})
    if(user){
        res.status(400).json({message:"User already exists."})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    await userModel.create({username,name,password:hashedPassword,email})
    res.status(200).json({message:"User Created Successfully"})
}
export async function login(req,res){
    const {username,password} = req.body
    const user = await userModel.findOne({username})
    if(!user){
        res.status(400).json({message:"User Not exists."})
    }
    const isCorrect = await bcrypt.compare(password,user.password)
    if(!isCorrect){
        res.status(400).json({message:"Passwords are not matching"})
    }
    const payload = {
        username,
        name:user.name,
        email:user.email,
    }
    const jwtToken = jwt.sign(payload,process.env.secret_key,{expiresIn:"30d"})
    res.status(200).json({jwt_token : jwtToken})
}