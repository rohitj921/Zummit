const asyncHandler = require("express-async-handler");
const SupportGroup = require("../../models/User/supportgroupmodel");

// Get list of support group sessions
const getSupportGroupSessions = asyncHandler(async (req, res) => {
    try {
        const supportGroupSessions = await SupportGroup.find({});
        res.status(200).json({
            success: true,
            supportGroupSessions,
            message: "Support Group sessions list"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Create a new support group session
const createSupportGroupSession = asyncHandler(async (req, res) => {
    const { image, groupName, purpose_Goals, How_long, startDate } = req.body;

    if (!image || !groupName || !purpose_Goals || !How_long || !startDate) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        const supportGroupSession = new SupportGroup({
            image,
            groupName,
            purpose_Goals,
            How_long,
            startDate
        });

        await supportGroupSession.save();
        res.status(201).json({
            success: true,
            message: "Support Group session created successfully",
            supportGroupSession
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = { getSupportGroupSessions, createSupportGroupSession };
