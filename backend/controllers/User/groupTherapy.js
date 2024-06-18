const asyncHandler = require("express-async-handler");
const GroupTherapy = require("../../models/User/grouptherapymodel");  

// Get list of group therapy sessions

const getGroupTherapySessions = asyncHandler(async (req, res) => {
    try {
        const groupTherapySessions = await GroupTherapy.find({});
        res.status(200).json({
            success: true,
            groupTherapySessions,
            message: "Group Therapy sessions list"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Create a new group therapy session

const createGroupTherapySession = asyncHandler(async (req, res) => {
    const { image, groupName, purpose_Goals, How_long, startDate } = req.body;

    if (!image || !groupName || !purpose_Goals || !How_long || !startDate) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        const groupTherapySession = new GroupTherapy({
            image,
            groupName,
            purpose_Goals,
            How_long,
            startDate
        });

        await groupTherapySession.save();
        res.status(201).json({
            success: true,
            message: "Group Therapy session created successfully",
            groupTherapySession
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = { getGroupTherapySessions, createGroupTherapySession };
