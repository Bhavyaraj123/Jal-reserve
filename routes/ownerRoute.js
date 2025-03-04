const express = require('express')
const router = express.Router();
const owner = require('../models/owner.model')
require('dotenv').config();


router.post('/create', async (req, res) => { 
 
    
    console.log("Request Body:", req.body); // Debugging line

    const { fullname, email, password } = req.body;
    
    try {
        const ownerFind= await owner.find(); 
        if(ownerFind.length>=1){
            return res.status(400).json({
                message: "you are not authorized  create owner",
        
              })
        }
        const ownerModel = await owner.create({ 
            fullname,
            email,
            password,
        });

        console.log("Owner Created:", ownerModel); // Debugging line
        res.status(201).json(ownerModel);
    } catch (error) {
        console.error("Error Creating Owner:", error); // Debugging line
        res.status(500).json({ message: "Error creating owner", error });
    }
});
router.get('/admin',(req,res)=>{
   const success= req.flash("success");
    res.render("createProducts", {success}); 
}) 

 
module.exports=router     