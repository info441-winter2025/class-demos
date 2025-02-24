import mongoose from "mongoose";


let models = {};

console.log("connecting to mongodb");
// Put your MongoDB Atlas connection string in, or
await mongoose.connect('');
console.log("connected to mongodb");

//Add schemas and models
const itemsSchema = new mongoose.Schema({
    name: String,
    price: Number
})

models.Item = mongoose.model("Item", itemsSchema);

console.log("finished creating models");

export default models;
