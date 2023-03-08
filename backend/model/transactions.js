const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    username: {
        type: String, 
        required: true , 
    },
    transactionAmount: {
        type: Number, 
        required: true ,
        default: 0 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tag: {
        type: String, 
        required: false ,
        default: "Unknown"
    },
    transactionMethod: {
        type: String, 
        required: true , 
        enum: ['cash', 'meal-card']
    },
    },
    {collection: "transactions"}
)

const model = mongoose.model("transactionSchema", transactionSchema)

module.exports = model