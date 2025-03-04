const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const productModel = require("../models/product.model");
router.post("/createPro", upload.single("image"), async (req, res) => {

    try {
        let {name, price, discount, bgColor, panelColor, textColor } = req.body;

        const createProduct = await productModel.create({
            image: req.file
            ? {
                data: req.file.buffer,
                contentType: req.file.mimetype,
              }
            : null,
          name,
          price,
          discount,
          bgColor,
          panelColor,
          textColor,
        });
        req.flash("success","Product created successfully")
        res.redirect("/owner/admin")
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
 
});

module.exports = router;
