const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((obj)=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log("database connection failed!");
    console.error(err);
    process.exit(1);
})

module.exports.mongoose = mongoose;