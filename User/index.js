import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import router from "./Routes/index.js"
import mongoose from "mongoose"
import connect from "nats"



const app = express()
dotenv.config()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

const natsOptions = {
    servers: ["nats://localhost:4222"]

};

let natsConnection;

const publishEvnet = async (subject, data) => {
    if (!natsConnection) {
        natsConnection = await connect(natsOptions)
        console.log("connect to NATS server")
    }


    try {
        natsConnection.publish(subject, data);
        console.log("Event published successfully")
        await natsConnection.flush()
    } catch (error) {
        console.error("error publishing event", error)
    }
}

app.get("/hello", async (req, res) => {

    const completedTaskEvent = {
        eventType: "TASK_COMPLETED",

    };
    try {
        await publishEvnet("TASK_COMPLETED", JSON.stringify(completedTaskEvent))
    } catch (error) {
        console.error("error publish event", error)
    }
    res.send(true);
})




app.use("/",(req,res)=>{
    res.send("8000server")

})
app.use("/api/v1", router)


app.listen(8000, () => console.log("server start"))

mongoose.connect(process.env.MONGOURL).then(() => console.log("database connected"))

