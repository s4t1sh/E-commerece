require("dotenv").config();
const express = require('express');
const app = express();
require("./db/conn")
const cookieParser = require("cookie-parser")

const Products = require("./models/productSchema");
const DefaultData = require("./defaultData");
const cors = require("cors");
const router = require("./routes/router")


app.use(cookieParser())
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(8000,()=>{
    console.log("connected...")
})

// DefaultData();