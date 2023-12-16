import UserModals from "../Modals/User.Modals.js";



export const checkAdmin = async (req,res,next)=>{

    try{
     const {id}=req.body
     console.log(id,"admin id");
     if(!id) return res.status(401).json({ success: false, message: "Admin Id is mandatory" })

     const user=await UserModals.findById({_id:id})
     console.log(user , "users data");

     if(!user) return res.status(401).json({success : false , message : "Admin ID is wrong"})

    

     if (user.type == "admin"){
         next();
     } else {
         return res.status(404).json({ message: "Only Admin can create and delete", success: false });
     }

    }catch(error){
        return res.status(500).json({success:false,message:error})
    }

}