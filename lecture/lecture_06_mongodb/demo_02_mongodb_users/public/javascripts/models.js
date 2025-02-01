import mongoose from 'mongoose'

let models = {}

main()
async function main() {
    
    console.log('connecting to mongodb')

    await mongoose.connect('mongodb+srv://lesorbo:buAWbaCdUrxHJY88@info441.yvl1t.mongodb.net/websharer?retryWrites=true&w=majority&appName=info441')

    console.log("successfully connected to mongodb!")

    const userSchema = new mongoose.Schema({
        name: String, 
        icecream: String
    })

    models.User = mongoose.model('User', userSchema)
    console.log('mongoose models created')
}

export default models