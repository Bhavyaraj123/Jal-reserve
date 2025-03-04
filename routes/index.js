const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn')
const productModel= require('../models/product.model')
const userModel = require('../models/user.model')
router.get('/',(req,res)=>{
    let error = req.flash("error")
    res.render("index",{error})
})

router.get('/shop',isLoggedIn, async(req,res)=>{
    let success = req.flash("success") || []; // Ensure it's always defined
  
    
    const products= await productModel.find()
    res.render("shop" , {products,success})

}) 
router.get('/cart', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    console.log("Cart Items:", user.cart);  // Debugging
    const finalPrice = Number(user.cart[0].price) +20 - Number(user.cart[0].discount)
    res.render('cart', { cartItems: user.cart || [] , finalPrice});
});
  
router.get('/addtocart/:productid', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save(); 
    req.flash("success", "Added to cart");
    res.redirect('/shop');      
});
router.get('/removecart/:productid', isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart = user.cart.filter(item => item.toString() !== req.params.productid);
        await user.save();
        
        req.flash("success", "Item removed from cart");
        res.redirect('/cart');
    } catch (error) {
        console.error("Error removing item:", error);
        req.flash("error", "Something went wrong!");
        res.redirect('/cart');
    }
});

module.exports=router    