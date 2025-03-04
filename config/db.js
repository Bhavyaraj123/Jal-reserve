const mongoose = require('mongoose');


function connectDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
       console.log("Database is sucessfully connected");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports= connectDb      