const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User/userModel");
const UpcomingGroups = require("../../models/User/upcomingGroups");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  // control variable hai bhai
  let isValid = false;
  let msg = "";
  let email = "";
  let phone = "";

  const { name, input, password, role } = req.body;

  console.log(name, input, password, role);
  if (password.length < 6) {
    res.status(400);
    throw new Error("password must be upto 6 character");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(input)) {
    email = input;
    isValid = true;
    console.log(email);
    msg = "Valid email address.";
  }

  const phoneRegex = /^\+?(\d{1,3})?[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/;
  if (phoneRegex.test(input)) {
    phone = input;
    isValid = true;
    console.log(phone);
    msg = "Valid phone number.";
  }

  if (!isValid) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid email or phone number." });
  }

  const User = require("../../models/User/userModel");

  const userExists = await User.findOne({ input });
  if (userExists) {
    res.status(400);
    throw new Error("User already Registered");
  }

  const user = await User.create({
    name,
    input,
    role,
    password,
  });

  if (user) {
    const { _id, input, role } = user;
    console.log("ID is ", _id);
    const token = generateToken(_id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      //  secure:true,  //for deployment
      //  sameSite:none
    });
    // send user data
    res.status(201).json({
      success: true,
      _id,
      name,
      input,
      role,
      token,
      message: "regisered successfully",
    });
  } else {
    res.status(400).json({ error: "Invalid user Data" });
  }
});

const loginUser = async (req, res) => {
  try {
    const { input, password } = req.body;

    if (!input || !password) {
      res.status(400);
      throw new Error("please add email/phone & password");
    }

    const user = await User.findOne({ input });

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!user) {
      res.status(400);
      throw new Error("user does not exist");
    }
    const token = generateToken(user._id);
    if (user && passwordIsCorrect) {
      const newUser = await User.findOne({ input }).select("-password");
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        // secure:true,
        // sameSite:none,
      });

      res.status(201).json({ newUser, Authorization: token });
    } else {
      res.status(400);
      throw new Error("Invalid email or Password");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "successfully logout",
  });
});

const getUser = (req, res) => {
  if (token) {
    const user = User.findBy(body.input);
    res.status(200).json({
      success: true,
      data: user,
      msg: "user found",
    });
  }
};

const upcomingGroups = asyncHandler(async (req, res)=> {
  try {
    const groups = await UpcomingGroups.find();
    res.status(200).json(groups);
  } catch (err) {
    console.error("Error fetching upcoming groups", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  upcomingGroups,
};
