const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/model");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;

//middlewares
mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//DB Connection
mongoose
  .connect(URL)
  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch((error) => {
    console.log({ error });
  });

//General test route
app.get("/", (req, res) => {
  res.status(200).json("Welcome to the API");
});


//Routes
//GET all
app.get("/products", async(req,res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log({message: error.message})
    }
});


//Create product
app.post("/products", async(req, res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);

    } catch (error) {
        console.log({message: error.message})
    }
});

//GET one product
app.get("/products/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        console.log({message: error.message})
    }
})

//UPDATE one product
app.patch("/products/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        res.status(203).json(product);
        
    } catch (error) {
        console.log({message: error.message})
    }
});

//DELETE one product
app.delete("/products/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.json(201).json(product);

    } catch (error) {
        console.log({message: error.message});
    }
})
//Listening Port
app.listen(PORT, () => {
  console.log("Server Connected");
});
