const Products = require("./models/productSchema");
const productsdata = require("./constant/productdata")

const defaultData = async()=>{
    try{
        await Products.deleteMany({});
        const storeData = await Products.insertMany(productsdata);
        console.log(storeData);
    }catch(err){
        console.log("Error" + err.message);
    }
};

module.exports = defaultData;