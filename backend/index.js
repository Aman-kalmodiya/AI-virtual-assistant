import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/bd.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import  geminiResponse from "./gemini.js";
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors({
    origin: ["http://localhost:5173", "https://ai-virtual-assistant-b4m2.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

app.use(express.json())
app.use(cookieParser()) 
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
                                

app.listen(port,()=>{
    connectDb()
    console.log("server started")
}) 
    


