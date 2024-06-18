const express=require("express")
const router=express.Router();
const {registerUser, loginUser, logout, getUser,upcomingGroups}=require("../controllers/User/userController");
const { protect } = require("../middleware/authMiddleware");
const { getGroupTherapySessions, createGroupTherapySession } = require("../controllers/User/groupTherapy");
const { getSupportGroupSessions, createSupportGroupSession } = require("../controllers/User/supportgroup");


router.get("/Grouptherapy", getGroupTherapySessions);           
router.post("/Grouptherapy", createGroupTherapySession);

router.get("/Supportgroup", getSupportGroupSessions);
router.post("/Supportgroup", createSupportGroupSession);



router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/logout",logout)
router.get("/getUser",protect,getUser)
router.get("/upcomingGroups",upcomingGroups);
module.exports=router;
