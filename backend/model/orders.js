const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        count: {
            type: Number, 
            required: true ,
            default: 1 
        },
        createdAt: {
            type: Date,
            default: Date.now
        } 
    },
    {collection: "orders"}
)

const model = mongoose.model("OrderSchema", OrderSchema)

module.exports = model