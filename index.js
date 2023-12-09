import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import router from "./Routes/index.js"
import mongoose from "mongoose"



const app=express()

dotenv.config()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// app.use("/",(req,res)=>{
//     res.send("hello")

// })
app.use("/api/v1",router)


app.listen(8000,()=>console.log("server start"))

mongoose.connect(process.env.MONGOURL).then(()=>console.log("database connected"))

