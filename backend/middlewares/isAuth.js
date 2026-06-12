import jwt from "jsonwebtoken"
const isAuth = async (req,res,next)=>{
   
    try{
        console.log("cookie",req.cookies)
        const token = req.cookies.token
        if(!token){
            
            return res.status(400).json({message:"token not found"})
        }
        const varifyToken = await jwt.verify(token,process.env.JWT_SECRET)
        req.userId = varifyToken.userId
        next();
    }
    
    catch(error){
        console.log(error)
        return res.status(500).json({message:"isAuth error"})
    }
}
export default isAuth
