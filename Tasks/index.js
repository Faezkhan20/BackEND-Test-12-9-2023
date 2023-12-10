import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app=express()

dotenv.config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("server 8001")
})



app.listen(8001,()=>console.log("server running on 8001"))

mongoose.connect(process.env.MONGOURL).then(()=>console.log("database connected"))