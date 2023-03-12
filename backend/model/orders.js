const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        username: {
          type: String, 
          required: true , 
      },
        items: [
          {
            item: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Menu",
              required: true
            },
            name: {
              type: String,
              required: true
            },
            quantity: {
              type: Number,
              required: true
            },
            price: {
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
        },
        status: {
          type: String, 
          required: true , 
          enum: ['pending', 'cancelled', 'approved'],
          default: 'pending'
      },
        method: {
          type: String, 
          required: true , 
          enum: ['cash', 'meal-card', 'pending'],
          default: 'pending'
      },
    },
    {collection: "orders"}
)

const model = mongoose.model("OrderSchema", OrderSchema)

module.exports = model