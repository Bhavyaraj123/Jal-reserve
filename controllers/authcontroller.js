const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;
    const chekUser = await userModel.findOne({ email });
    if (chekUser) {
      res.status(401).json({
        message: "you already have an account, please login",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const userCreate = await userModel.create({
      fullname,
      email,
      password: hashpassword,
    });
    res.redirect('/shop');
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    const findUser = await userModel.findOne({
      email,
    });
    if (!findUser) {
      res.status(400).json({
        message: "username or password is not valid ",
      });
    }
    let comapare = await bcrypt.compare(password, findUser.password);
    if (comapare) {
      let token = generateToken(findUser);
      console.log("token", token);
      res.cookie("token", token);

      res.redirect('/shop')
    } else {  
      res.status(400).json({
        message: "username or password is not valid ",
      });
    } 
  } catch (error) {
    res.send(error.message);
  }
};


module.exports.logoutUser = (req,res)=>{
  res.cookie("token","");
  res.redirect('/');
}