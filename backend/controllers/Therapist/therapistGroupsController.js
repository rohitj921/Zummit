const asyncHandler = require("express-async-handler");
const therapistGroups=require("../../models/Therapist/therapistGroupsModel");

const therapistGroupLists = asyncHandler(async (req, res) => {
    try {
        const therapistGroup = await therapistGroups.find({});
        res.status(200).json({
            success: true,
            therapistGroupData: therapistGroup,
            message: "Groups list "
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


const createtherapistGroupLists = asyncHandler(async (req, res) => {

    const { therapistGroupData } = req.body;
    if (!therapistGroupData) {
        return res.status(402).json({ message: "Please fill all fileds" });
    }
    try {
        const therapistGroup = new therapistGroups(therapistGroupData);
        await therapistGroup.save();
        res.status(201).json({
            success: true,
            message: "Therapist Group created successfully",
            therapistGroupData: therapistGroup
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = { therapistGroupLists, createtherapistGroupLists };