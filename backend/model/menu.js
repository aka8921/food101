const mongoose = require('mongoose')


const MenuSchema = new mongoose.Schema({

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

const model = mongoose.model("MenuSchema", MenuSchema)

module.exports = model