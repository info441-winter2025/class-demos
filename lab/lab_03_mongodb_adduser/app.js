const mongoose = require("mongoose")

async function addUser() {
    await mongoose.connect("YOUR MONGODB URL")
    //mongodb+srv://websharerUser:pa55w0rd@cluster0.4pad9.mongodb.net/userDemo?retryWrites=true&w=majority&appName=Cluster0
    //            password here:  ^^^^^^^^      Database name here:   ^^^^^^^^
    const userSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        favoriteIceCream: String,
    });
    const userModel = mongoose.model("user", userSchema);
    const user = new userModel({firstname: "Hyejin", lastname: "Park", favoriteIceCream: "chocolate"});
    await user.save();
    console.log("added user schema");
}

addUser();