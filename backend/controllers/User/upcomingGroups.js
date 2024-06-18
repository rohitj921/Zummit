const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const User = require("../../models/User/userModel");
const UpcomingGroup = require("../../models/User/upcomingGroups");

const upCommingGroups = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { input, token } = req.body;

  try {
    const user = await User.findOne({ input }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "UpCommingGroups not found" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (JSON.stringify(decodedToken.id) !== JSON.stringify(user._id)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const upComingGroups = await UpcomingGroup.find({});

    res.status(200).json({
      success: true,
      upCommingGroups: upComingGroups,
      message: "UpCommingGroups Granted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const createUpCommingGroups = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { input, token, upCommingGroupsData } = req.body;

  if (!input || !token || !upCommingGroupsData) {
    return res.status(402).json({ message: "Please fill all fileds" });
  }

  try {
    const user = await User.findOne({ input }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (JSON.stringify(decodedToken.id) !== JSON.stringify(user._id)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newUpcomingGroups = new UpcomingGroup();

    await newUpcomingGroups.save();

    res.status(201).json({
      success: true,
      message: "new UpcomingGroups created successfully",
      newUpcomingGroups: newUpcomingGroups,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { upCommingGroups, createUpCommingGroups };
