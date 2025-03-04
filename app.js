const express = require('express')
const app = express();
const ownerRoute = require('./routes/ownerRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const indexRoute = require('./routes/index');
const dotenv = require('dotenv')
dotenv.config();
const userModel = require('./models/user.model')
const productModel = require('./models/product.model')
const ownerModel = require('./models/owner.model')
const connectDb = require('./config/db')
connectDb();
const expressSession = require('express-session');
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const path = require("path");

app.use(cookieParser()); 
app.use(flash())
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(express.urlencoded({extended:true}));
app.set("views", path.join(__dirname, "views"));
app.set('view engine' , 'ejs')
app.use(express.static('public'))
app.use(express.json());

app.use('/',indexRoute)
app.use('/owner',ownerRoute);
app.use('/products',productRoute);
app.use('/',productRoute);
app.use('/user',userRoute);  
app.use('/',userRoute);  
app.listen(3000);