const express = require('express');
const router = new express.Router();
const Products = require("../models/productSchema");
const user = require("../models/userSchema");
const bcrypt = require("bcryptjs")
const authenticate = require("../middleware/authenticate")


// getproduct api

router.get("/getproducts",async(req,res)=>{
    try{
        const productsdata = await Products.find();
        // console.log(productsdata);
        res.json(productsdata)
    }catch (err){
        console.log("error" + err.message);
    }
})

router.get("/getproductsone/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        // console.log(id);
        const individualdata = await Products.findOne({id:id});
        // console.log(individualdata);
        res.json(individualdata);
    }catch(error){
        res.send(error);
    }
})

// signup API

router.post("/register",async(req,res)=>{
    const {fname,email,mobile,password,repass} = req.body;

    if(!fname || !email || !mobile || !password || !repass){
        res.status(422).json({error : "fill all data"});
        console .log("Data not available")
    }

    try{
        const preuser = await user.findOne({email:email});
        if(preuser){
            res.status(422).json({error:"User already Exists"});
        }
        else if(password!== repass){
            res.status(422).json({error:"Password and confirm password doesn't match"});
        }
        else{
            const finaluser = new user({
                fname,email,mobile,password,repass
            });

            const storedata = await finaluser.save();
            console.log(storedata);
            res.status(201).json(storedata);
        }
    }catch(error){
        console.log(error);
    }
})

// login user api

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({error:"FIll the data"})
    }

    try{
        const userlogin = await user.findOne({email:email});
        console.log(userlogin)

        if(userlogin){
            const isMatch = await bcrypt.compare(password,userlogin.password)
            console.log(isMatch);

            // token generate
            const token = await userlogin.generateAuthToken();
            // console.log("router token"+token);

            //cookie generate
            res.cookie("webmarket",token,{
                expires: new Date(Date.now()+900000),
                httpOnly: true
            })

            if(!isMatch){
                res.json({err: "Invalid details"})
            }else{
                res.json({userlogin})
            }
        }
        else{
            res.status(400).json({error: "Invalid details"})
        }
    }catch(err){
        console.log(err);
    }
})

//Adding data into cart

router.post("/addcart/:id",authenticate,async(req,res)=>{
    try {
        const {id} = req.params;
        const cart = await Products.findOne({id:id});
        console.log(cart + "cart value");

        if(req.token){
            const userContact = await user.findOne({_id: req.userID})
            // console.log(userContact);

            if(userContact){
                const cartdata = await userContact.addcartdata(cart)
                console.log(cartdata);
                res.status(201).json(userContact)
            }else{
                res.status(401).json({error : "Invalid user"})
            }
        }
        else{
            res.status(401).json({error : "Invalid user"})
        }
        
    } catch (error) {
        
    }
})

// Getting cart details 


router.get("/cartdetails",authenticate,async(req,res)=>{
    try {
        const buyuser = await user.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    } catch (error) {
        console.log("error "+error);
    }
})

// get valid user
router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const validuserone = await user.findOne({_id:req.userID});
        res.status(201).json(validuserone);
    } catch (error) {
        console.log("error "+error);
    }
})

// remove item from cart

router.delete("/remove/:id",authenticate,async(req,res)=>{
    try {
        const {id} = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((curval)=>{
            return curval.id!=id;
        })

        req.rootUser.save();
        res.status(201).json(req.rootUser)
        console.log("item removed")
    } catch (error) {
        console.log("error"+error);
        res.status(400).json(req.rootUser);
    }
})

// for user logout

router.get("/logout",authenticate,(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
            return curelem.token != req.token;
        })

        res.clearCookie("webmarket",{path:"/"})
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens)
        console.log("user logout")
    } catch (error) {
        console.log("error for logout")
    }
})

module.exports = router;