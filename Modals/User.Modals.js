import mongoose, { Schema } from "mongoose";

const user=new Schema({
   name:String,
   type:String,
   email:String


})

export default mongoose.model("user",user)