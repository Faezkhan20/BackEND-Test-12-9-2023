import TaskModals from "../Modals/Task.Modals.js";
import {connect} from 'nats'

const natsOptions = {
    servers: ['nats://localhost:4222'],
};

let natsConnection;

const publishEvent = async (subject, data) => {
    if (!natsConnection) {
        natsConnection = await connect(natsOptions);
        console.log("Connected to nats server");
    }
    try {
        natsConnection.publish(subject, data);
        console.log("Event publish successfully");
        await natsConnection.flush(); 
    } catch (error) {
        console.log("Error publish event:", error)
    }
}


// app.get("/hello", async (req, res) => {
// const CompletedTask = {
//     EventName : "Assignment"
// }
// try{
//     await publishEvent('TASK_COMPLETED' , JSON.stringify(CompletedTask))
// }catch(error){
//     console.error("Error publish event :" , error)
// }
// res.send(true);  
// })


export const AssignTasks=async(req,res)=>{
try{


    const {description , priority , dueDate , completed , userID} = req.body
    console.log('hello');

    if(!description , !priority , !dueDate , !completed , !userID) return res.status(401).json({success : false , message : "All Fields are Mandatory"}) 

    const task  = new TaskModals({
        description,
        priority,
        dueDate,
        completed,
        userID
    })

    await task.save();

    return res.status(200).json({success : true , message : "Task Assigned Successfully"})

}catch(error){
    console.log("hello")
    return res.status(500).json({ success: false, message: error.message })
}
}
export const userFetch=async(req,res)=>{
    try{
       
        const {userId}=req.body
    
        if(!userId) return res.status(401).json({success : false , message : "All Fields are Mandatory"}) 


        const task=await TaskModals.find({userID:userId})

        return res.status(200).json({success : true , message : "userfetch",task})




    }catch(error){
        return res.status(500).json({ success: false, message: error })

    }

}
export const Update=async(req,res)=>{
    try{
       
        const {taskId,description , priority , dueDate , completed , userID}=req.body
    
        if(!description , !priority , !dueDate , !completed , !userID,!taskId)  return res.status(401).json({success : false , message : "All Fields are Mandatory"}) 


        const updatedTask=await TaskModals.findByIdAndUpdate(taskId,{description , priority , dueDate , completed , userID})

        return res.status(200).json({success : true , message : "Updated successfully"})




    }catch(error){
        return res.status(500).json({ success: false, message: error })

    }

}

export const Completion=async(req,res)=>{
    try{
       
        const {taskId}=req.body
    
        if(!taskId)  return res.status(401).json({success : false , message : "All Fields are Mandatory"}) 


        const completedTask=await TaskModals.findByIdAndUpdate(taskId,{completed : true })
        if (!completedTask) return res.status(401).json({ success: false, message: "Check the data you send" })

        const CompletedTask = {
            EventName: "Completed"
        }

        await publishEvent('TASK_COMPLETED', JSON.stringify(CompletedTask))



        return res.status(200).json({success : true , message : `task ${taskId} completed successfully`})




    }catch(error){
        return res.status(500).json({ success: false, message: error })

    }

}
export const FetchAndSort=async(req,res)=>{
    try{
       
        const {}=req.body
    
        // if() return res.status(401).json({success : false , message : "All Fields are Mandatory"}) 


        const task=await TaskModals.find({priority:"HIGh"}).sort({dueDate:1})

        return res.status(200).json({success : true , message : "userfetch",task})




    }catch(error){
        return res.status(500).json({ success: false, message: error })

    }

}

