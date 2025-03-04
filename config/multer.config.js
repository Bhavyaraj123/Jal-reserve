const multer = require('multer');

const storage = multer.memoryStorage(); // Memory storage
const upload = multer({ storage });


    
module.exports = upload;
