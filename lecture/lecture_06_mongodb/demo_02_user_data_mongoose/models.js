import mongoose from 'mongoose';

let models = {};

main()

async function main() {
    // TODO: please use YOUR connection string!!!
    await mongoose.connect('YOUR_KEY_GOES_HERE')

    console.log('connected!');

    const userSchema = new mongoose.Schema({
        name: String, 
        icecream: String
    })
    models.User = mongoose.model('User', userSchema)
    console.log('model created');
}


export default models;