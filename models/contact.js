const mongoose=require('mongoose');



const ContactSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    name:{
        type:String,
        required:[true,"please add the contact name"],
    },
    email:{
        type:String,
        required:[true,"please add the contact email"]
    },
    phone:{
        type:String,
        required:[true,"please add the contact phone"],
    }

},{
    timestamps:true
})




module.exports=mongoose.model('Contact',ContactSchema);