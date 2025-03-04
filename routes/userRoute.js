const express = require("express");
const router = express.Router();

const {registerUser, loginUser,logoutUser} = require('../controllers/authcontroller')




router.get("/", (req, res) => {
  res.send("hello this is user ");
});

router.post("/register",registerUser );

router.post("/login",loginUser ); 
router.get("/logout",logoutUser ); 

module.exports = router;
