import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

//SIGNUP controller
export const signUp=async (req,res)=>{
     try{

        //req.body se name,email,password nikalege
         const{name,email,password} = req.body;

         // mail check kiya exist ? or not
         const existEmail = await  User.findOne({email})
         if(existEmail){
            return res.status(400).json({message:"Email already exist"})
         }

         // password check kiya strong he ya nhi
        if(password.length<6){
            return res.status(400).json({message:" password must be atleast 6 characters "})
        }

        //password ko hash kiya,normal password ko change kiya
        const hashedPassword = await bcrypt.hash(password,10);

        //user create kiya
        const user =await User.create({
            name,password:hashedPassword,email
        })

        //token generate , token ke liye config file me function bnaya
        
        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite :"strict",
            secure:false
        })

        return res.status(201).json(user)
     }
     catch(error){
        return res.status(500).json({message:"sign up error"})
     }
}


//LOGIN  Controller


export const Login=async (req,res)=>{
     try{

        //req.body se name,email,password nikalege
         const{email,password} = req.body;

         // mail check kiya exist ? or not
         const user = await  User.findOne({email})
         if(!user){
            return res.status(400).json({message:"Email does not exist"})
         }

       // password match or not
       const isMatch = await bcrypt.compare(password,user.password)

        //password ko hash kiya,normal password ko change kiya
        const hashedPassword = await bcrypt.hash(password,10);

        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }
       
        //token generate , token ke liye config file me function bnaya
        
        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite :"strict",
            secure:false
        })

        return res.status(200).json(user)
     }
     catch(error){
        return res.status(500).json({message:`login error ${error}`})
     }
    }

// LogOut controller
 
export const logOut = async (req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"log out successfully"})
    }
    catch(error){
        return res.status(500).json({message:`logout error ${error}`})
    }
}