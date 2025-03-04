const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    product: { type: Array, default: [] },
    picture: { type: String, default: "" },
});

const owner = mongoose.model('owner', ownerSchema);
module.exports = owner;
