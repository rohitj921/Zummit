const mongoose=require("mongoose");

const groupTherapy=mongoose.Schema(
    {
        image:{
            type:String,
            required:[true,"please add group image"]
        },
        groupName:{
            type:String,
            required:[true,"please add group name"]
        },
        purpose_Goals:{
            type:String,
            required:[true,"please add purpose or goals"]
        },
        How_long:{
            type:Number,
            required:[true,"please add duration number"]
        },
        startDate:{
            type:String,
            required:[true,"please add start date"]
        },
 
      },
      
)

const GroupTherapy=mongoose.model("groupTherapy",groupTherapy);
module.exports=GroupTherapy;