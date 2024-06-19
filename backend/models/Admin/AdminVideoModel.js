const mongoose = require("mongoose");

const adminVideoSchema = mongoose.Schema(
    {
        video: {
            type: String,
            required: [true, "please add embed code video"]
        },
        description: {
            type: String,
            required: [true, "please add video description"]
        }
    },
    { timestamps: true }
)

const adminVideosModel = mongoose.model("adminVideo", adminVideoSchema);
module.exports = adminVideosModel;