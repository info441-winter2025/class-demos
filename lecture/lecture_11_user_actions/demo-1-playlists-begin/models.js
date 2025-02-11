import mongoose from 'mongoose';

let models = {};

console.log("connecting to db");

await mongoose.connect("YOUR KEY HERE");

console.log("connected to db!")

const userSchema = new mongoose.Schema({
    username: String, 
    favorite_bands: [String]
})

models.User = mongoose.model("User", userSchema);

console.log("user schema created");

export default models;
