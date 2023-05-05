const mongoose = require("mongoose");
const db = process.env.DATABASE;
mongoose.connect(db).then(()=>console.log("connected to mongo")).catch((err)=> console.log(err))
