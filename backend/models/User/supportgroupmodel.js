const mongoose = require("mongoose");

const supportGroupSchema = mongoose.Schema(
    {
        image: {
            type: String,
            required: [true, "Please add support group image"]
        },
        groupName: {
            type: String,
            required: [true, "Please add support group name"]
        },
        purpose_Goals: {
            type: String,
            required: [true, "Please add purpose or goals"]
        },
        How_long: {
            type: Number,
            required: [true, "Please add duration number"]
        },
        startDate: {
            type: String,
            required: [true, "Please add start date"]
        },
    },
    {
        timestamps: true
    }
);

const SupportGroup = mongoose.model("SupportGroup", supportGroupSchema);
module.exports = SupportGroup;
