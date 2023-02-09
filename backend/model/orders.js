const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        items: [
          {
            item: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Menu",
              required: true
            },
            quantity: {
              type: Number,
              required: true
            }
          }
        ],
        total: {
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