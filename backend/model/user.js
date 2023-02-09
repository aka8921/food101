const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
        username: {
            type: String, 
            required: true, 
            unique: true
        },
        firstName: {
        type: String,
        required: true
        },
        lastName: {
        type: String,
        required: true
        },
        password: {
            type: String, 
            required: true
        },
        userType: {
            type: String, 
            required: true , 
            enum: ['admin', 'canteen-staff', 'kitchen-staff', 'hosteller', 'day-scholar']
        },
        mealCard: {
            type: Number, 
            required: true ,
            default: 0 
        } 
    },
    {collection: "users"}
)

const model = mongoose.model("UserSchema", UserSchema)

module.exports = model