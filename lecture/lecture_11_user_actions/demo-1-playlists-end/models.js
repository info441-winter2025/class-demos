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

const playlistsSchema = new mongoose.Schema({
    title: String,
    songs: String,
    user: {type:mongoose.Schema.Types.ObjectId, ref: "User"}
})

models.Playlist = mongoose.model("Playlist", playlistsSchema);

export default models;
