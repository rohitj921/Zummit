const mongoose = require("mongoose");

const therapistGroupsModel = mongoose.Schema(
    {
        GroupName: {
            type: String,
            required: [true, "please add Group name"]
        },
        Members: {
            type: Number,
            required: [true, "please add Member number"]
        },
        Sessions: {
            type: Number,
            required: [true, "please add session type"]
        },
       Feedback: {
            type: String,
            required: [true, "please add feedback "]
        },
        
       lastSession: {
            type: String,
            required: [true, "please add last session"]
        }
    },
)

const therapistGroups = mongoose.model("therapistGroup", therapistGroupsModel);
module.exports = therapistGroups;