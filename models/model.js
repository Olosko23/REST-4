const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: String,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: false
        },
    },
    {
        timestamp: true,
    }
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;