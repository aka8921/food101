const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({

        name: {
            type: String, 
            required: true ,
        },
        imageUrl: {
          type: String,
          required: true
        },
        price:{
          type: Number,
          required: true
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