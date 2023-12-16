import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from "./Routes/index.js"

const app=express()

dotenv.config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("server 8001")
})

app.use("/api/v1" , router);

app.listen(4000,()=>console.log("server running on 4000"))

mongoose.connect(process.env.MONGOURL).then(()=>console.log("database connected"))