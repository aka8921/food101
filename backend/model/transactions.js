const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    transactionAmount: {
        type: Number, 
        required: true ,
        default: 0 
    },
    createdAt: {
        type: Date,
        default: Date.now
    } 
    },
    {collection: "transactions"}
)

const model = mongoose.model("transactionSchema", transactionSchema)

module.exports = model